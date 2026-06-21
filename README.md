# Orbit AI - Autonomous AI Agent Demo

An interactive demo showcasing autonomous AI agents that think, plan, and act using multiple tools. Watch the agent break down complex goals, select appropriate tools, and deliver complete solutions — all streaming in real-time.

![Orbit AI](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Groq](https://img.shields.io/badge/Groq-Llama%203.3-orange?style=flat-square)

## 🚀 Features

- **Autonomous Reasoning**: Watch the AI agent think step-by-step as it breaks down complex goals
- **Multi-Tool Orchestration**: Agent autonomously selects and uses multiple tools:
  - 🔢 **Calculator**: Handles mathematical expressions and calculations
  - 🌐 **Web Search**: Fetches current information (Serper API integration)
  - ✉️ **Email Drafter**: Generates professional emails and messages
- **Real-Time Streaming**: See reasoning steps appear live using Server-Sent Events (SSE)
- **Terminal-Style UI**: Dark theme with monospace fonts and terminal aesthetics
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

**Agent Pattern**:
1. User submits a natural language goal
2. LLM (Groq's Llama 3.3) analyzes and decides which tools to use
3. Agent orchestrator executes tools and feeds results back to LLM
4. Process continues until goal is achieved
5. Every step streams to frontend in real-time

**Tech Stack**:
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **LLM Provider**: Groq API (llama-3.3-70b-versatile)
- **Animations**: Framer Motion
- **Math**: mathjs

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Groq API key ([Get one here](https://console.groq.com/keys))
- (Optional) Serper API key for web search ([Get one here](https://serper.dev))

### Setup

1. **Clone the repository**:
```bash
git clone <your-repo-url>
cd orbit-ai
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment variables**:

Create a `.env.local` file in the root directory:

```env
# Required: Your Groq API key
GROQ_API_KEY=your_groq_api_key_here

# Optional: Serper API key for web search (uses mock data if not set)
SERPER_API_KEY=your_serper_api_key_here

# App URL (for production)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**:
```bash
npm run dev
```

5. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Try the Examples

On the landing page, click any of the example use cases:
- **Calculate & Research**: "Calculate 15% of 2,450, and who invented the percentage symbol?"
- **Multi-Step Planning**: "Draft an email about Q2 results: revenue was $847k, up 23% from Q1"
- **Current Information**: "What's the weather in Tokyo?"
- **Complex Math**: "Calculate compound interest: $5000 at 7% for 10 years"

### Create Your Own Goals

1. Navigate to the **Workspace** page
2. Enter your goal in natural language
3. Click **Run Agent**
4. Watch the agent reason through the problem in real-time
5. View the final result and copy it if needed

### Example Goals to Try

```
Calculate 25 * 4 + 10 and explain the result

What is the square root of 144 multiplied by 7?

Draft a professional email requesting time off next week

Calculate what 15% tip would be on a $87.50 restaurant bill

Search for the current Bitcoin price and calculate 5% of it
```

## 🧠 How It Works

### Agent Orchestration Loop

```typescript
while (not done) {
  1. Send conversation + tools to LLM
  2. LLM decides: use tool OR provide final answer
  
  if (tool needed) {
    3. Execute tool
    4. Add result to conversation
    5. Stream step to frontend
    6. Continue loop
  } else {
    7. Return final answer
    8. Stream result to frontend
    9. Done
  }
}
```

### Tool System

Each tool implements the `BaseTool` interface:

```typescript
interface BaseTool {
  definition: ToolDefinition;  // Name, description, parameters
  execute(params: any): Promise<ToolResult>;
}
```

Tools are registered in `ToolRegistry` and made available to the LLM via function calling.

### Streaming Architecture

- **Backend**: API route creates a `ReadableStream` and sends SSE messages
- **Frontend**: Consumes stream with `fetch` + `ReadableStream.getReader()`
- **Format**: Each message is `data: {JSON}\n\n`

## 📂 Project Structure

```
orbit-ai/
├── app/
│   ├── api/agent/route.ts       # Agent API endpoint (SSE streaming)
│   ├── workspace/page.tsx        # Agent workspace interface
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── landing/                  # Landing page components
│   │   ├── Hero.tsx
│   │   ├── AgentVsChatbot.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── ExampleUseCases.tsx
│   │   ├── AgentArchitecture.tsx
│   │   └── Logo.tsx
│   ├── workspace/                # Workspace components
│   │   ├── GoalInput.tsx
│   │   ├── ReasoningPanel.tsx
│   │   ├── AgentStatus.tsx
│   │   └── ResultDisplay.tsx
│   └── ui/                       # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── LoadingSpinner.tsx
├── lib/
│   ├── agent/
│   │   ├── orchestrator.ts       # Core agent loop
│   │   ├── groq-client.ts        # Groq API wrapper
│   │   └── tool-registry.ts      # Tool management
│   ├── tools/
│   │   ├── base-tool.ts
│   │   ├── calculator.ts
│   │   ├── web-search.ts
│   │   └── email-drafter.ts
│   └── utils/
│       └── prompts.ts            # System prompt
└── types/
    ├── agent.ts                  # Agent types
    └── tools.ts                  # Tool interfaces
```

## 🛠️ Adding New Tools

1. Create a new tool file in `lib/tools/`:

```typescript
import { BaseTool, ToolDefinition, ToolResult } from '@/types/tools';

export class MyNewTool implements BaseTool {
  definition: ToolDefinition = {
    name: "my_tool",
    description: "What this tool does",
    parameters: {
      type: "object",
      properties: {
        param1: { type: "string", description: "Parameter description" }
      },
      required: ["param1"]
    }
  };

  async execute(params: { param1: string }): Promise<ToolResult> {
    // Your tool logic here
    return {
      success: true,
      data: { result: "..." },
      toolName: "my_tool"
    };
  }
}
```

2. Register in `lib/agent/tool-registry.ts`:

```typescript
import { MyNewTool } from '@/lib/tools/my-new-tool';

constructor() {
  this.register(new CalculatorTool());
  this.register(new WebSearchTool());
  this.register(new EmailDrafterTool());
  this.register(new MyNewTool()); // Add your tool
}
```

3. Update the system prompt in `lib/utils/prompts.ts` to mention the new tool.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in project settings:
   - `GROQ_API_KEY`
   - `SERPER_API_KEY` (optional)
4. Deploy

### Other Platforms

Build the production bundle:

```bash
npm run build
npm run start
```

Ensure your hosting platform supports:
- Node.js 18+
- Environment variables
- Server-Side Rendering (SSR)

## 🎨 Customization

### Change the Model

Edit `lib/agent/groq-client.ts`:

```typescript
const params: any = {
  model: 'llama-3.3-70b-versatile', // Change to another Groq model
  // ...
};
```

### Modify Agent Behavior

Edit the system prompt in `lib/utils/prompts.ts` to change how the agent reasons and selects tools.

### Adjust Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Inline with Tailwind classes

## 🐛 Troubleshooting

**Agent not responding?**
- Check your `GROQ_API_KEY` is set correctly in `.env.local`
- Verify the Groq API is accessible (check console for errors)

**Web search returning mock data?**
- This is expected if `SERPER_API_KEY` is not set
- Add a valid Serper API key for real web search

**Streaming not working?**
- Check browser console for errors
- Verify the API route is accessible at `/api/agent`
- Ensure Server-Sent Events are supported (modern browsers)

## 📝 License

MIT License - feel free to use this for your portfolio or projects!

## 🙏 Acknowledgments

- Built with [Groq](https://groq.com) for ultra-fast LLM inference
- UI inspired by terminal aesthetics and developer tools
- Demonstrates the Agent Factory pattern for autonomous AI

## 📧 Contact

Questions or feedback? Open an issue or reach out!

---

**Note**: This is a demo application for showcasing agentic AI capabilities. For production use, add proper rate limiting, authentication, and error handling.
"# orbit-ai-agent-demo" 
