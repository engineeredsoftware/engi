import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { supabaseAdmin } from '@engi/supabase';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from "@engi/responses";
import { ENABLE_MOCKS, MOCK_USER_ORBITAL } from '@/config/featureFlags';
import userProfileMock from '@/mocks/user-profile.json';
import { log } from '@engi/logger';
import * as crypto from 'crypto';
import type { NextRequest } from 'next/server';

/**
 * GET /api/user/profile
 * Fetches the user profile for the authenticated user.
 */
 const GETHandler = async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const requestUrl = request.nextUrl?.href ?? '[unknown]';
  // Return mock data if enabled
  if (ENABLE_MOCKS && MOCK_USER_ORBITAL) {
    return createJsonResponse(userProfileMock);
  }
  log('[route /user/profile GET] Request started', 'info', { requestId, url: requestUrl });
  // Initialize Supabase auth client
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    log('[route /user/profile GET] Authentication failed', 'warn', { requestId, error: authError });
    return createAuthErrorResponse();
  }
  log('[route /user/profile GET] Authentication successful', 'info', { requestId, userId: user.id });
  try {
    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    if (error) {
      log('[route /user/profile GET] Error fetching profile', 'error', { requestId, error });
      return createErrorResponse(error);
    }
    log('[route /user/profile GET] Profile fetched', 'info', { requestId, userId: user.id, profile: data });
    return createJsonResponse(data);
  } catch (err) {
    // Log any unhandled errors
    log('[route /user/profile GET] Unhandled error', 'error', { requestId, error: err });
    return createErrorResponse(err);
  }
}

/**
 * POST /api/user/profile
 * Creates or updates the user profile for the authenticated user.
 */
 const POSTHandler = async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const requestUrl = request.nextUrl?.href ?? '[unknown]';
  // Return mock response if enabled
  if (ENABLE_MOCKS && MOCK_USER_ORBITAL) {
    return createJsonResponse({ success: true }, 201);
  }
  log('[route /user/profile POST] Request started', 'info', { requestId, url: requestUrl });
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    log('[route /user/profile POST] Authentication failed', 'warn', { requestId, error: authError });
    return createAuthErrorResponse();
  }
  log('[route /user/profile POST] Authentication successful', 'info', { requestId, userId: user.id });
  let body: any;
  try {
    body = await request.json();
    log('[route /user/profile POST] Request body parsed', 'debug', { requestId, body });
  } catch {
    log('[route /user/profile POST] Invalid JSON body', 'error', { requestId });
    return new Response('Invalid JSON', { status: 400 });
  }
  // Basic validation
  if (!body.username) {
    return createJsonResponse({ error: 'Username is required' }, 400);
  }
  try {
    log('[route /user/profile POST] Upserting profile', 'info', { requestId, userId: user.id });
    // Only allow non-privileged columns to be set by regular users.  Any
    // attempt to pass admin-level fields (role, is_admin, is_verified, etc.)
    // is silently ignored.
    const upsertData: Record<string, any> = {
      id: user.id,
      username: body.username,
      display_name: body.displayName,
      bio: body.bio,
      company_name: body.companyName,
      avatar_url: body.avatarUrl,
      team_members: body.teamMembers,
      updated_at: new Date().toISOString(),
    };
    // Legacy onboarding fields removed - handled by /api/user/onboarding
    const { error } = await supabaseAdmin
      .from('user_profiles')
      .upsert(upsertData, { onConflict: 'id' });
    if (error) {
      log('[route /user/profile POST] Error upserting profile', 'error', { requestId, error });
      return createErrorResponse(error);
    }
    log('[route /user/profile POST] Profile upserted successfully', 'info', { requestId, userId: user.id });
    return createJsonResponse({ success: true }, 201);
  } catch (err) {
    // Log any unhandled errors
    log('[route /user/profile POST] Unhandled error', 'error', { requestId, error: err });
    return createErrorResponse(err);
  }
}

export const GET = traceRoute('/user/profile', GETHandler);
export const POST = traceRoute('/user/profile', POSTHandler);
