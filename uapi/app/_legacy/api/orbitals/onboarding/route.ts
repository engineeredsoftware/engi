import { createClient } from '@engi/supabase/ssr/server';
import { supabaseAdmin } from '@engi/supabase';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from "@engi/responses";
import { log } from '@engi/logger';
import * as crypto from 'crypto';

const ONBOARDING_STEPS = ['profile', 'connects', 'models', 'credits'] as const;
type OnboardingStep = typeof ONBOARDING_STEPS[number];

/**
 * GET /api/user/onboarding
 * Gets the current onboarding status for the authenticated user
 */
export async function GET(request: Request) {
  const requestId = crypto.randomUUID();
  log('[route /user/onboarding GET] Request started', 'info', { requestId });

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    log('[route /user/onboarding GET] Authentication failed', 'warn', { requestId, error: authError });
    return createAuthErrorResponse();
  }

  try {
    const { data: profile, error } = await supabaseAdmin
      .from('user_profiles')
      .select('onboarded_steps')
      .eq('id', user.id)
      .single();

    if (error) {
      log('[route /user/onboarding GET] Error fetching onboarding status', 'error', { requestId, error });
      return createErrorResponse(error);
    }

    // Parse onboarded_steps array (defaults to ['models'] for new users)
    let onboardedSteps: OnboardingStep[] = ['models'];
    if (profile?.onboarded_steps) {
      try {
        const parsed = JSON.parse(profile.onboarded_steps);
        if (Array.isArray(parsed)) {
          onboardedSteps = parsed.filter((step: any) => ONBOARDING_STEPS.includes(step));
        }
      } catch {
        // Fallback to default if parsing fails
        onboardedSteps = ['models'];
      }
    }

    // Simple completion check: all 4 steps present
    const isComplete = onboardedSteps.length === 4;
    
    // Determine current step based on what's NOT completed
    let currentStep: OnboardingStep | null = null;
    if (!isComplete) {
      if (!onboardedSteps.includes('profile')) currentStep = 'profile';
      else if (!onboardedSteps.includes('connects')) currentStep = 'connects';
      else if (!onboardedSteps.includes('credits')) currentStep = 'credits';
    }

    log('[route /user/onboarding GET] Onboarding status fetched', 'info', { 
      requestId, 
      userId: user.id, 
      isComplete,
      onboardedSteps 
    });

    return createJsonResponse({
      isOnboardingComplete: isComplete,
      completedSteps: onboardedSteps,
      currentStep
    });
  } catch (err) {
    log('[route /user/onboarding GET] Unhandled error', 'error', { requestId, error: err });
    return createErrorResponse(err);
  }
}

/**
 * POST /api/user/onboarding
 * Updates the onboarding status for the authenticated user
 */
export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  log('[route /user/onboarding POST] Request started', 'info', { requestId });

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    log('[route /user/onboarding POST] Authentication failed', 'warn', { requestId, error: authError });
    return createAuthErrorResponse();
  }

  let body: any;
  try {
    body = await request.json();
    log('[route /user/onboarding POST] Request body parsed', 'debug', { requestId, body });
  } catch {
    log('[route /user/onboarding POST] Invalid JSON body', 'error', { requestId });
    return new Response('Invalid JSON', { status: 400 });
  }

  try {
    const { completedStep } = body;
    
    // Get current onboarded steps
    const { data: currentProfile } = await supabaseAdmin
      .from('user_profiles')
      .select('onboarded_steps')
      .eq('id', user.id)
      .single();

    // Start with models pre-populated or existing steps
    let onboardedSteps: OnboardingStep[] = ['models'];
    if (currentProfile?.onboarded_steps) {
      try {
        const parsed = JSON.parse(currentProfile.onboarded_steps);
        if (Array.isArray(parsed)) {
          onboardedSteps = parsed.filter((step: any) => ONBOARDING_STEPS.includes(step));
        }
      } catch {
        onboardedSteps = ['models'];
      }
    }
    
    // Add the newly completed step if valid and not already present
    if (completedStep && ONBOARDING_STEPS.includes(completedStep) && !onboardedSteps.includes(completedStep)) {
      onboardedSteps.push(completedStep);
    }

    // Simple completion check: all 4 steps present
    const isComplete = onboardedSteps.length === 4;
    
    // Determine current step based on what's NOT completed
    let currentStep: OnboardingStep | null = null;
    if (!isComplete) {
      if (!onboardedSteps.includes('profile')) currentStep = 'profile';
      else if (!onboardedSteps.includes('connects')) currentStep = 'connects';
      else if (!onboardedSteps.includes('credits')) currentStep = 'credits';
    }

    // Update the profile with new onboarded_steps
    const { error: updateError } = await supabaseAdmin
      .from('user_profiles')
      .update({
        onboarded_steps: JSON.stringify(onboardedSteps),
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (updateError) {
      log('[route /user/onboarding POST] Error updating onboarding status', 'error', { 
        requestId, 
        error: updateError 
      });
      return createErrorResponse(updateError);
    }

    log('[route /user/onboarding POST] Onboarding status updated', 'info', { 
      requestId, 
      userId: user.id,
      onboardedSteps,
      isComplete 
    });

    return createJsonResponse({
      isOnboardingComplete: isComplete,
      completedSteps: onboardedSteps,
      currentStep
    });
  } catch (err) {
    log('[route /user/onboarding POST] Unhandled error', 'error', { requestId, error: err });
    return createErrorResponse(err);
  }
}