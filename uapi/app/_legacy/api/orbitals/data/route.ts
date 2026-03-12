import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from "@engi/responses";
import { ENABLE_MOCKS, MOCK_USER_ORBITAL, MOCK_USER_ORBITAL_SCENARIO } from '@/config/featureFlags';
import userDataDefaultMock from '@/mocks/user-data-default.json';
import userDataEmptyMock from '@/mocks/user-data-empty.json';
import { log } from '@engi/logger';
import * as crypto from 'crypto';
import { VCSProviderFactory, VCSConnectionManager } from '@engi/vcs';
import type { NextRequest } from 'next/server';

// Uses `request.url` for logging, so force dynamic execution to avoid the
// static-generation bailout during `next build`.
export const dynamic = 'force-dynamic';

/**
 * GET /api/user/data
 * Retrieves aggregated user data: profile, GitHub connection, credits, and model preferences.
 */
const GETHandler = async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const requestUrl = request.nextUrl?.href ?? '[unknown]';
  // Return mock data if enabled
  if (ENABLE_MOCKS && MOCK_USER_ORBITAL) {
    switch (MOCK_USER_ORBITAL_SCENARIO) {
      case 'empty':
        return createJsonResponse(userDataEmptyMock);
      case 'error':
        return createErrorResponse(new Error('Mock user data error'), 500);
      default:
        return createJsonResponse(userDataDefaultMock);
    }
  }
  try {
    log('[route /user/data GET] Request started', 'info', { requestId, url: requestUrl });
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      log('[route /user/data GET] Authentication failed', 'warn', { requestId, error: authError });
      return createAuthErrorResponse();
    }
    log('[route /user/data GET] Authentication successful', 'info', { requestId, userId: user.id });
    const emailVerified = Boolean((user as any).confirmed_at || (user as any).email_confirmed || false);

    try {
    // Fetch profile via the authenticated client so RLS (`auth.uid() = user_id`) passes.
    log('[route /user/data GET] Fetching user profile', 'info', { requestId, userId: user.id });
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    /*
     * Gracefully handle RLS recursion errors (42P17) that can occur if a broken
     * policy exists in the Supabase instance.  Treat the profile as
     * unavailable rather than failing the entire request so that callers can
     * still receive credits and connection information which are unaffected.
     */
    if (profileError) {
      const benignCodes = ['PGRST116', '42P17']; // no row | recursion in policy
      if (!benignCodes.includes(profileError.code)) {
        log('[route /user/data GET] Error fetching profile', 'error', { requestId, error: profileError });
        return createErrorResponse(profileError);
      }
    }
    
    const username = profile?.username;
    const displayName = profile?.display_name;
    const teamMembersCount = Array.isArray(profile?.team_members) ? profile.team_members.length : 0;
    log('[route /user/data GET] Retrieved user profile summary', 'debug', { requestId, userId: user.id, username, displayName, teamMembersCount, emailVerified });
    // Fetch VCS connections
    log('[route /user/data GET] Fetching VCS connections', 'info', { requestId, userId: user.id });
    const { data: vcsConnections, error: connectionError } = await supabase
      .from('user_connections')
      .select('*')
      .eq('user_id', user.id);
    if (connectionError) {
      log('[route /user/data GET] Error fetching VCS connections', 'error', { requestId, error: connectionError });
      return createErrorResponse(connectionError);
    }
    
    log('[route /user/data GET] Retrieved VCS connections', 'debug', { 
      requestId, 
      userId: user.id, 
      connectionCount: vcsConnections?.length ?? 0
    });
    // Fetch credits
    log('[route /user/data GET] Fetching user credits', 'info', { requestId, userId: user.id });
    const { data: creditsData, error: creditsError } = await supabase
      .from('user_credits')
      .select('balance')
      .eq('user_id', user.id)
      .single();
    if (creditsError && creditsError.code !== 'PGRST116') {
      log('[route /user/data GET] Error fetching credits', 'error', { requestId, error: creditsError });
      return createErrorResponse(creditsError);
    }
    const credits = creditsData?.balance ?? 0;
    log('[route /user/data GET] Retrieved user credits', 'debug', { requestId, userId: user.id, credits });
    // Fetch model preferences
    log('[route /user/data GET] Fetching model preferences', 'info', { requestId, userId: user.id });
    const { data: prefData, error: prefError } = await supabase
      .from('user_model_preferences')
      .select('*')
      .eq('user_id', user.id);
    if (prefError && prefError.code !== 'PGRST116') {
      log('[route /user/data GET] Error fetching model preferences', 'error', { requestId, error: prefError });
      return createErrorResponse(prefError);
    }
    // The table stores multiple preferences, so we return the array
    const modelPreferences = prefData ?? null;
    const modelPreferencesCount = Array.isArray(modelPreferences)
      ? modelPreferences.length
      : (modelPreferences && typeof modelPreferences === 'object')
        ? Object.keys(modelPreferences).length
        : 0;
    log('[route /user/data GET] Retrieved model preferences summary', 'debug', { requestId, userId: user.id, modelPreferencesCount });
    // Merge authenticated user's email into profile data for UI
    // If no profile exists, create a basic one for the user
    let finalProfile = profile;
    if (!profile) {
      // Create a basic profile with just the id
      const { data: newProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (!createError && newProfile) {
        finalProfile = newProfile;
        log('[route /user/data GET] Created initial profile for user', 'info', { requestId, userId: user.id });
      }
    }
    
    // Determine the authentication provider after we have the profile
    const authProvider: string | null = (finalProfile as any)?.auth_provider
      ?? ((user as any).app_metadata?.provider ?? null);
    
    // Parse onboarded_steps
    let onboardedSteps = ['models']; // Default with models pre-populated
    if (finalProfile?.onboarded_steps) {
      try {
        const parsed = JSON.parse(finalProfile.onboarded_steps);
        if (Array.isArray(parsed)) {
          onboardedSteps = parsed;
        }
      } catch {
        onboardedSteps = ['models'];
      }
    }
    
    const responseData = {
      profile: finalProfile
        ? { ...finalProfile, email: user.email, is_verified: emailVerified, provider: authProvider }
        : { email: user.email, is_verified: emailVerified, provider: authProvider },
      vcsConnections: vcsConnections ?? [],
      credits,
      modelPreferences,
      onboarded_steps: onboardedSteps,
      isOnboardingComplete: onboardedSteps.length === 4
    };
    log('[route /user/data GET] Responding with user data summary', 'info', { 
      requestId, 
      userId: user.id, 
      username, 
      emailVerified, 
      hasProfile: !!profile, 
      vcsConnectionCount: vcsConnections?.length ?? 0,
      credits, 
      modelPreferencesCount, 
      teamMembersCount 
    });
    return createJsonResponse(responseData);
    } catch (err) {
      // Log any unhandled errors in data fetch
      log('[route /user/data GET] Unhandled error', 'error', { requestId, error: err });
      return createErrorResponse(err);
    }
  } catch (err) {
    // Log any unhandled errors
    log('[route /user/data GET] Unhandled error', 'error', { requestId, error: err });
    return createErrorResponse(err);
  }
}

export const GET = traceRoute('/user/data', GETHandler);
