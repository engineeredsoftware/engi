import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { supabaseAdmin } from '@engi/supabase';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from "@engi/responses";
import { log } from '@engi/logger';
import * as crypto from 'crypto';
import type { NextRequest } from 'next/server';

/**
 * GET /api/executions/history
 * Returns execution history for the authenticated user.
 */
const GETHandler = async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const requestUrl = request.nextUrl?.href ?? '[unknown]';
  log('[executions/history] Request started', 'info', { requestId, url: requestUrl });

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    log('[executions/history] Authentication failed', 'warn', { requestId, error: authError });
    return createAuthErrorResponse();
  }

  log('[executions/history] User authenticated', 'debug', { requestId, userId: user.id });

  try {
    log('[executions/history] Fetching executions', 'info', { requestId, userId: user.id });

    const { data: executions, error } = await supabaseAdmin
      .from('executions')
      .select('id, created_at, status, type, guide, output, metadata, config, started_at, completed_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      log('[executions/history] Query error', 'error', { requestId, error });
      return createErrorResponse(error);
    }

    const transformed = (executions || []).map((row: any) => ({
      ...row,
      guide: row.guide || null
    }));

    log('[executions/history] Success', 'debug', { requestId, count: transformed.length });
    return createJsonResponse(transformed);
  } catch (err) {
    log('[executions/history] Unhandled error', 'error', { requestId, error: err });
    return createErrorResponse(err);
  }
}

/**
 * POST /api/executions/history
 * Creates a new execution record (legacy compatibility - prefer POST /api/executions).
 */
const POSTHandler = async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return createAuthErrorResponse();
  }

  let body: any;
  try {
    body = await request.json();
  } catch (err) {
    return createJsonResponse({ error: 'Invalid JSON' }, 400);
  }

  try {
    const { data: execution, error: execError } = await supabaseAdmin
      .from('executions')
      .insert({
        user_id: user.id,
        type: body.pipeline_type || body.type || 'deliverable',
        status: body.status || 'pending',
        input: body.input ?? body.input_data ?? {},
        metadata: body.context ?? {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (execError) {
      return createErrorResponse(execError);
    }

    return createJsonResponse({ execution: { ...execution, guide: execution?.guide || null } }, 201);
  } catch (err) {
    return createErrorResponse(err);
  }
}

export const GET = traceRoute('/executions/history', GETHandler);
export const POST = traceRoute('/executions/history', POSTHandler);
