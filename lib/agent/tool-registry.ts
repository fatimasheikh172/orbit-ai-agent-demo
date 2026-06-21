import { BaseTool, ToolResult } from '@/types/tools';
import { CalculatorTool } from '@/lib/tools/calculator';
import { WebSearchTool } from '@/lib/tools/web-search';
import { EmailDrafterTool } from '@/lib/tools/email-drafter';

export class ToolRegistry {
  private tools: Map<string, BaseTool> = new Map();

  constructor() {
    this.register(new CalculatorTool());
    this.register(new WebSearchTool());
    this.register(new EmailDrafterTool());
  }

  register(tool: BaseTool): void {
    this.tools.set(tool.definition.name, tool);
  }

  getToolDefinitions(): Array<{
    type: 'function';
    function: {
      name: string;
      description: string;
      parameters: any;
    };
  }> {
    return Array.from(this.tools.values()).map(tool => ({
      type: 'function',
      function: {
        name: tool.definition.name,
        description: tool.definition.description,
        parameters: tool.definition.parameters,
      }
    }));
  }

  async execute(toolName: string, params: any): Promise<ToolResult> {
    const tool = this.tools.get(toolName);
    if (!tool) {
      return {
        success: false,
        error: `Unknown tool: ${toolName}`,
        toolName
      };
    }

    try {
      return await tool.execute(params);
    } catch (error: any) {
      return {
        success: false,
        error: `Tool execution failed: ${error.message}`,
        toolName
      };
    }
  }
}
