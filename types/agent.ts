export type ReasoningStep = {
  type: 'thinking' | 'tool_call' | 'tool_result' | 'final_answer';
  content: string;
  toolName?: string;
  toolInput?: any;
  toolOutput?: any;
  timestamp: number;
};

export type AgentState = 'idle' | 'thinking' | 'executing' | 'completed' | 'error';

export type StreamMessage = {
  type: 'reasoning_step' | 'status_update' | 'error' | 'complete';
  data: ReasoningStep | { status: AgentState } | { error: string } | { finalAnswer: string };
};
