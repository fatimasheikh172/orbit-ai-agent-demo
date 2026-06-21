'use client';

import { AgentState } from '@/types/agent';

interface AgentStatusProps {
  status: AgentState;
}

export default function AgentStatus({ status }: AgentStatusProps) {
  const statusConfig = {
    idle: {
      label: 'Idle',
      color: 'text-gray-400',
      bg: 'bg-gray-700',
      icon: '⚫',
    },
    thinking: {
      label: 'Thinking',
      color: 'text-blue-400',
      bg: 'bg-blue-900/30',
      icon: '💭',
    },
    executing: {
      label: 'Executing Tools',
      color: 'text-orange-400',
      bg: 'bg-orange-900/30',
      icon: '🔧',
    },
    completed: {
      label: 'Completed',
      color: 'text-green-400',
      bg: 'bg-green-900/30',
      icon: '✅',
    },
    error: {
      label: 'Error',
      color: 'text-red-400',
      bg: 'bg-red-900/30',
      icon: '❌',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg} ${config.color}`}>
      <span>{config.icon}</span>
      <span className="text-sm font-medium">{config.label}</span>
      {(status === 'thinking' || status === 'executing') && (
        <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
      )}
    </div>
  );
}
