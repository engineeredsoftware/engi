import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { supabaseAdmin } from '@engi/supabase';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from "@engi/responses";
import { ENABLE_MOCKS, MOCK_USER_ORBITAL } from '@/config/featureFlags';
import userCreditsMock from '@/mocks/user-credits.json';
import { log } from '@engi/logger';
import * as crypto from 'crypto';
import type { NextRequest } from 'next/server';

/**
 * POST /api/user/credits
 * Updates the user's credit balance for the authenticated user.
 */
const POSTHandler = async function POST(request: NextRequest) {
  // Return mock if enabled
  if (ENABLE_MOCKS && MOCK_USER_ORBITAL) {
    return createJsonResponse({ success: true, newBalance: userCreditsMock.credits, transactionId: 'mock-123' });
  }
  const requestId = crypto.randomUUID();
  const requestUrl = request.nextUrl?.href ?? '[unknown]';
  log('[route /user/credits POST] Request started', 'info', { requestId, url: requestUrl });
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    log('[route /user/credits POST] Authentication failed', 'warn', { requestId, error: authError });
    return createAuthErrorResponse();
  }
  log('[route /user/credits POST] Authentication successful', 'info', { requestId, userId: user.id });

  /* ------------------------------------------------------------------
   * Role-based access control – only `admin` users are permitted to adjust
   * credit balances.  Fetch the user profile (service role context) and
   * verify the stored `role` column before proceeding.  Any non-admin user
   * receives a 403 Forbidden response.  This is an additional safeguard on
   * top of the client-side UI gating to ensure the invariant is enforced at
   * the API boundary.
   * ------------------------------------------------------------------ */
  try {
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) {
      log('[route /user/credits POST] Failed to fetch user profile', 'error', {
        requestId,
        error: profileError,
      });
      return createErrorResponse(profileError);
    }

    if (!profile || profile.role !== 'admin') {
      // Non-admin attempting to purchase / adjust credits
      log('[route /user/credits POST] Forbidden – user lacks admin role', 'warn', {
        requestId,
        userRole: profile?.role,
      });
      return new Response('Forbidden', { status: 403 });
    }
  } catch (err) {
    log('[route /user/credits POST] Unhandled profile fetch error', 'error', {
      requestId,
      error: err,
    });
    return createErrorResponse(err);
  }
  let body: any;
  try {
    body = await request.json();
    // Parsed request body
  } catch {
    log('[route /user/credits POST] Invalid JSON body', 'error', { requestId });
    return new Response('Invalid JSON', { status: 400 });
  }
  const totalCredits = body.totalCredits;
  log('[route /user/credits POST] Parsed payload summary', 'debug', { requestId, totalCredits });
  if (typeof totalCredits !== 'number') {
    return createJsonResponse({ error: 'totalCredits is required' }, 400);
  }
  try {
    log('[route /user/credits POST] Upserting credits', 'info', { requestId, userId: user.id, totalCredits });
    const record = {
      user_id: user.id,
      balance: totalCredits,
      updated_at: new Date().toISOString()
    };
    const { data, error } = await supabaseAdmin
      .from('user_credits')
      .upsert(record, { onConflict: 'user_id' })
      .select()
      .single();
    if (error) {
      log('[route /user/credits POST] Error upserting credits', 'error', { requestId, error });
      return createErrorResponse(error);
    }
    log('[route /user/credits POST] Credits upserted successfully', 'info', { requestId, transactionId: data.id, newBalance: data.balance });
    // Update onboarding step to mark 'credits' as complete
    // Update onboarding state
    try {
      const { data: profile } = await supabaseAdmin
        .from('user_profiles')
        .select('onboarded_steps')
        .eq('id', user.id)
        .single();
      
      let onboardedSteps = ['models'];
      if (profile?.onboarded_steps) {
        try {
          const parsed = JSON.parse(profile.onboarded_steps);
          if (Array.isArray(parsed)) {
            onboardedSteps = parsed;
          }
        } catch {
          onboardedSteps = ['models'];
        }
      }
      
      if (!onboardedSteps.includes('credits')) {
        onboardedSteps.push('credits');
        await supabaseAdmin
          .from('user_profiles')
          .update({ 
            onboarded_steps: JSON.stringify(onboardedSteps),
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
      }
    } catch (flagErr) {
      log('[route /user/credits POST] Failed to update onboarding', 'error', { requestId, error: flagErr });
    }
    return createJsonResponse({ success: true, transactionId: data.id, newBalance: data.balance });
  } catch (err) {
    // Log any unhandled errors from the upsert operation
    log('[route /user/credits POST] Unhandled error', 'error', { requestId, error: err });
    return createErrorResponse(err);
  }
}

export const POST = traceRoute('/user/credits', POSTHandler);
