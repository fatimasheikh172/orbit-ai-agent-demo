'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

export default function AgentVsChatbot() {
  const comparison = [
    {
      feature: 'Response Type',
      chatbot: 'Single text response',
      agent: 'Multi-step execution with tools',
    },
    {
      feature: 'Reasoning',
      chatbot: 'Hidden or implicit',
      agent: 'Visible step-by-step thinking',
    },
    {
      feature: 'Tool Use',
      chatbot: 'Limited or none',
      agent: 'Autonomous tool selection & execution',
    },
    {
      feature: 'Task Complexity',
      chatbot: 'Simple Q&A',
      agent: 'Complex multi-step goals',
    },
    {
      feature: 'Output',
      chatbot: 'Text only',
      agent: 'Calculations, searches, drafts & more',
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Agent vs Chatbot
          </h2>
          <p className="text-xl text-gray-400">
            Understanding the difference between simple chatbots and autonomous AI agents
          </p>
        </motion.div>

        <Card className="overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-900">
            <div className="p-4 border-r border-gray-700">
              <p className="font-semibold text-gray-400 text-sm">Feature</p>
            </div>
            <div className="p-4 border-r border-gray-700">
              <p className="font-semibold text-gray-400 text-sm">Chatbot</p>
            </div>
            <div className="p-4">
              <p className="font-semibold text-cyan-400 text-sm">AI Agent</p>
            </div>
          </div>

          {comparison.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="grid grid-cols-3 border-t border-gray-700"
            >
              <div className="p-4 border-r border-gray-700">
                <p className="text-white font-medium text-sm">{row.feature}</p>
              </div>
              <div className="p-4 border-r border-gray-700">
                <p className="text-gray-400 text-sm">{row.chatbot}</p>
              </div>
              <div className="p-4">
                <p className="text-cyan-400 text-sm font-medium">{row.agent}</p>
              </div>
            </motion.div>
          ))}
        </Card>
      </div>
    </section>
  );
}
