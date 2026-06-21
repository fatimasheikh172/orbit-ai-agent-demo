import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orbit AI - Autonomous AI Agent Demo",
  description: "Watch AI agents think, plan, and act autonomously. See real-time reasoning as the agent breaks down goals and uses tools like calculator, web search, and email drafting.",
  keywords: ["AI agent", "autonomous AI", "Groq", "LLM", "agentic AI", "tool use", "function calling"],
  authors: [{ name: "Orbit AI" }],
  openGraph: {
    title: "Orbit AI - Autonomous AI Agent Demo",
    description: "Watch AI agents think, plan, and act autonomously with real-time reasoning",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbit AI - Autonomous AI Agent Demo",
    description: "Watch AI agents think, plan, and act autonomously with real-time reasoning",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
