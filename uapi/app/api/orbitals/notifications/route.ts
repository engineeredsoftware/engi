import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { log } from '@engi/logger';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from '@engi/responses';
import { ENABLE_MOCKS, MOCK_USER_ORBITAL } from '@/config/featureFlags';
import userNotificationsMock from '@/mocks/user-notifications.json';

/**
 * GET /api/user/notifications
 * List notifications for the authenticated user.
 * Query params:
 *   unread_only: 'true'|'1' to filter only unread notifications.
 */
const GETHandler = async function GET(request: Request) {
  // Return mock if enabled
  if (ENABLE_MOCKS && MOCK_USER_ORBITAL) {
    return createJsonResponse(userNotificationsMock.notifications);
  }
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return createAuthErrorResponse();
  }
  try {
    const url = new URL(request.url);
    const unreadOnlyParam = url.searchParams.get('unread_only') || '0';
    const unreadOnly = unreadOnlyParam === '1' || unreadOnlyParam.toLowerCase() === 'true';

    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (unreadOnly) {
      query = query.eq('is_read', false);
    }

    const { data, error } = await query;
    if (error) {
      return createErrorResponse(error);
    }
    const normalized = (data ?? []).map((row) => ({
      ...row,
      read: row.is_read,
    }));
    return createJsonResponse(normalized);
  } catch (err) {
    // Log any unhandled errors
    log('[route /user/notifications GET] Unhandled error', 'error', { error: err });
    return createErrorResponse(err);
  }
}

export const GET = traceRoute('/user/notifications', GETHandler);
