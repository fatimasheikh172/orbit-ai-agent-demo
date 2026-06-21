'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'User Input',
      description: 'You provide a natural language goal or task',
      icon: '💬',
    },
    {
      number: 2,
      title: 'Agent Plans',
      description: 'AI analyzes and breaks down the goal into steps',
      icon: '🧠',
    },
    {
      number: 3,
      title: 'Tools Execute',
      description: 'Agent selects and uses appropriate tools autonomously',
      icon: '🔧',
    },
    {
      number: 4,
      title: 'Final Output',
      description: 'Complete solution delivered with full transparency',
      icon: '✨',
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-400">
            Four simple steps from goal to solution
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-6 h-full relative">
                {/* Step number badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.number}
                </div>

                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>

                {/* Arrow connector (not on last item) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-8 text-cyan-600 text-2xl">
                    →
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
