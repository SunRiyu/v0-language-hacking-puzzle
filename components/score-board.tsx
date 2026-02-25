'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Trophy, Zap } from 'lucide-react';

interface ScoreBoardProps {
  totalScore: number;
  level: number;
  completedPuzzles: number;
  totalPuzzles: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  totalScore,
  level,
  completedPuzzles,
  totalPuzzles,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="w-5 h-5" />
          Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Level */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Level</span>
          <Badge className="bg-purple-600 text-lg px-3 py-1">{level}</Badge>
        </div>

        {/* Total Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Score</span>
          </div>
          <span className="font-bold text-lg">{totalScore}</span>
        </div>

        {/* Streak */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Solved</span>
          </div>
          <span className="font-bold text-lg">{completedPuzzles}/{totalPuzzles}</span>
        </div>

        {/* Efficiency */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs font-medium text-blue-900">
            Keep solving puzzles to unlock more languages and increase your level!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
