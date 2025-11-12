"use server";

/**
 * Server-side Supabase client helper for the *admin* application.
 *
 * This is identical to the generic `createClient` helper except that it uses a
 * cookie name prefix ("admin-") so that admin sessions do not collide with
 * regular user sessions when they are served from the same parent domain.
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export type CreateAdminClientOptions = {
  /** Optional prefix for the auth cookies. Defaults to "admin-". */
  cookiePrefix?: string;
};

export async function createClient(options: CreateAdminClientOptions = {}) {
  const { cookiePrefix = 'admin-' } = options;

  const cookieStore = cookies();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing');
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      // Prefix the storage key so multiple apps on the same domain do not
      // overwrite each other's sessions.
      cookieOptions: { name: `${cookiePrefix}sb` },
      cookies: {
        get(name: string) {
          // Try prefixed cookie first, then fallback to unprefixed (useful
          // during migrations).
          const pref = cookieStore.get(`${cookiePrefix}${name}`)?.value;
          if (pref !== undefined) return pref;
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name: `${cookiePrefix}${name}`, value, ...options });
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name: `${cookiePrefix}${name}`, value: '', ...options });
          cookieStore.set({ name, value: '', ...options });
        },
      },
    },
  );
}
