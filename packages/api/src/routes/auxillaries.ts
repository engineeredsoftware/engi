import { traceRoute } from '@bitcode/observability';
import { hydrateBitcodeProfile } from '@bitcode/orm/src/profile-contract';
import { createJsonResponse } from '@bitcode/responses';
import { supabaseAdmin } from '@bitcode/supabase';
import { createClient } from '@bitcode/supabase/ssr/server';

import {
  buildAnonymousAuxillaryData,
  buildAuxillaryDataPayload,
  buildAuxillaryOnboardingPayload,
  type AuxillaryBtdUpdatePayload,
  type AuxillaryOnboardingUpdatePayload,
  normalizeCompletedAuxillaryPane,
  parseStoredAuxillarySteps,
  serializeAuxillarySteps,
} from './auxillaries-contract';

const EMPTY_TEMPLATE_PREFERENCES = {
  deliverable_templates: {},
  ai_document_templates: {},
};

type AuxillaryRouteBuilderOptions = {
  isMockMode?: () => boolean;
  mockOnboardingData?: () => unknown;
  mockAuxillaryData?: () => unknown;
  mockModelPreferences?: () => unknown;
  useTemplateMock?: () => boolean;
  mockTemplatePreferences?: () => unknown;
};

async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    return null;
  }

  return user;
}

async function getProfileRole(userId: string) {
  const { data: profile, error } = await supabaseAdmin
    .from('user_profiles')
    .select('role')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    return { role: null, error };
  }

  return {
    role: profile?.role || null,
    error: null,
  };
}

export function buildGetAuxillaryOnboardingRoute(options: AuxillaryRouteBuilderOptions = {}) {
  return traceRoute('/auxillaries/onboarding', async () => {
    if (options.isMockMode?.()) {
      return createJsonResponse(options.mockOnboardingData?.() || buildAuxillaryOnboardingPayload([]));
    }

    const user = await getAuthenticatedUser();
    if (!user) {
      return createJsonResponse(buildAuxillaryOnboardingPayload([]), 401);
    }

    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('onboarded_steps')
      .eq('id', user.id)
      .maybeSingle();

    return createJsonResponse(
      buildAuxillaryOnboardingPayload(parseStoredAuxillarySteps(profile?.onboarded_steps)),
    );
  });
}

export function buildPostAuxillaryOnboardingRoute(options: AuxillaryRouteBuilderOptions = {}) {
  return traceRoute('/auxillaries/onboarding', async (request: Request) => {
    if (options.isMockMode?.()) {
      return createJsonResponse(options.mockOnboardingData?.() || buildAuxillaryOnboardingPayload([]));
    }

    const user = await getAuthenticatedUser();
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    let body: AuxillaryOnboardingUpdatePayload = {};
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    const completedStep = normalizeCompletedAuxillaryPane(body.completedPane ?? body.completedStep);

    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('onboarded_steps')
      .eq('id', user.id)
      .maybeSingle();

    const completedSteps = parseStoredAuxillarySteps(profile?.onboarded_steps);
    const nextCompletedSteps =
      completedStep && !completedSteps.includes(completedStep)
        ? [...completedSteps, completedStep]
        : completedSteps;

    const { error: updateError } = await supabaseAdmin
      .from('user_profiles')
      .update({
        onboarded_steps: serializeAuxillarySteps(nextCompletedSteps),
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (updateError) {
      return createJsonResponse({ error: updateError.message }, 500);
    }

    return createJsonResponse(buildAuxillaryOnboardingPayload(nextCompletedSteps));
  });
}

export function buildGetAuxillaryDataRoute(options: AuxillaryRouteBuilderOptions = {}) {
  return traceRoute('/auxillaries/data', async (_request: Request) => {
    if (options.isMockMode?.()) {
      return createJsonResponse(options.mockAuxillaryData?.() || buildAnonymousAuxillaryData());
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return createJsonResponse(buildAnonymousAuxillaryData());
    }

    const [profileResult, githubConnectionResult, balanceResult, preferencesResult] = await Promise.all([
      supabase.from('user_profiles').select('*').eq('id', user.id).maybeSingle(),
      supabase
        .from('user_connections')
        .select('connection_data')
        .eq('user_id', user.id)
        .eq('provider', 'github')
        .maybeSingle(),
      supabase.from('user_credits').select('balance').eq('user_id', user.id).maybeSingle(),
      supabase.from('user_model_preferences').select('preferences').eq('user_id', user.id).single(),
    ]);

    const profile = hydrateBitcodeProfile(profileResult.data ?? null);
    const githubConnection = githubConnectionResult.data?.connection_data ?? null;
    const btdBalance = typeof balanceResult.data?.balance === 'number' ? balanceResult.data.balance : 0;
    const modelPreferences = preferencesResult.data?.preferences ?? null;

    return createJsonResponse(
      buildAuxillaryDataPayload({
        profile,
        githubConnection,
        btdBalance,
        modelPreferences,
        onboardedSteps: (profile as { onboarded_steps?: unknown } | null)?.onboarded_steps,
      }),
    );
  });
}

export function buildPostAuxillaryBtdRoute(options: AuxillaryRouteBuilderOptions = {}) {
  return traceRoute('/auxillaries/btd', async (request: Request) => {
    if (options.isMockMode?.()) {
      return createJsonResponse({
        success: true,
        btdBalance: 0,
        newBalance: 0,
      });
    }

    const user = await getAuthenticatedUser();
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    const { role, error: roleError } = await getProfileRole(user.id);
    if (roleError) {
      return createJsonResponse({ error: roleError.message }, 500);
    }

    if (role !== 'lead' && role !== 'admin') {
      return createJsonResponse({ error: 'Forbidden' }, 403);
    }

    let body: AuxillaryBtdUpdatePayload = {};
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    const rawRequestedBalance = body.btdBalance ?? body.totalBtd;
    const requestedBtdBalance = Number(rawRequestedBalance);

    if (!Number.isFinite(requestedBtdBalance) || requestedBtdBalance < 0) {
      return createJsonResponse({ error: 'btdBalance must be a non-negative number' }, 400);
    }

    const { data, error } = await supabaseAdmin
      .from('user_credits')
      .upsert(
        {
          user_id: user.id,
          balance: requestedBtdBalance,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' },
      )
      .select('balance')
      .single();

    if (error) {
      return createJsonResponse({ error: error.message }, 500);
    }

    await supabaseAdmin
      .from('user_profiles')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', user.id);

    const resolvedBalance =
      typeof data?.balance === 'number' ? data.balance : requestedBtdBalance;

    return createJsonResponse({
      success: true,
      btdBalance: resolvedBalance,
      newBalance: resolvedBalance,
    });
  });
}

export function buildGetAuxillaryModelPreferencesRoute(options: AuxillaryRouteBuilderOptions = {}) {
  return traceRoute('/auxillaries/model-preferences', async () => {
    if (options.isMockMode?.()) {
      return createJsonResponse({
        success: true,
        preferences: options.mockModelPreferences?.() ?? null,
      });
    }

    const user = await getAuthenticatedUser();
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    const { data, error } = await supabaseAdmin
      .from('user_model_preferences')
      .select('preferences')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      return createJsonResponse({ error: error.message }, 500);
    }

    return createJsonResponse({
      success: true,
      preferences: data?.preferences || null,
    });
  });
}

export function buildPostAuxillaryModelPreferencesRoute(options: AuxillaryRouteBuilderOptions = {}) {
  return traceRoute('/auxillaries/model-preferences', async (request: Request) => {
    if (options.isMockMode?.()) {
      return createJsonResponse({
        success: true,
        preferences: options.mockModelPreferences?.() ?? null,
      });
    }

    const user = await getAuthenticatedUser();
    if (!user) {
      return createJsonResponse({ error: 'Unauthorized' }, 401);
    }

    const { role, error: roleError } = await getProfileRole(user.id);
    if (roleError) {
      return createJsonResponse({ error: roleError.message }, 500);
    }

    if (role !== 'lead' && role !== 'admin') {
      return createJsonResponse({ error: 'Forbidden' }, 403);
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    const { error } = await supabaseAdmin
      .from('user_model_preferences')
      .upsert(
        {
          user_id: user.id,
          preferences: body,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' },
      );

    if (error) {
      return createJsonResponse({ error: error.message }, 500);
    }

    return createJsonResponse({ success: true });
  });
}

export function buildGetAuxillaryTemplatePreferencesRoute(options: AuxillaryRouteBuilderOptions = {}) {
  return traceRoute('/auxillaries/template-preferences', async () => {
    if (options.useTemplateMock?.()) {
      return createJsonResponse(options.mockTemplatePreferences?.() || EMPTY_TEMPLATE_PREFERENCES);
    }

    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return createJsonResponse(EMPTY_TEMPLATE_PREFERENCES);
    }

    const { data, error: selectError } = await supabaseAdmin
      .from('user_template_preferences')
      .select('deliverable_templates, ai_document_templates')
      .eq('user_id', user.id)
      .maybeSingle();

    if (selectError) {
      return createJsonResponse(
        { error: selectError.message || 'Failed to load template preferences' },
        500,
      );
    }

    return createJsonResponse(data || EMPTY_TEMPLATE_PREFERENCES);
  });
}

export function buildPostAuxillaryTemplatePreferencesRoute(options: AuxillaryRouteBuilderOptions = {}) {
  return traceRoute('/auxillaries/template-preferences', async (request: Request) => {
    if (options.useTemplateMock?.()) {
      return createJsonResponse({ success: true }, 201);
    }

    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return createJsonResponse({ error: 'Authentication required' }, 401);
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return createJsonResponse({ error: 'Invalid JSON' }, 400);
    }

    const payload =
      body && typeof body === 'object'
        ? {
            deliverable_templates:
              typeof (body as Record<string, unknown>).deliverable_templates === 'object' &&
              (body as Record<string, unknown>).deliverable_templates !== null
                ? (body as Record<string, unknown>).deliverable_templates
                : null,
            ai_document_templates:
              typeof (body as Record<string, unknown>).ai_document_templates === 'object' &&
              (body as Record<string, unknown>).ai_document_templates !== null
                ? (body as Record<string, unknown>).ai_document_templates
                : null,
          }
        : {
            deliverable_templates: null,
            ai_document_templates: null,
          };

    if (!payload.deliverable_templates || !payload.ai_document_templates) {
      return createJsonResponse({ error: 'Invalid template preferences format' }, 400);
    }

    const { error: upsertError } = await supabaseAdmin.from('user_template_preferences').upsert(
      {
        user_id: user.id,
        deliverable_templates: payload.deliverable_templates,
        ai_document_templates: payload.ai_document_templates,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    );

    if (upsertError) {
      return createJsonResponse(
        { error: upsertError.message || 'Failed to update template preferences' },
        500,
      );
    }

    return createJsonResponse({ success: true }, 201);
  });
}
