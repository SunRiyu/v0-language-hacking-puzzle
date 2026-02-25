'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Language } from '@/lib/game-logic';
import { BookMarked } from 'lucide-react';

interface DexDisplayProps {
  languages: Language[];
  unlockedLanguages: Set<string>;
  completedCount: number;
  totalCount: number;
}

export const DexDisplay: React.FC<DexDisplayProps> = ({
  languages,
  unlockedLanguages,
  completedCount,
  totalCount,
}) => {
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookMarked className="w-5 h-5" />
          Dex
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Completion</span>
            <span className="text-sm text-gray-600">{completedCount}/{totalCount}</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        {/* Language Status */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">Languages</h4>
          {languages.map(lang => (
            <div key={lang.id} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-sm font-medium flex-1">{lang.native_name}</span>
              {unlockedLanguages.has(lang.id) ? (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Unlocked
                </span>
              ) : (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  🔒 Locked
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
