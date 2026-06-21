'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReasoningStep } from '@/types/agent';

interface ReasoningPanelProps {
  steps: ReasoningStep[];
}

export default function ReasoningPanel({ steps }: ReasoningPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest step
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [steps]);

  const getStepIcon = (type: ReasoningStep['type']) => {
    switch (type) {
      case 'thinking':
        return '💭';
      case 'tool_call':
        return '🔧';
      case 'tool_result':
        return '✅';
      case 'final_answer':
        return '🎯';
      default:
        return '•';
    }
  };

  const getStepColor = (type: ReasoningStep['type']) => {
    switch (type) {
      case 'thinking':
        return 'text-blue-400 border-blue-500/30';
      case 'tool_call':
        return 'text-orange-400 border-orange-500/30';
      case 'tool_result':
        return 'text-green-400 border-green-500/30';
      case 'final_answer':
        return 'text-purple-400 border-purple-500/30';
      default:
        return 'text-gray-400 border-gray-500/30';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 h-[600px] overflow-y-auto font-mono text-sm border border-gray-700">
      {steps.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-2">🤖</div>
            <p>Waiting for agent to start...</p>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 p-3 border-l-4 ${getStepColor(step.type)} bg-gray-800/50 rounded`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{getStepIcon(step.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-semibold ${getStepColor(step.type).split(' ')[0]}`}>
                      {step.type.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(step.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-300 whitespace-pre-wrap break-words">
                    {step.content}
                  </p>

                  {/* Show tool name for tool calls */}
                  {step.toolName && step.type === 'tool_call' && (
                    <div className="mt-2 text-sm text-gray-400">
                      <span className="font-semibold">Tool:</span> {step.toolName}
                    </div>
                  )}

                  {/* Show tool input */}
                  {step.toolInput && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300">
                        View Input
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-950 rounded text-xs overflow-x-auto">
                        {JSON.stringify(step.toolInput, null, 2)}
                      </pre>
                    </details>
                  )}

                  {/* Show tool output */}
                  {step.toolOutput && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300">
                        View Output
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-950 rounded text-xs overflow-x-auto">
                        {JSON.stringify(step.toolOutput, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
