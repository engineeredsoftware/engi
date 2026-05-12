import { NextResponse } from 'next/server';

import { createClient } from '@bitcode/supabase/ssr/server';

export const runtime = 'nodejs';

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return {
    supabase,
    user: !error ? user : null,
  };
}

function resolveInstallationId(connectionData: Record<string, unknown> | null | undefined) {
  const raw =
    connectionData?.installationId ??
    connectionData?.installation_id ??
    connectionData?.connectionId ??
    connectionData?.provider_user_id;
  const numeric = Number(raw);
  return Number.isFinite(numeric) ? numeric : null;
}

const sensitiveConnectionDataKeys = new Set([
  'access_token',
  'oauth_token',
  'refresh_token',
  'token',
  'client_secret',
  'private_key',
]);

function sanitizeConnectionData(connectionData: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(connectionData).filter(([key]) => !sensitiveConnectionDataKeys.has(key.toLowerCase())),
  );
}

export async function GET(_request: Request) {
  const { supabase, user } = await requireUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('user_connections')
    .select('connection_data')
    .eq('user_id', user.id)
    .eq('provider', 'github')
    .maybeSingle();

  if (error || !data?.connection_data) {
    return NextResponse.json({ success: false, error: 'No GitHub connection found' }, { status: 404 });
  }

  const connectionData = data.connection_data as Record<string, unknown>;
  const installationId = resolveInstallationId(connectionData);
  if (!installationId) {
    return NextResponse.json({
      success: true,
      connectionData: sanitizeConnectionData(connectionData),
      repositories: [],
      organizations: [],
    });
  }

  try {
    const { app } = await import('@/app/octokit');
    const octokit = await app.getInstallationOctokit(installationId) as any;
    const repositories = await octokit.paginate(octokit.rest.apps.listReposAccessibleToInstallation);
    const organizations = Array.from(
      new Set(
        repositories
          .filter((repository: any) => repository.owner?.type === 'Organization')
          .map((repository: any) => repository.owner.login),
      ),
    );

    return NextResponse.json({
      success: true,
      connectionData: sanitizeConnectionData(connectionData),
      repositories,
      organizations,
    });
  } catch (octokitError: any) {
    return NextResponse.json(
      { success: false, error: octokitError?.message || 'Failed to inspect GitHub connection' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const { supabase, user } = await requireUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { error } = await supabase.from('user_connections').upsert(
    {
      user_id: user.id,
      provider: 'github',
      connection_data: body,
      updated_at: new Date().toISOString(),
    },
    { onConflict: ['user_id', 'provider'] },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
