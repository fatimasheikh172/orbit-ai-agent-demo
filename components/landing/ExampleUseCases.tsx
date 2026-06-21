'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ExampleUseCases() {
  const router = useRouter();

  const examples = [
    {
      title: 'Calculate & Research',
      goal: 'Calculate 15% of 2,450, and who invented the percentage symbol?',
      description: 'Combines calculation with web research',
      icon: '🔢',
      color: 'from-blue-600 to-blue-800',
    },
    {
      title: 'Multi-Step Planning',
      goal: 'Draft an email to my team about our Q2 results: revenue was $847k, up 23% from Q1',
      description: 'Calculates growth, then drafts professional email',
      icon: '📊',
      color: 'from-green-600 to-green-800',
    },
    {
      title: 'Current Information',
      goal: 'What is the weather in Tokyo and draft a casual text to my friend visiting there?',
      description: 'Searches web, then creates personalized message',
      icon: '🌍',
      color: 'from-purple-600 to-purple-800',
    },
    {
      title: 'Complex Math',
      goal: 'If I invest $5000 at 7% annual return for 10 years with monthly compounding, what will I have?',
      description: 'Handles compound interest calculation',
      icon: '💰',
      color: 'from-orange-600 to-orange-800',
    },
  ];

  const handleExampleClick = (goal: string) => {
    // Navigate to workspace with goal pre-filled
    router.push(`/workspace?goal=${encodeURIComponent(goal)}`);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Example Use Cases
          </h2>
          <p className="text-xl text-gray-400">
            Click any example to see the agent in action
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examples.map((example, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-6 h-full hover:border-cyan-600 transition-colors cursor-pointer group">
                <div onClick={() => handleExampleClick(example.goal)}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${example.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-3xl">{example.icon}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {example.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 italic">
                    "{example.goal}"
                  </p>

                  <p className="text-gray-500 text-sm mb-4">
                    {example.description}
                  </p>

                  <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Try this example
                    <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            onClick={() => router.push('/workspace')}
          >
            Try Your Own Goal →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
