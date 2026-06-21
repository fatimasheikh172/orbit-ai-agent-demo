import { BaseTool, ToolDefinition, ToolResult } from '@/types/tools';

export class WebSearchTool implements BaseTool {
  definition: ToolDefinition = {
    name: "web_search",
    description: "Searches the web for current information. Use when you need up-to-date facts, news, or real-time data.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The search query"
        }
      },
      required: ["query"]
    }
  };

  async execute(params: { query: string }): Promise<ToolResult> {
    try {
      // Try Serper API if key is available
      if (process.env.SERPER_API_KEY) {
        const response = await fetch('https://google.serper.dev/search', {
          method: 'POST',
          headers: {
            'X-API-KEY': process.env.SERPER_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ q: params.query })
        });

        if (response.ok) {
          const data = await response.json();
          const topResults = data.organic?.slice(0, 3).map((r: any) => ({
            title: r.title,
            snippet: r.snippet,
            link: r.link
          })) || [];

          return {
            success: true,
            data: {
              query: params.query,
              results: topResults
            },
            toolName: "web_search"
          };
        }
      }

      // Fallback to mock data for demo purposes
      return {
        success: true,
        data: {
          query: params.query,
          results: [
            {
              title: `Mock Result for: ${params.query}`,
              snippet: "This is a simulated search result. Add SERPER_API_KEY to .env.local for real web search.",
              link: "#"
            }
          ],
          note: "Using mock data - set SERPER_API_KEY for real search"
        },
        toolName: "web_search"
      };
    } catch (error: any) {
      return {
        success: false,
        error: `Search error: ${error.message}`,
        toolName: "web_search"
      };
    }
  }
}
