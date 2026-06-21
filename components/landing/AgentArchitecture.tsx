'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

export default function AgentArchitecture() {
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
            Agent Architecture
          </h2>
          <p className="text-xl text-gray-400">
            Built using function calling, multi-step reasoning, and tool orchestration
          </p>
        </motion.div>

        <Card className="p-8">
          <div className="space-y-8">
            {/* System Flow Diagram */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-4xl">🧠</span>
                </div>
                <p className="text-white font-semibold">LLM</p>
                <p className="text-gray-400 text-sm">Groq (Llama 3.3)</p>
              </motion.div>

              <div className="text-cyan-500 text-3xl rotate-90 md:rotate-0">↓</div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-4xl">⚙️</span>
                </div>
                <p className="text-white font-semibold">Agent</p>
                <p className="text-gray-400 text-sm">Orchestrator</p>
              </motion.div>

              <div className="text-cyan-500 text-3xl rotate-90 md:rotate-0">↓</div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-4xl">🔧</span>
                </div>
                <p className="text-white font-semibold">Tools</p>
                <p className="text-gray-400 text-sm">Calculator, Search, etc.</p>
              </motion.div>

              <div className="text-cyan-500 text-3xl rotate-90 md:rotate-0">↓</div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-4xl">✅</span>
                </div>
                <p className="text-white font-semibold">Results</p>
                <p className="text-gray-400 text-sm">Streamed live</p>
              </motion.div>
            </div>

            {/* Technical Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-gray-700">
              <div className="text-center">
                <h4 className="text-cyan-400 font-semibold mb-2">Function Calling</h4>
                <p className="text-gray-400 text-sm">
                  LLM decides which tools to use based on the goal
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-cyan-400 font-semibold mb-2">Tool Orchestration</h4>
                <p className="text-gray-400 text-sm">
                  Agent manages tool execution and result synthesis
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-cyan-400 font-semibold mb-2">Real-time Streaming</h4>
                <p className="text-gray-400 text-sm">
                  Server-Sent Events (SSE) for live reasoning display
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
