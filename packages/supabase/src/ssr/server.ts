"use server";

/**
 * Server-side Supabase client helper for Next.js (Edge / Node).
 *
 * Ported from `uapi/utils/supabase/server.ts` to make it available outside the
 * uapi application.
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Creates a server-side Supabase client wired up to the Next.js cookies system
 * for seamless auth session management.
 */
export async function createClient() {
  const cookieStore = cookies();

  const publicKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !publicKey) {
    throw new Error('Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) are missing');
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    publicKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    },
  );
}
