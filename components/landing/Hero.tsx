'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './Logo';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <Logo size="lg" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          AI Agents That Think,
          <br />
          <span className="text-cyan-500">Plan, and Act</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
        >
          Watch autonomous AI agents break down complex goals, select the right tools,
          and deliver complete solutions — all in real-time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/workspace">
            <Button size="lg" className="w-full sm:w-auto">
              Try Orbit AI →
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            View Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-sm text-gray-500"
        >
          <p>Not just another chatbot — this is autonomous AI reasoning</p>
        </motion.div>
      </div>
    </section>
  );
}
