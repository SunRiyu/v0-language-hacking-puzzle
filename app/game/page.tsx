'use client';

import { useEffect, useState } from 'react';
import { GameScreen } from '@/components/game-screen';
import { Puzzle, Language } from '@/lib/game-logic';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function GamePage() {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeGame = async () => {
      try {
        // Load game data
        const [puzzlesRes, languagesRes] = await Promise.all([
          fetch('/data/puzzles.json'),
          fetch('/data/languages.json'),
        ]);

        const puzzlesData = await puzzlesRes.json();
        const languagesData = await languagesRes.json();

        setPuzzles(puzzlesData);
        setLanguages(languagesData);

        // Set demo user ID (in real app, get from auth)
        setUserId('demo-user-' + Date.now());

        setLoading(false);
      } catch (error) {
        console.error('[v0] Error loading game data:', error);
        setLoading(false);
      }
    };

    initializeGame();
  }, []);

  const handlePuzzleComplete = async (
    puzzleId: number,
    correct: boolean,
    score: number
  ) => {
    console.log(`[v0] Puzzle ${puzzleId} completed: ${correct ? 'correct' : 'incorrect'}, score: ${score}`);

    if (!userId) return;

    try {
      // In a real app, save to database via API
      // For now, just log it
      console.log('[v0] Saving progress to database...');
    } catch (error) {
      console.error('[v0] Error saving progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Go-gen</h1>
          <p className="text-gray-600">ゲームを準備中...</p>
        </div>
      </div>
    );
  }

  return (
    <GameScreen
      userId={userId}
      puzzles={puzzles}
      languages={languages}
      onPuzzleComplete={handlePuzzleComplete}
    />
  );
}
