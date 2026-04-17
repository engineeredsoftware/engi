import { NextResponse } from 'next/server';

import { createRouteWrapper } from '@bitcode/middleware';

import {
  buildDisconnectedConnectionStatus,
  buildStoredConnectionStatus,
  getMockConnectionStatus,
  getRouteSupabaseUser,
  getStoredConnection,
  isMockVcsMode,
  readInstanceUrl,
  resolveRouteProvider,
  type ProviderRouteContext,
  validateStoredConnection,
} from '../../_shared';

export const runtime = 'nodejs';

export const GET = createRouteWrapper(async (request: Request, context: ProviderRouteContext) => {
  const provider = await resolveRouteProvider(context);

  if (isMockVcsMode()) {
    return NextResponse.json(getMockConnectionStatus(provider));
  }

  const { supabase, user } = await getRouteSupabaseUser();
  if (!user) {
    return NextResponse.json(buildDisconnectedConnectionStatus(provider));
  }

  const { manager, connection } = await getStoredConnection(supabase, user.id, provider);
  if (!connection) {
    return NextResponse.json(buildDisconnectedConnectionStatus(provider));
  }

  const instanceUrl = readInstanceUrl(request);
  const valid = await validateStoredConnection(manager, provider, connection, instanceUrl).catch(() => false);

  return NextResponse.json(buildStoredConnectionStatus(provider, connection, valid));
});

export const DELETE = createRouteWrapper(async (request: Request, context: ProviderRouteContext) => {
  const provider = await resolveRouteProvider(context);

  if (isMockVcsMode()) {
    return NextResponse.json({
      success: true,
      provider,
      disconnected: true,
      mock_mode: true,
    });
  }

  const { supabase, user } = await getRouteSupabaseUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { manager, connection } = await getStoredConnection(supabase, user.id, provider);
  if (!connection) {
    return NextResponse.json({
      success: true,
      provider,
      disconnected: false,
      message: 'No active connection to remove',
    });
  }

  await manager.deleteConnection(connection.id);

  return NextResponse.json({
    success: true,
    provider,
    disconnected: true,
  });
});
