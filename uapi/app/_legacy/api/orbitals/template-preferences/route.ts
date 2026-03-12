import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { supabaseAdmin } from '@engi/supabase';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from '@engi/responses';
import { log } from '@engi/logger';
import * as crypto from 'crypto';
import type { NextRequest } from 'next/server';
import { ENABLE_MOCKS, MOCK_USER_TEMPLATES, MOCK_USER_TEMPLATES_SCENARIO } from '@/config/featureFlags';
import userTemplatesDefaultMock from '@/mocks/user-template-preferences-default.json';
import userTemplatesEmptyMock from '@/mocks/user-template-preferences-empty.json';

/**
 * GET /api/user/template-preferences
 * Retrieves user's saved template preferences for deliverables and ai_documents.
 */
const GETHandler = async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const requestUrl = request.nextUrl?.href ?? '[unknown]';
  log('[route /user/template-preferences GET] Request started', 'info', { requestId, url: requestUrl });
  if (ENABLE_MOCKS && MOCK_USER_TEMPLATES) {
    switch (MOCK_USER_TEMPLATES_SCENARIO) {
      case 'empty': return createJsonResponse(userTemplatesEmptyMock);
      case 'error': return createErrorResponse(new Error('Mock template preferences error'), 500);
      default: return createJsonResponse(userTemplatesDefaultMock);
    }
  }
  // Authenticate user
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    log('[route /user/template-preferences GET] Auth failed', 'warn', { requestId, error: authError });
    return createAuthErrorResponse();
  }
  log('[route /user/template-preferences GET] Authentication successful', 'info', { requestId, userId: user.id });
  try {
    const { data, error } = await supabaseAdmin
      .from('user_template_preferences')
      .select('deliverable_templates, ai_document_templates')
      .eq('user_id', user.id)
      .maybeSingle();
    if (error) {
      log('[route /user/template-preferences GET] DB error', 'error', { requestId, error });
      return createErrorResponse(error);
    }
    return createJsonResponse(data || { deliverable_templates: {}, ai_document_templates: {} });
  } catch (err) {
    // Log any unhandled errors
    log('[route /user/template-preferences GET] Unhandled error', 'error', { requestId, error: err });
    return createErrorResponse(err);
  }
}

/**
 * POST /api/user/template-preferences
 * Creates or updates user's template preferences.
 */
const POSTHandler = async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const requestUrl = request.nextUrl?.href ?? '[unknown]';
  log('[route /user/template-preferences POST] Request started', 'info', { requestId, url: requestUrl });
  if (ENABLE_MOCKS && MOCK_USER_TEMPLATES) {
    switch (MOCK_USER_TEMPLATES_SCENARIO) {
      case 'empty': return createJsonResponse({}, 201);
      case 'error': return createErrorResponse(new Error('Mock template preferences error'), 500);
      default: return createJsonResponse(userTemplatesDefaultMock, 201);
    }
  }
  // Authenticate user
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    log('[route /user/template-preferences POST] Auth failed', 'warn', { requestId, error: authError });
    return createAuthErrorResponse();
  }
  log('[route /user/template-preferences POST] Authentication successful', 'info', { requestId, userId: user.id });
  let body: any;
  try {
    body = await request.json();
  } catch (err) {
    return createJsonResponse({ error: 'Invalid JSON' }, 400);
  }
  // Validate body shape
  const { deliverable_templates, ai_document_templates } = body;
  if (typeof deliverable_templates !== 'object' || typeof ai_document_templates !== 'object') {
    return createJsonResponse({ error: 'Invalid template preferences format' }, 400);
  }
  try {
    await supabaseAdmin
      .from('user_profiles')
      .upsert({ id: user.id }, { onConflict: 'id', ignoreDuplicates: true });

    const record = {
      user_id: user.id,
      deliverable_templates,
      ai_document_templates,
      updated_at: new Date().toISOString()
    };
    const { error } = await supabaseAdmin
      .from('user_template_preferences')
      .upsert(record, { onConflict: ['user_id'] });
    if (error) {
      log('[route /user/template-preferences POST] DB error', 'error', { requestId, error });
      return createErrorResponse(error);
    }
    return createJsonResponse({ success: true }, 201);
  } catch (err) {
    // Log any unhandled errors
    log('[route /user/template-preferences POST] Unhandled error', 'error', { requestId, error: err });
    return createErrorResponse(err);
  }
}

export const GET = traceRoute('/user/template-preferences', GETHandler);
export const POST = traceRoute('/user/template-preferences', POSTHandler);
