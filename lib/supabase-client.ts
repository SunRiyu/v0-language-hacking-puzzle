import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// エラーを throw せず、利用可能かどうかをエクスポートする
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl!, supabaseAnonKey!) 
  : null;

// User management
export const createUserProfile = async (userId: string, username: string, displayName: string) => {
  const { data, error } = await supabase
    .from('users')
    .insert({
      id: userId,
      username,
      display_name: displayName,
    })
    .select()
    .single();

  return { data, error };
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  return { data, error };
};

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  return { data, error };
};

// Progress tracking
export const savePuzzleProgress = async (
  userId: string,
  puzzleId: number,
  attempts: number,
  correct: boolean,
  hintsUsed: number,
  timeSpentSeconds: number
) => {
  if (!supabase) {
    console.warn("Supabase is not configured. Skipping savePuzzleProgress.");
    return { data: null, error: null };
  }

  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      puzzle_id: puzzleId,
      attempts,
      correct,
      hints_used: hintsUsed,
      time_spent_seconds: timeSpentSeconds,
      completed_at: correct ? new Date().toISOString() : null,
    }, { onConflict: 'user_id,puzzle_id' })
    .select()
    .single();

  return { data, error };
};

export const getUserProgress = async (userId: string) => {
  if (!supabase) {
    console.warn("Supabase is not configured. Returning empty progress.");
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);

  return { data, error };
};

// Score management
export const saveScore = async (
  userId: string,
  puzzleId: number,
  score: number
) => {
  if (!supabase) {
    console.warn("Supabase is not configured. Skipping saveScore.");
    return { data: null, error: null };
  }

  const { data, error } = await supabase
    .from('user_scores')
    .upsert({
      user_id: userId,
      puzzle_id: puzzleId,
      score,
      completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,puzzle_id' })
    .select()
    .single();

  return { data, error };
};

export const getUserScores = async (userId: string) => {
  if (!supabase) {
    console.warn("Supabase is not configured. Returning empty scores.");
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from('user_scores')
    .select('*')
    .eq('user_id', userId);

  return { data, error };
};

// Puzzle unlock management
export const unlockLanguage = async (userId: string, languageId: string) => {
  if (!supabase) {
    console.warn("Supabase is not configured. Skipping unlockLanguage.");
    return { data: null, error: null };
  }

  const { data, error } = await supabase
    .from('puzzle_unlocks')
    .upsert({
      user_id: userId,
      language_id: languageId,
      unlocked_at: new Date().toISOString(),
    }, { onConflict: 'user_id,language_id' })
    .select()
    .single();

  return { data, error };
};

export const getUnlockedLanguages = async (userId: string) => {
  if (!supabase) {
    console.warn("Supabase is not configured. Returning empty unlocked languages.");
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from('puzzle_unlocks')
    .select('language_id')
    .eq('user_id', userId);

  return { data, error };
};

// Game session tracking
export const createGameSession = async (
  userId: string,
  puzzleId: number,
  answer: string,
  isCorrect: boolean
) => {
  const { data, error } = await supabase
    .from('game_sessions')
    .insert({
      user_id: userId,
      puzzle_id: puzzleId,
      answer,
      is_correct: isCorrect,
      ended_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data, error };
};

// Achievement tracking
export const unlockAchievement = async (userId: string, achievementId: string) => {
  const { data, error } = await supabase
    .from('user_achievements')
    .upsert({
      user_id: userId,
      achievement_id: achievementId,
      unlocked_at: new Date().toISOString(),
    }, { onConflict: 'user_id,achievement_id' })
    .select()
    .single();

  return { data, error };
};

export const getUserAchievements = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_achievements')
    .select('achievement_id')
    .eq('user_id', userId);

  return { data, error };
};
