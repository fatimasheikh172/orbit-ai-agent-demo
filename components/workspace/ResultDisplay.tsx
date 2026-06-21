'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ResultDisplayProps {
  result: string | null;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!result) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span>🎯</span>
          Final Result
        </h3>
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? '✓ Copied' : '📋 Copy'}
        </Button>
      </div>
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 whitespace-pre-wrap">{result}</p>
      </div>
    </Card>
  );
}
