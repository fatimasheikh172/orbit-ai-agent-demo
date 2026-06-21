import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | null;
  tool_calls?: any[];
  tool_call_id?: string;
  name?: string;
}

export interface ToolDefinition {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: any;
  };
}

export interface ChatCompletionResponse {
  content: string | null;
  tool_calls?: Array<{
    id: string;
    type: 'function';
    function: {
      name: string;
      arguments: string;
    };
  }>;
}

export async function createChatCompletion(
  messages: ChatMessage[]
): Promise<ChatCompletionResponse> {
  const params: any = {
    model: 'llama-3.1-8b-instant',
    messages,
    temperature: 0.1,
    max_tokens: 2000,
  };

  const completion = await groq.chat.completions.create(params);

  const message = completion.choices[0]?.message;

  return {
    content: message?.content || null,
  };
}
