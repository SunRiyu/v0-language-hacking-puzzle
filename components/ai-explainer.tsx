'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb } from 'lucide-react';

interface AIExplainerProps {
  puzzleType: string;
  question: string;
  answer: string;
  language?: string;
  difficulty: number;
}

export const AIExplainer: React.FC<AIExplainerProps> = ({
  puzzleType,
  question,
  answer,
  language,
  difficulty,
}) => {
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExplanation = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            puzzleType,
            question,
            answer,
            language: language || 'Unknown',
            difficulty,
          }),
        });

        if (!response.ok) throw new Error('Failed to fetch explanation');

        // Handle streaming response
        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let fullText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setExplanation(fullText);
        }
      } catch (err) {
        console.error('[v0] Error fetching explanation:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchExplanation();
  }, [puzzleType, question, answer, language, difficulty]);

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-amber-900">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          AI Explanation
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm">
            <p className="font-semibold">Error loading explanation</p>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && explanation && (
          <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
            {explanation}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
