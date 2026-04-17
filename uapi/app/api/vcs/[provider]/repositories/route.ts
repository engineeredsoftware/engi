import { NextResponse } from 'next/server';

import { createRouteWrapper } from '@bitcode/middleware';

import {
  getMockRepositories,
  getRouteSupabaseUser,
  getStoredConnection,
  isMockVcsMode,
  listStoredRepositories,
  readInstanceUrl,
  resolveRouteProvider,
  type ProviderRouteContext,
} from '../../_shared';

export const runtime = 'nodejs';

export const GET = createRouteWrapper(async (request: Request, context: ProviderRouteContext) => {
  const provider = await resolveRouteProvider(context);

  if (isMockVcsMode()) {
    return NextResponse.json({ repositories: getMockRepositories(provider) });
  }

  const { supabase, user } = await getRouteSupabaseUser();
  if (!user) {
    return NextResponse.json({ repositories: [] });
  }

  const { manager, connection } = await getStoredConnection(supabase, user.id, provider);
  if (!connection) {
    return NextResponse.json({ repositories: [] });
  }

  const params = new URL(request.url).searchParams;
  const owner = params.get('owner');
  const repositories = await listStoredRepositories(
    manager,
    provider,
    connection,
    readInstanceUrl(request),
  );

  const filteredRepositories = owner
    ? repositories.filter(
        (repository) =>
          repository.owner.username === owner ||
          repository.owner.id === owner ||
          repository.fullName === owner,
      )
    : repositories;

  return NextResponse.json({ repositories: filteredRepositories });
});
