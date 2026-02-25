'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Lightbulb } from 'lucide-react';
import { Puzzle, Language } from '@/lib/game-logic';
import { PuzzleDisplay } from './puzzle-display';
import { DexDisplay } from './dex-display';
import { ScoreBoard } from './score-board';
import { AIExplainer } from './ai-explainer';

interface GameScreenProps {
  userId: string;
  puzzles: Puzzle[];
  languages: Language[];
  onPuzzleComplete: (puzzleId: number, correct: boolean, score: number) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  userId,
  puzzles,
  languages,
  onPuzzleComplete,
}) => {
  const [currentPuzzleId, setCurrentPuzzleId] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [startTime] = useState(Date.now());
  const [selectedLanguage, setSelectedLanguage] = useState<string>(languages[0]?.id || '');
  const [showExplanation, setShowExplanation] = useState(false);
  const [unlockedLanguages, setUnlockedLanguages] = useState<Set<string>>(
    new Set([languages[0]?.id])
  );
  const [completedPuzzles, setCompletedPuzzles] = useState<Set<number>>(new Set());

  const currentPuzzle = puzzles.find(p => p.id === currentPuzzleId);
  const languagePuzzles = puzzles.filter(p => p.language_id === selectedLanguage);

  const handleSubmitAnswer = useCallback(async () => {
    if (!currentPuzzle || !userAnswer.trim()) return;

    const isCorrect = userAnswer.trim().toLowerCase() === currentPuzzle.answer.toLowerCase();
    const newAttempts = attempts + 1;

    if (isCorrect) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const score = Math.max(10, 100 - (newAttempts - 1) * 10 - hintsUsed * 15);

      setCompletedPuzzles(prev => new Set([...prev, currentPuzzleId]));
      setShowExplanation(true);
      onPuzzleComplete(currentPuzzleId, true, score);

      // Save progress to API
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            puzzleId: currentPuzzleId,
            correct: true,
            attempts: newAttempts,
            hintsUsed,
            timeSpentSeconds: timeSpent,
          }),
        });
      } catch (error) {
        console.error('[v0] Error saving progress:', error);
      }

      // Auto-unlock next language after first puzzle solve
      if (completedPuzzles.size === 0) {
        const nextLanguage = languages.find(l => l.id !== selectedLanguage);
        if (nextLanguage) {
          setUnlockedLanguages(prev => new Set([...prev, nextLanguage.id]));
        }
      }
    }

    setAttempts(newAttempts);
  }, [currentPuzzle, userAnswer, attempts, hintsUsed, startTime, onPuzzleComplete, completedPuzzles, selectedLanguage, languages, userId, currentPuzzleId]);

  const handleGetHint = useCallback(() => {
    if (hintsUsed < (currentPuzzle?.hints.length || 0)) {
      setHintsUsed(hintsUsed + 1);
    }
  }, [hintsUsed, currentPuzzle]);

  const handleSelectPuzzle = useCallback((puzzleId: number) => {
    setCurrentPuzzleId(puzzleId);
    setUserAnswer('');
    setAttempts(0);
    setHintsUsed(0);
    setShowExplanation(false);
  }, []);

  const handleChangeLanguage = useCallback((languageId: string) => {
    setSelectedLanguage(languageId);
    const firstPuzzle = puzzles.find(p => p.language_id === languageId && !p.is_locked);
    if (firstPuzzle) {
      handleSelectPuzzle(firstPuzzle.id);
    }
  }, [puzzles, handleSelectPuzzle]);

  useEffect(() => {
    if (puzzles.length > 0 && !currentPuzzleId) {
      const firstPuzzle = puzzles.find(p => !p.is_locked);
      if (firstPuzzle) {
        setCurrentPuzzleId(firstPuzzle.id);
      }
    }
  }, [puzzles, currentPuzzleId]);

  if (!currentPuzzle || puzzles.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Go-gen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Loading game data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 h-screen overflow-hidden">
      {/* Main Game Area */}
      <div className="lg:col-span-3 flex flex-col gap-4 overflow-auto">
        {/* Language Selector */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {languages.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => handleChangeLanguage(lang.id)}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                    selectedLanguage === lang.id
                      ? 'bg-blue-600 text-white'
                      : unlockedLanguages.has(lang.id)
                      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  style={selectedLanguage === lang.id ? { backgroundColor: lang.color } : undefined}
                  disabled={!unlockedLanguages.has(lang.id)}
                >
                  {lang.native_name}
                  {!unlockedLanguages.has(lang.id) && ' 🔒'}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Puzzle Display */}
        <PuzzleDisplay
          puzzle={currentPuzzle}
          language={languages.find(l => l.id === currentPuzzle.language_id)}
          hints={hintsUsed > 0 ? currentPuzzle.hints.slice(0, hintsUsed) : []}
          completed={completedPuzzles.has(currentPuzzleId)}
        />

        {/* Answer Input */}
        {!completedPuzzles.has(currentPuzzleId) && (
          <Card>
            <CardHeader>
              <CardTitle>Your Answer</CardTitle>
              <CardDescription>Attempts: {attempts}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Input
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                placeholder="Enter your answer..."
                onKeyPress={e => e.key === 'Enter' && handleSubmitAnswer()}
              />
              <Button onClick={handleSubmitAnswer}>Submit</Button>
              {hintsUsed < currentPuzzle.hints.length && (
                <Button
                  variant="outline"
                  onClick={handleGetHint}
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  Hint
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* AI Explanation */}
        {showExplanation && (
          <AIExplainer
            puzzleType={currentPuzzle.type}
            question={currentPuzzle.question}
            answer={currentPuzzle.answer}
            language={languages.find(l => l.id === currentPuzzle.language_id)?.name}
            difficulty={currentPuzzle.difficulty}
          />
        )}
      </div>

      {/* Sidebar */}
      <div className="flex flex-col gap-4 overflow-auto">
        {/* Dex */}
        <DexDisplay
          languages={languages}
          unlockedLanguages={unlockedLanguages}
          completedCount={completedPuzzles.size}
          totalCount={puzzles.length}
        />

        {/* Score Board */}
        <ScoreBoard
          totalScore={completedPuzzles.size * 100}
          level={Math.floor(completedPuzzles.size / 2) + 1}
          completedPuzzles={completedPuzzles.size}
          totalPuzzles={puzzles.length}
        />

        {/* Puzzle List */}
        <Card className="flex-1 overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Puzzles</CardTitle>
          </CardHeader>
          <CardContent className="overflow-auto h-full">
            <div className="space-y-2">
              {languagePuzzles.map(puzzle => (
                <button
                  key={puzzle.id}
                  onClick={() => handleSelectPuzzle(puzzle.id)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    currentPuzzleId === puzzle.id
                      ? 'bg-blue-500 text-white'
                      : completedPuzzles.has(puzzle.id)
                      ? 'bg-green-100 text-green-900'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Puzzle {puzzle.id}</span>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        puzzle.difficulty >= 4 ? 'bg-red-200' : puzzle.difficulty === 3 ? 'bg-orange-200' : 'bg-blue-200'
                      }`}
                    >
                      Lvl {puzzle.difficulty}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
