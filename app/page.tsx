import Hero from '@/components/landing/Hero';
import AgentVsChatbot from '@/components/landing/AgentVsChatbot';
import HowItWorks from '@/components/landing/HowItWorks';
import ExampleUseCases from '@/components/landing/ExampleUseCases';
import AgentArchitecture from '@/components/landing/AgentArchitecture';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AgentVsChatbot />
      <HowItWorks />
      <ExampleUseCases />
      <AgentArchitecture />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Built with Next.js 14, TypeScript, Tailwind CSS, and Groq API
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Orbit AI - Autonomous AI Agent Demo
          </p>
        </div>
      </footer>
    </main>
  );
}
