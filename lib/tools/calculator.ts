import { evaluate } from 'mathjs';
import { BaseTool, ToolDefinition, ToolResult } from '@/types/tools';

export class CalculatorTool implements BaseTool {
  definition: ToolDefinition = {
    name: "calculator",
    description: "Evaluates mathematical expressions. Use for any calculations including basic arithmetic, percentages, exponents, square roots, etc.",
    parameters: {
      type: "object",
      properties: {
        expression: {
          type: "string",
          description: "Math expression to evaluate (e.g., '(5 + 3) * 2', 'sqrt(144)', '15% of 2450')"
        }
      },
      required: ["expression"]
    }
  };

  async execute(params: { expression: string }): Promise<ToolResult> {
    try {
      // Use mathjs for safe evaluation
      const result = evaluate(params.expression);

      return {
        success: true,
        data: {
          result: result.toString(),
          expression: params.expression
        },
        toolName: "calculator"
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Math error: ${error.message}`,
        toolName: "calculator"
      };
    }
  }
}
