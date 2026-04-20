import { NextResponse } from 'next/server';

import { createClient } from '@bitcode/supabase/ssr/server';

import {
  getMockRepositories,
  getStoredConnection,
  isMockVcsMode,
  listStoredRepositories,
} from '@/app/api/vcs/_shared';

export const runtime = 'nodejs';

interface DataShareRepo {
  fullName: string;
  branch: string;
  commit: string;
  enabled: boolean;
  lastAnalysisAt: string | null;
  latestAnalysisResult: null;
}

function mapRepositoryListToDataShare(repositories: Array<{
  fullName: string;
  defaultBranch?: string | null;
  updatedAt?: Date | string | null;
}>): DataShareRepo[] {
  return repositories.map((repository, index) => ({
    fullName: repository.fullName,
    branch: repository.defaultBranch || 'main',
    commit:
      typeof repository.updatedAt === 'string'
        ? repository.updatedAt.replace(/[^0-9a-z]/gi, '').slice(0, 7) || `mock${index}`
        : repository.updatedAt instanceof Date
          ? repository.updatedAt.toISOString().replace(/[^0-9a-z]/gi, '').slice(0, 7) || `mock${index}`
          : `mock${index}`,
    enabled: true,
    lastAnalysisAt:
      typeof repository.updatedAt === 'string'
        ? repository.updatedAt
        : repository.updatedAt instanceof Date
          ? repository.updatedAt.toISOString()
          : null,
    latestAnalysisResult: null,
  }));
}

async function getAuthenticatedUser() {
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

export async function GET() {
  if (isMockVcsMode()) {
    return NextResponse.json({
      success: true,
      repos: mapRepositoryListToDataShare(getMockRepositories('github')),
    });
  }

  const { supabase, user } = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ success: true, repos: [] });
  }

  const { manager, connection } = await getStoredConnection(supabase, user.id, 'github');
  if (!connection) {
    return NextResponse.json({ success: true, repos: [] });
  }

  const repositories = await listStoredRepositories(manager, 'github', connection);

  return NextResponse.json({
    success: true,
    repos: mapRepositoryListToDataShare(repositories),
  });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    persisted: false,
    repoFullName: typeof body.repoFullName === 'string' ? body.repoFullName : null,
    enabled: typeof body.enabled === 'boolean' ? body.enabled : null,
  });
}
