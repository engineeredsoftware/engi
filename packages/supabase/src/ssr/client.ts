/**
 * Thin helper around `@supabase/ssr` that can be imported from *any* Next.js
 * client component / browser code without having to know the implementation
 * details.  Mirrors the former `uapi/utils/supabase/client.ts` file.
 */

import { createBrowserClient } from '@supabase/ssr';

/**
 * Creates a browser-side Supabase client using the public credentials that are
 * exposed to the Next.js runtime via environment variables.
 */
export function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing');
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
