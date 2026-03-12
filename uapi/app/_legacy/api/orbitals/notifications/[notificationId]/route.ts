import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from '@engi/responses';
import { ENABLE_MOCKS, MOCK_USER_ORBITAL } from '@/config/featureFlags';
import userNotificationsMock from '@/mocks/user-notifications.json';

/**
 * PATCH /api/user/notifications/:notificationId
 * Update notification fields (e.g., read).
 */
const PATCHHandler = async function PATCH(
  request: Request,
  { params }: { params: { notificationId: string } }
) {
  // Return mock if enabled
  if (ENABLE_MOCKS && MOCK_USER_ORBITAL) {
    return new Response(null, { status: 204 });
  }
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return createAuthErrorResponse();
  }
  const { notificationId } = params;
  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }
  const updates: any = {};
  if (body.read !== undefined) {
    updates.is_read = body.read;
  }
  try {
    const { error } = await supabase
      .from('notifications')
      .update(updates)
      .eq('id', notificationId)
      .eq('user_id', user.id);
    if (error) {
      return createErrorResponse(error);
    }
    return new Response(null, { status: 204 });
  } catch (err) {
    return createErrorResponse(err);
  }
}

/**
 * DELETE /api/user/notifications/:notificationId
 * Delete a notification.
 */
const DELETEHandler = async function DELETE(
  request: Request,
  { params }: { params: { notificationId: string } }
) {
  // Return mock if enabled
  if (ENABLE_MOCKS && MOCK_USER_ORBITAL) {
    return new Response(null, { status: 204 });
  }
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return createAuthErrorResponse();
  }
  const { notificationId } = params;
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)
      .eq('user_id', user.id);
    if (error) {
      return createErrorResponse(error);
    }
    return new Response(null, { status: 204 });
  } catch (err) {
    return createErrorResponse(err);
  }
}
export const PATCH = traceRoute('/user/notifications/:notificationId', PATCHHandler);
export const DELETE = traceRoute('/user/notifications/:notificationId', DELETEHandler);
