export interface ToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, any>;
    required: string[];
  };
}

export interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
  toolName: string;
}

export interface BaseTool {
  definition: ToolDefinition;
  execute(params: any): Promise<ToolResult>;
}
