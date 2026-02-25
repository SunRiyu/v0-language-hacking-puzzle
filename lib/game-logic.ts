export interface Puzzle {
  id: number;
  type: 'translation' | 'decipherment' | 'grammar' | 'quotation';
  difficulty: 1 | 2 | 3 | 4 | 5;
  language_id: string;
  question: string;
  answer: string;
  hints: string[];
  explanation: string;
  is_locked: boolean;
}

export interface Language {
  id: string;
  name: string;
  description: string;
  native_name: string;
  icon: string;
  color: string;
  puzzles_count: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
}

export interface UserProgress {
  puzzle_id: number;
  attempts: number;
  correct: boolean;
  hints_used: number;
  time_spent_seconds: number;
  completed_at?: string;
}

export interface GameSession {
  puzzle_id: number;
  answer: string;
  is_correct: boolean;
  attempts: number;
  hints_used: number;
  time_spent_seconds: number;
  score: number;
}

// Calculate score based on difficulty, attempts, and hints used
export const calculateScore = (
  difficulty: number,
  attempts: number,
  hintsUsed: number,
  timeSeconds: number
): number => {
  const baseScore = difficulty * 100;
  const attemptPenalty = Math.max(0, (attempts - 1) * 10);
  const hintPenalty = hintsUsed * 15;
  const timeBonusCap = Math.min(100, Math.max(0, 300 - timeSeconds) / 3); // Max 100 bonus for solving in <5 mins
  
  return Math.max(10, baseScore - attemptPenalty - hintPenalty + timeBonusCap);
};

// Check if answer is correct (case-insensitive, trim whitespace)
export const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
  return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
};

// Calculate total score across all completed puzzles
export const calculateTotalScore = (progressMap: Record<number, UserProgress>): number => {
  let total = 0;
  for (const progress of Object.values(progressMap)) {
    if (progress.correct) {
      // Re-calculate score from stored progress data
      // This is simplified; in practice you'd store scores separately
      total += 50 * Math.ceil(5 / Math.max(1, progress.attempts));
    }
  }
  return total;
};

// Get unlocked languages based on completed puzzles
export const getUnlockedLanguages = (
  progressMap: Record<number, UserProgress>,
  puzzles: Puzzle[]
): string[] => {
  const unlockedLanguages = new Set<string>();
  
  for (const puzzle of puzzles) {
    const progress = progressMap[puzzle.id];
    if (progress?.correct) {
      unlockedLanguages.add(puzzle.language_id);
    }
  }
  
  return Array.from(unlockedLanguages);
};

// Get user level based on total score
export const calculateLevel = (totalScore: number): number => {
  return Math.floor(totalScore / 500) + 1;
};

// Check if puzzle should be unlocked (based on progression)
export const shouldUnlockPuzzle = (
  puzzleId: number,
  puzzles: Puzzle[],
  progressMap: Record<number, UserProgress>
): boolean => {
  const puzzle = puzzles.find(p => p.id === puzzleId);
  if (!puzzle) return false;
  if (!puzzle.is_locked) return true; // Tutorial puzzles are always unlocked
  
  // Check if user has completed at least one puzzle of lower difficulty
  const lowerDifficultyCompleted = puzzles
    .filter(p => p.language_id === puzzle.language_id && p.difficulty < puzzle.difficulty)
    .some(p => progressMap[p.id]?.correct);
  
  return lowerDifficultyCompleted;
};

// Get achievement unlock status
export const checkAchievementUnlock = (
  achievement: Achievement,
  progressMap: Record<number, UserProgress>,
  totalScore: number,
  puzzles: Puzzle[]
): boolean => {
  switch (achievement.id) {
    case 'first_solve':
      return Object.values(progressMap).some(p => p.correct);
    case 'score_100':
      return totalScore >= 100;
    case 'score_500':
      return totalScore >= 500;
    case 'all_difficulties':
      return [1, 2, 3, 4, 5].every(diff =>
        puzzles.some(p => p.difficulty === diff && progressMap[p.id]?.correct)
      );
    case 'speed_master':
      return Object.values(progressMap).some(p => p.correct && p.time_spent_seconds < 60);
    case 'linguist':
      const unlockedLanguages = new Set(
        puzzles
          .filter(p => progressMap[p.id]?.correct)
          .map(p => p.language_id)
      );
      return unlockedLanguages.size >= 3;
    default:
      return false;
  }
};
