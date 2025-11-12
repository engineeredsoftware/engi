import { NextRequest } from 'next/server';
import { createClient } from '@engi/supabase/ssr/server';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from '@engi/responses';
import { traceRoute } from '@engi/observability';

export const POST = traceRoute('/fulfill-checkout-session', async (request: NextRequest) => {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return createAuthErrorResponse();

  try {
    const { session_id: sessionId } = Object.fromEntries(request.nextUrl.searchParams.entries());
    if (!sessionId) {
      return createErrorResponse(new Error('session_id required'), 400);
    }

    // TODO: Lookup Stripe session and credit user. For now respond OK so GA-1 UI flow completes.
    return createJsonResponse({ success: true });
  } catch (error) {
    return createErrorResponse(error);
  }
});
