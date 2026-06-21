'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface GoalInputProps {
  onSubmit: (goal: string) => void;
  disabled?: boolean;
}

export default function GoalInput({ onSubmit, disabled }: GoalInputProps) {
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) {
      onSubmit(goal.trim());
      setGoal(''); // Clear input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-3">
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter your goal (e.g., Calculate 25 * 4 + 10 and explain the result)"
          className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
          disabled={disabled}
          autoFocus
          aria-label="Enter your goal"
        />
        <Button type="submit" disabled={disabled || !goal.trim()} size="lg">
          Run Agent
        </Button>
      </div>
    </form>
  );
}
