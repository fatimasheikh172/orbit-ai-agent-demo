import { BaseTool, ToolDefinition, ToolResult } from '@/types/tools';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export class EmailDrafterTool implements BaseTool {
  definition: ToolDefinition = {
    name: "email_drafter",
    description: "Drafts professional emails or text messages based on given context and purpose.",
    parameters: {
      type: "object",
      properties: {
        recipient: {
          type: "string",
          description: "Who the message is for (e.g., 'my manager', 'client', 'team')"
        },
        purpose: {
          type: "string",
          description: "The purpose or main message (e.g., 'request time off', 'follow up on project')"
        },
        tone: {
          type: "string",
          enum: ["professional", "casual", "friendly"],
          description: "Desired tone of the message"
        },
        key_points: {
          type: "array",
          items: { type: "string" },
          description: "Key points or details to include in the message"
        }
      },
      required: ["recipient", "purpose"]
    }
  };

  async execute(params: {
    recipient: string;
    purpose: string;
    tone?: string;
    key_points?: string[];
  }): Promise<ToolResult> {
    try {
      const tone = params.tone || 'professional';
      const keyPoints = params.key_points?.join(', ') || 'none specified';

      const prompt = `Draft a ${tone} email to ${params.recipient} about: ${params.purpose}.

Key points to include: ${keyPoints}

Write only the email content (subject line and body), nothing else. Make it concise and well-structured.`;

      const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a professional email writer. Draft clear, concise, and well-structured emails.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const draft = completion.choices[0]?.message?.content || 'Failed to generate draft';

      return {
        success: true,
        data: {
          draft,
          recipient: params.recipient,
          tone
        },
        toolName: "email_drafter"
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Email drafting error: ${error.message}`,
        toolName: "email_drafter"
      };
    }
  }
}
