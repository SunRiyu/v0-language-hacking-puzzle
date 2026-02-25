'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { Puzzle, Language } from '@/lib/game-logic';

interface PuzzleDisplayProps {
  puzzle: Puzzle;
  language?: Language;
  hints: string[];
  completed: boolean;
}

export const PuzzleDisplay: React.FC<PuzzleDisplayProps> = ({
  puzzle,
  language,
  hints,
  completed,
}) => {
  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return 'bg-green-100 text-green-800';
      case 2:
        return 'bg-blue-100 text-blue-800';
      case 3:
        return 'bg-yellow-100 text-yellow-800';
      case 4:
        return 'bg-orange-100 text-orange-800';
      case 5:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPuzzleTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      translation: '翻訳',
      decipherment: '解読',
      grammar: '文法',
      quotation: '引用',
    };
    return labels[type] || type;
  };

  return (
    <Card className={completed ? 'border-green-300 bg-green-50' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{language?.native_name || 'Unknown Language'}</CardTitle>
            <CardDescription>{language?.description}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className={getDifficultyColor(puzzle.difficulty)}>
              難易度 {puzzle.difficulty}/5
            </Badge>
            <Badge variant="outline">{getPuzzleTypeLabel(puzzle.type)}</Badge>
            {completed && <Badge className="bg-green-600">✓ 解いた</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Puzzle Question */}
        <div>
          <h3 className="font-semibold text-lg mb-3">問題</h3>
          <div className="bg-slate-100 p-6 rounded-lg border-2 border-slate-300 min-h-24 flex items-center justify-center">
            <p className="text-center text-lg font-mono">{puzzle.question}</p>
          </div>
        </div>

        {/* Hints */}
        {hints.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              ヒント
            </h3>
            <div className="space-y-2">
              {hints.map((hint, index) => (
                <div key={index} className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                  <p className="text-sm text-amber-900">
                    <span className="font-semibold">ヒント {index + 1}:</span> {hint}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed State */}
        {completed && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <p className="text-green-900 font-medium">✓ パズルを解きました！</p>
            <p className="text-green-800 text-sm mt-1">素晴らしい！さらに詳しく学ぶために、AI解説を読んでください。</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
