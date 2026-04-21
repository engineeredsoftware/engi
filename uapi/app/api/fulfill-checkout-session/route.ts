import { NextRequest } from 'next/server';
import { createClient } from '@bitcode/supabase/ssr/server';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from '@bitcode/responses';
import { traceRoute } from '@bitcode/observability';

export const POST = traceRoute('/fulfill-checkout-session', async (request: NextRequest) => {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return createAuthErrorResponse();

  try {
    const { session_id: sessionId } = Object.fromEntries(request.nextUrl.searchParams.entries());
    if (!sessionId) {
      return createErrorResponse(new Error('session_id required'), 400);
    }

    // TODO: Lookup the Stripe session and credit the user's BTD balance.
    // The callback currently only needs an explicit success ack so the UI can
    // complete gracefully if the webhook path lags behind.
    return createJsonResponse({ success: true });
  } catch (error) {
    return createErrorResponse(error);
  }
});

