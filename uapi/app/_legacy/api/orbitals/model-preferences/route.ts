import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { supabaseAdmin } from '@engi/supabase';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from "@engi/responses";
import { ENABLE_MOCKS, MOCK_USER_ORBITAL } from '@/config/featureFlags';
import userModelPreferencesMock from '@/mocks/user-model-preferences.json';
import { log } from '@engi/logger';
import * as crypto from 'crypto';
import type { NextRequest } from 'next/server';

/**
 * POST /api/user/model-preferences
 * Stores or updates the user's model preference configuration.
 */
const POSTHandler = async function POST(request: NextRequest) {
  // Return mock if enabled
  if (ENABLE_MOCKS && MOCK_USER_ORBITAL) {
    return createJsonResponse({ success: true, preferences: userModelPreferencesMock.modelPreferences });
  }
  try {
    const requestId = crypto.randomUUID();
    const requestUrl = request.nextUrl?.href ?? '[unknown]';
    log('[route /user/model-preferences POST] Request started', 'info', { requestId, url: requestUrl });
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      log('[route /user/model-preferences POST] Authentication failed', 'warn', { requestId, error: authError });
      return createAuthErrorResponse();
    }
    log('[route /user/model-preferences POST] Authentication successful', 'info', { requestId, userId: user.id });

    /* --------------------------------------------------------------
     * RBAC: Only users with the `lead` (or `admin`) role may update
     * model preferences / system prompt defaults.  Validate against the
     * `user_profiles.role` column using the privileged service role
     * client.  Deny the request with 403 for all others.
     * -------------------------------------------------------------- */
    try {
      const { data: profile, error: profileError } = await supabaseAdmin
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        log('[route /user/model-preferences POST] Failed to fetch user profile', 'error', {
          requestId,
          error: profileError,
        });
        return createErrorResponse(profileError);
      }

      if (!profile || (profile.role !== 'lead' && profile.role !== 'admin')) {
        log('[route /user/model-preferences POST] Forbidden – user lacks lead/admin role', 'warn', {
          requestId,
          userRole: profile?.role,
        });
        return new Response('Forbidden', { status: 403 });
      }
    } catch (err) {
      log('[route /user/model-preferences POST] Unhandled profile fetch error', 'error', {
        requestId,
        error: err,
      });
      return createErrorResponse(err);
    }
    let body: any;
    try {
      body = await request.json();
    } catch {
      log('[route /user/model-preferences POST] Invalid JSON body', 'error', { requestId });
      return new Response('Invalid JSON', { status: 400 });
    }
    try {
    // Log upsert of model preferences without dumping entire preferences object
    const modelCallsCount = Array.isArray(body.modelCalls) ? body.modelCalls.length : 0;
    log('[route /user/model-preferences POST] Upserting model preferences', 'info', { requestId, userId: user.id, modelCallsCount });
      const record = {
        user_id: user.id,
        preferences: body,
        updated_at: new Date().toISOString()
      };
      const { error } = await supabaseAdmin
        .from('user_model_preferences')
        .upsert(record, { onConflict: 'user_id' });
      if (error) {
        log('[route /user/model-preferences POST] Error upserting preferences', 'error', { requestId, error });
        return createErrorResponse(error);
      }
      log('[route /user/model-preferences POST] Preferences upserted successfully', 'info', { requestId, userId: user.id });
      // Update onboarding step to mark 'models' as complete
      // Models already pre-populated in onboarded_steps, no update needed
      return createJsonResponse({ success: true });
    } catch (err) {
      return createErrorResponse(err);
    }
  } catch (err) {
    log('[route /user/model-preferences POST] Unhandled error', 'error', { error: err });
    return createErrorResponse(err);
  }
}

/**
 * GET /api/user/model-preferences
 * Returns the stored model preference configuration for the authenticated user.
 * This mirrors the logic used inside the aggregated `/api/user/data` endpoint but scoped
 * to the model preferences payload only, making it easier for clients that solely need
 * the `Models` table data (for instance the Models picker tab in the Account view).
 */
const GETHandler = async function GET(request: Request) {
  // Mock handling – keep behaviour identical to POST handler when mocks enabled
  if (ENABLE_MOCKS && MOCK_USER_ORBITAL) {
    return createJsonResponse({
      success: true,
      preferences: userModelPreferencesMock.modelPreferences,
    });
  }

  const requestId = crypto.randomUUID();
  log('[route /user/model-preferences GET] Request started', 'info', {
    requestId,
    url: request.url,
  });

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      log('[route /user/model-preferences GET] Authentication failed', 'warn', {
        requestId,
        error: authError,
      });
      return createAuthErrorResponse();
    }

    log('[route /user/model-preferences GET] Authentication successful', 'info', {
      requestId,
      userId: user.id,
    });

    const { data, error } = await supabaseAdmin
      .from('user_model_preferences')
      .select('preferences')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      // Unexpected DB error – propagate
      log('[route /user/model-preferences GET] Error fetching preferences', 'error', {
        requestId,
        error,
      });
      return createErrorResponse(error);
    }

    const preferences = data?.preferences ?? null;

    log('[route /user/model-preferences GET] Returning preferences', 'info', {
      requestId,
      hasPreferences: !!preferences,
    });

    return createJsonResponse({ success: true, preferences });
  } catch (err) {
    log('[route /user/model-preferences GET] Unhandled error', 'error', {
      error: err,
    });
    return createErrorResponse(err);
  }
}

export const POST = traceRoute('/user/model-preferences', POSTHandler);
export const GET = traceRoute('/user/model-preferences', GETHandler);
