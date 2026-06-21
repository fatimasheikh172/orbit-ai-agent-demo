'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ReasoningStep, AgentState, StreamMessage } from '@/types/agent';
import GoalInput from '@/components/workspace/GoalInput';
import ReasoningPanel from '@/components/workspace/ReasoningPanel';
import AgentStatus from '@/components/workspace/AgentStatus';
import ResultDisplay from '@/components/workspace/ResultDisplay';
import Link from 'next/link';

export default function WorkspacePage() {
  const searchParams = useSearchParams();
  const [reasoningSteps, setReasoningSteps] = useState<ReasoningStep[]>([]);
  const [agentStatus, setAgentStatus] = useState<AgentState>('idle');
  const [finalResult, setFinalResult] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Auto-run if goal is in URL parameters
  useEffect(() => {
    const goalFromUrl = searchParams.get('goal');
    if (goalFromUrl) {
      runAgent(goalFromUrl);
    }
  }, []);

  const runAgent = async (goal: string) => {
    // Reset state
    setReasoningSteps([]);
    setFinalResult(null);
    setAgentStatus('thinking');
    setIsRunning(true);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');

        // Keep the last incomplete line in buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const message = JSON.parse(line.slice(6)) as StreamMessage;

              if (message.type === 'reasoning_step') {
                const step = message.data as ReasoningStep;
                setReasoningSteps((prev) => [...prev, step]);

                // Update status based on step type
                if (step.type === 'tool_call') {
                  setAgentStatus('executing');
                } else if (step.type === 'thinking') {
                  setAgentStatus('thinking');
                } else if (step.type === 'final_answer') {
                  setAgentStatus('completed');
                  setFinalResult(step.content);
                }
              } else if (message.type === 'complete') {
                setAgentStatus('completed');
              } else if (message.type === 'error') {
                setAgentStatus('error');
                const errorData = message.data as { error: string };
                setReasoningSteps((prev) => [
                  ...prev,
                  {
                    type: 'final_answer',
                    content: `Error: ${errorData.error}`,
                    timestamp: Date.now(),
                  },
                ]);
              }
            } catch (e) {
              console.error('Failed to parse SSE message:', e);
            }
          }
        }
      }
    } catch (error: any) {
      console.error('Agent error:', error);
      setAgentStatus('error');
      setReasoningSteps((prev) => [
        ...prev,
        {
          type: 'final_answer',
          content: `Error: ${error.message}`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-white">Orbit AI Workspace</h1>
            <Link
              href="/"
              className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
            >
              ← Back to Home
            </Link>
          </div>
          <p className="text-gray-400">
            Enter a goal and watch the AI agent break it down and use tools autonomously
          </p>
        </div>

        {/* Status Bar */}
        <div className="mb-6">
          <AgentStatus status={agentStatus} />
        </div>

        {/* Goal Input */}
        <div className="mb-6">
          <GoalInput onSubmit={runAgent} disabled={isRunning} />
        </div>

        {/* Example Prompts */}
        {reasoningSteps.length === 0 && (
          <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
            <p className="text-sm text-gray-400 mb-3">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Calculate 25 * 4 + 10",
                "What is 15% of 2,450?",
                "Draft a professional email requesting time off next week",
              ].map((example, i) => (
                <button
                  key={i}
                  onClick={() => runAgent(example)}
                  disabled={isRunning}
                  className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-cyan-400 rounded border border-gray-700 transition-colors disabled:opacity-50"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reasoning Panel */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
            <span>🧠</span>
            Agent Reasoning
          </h2>
          <ReasoningPanel steps={reasoningSteps} />
        </div>

        {/* Final Result */}
        {finalResult && <ResultDisplay result={finalResult} />}
      </div>
    </div>
  );
}
