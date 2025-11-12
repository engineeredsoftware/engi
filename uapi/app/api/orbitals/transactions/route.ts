import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { supabaseAdmin } from '@engi/supabase';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from '@engi/responses';
import { log } from '@engi/logger';
import * as crypto from 'crypto';
import type { NextRequest } from 'next/server';

/**
 * GET /api/user/transactions
 * Returns an array of individual credit transaction events for the authenticated user.
 */
const GETHandler = async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const requestUrl = request.nextUrl?.href ?? '[unknown]';
  log('[route /user/transactions GET] Request started', 'info', { requestId, url: requestUrl });
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    log('[route /user/transactions GET] Authentication failed', 'warn', { requestId, error: authError });
    return createAuthErrorResponse();
  }
  log('[route /user/transactions GET] Authentication successful', 'info', { requestId, userId: user.id });
  try {
    log('[route /user/transactions GET] Fetching credit transactions', 'info', { requestId, userId: user.id });
    // Parse pagination parameters
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(request.nextUrl.searchParams.get('pageSize') || '10', 10);
    const rangeFrom = (page - 1) * pageSize;
    const rangeTo = page * pageSize - 1;
    // Query with exact count
    const { data, count, error } = await supabaseAdmin
      .from('user_credit_usages')
      .select('id, amount, operation_type, operation_id, metadata, created_at', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(rangeFrom, rangeTo);
    if (error) {
      log('[route /user/transactions GET] Error querying transactions', 'error', { requestId, error });
      return createErrorResponse(error);
    }
    return createJsonResponse({ transactions: data, count: count ?? 0, page, pageSize });
  } catch (err) {
    log('[route /user/transactions GET] Unexpected error', 'error', { requestId, error: err });
    return createErrorResponse(err);
  }
}

export const GET = traceRoute('/user/transactions', GETHandler);
