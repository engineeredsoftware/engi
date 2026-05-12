/**
 * Supabase utilities and thin MCP helpers.
 *
 * Consolidates the previous `uapi/lib/supabaseClient.ts` (client helpers) and
 * `uapi/lib/mcps/supabase.ts` (MCP tool implementations) into a single raw
 * package so that external code can simply depend on `@bitcode/supabase` for any
 * Supabase-related functionality.
 *
 * No behavioural changes – the code is moved verbatim except for import path
 * updates.
 */

import { createClient } from '@supabase/supabase-js';

// ---------------------------------------------------------------------------
// Centralised Supabase client helpers (formerly uapi/lib/supabaseClient.ts)
// ---------------------------------------------------------------------------

// Helper to strip out any stray unicode characters (e.g. smart quotes)
function sanitizeKey(key: string): string {
  return key.replace(/[\u0080-\uFFFF]/g, '');
}

// ---------------------------------------------------------------------------
// Public client (browser-side / client-side rendering)
// ---------------------------------------------------------------------------
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.SUPABASE_URL ??
  // Dummy value – prevents build-time crashes when env vars are missing
  'http://localhost:54321';

const _rawAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  process.env.SUPABASE_PUBLISHABLE_KEY ??
  // Dummy anon key – only used in non-production environments
  'local-anon-key';
const supabaseAnonKey = sanitizeKey(_rawAnonKey);

/** Supabase client for browser / authenticated client-side operations */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---------------------------------------------------------------------------
// Admin client (server-side with elevated privileges)
// ---------------------------------------------------------------------------
const _rawServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SECRET_KEY ??
  process.env.SUPABASE_ADMIN_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ??
  'local-service-role-key';
const supabaseServiceRoleKey = sanitizeKey(_rawServiceRoleKey);

/** Supabase admin client for server-side operations */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ---------------------------------------------------------------------------
// MCP helper utilities (formerly uapi/lib/mcps/supabase.ts)
// ---------------------------------------------------------------------------

export async function supabaseMcpTool(params: { userId: string; query?: string; count?: number }): Promise<any[]> {
  const { userId, query = '', count = 5 } = params;
  const { data, error } = await supabaseAdmin.rpc('match_mcp_templates', {
    user_id: userId,
    query_text: query,
    match_count: count,
  });
  if (error) throw error;
  return data || [];
}

export async function supabaseQueryTool(params: { query: string }): Promise<any> {
  return { rows: [], query: params.query };
}

export async function supabaseInsertTool(params: { table: string; values: any }): Promise<any> {
  return { inserted: 1 };
}

export async function supabaseUpdateTool(params: { table: string; updates: any; match: any }): Promise<any> {
  return { updated: 1 };
}

export async function supabaseDeleteTool(params: { table: string; match: any }): Promise<any> {
  return { deleted: 1 };
}

// ---------------------------------------------------------------------------
// SSR helpers re-exported for convenience
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// SSR helpers – exported via dedicated sub-paths
// ---------------------------------------------------------------------------
//
// Export the browser-side helper directly as it is safe to use in both client
// and server environments.  Server-specific utilities, however, rely on
// `next/headers` which *must* only be imported within Server Components or
// route handlers.  Re-exporting them from the top-level module causes Next.js
// to include them in client bundles, leading to build-time errors like:
//   "You're importing a component that needs next/headers …"
//
// To avoid this, consumers should import the server helpers explicitly from
// the corresponding sub-path:
//   import { createClient } from '@bitcode/supabase/ssr/server';
//   import { updateSession } from '@bitcode/supabase/ssr/middleware';
//
// This keeps the public API clear while preventing accidental client-side
// inclusion of server-only code.

export { createClient as createBrowserClient } from './ssr/client';
// Stable browser-client alias used by package callers.
export { createClient as createClient } from './ssr/client';

// ---------------------------------------------------------------------------
// Re-export typed entities so downstream packages can use storage-edge
// AssetPack evidence contracts without importing schema internals.
// ---------------------------------------------------------------------------

export * from './asset-pack-evidence';

// Streams helpers
export { SupabaseStream, flushAndExit } from './streams';

// NOTE:  Deliberately *not* re-exporting `createServerClient` or
// `supabaseMiddleware` here – import them from their dedicated files instead.
