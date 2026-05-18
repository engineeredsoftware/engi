/**
 * @bitcode/supabase - Supabase client wrapper
 * 
 * Provides a singleton Supabase client for the Bitcode system
 */

import { createClient } from '@supabase/supabase-js';

const allowLocalFallback =
  process.env.NODE_ENV !== 'production' ||
  process.env.CI === 'true' ||
  process.env.NEXT_PHASE === 'phase-production-build';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  (allowLocalFallback ? 'http://localhost:54321' : '');
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  (allowLocalFallback ? 'local-anon-key' : '');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase public client environment. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.',
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
