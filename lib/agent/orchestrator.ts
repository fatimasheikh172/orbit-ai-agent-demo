import { createChatCompletion, ChatMessage } from './groq-client';
import { ToolRegistry } from './tool-registry';
import { AGENT_SYSTEM_PROMPT } from '@/lib/utils/prompts';
import { ReasoningStep } from '@/types/agent';

export class AgentOrchestrator {
  private toolRegistry: ToolRegistry;
  private maxIterations = 10;

  constructor() {
    this.toolRegistry = new ToolRegistry();
  }

  async processGoal(
    goal: string,
    streamCallback: (step: ReasoningStep) => void
  ): Promise<string> {
    const conversationHistory: ChatMessage[] = [
      { role: 'system', content: AGENT_SYSTEM_PROMPT },
      { role: 'user', content: goal }
    ];

    let iteration = 0;

    while (iteration < this.maxIterations) {
      iteration++;

      // Get LLM response WITHOUT tool calling - just regular completion
      const response = await createChatCompletion(conversationHistory);

      const content = response.content || '';

      // Try to parse as tool call JSON
      let toolCall = null;
      try {
        const jsonMatch = content.match(/\{[\s\S]*"tool"[\s\S]*"input"[\s\S]*\}/);
        if (jsonMatch) {
          toolCall = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        // Not a tool call, treat as final answer
      }

      if (toolCall && toolCall.tool && toolCall.input) {
        // Stream thinking step
        streamCallback({
          type: 'thinking',
          content: `Deciding to use ${toolCall.tool}`,
          timestamp: Date.now()
        });

        // Add assistant message to history
        conversationHistory.push({
          role: 'assistant',
          content: content,
        });

        // Stream tool call
        streamCallback({
          type: 'tool_call',
          content: `Using ${toolCall.tool}`,
          toolName: toolCall.tool,
          toolInput: toolCall.input,
          timestamp: Date.now()
        });

        // Execute the tool
        const result = await this.toolRegistry.execute(toolCall.tool, toolCall.input);

        // Stream tool result
        streamCallback({
          type: 'tool_result',
          content: result.success
            ? 'Tool executed successfully'
            : `Tool execution failed: ${result.error}`,
          toolName: toolCall.tool,
          toolOutput: result.data || result.error,
          timestamp: Date.now()
        });

        // Add tool result to conversation
        conversationHistory.push({
          role: 'user',
          content: `Tool result: ${JSON.stringify(result)}`,
        });
      } else {
        // No tool call - this is the final answer
        streamCallback({
          type: 'thinking',
          content: content,
          timestamp: Date.now()
        });

        streamCallback({
          type: 'final_answer',
          content: content,
          timestamp: Date.now()
        });

        return content;
      }
    }

    throw new Error('Max iterations reached without completing the goal');
  }
}
