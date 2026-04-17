import type { SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';

import { createClient } from '@bitcode/supabase/ssr/server';
import {
  VCSConnections,
  VCSProviderFactory,
  type VCSProviderType,
  type VCSRepository,
} from '@bitcode/vcs';

import {
  buildMockVcsConnectionStatus,
  buildMockVcsRepositories,
  isUserOrbitalMockMode,
} from '../../../lib/mock-review-mode';

const providerSchema = z.enum(['github', 'gitlab', 'bitbucket']);

export type ProviderRouteContext =
  | { params: { provider: string } }
  | { params: Promise<{ provider: string }> };

type StoredConnection = Awaited<ReturnType<VCSConnections['getConnection']>>;

export async function resolveRouteProvider(context: ProviderRouteContext): Promise<VCSProviderType> {
  const params = await context.params;
  return providerSchema.parse(params.provider);
}

export function isMockVcsMode() {
  return isUserOrbitalMockMode();
}

export function getMockConnectionStatus(provider: VCSProviderType) {
  return buildMockVcsConnectionStatus(provider);
}

export function getMockRepositories(provider: VCSProviderType): VCSRepository[] {
  return buildMockVcsRepositories(provider);
}

export async function getRouteSupabaseUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { supabase, user, error };
}

export async function getStoredConnection(
  supabase: SupabaseClient<any>,
  userId: string,
  provider: VCSProviderType,
) {
  const manager = new VCSConnections(supabase);
  const connection = await manager.getConnection(userId, provider);
  return { manager, connection };
}

export function readInstanceUrl(request: Request) {
  return new URL(request.url).searchParams.get('instance_url') || undefined;
}

export function buildDisconnectedConnectionStatus(provider: VCSProviderType) {
  return {
    connected: false,
    provider,
    valid: false,
  };
}

export function buildStoredConnectionStatus(
  provider: VCSProviderType,
  connection: NonNullable<StoredConnection>,
  valid: boolean,
) {
  const connectionData = (connection.connectionData || {}) as Record<string, unknown>;

  return {
    connected: true,
    provider,
    valid,
    username:
      typeof connectionData.provider_username === 'string'
        ? connectionData.provider_username
        : typeof connectionData.username === 'string'
          ? connectionData.username
          : undefined,
    instanceUrl:
      typeof connectionData.instance_url === 'string' ? connectionData.instance_url : undefined,
    expiresAt:
      typeof connectionData.token_expires_at === 'string'
        ? connectionData.token_expires_at
        : undefined,
    metadata: connectionData,
  };
}

export async function validateStoredConnection(
  manager: VCSConnections,
  provider: VCSProviderType,
  connection: NonNullable<StoredConnection>,
  instanceUrl?: string,
) {
  const auth = await manager.getAuthFromConnection(connection.id);
  if (!auth) {
    return false;
  }

  const vcsProvider = await VCSProviderFactory.createFromEnvironment(provider, instanceUrl);
  return vcsProvider.validateToken(auth);
}

export async function listStoredRepositories(
  manager: VCSConnections,
  provider: VCSProviderType,
  connection: NonNullable<StoredConnection>,
  instanceUrl?: string,
) {
  const auth = await manager.getAuthFromConnection(connection.id);
  if (!auth) {
    return [];
  }

  const vcsProvider = await VCSProviderFactory.createFromEnvironment(provider, instanceUrl);
  return vcsProvider.listRepositories(auth, {
    type: 'all',
    perPage: 100,
  });
}
