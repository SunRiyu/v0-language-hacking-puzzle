import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const initializeDatabase = async () => {
  try {
    console.log('[v0] Starting database initialization...');

    // Create users table
    const { error: usersError } = await supabase.from('users').select('count', { count: 'exact' });
    if (usersError && usersError.code === 'PGRST116') {
      console.log('[v0] Creating users table...');
      const { error } = await supabase.rpc('exec', {
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
      if (error) console.error('[v0] Error creating users table:', error);
    }

    console.log('[v0] Database initialization completed');
  } catch (error) {
    console.error('[v0] Database initialization failed:', error);
    process.exit(1);
  }
};

initializeDatabase();
