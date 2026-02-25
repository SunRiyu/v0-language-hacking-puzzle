import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('[v0] Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const setupDatabase = async () => {
  try {
    console.log('[v0] Starting database setup...');

    // Create users table
    console.log('[v0] Creating users table...');
    let { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.users (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          username TEXT UNIQUE NOT NULL,
          display_name TEXT,
          avatar_url TEXT,
          total_score INTEGER DEFAULT 0,
          level INTEGER DEFAULT 1,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });
    if (error) {
      console.log('[v0] users table: ', error?.message || 'table may already exist');
    } else {
      console.log('[v0] ✓ users table created');
    }

    // Create user_progress table
    console.log('[v0] Creating user_progress table...');
    ({ error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.user_progress (
          id BIGSERIAL PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
          puzzle_id INTEGER NOT NULL,
          attempts INTEGER DEFAULT 0,
          correct BOOLEAN DEFAULT FALSE,
          hints_used INTEGER DEFAULT 0,
          time_spent_seconds INTEGER DEFAULT 0,
          completed_at TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, puzzle_id)
        );
      `
    }));
    if (error) {
      console.log('[v0] user_progress table: ', error?.message || 'table may already exist');
    } else {
      console.log('[v0] ✓ user_progress table created');
    }

    // Create user_scores table
    console.log('[v0] Creating user_scores table...');
    ({ error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.user_scores (
          id BIGSERIAL PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
          puzzle_id INTEGER NOT NULL,
          score INTEGER DEFAULT 0,
          completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, puzzle_id)
        );
      `
    }));
    if (error) {
      console.log('[v0] user_scores table: ', error?.message || 'table may already exist');
    } else {
      console.log('[v0] ✓ user_scores table created');
    }

    // Create puzzle_unlocks table
    console.log('[v0] Creating puzzle_unlocks table...');
    ({ error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.puzzle_unlocks (
          id BIGSERIAL PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
          language_id TEXT NOT NULL,
          unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, language_id)
        );
      `
    }));
    if (error) {
      console.log('[v0] puzzle_unlocks table: ', error?.message || 'table may already exist');
    } else {
      console.log('[v0] ✓ puzzle_unlocks table created');
    }

    // Create game_sessions table
    console.log('[v0] Creating game_sessions table...');
    ({ error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.game_sessions (
          id BIGSERIAL PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
          puzzle_id INTEGER NOT NULL,
          started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          ended_at TIMESTAMP WITH TIME ZONE,
          answer TEXT,
          is_correct BOOLEAN DEFAULT FALSE
        );
      `
    }));
    if (error) {
      console.log('[v0] game_sessions table: ', error?.message || 'table may already exist');
    } else {
      console.log('[v0] ✓ game_sessions table created');
    }

    // Create user_achievements table
    console.log('[v0] Creating user_achievements table...');
    ({ error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.user_achievements (
          id BIGSERIAL PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
          achievement_id TEXT NOT NULL,
          unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, achievement_id)
        );
      `
    }));
    if (error) {
      console.log('[v0] user_achievements table: ', error?.message || 'table may already exist');
    } else {
      console.log('[v0] ✓ user_achievements table created');
    }

    console.log('[v0] Database setup completed!');
  } catch (error) {
    console.error('[v0] Database setup failed:', error);
    process.exit(1);
  }
};

setupDatabase();
