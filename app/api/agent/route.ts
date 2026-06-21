import { NextRequest } from 'next/server';
import { AgentOrchestrator } from '@/lib/agent/orchestrator';
import { StreamMessage } from '@/types/agent';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { goal } = await req.json();

    if (!goal || typeof goal !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Goal is required and must be a string' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a readable stream for SSE
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const orchestrator = new AgentOrchestrator();

        try {
          await orchestrator.processGoal(goal, (step) => {
            // Send each reasoning step as SSE
            const message: StreamMessage = {
              type: 'reasoning_step',
              data: step
            };
            const sseMessage = `data: ${JSON.stringify(message)}\n\n`;
            controller.enqueue(encoder.encode(sseMessage));
          });

          // Send completion message
          const completeMessage: StreamMessage = {
            type: 'complete',
            data: { finalAnswer: 'Task completed' }
          };
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(completeMessage)}\n\n`)
          );
        } catch (error: any) {
          console.error('Agent error:', error);

          // Send error message
          const errorMessage: StreamMessage = {
            type: 'error',
            data: { error: error.message || 'An error occurred' }
          };
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(errorMessage)}\n\n`)
          );
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Request error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Invalid request' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
