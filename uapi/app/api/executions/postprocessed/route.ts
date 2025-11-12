import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { supabaseAdmin } from '@engi/supabase';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from '@engi/responses';
import { log } from '@engi/logger';

/**
 * GET /api/executions/postprocessed?id=<runId>
 * Returns the unified postprocessed result for a given execution run.
 * GA-1: Only queries executions table (ai_document_runs table removed).
 */
export const dynamic = 'force-dynamic';

const GETHandler = async function GET(request: Request) {
  const url = new URL(request.url);
  const runId = url.searchParams.get('id');
  const requestId = crypto.randomUUID();

  try {
    if (!runId) return createErrorResponse(new Error('Missing id'), 400);

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return createAuthErrorResponse();

    log('[postprocessed] Fetching execution', 'debug', { requestId, runId, userId: user.id });

    // Query executions table
    const { data: execution, error: execError } = await supabaseAdmin
      .from('executions')
      .select('id, user_id, output, metadata')
      .eq('id', runId)
      .maybeSingle();

    if (execError) {
      log('[postprocessed] Query error', 'error', { requestId, error: execError });
      return createErrorResponse(execError);
    }

    if (!execution) {
      log('[postprocessed] Execution not found', 'warn', { requestId, runId });
      return createErrorResponse(new Error('Execution not found'), 404);
    }

    if (execution.user_id !== user.id) {
      log('[postprocessed] Ownership check failed', 'warn', {
        requestId,
        runId,
        executionOwner: execution.user_id,
        requestUser: user.id
      });
      return createErrorResponse(new Error('Execution not found'), 404);
    }

    // Extract postprocessed data from output_data or context
    let postprocessed = (execution.output as any)?.postprocessed || (execution.metadata as any)?.postprocessed || null;

    // Unwrap nested result if present
    if (postprocessed && typeof postprocessed === 'object' && 'result' in postprocessed) {
      postprocessed = (postprocessed as any).result;
    }

    log('[postprocessed] Success', 'debug', {
      requestId,
      runId,
      hasPostprocessed: !!postprocessed
    });

    return createJsonResponse({ executionId: runId, postprocessed });
  } catch (err) {
    log('[postprocessed] Unhandled error', 'error', { requestId, error: err });
    return createErrorResponse(err);
  }
}

import * as crypto from 'crypto';
export const GET = traceRoute('/executions/postprocessed', GETHandler);
