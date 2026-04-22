/**
 * @jest-environment node
 */

const mockCreateDeposit = jest.fn((body?: Record<string, unknown>) => ({
  ok: true,
  asset: { assetId: 'asset-1', repositoryAnchor: body?.repositoryAnchor ?? null },
}));
const mockMakeBitcodeBranch = jest.fn(async (body?: Record<string, unknown>) => ({
  ok: true,
  specVersion: 'V26',
  latestRun: { id: 'run-1', repositoryAnchor: body?.repositoryAnchor ?? null },
}));

jest.mock('@bitcode/supabase/ssr/server', () => ({ createClient: jest.fn() }));

jest.mock('@/lib/bitcode-app-context', () => {
  return {
    getBitcodeAppContext: () => ({
      createDeposit: mockCreateDeposit,
      makeBitcodeBranch: mockMakeBitcodeBranch,
    }),
    readBitcodeRequestBody: async (request: Request) => {
      const text = await request.text();
      return text.trim() ? (JSON.parse(text) as Record<string, unknown>) : {};
    },
    toBitcodeErrorResponse: (error: unknown) => {
      const resolvedError = error instanceof Error ? (error as Error & { statusCode?: number }) : new Error('Unknown error.');
      return new Response(
        JSON.stringify({ error: resolvedError.message || 'Unknown error.' }),
        {
          status: resolvedError.statusCode || 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    },
  };
});

import { createClient } from '@bitcode/supabase/ssr/server';
import { POST as postDeposit } from '@/app/api/deposits/route';
import { POST as postMakeBitcodeBranch } from '@/app/api/make-bitcode-branch/route';

type MockSupabaseBuilder = {
  select: jest.Mock;
  eq: jest.Mock;
  maybeSingle: jest.Mock;
};

function createBuilder(result: { data: unknown; error: unknown }): MockSupabaseBuilder {
  const builder = {
    select: jest.fn(),
    eq: jest.fn(),
    maybeSingle: jest.fn().mockResolvedValue(result),
  } as MockSupabaseBuilder;
  builder.select.mockReturnValue(builder);
  builder.eq.mockReturnValue(builder);
  return builder;
}

function installSupabaseReadinessMocks(options: {
  user?: { id: string } | null;
  githubConnection?: Record<string, unknown> | null;
  profile?: Record<string, unknown> | null;
  userError?: { message: string } | null;
}) {
  const profileBuilder = createBuilder({ data: options.profile ?? null, error: null });
  const connectionBuilder = createBuilder({
    data: options.githubConnection ? { connection_data: options.githubConnection } : null,
    error: null,
  });
  const from = jest.fn((table: string) => {
    if (table === 'user_profiles') return profileBuilder;
    if (table === 'user_connections') return connectionBuilder;
    throw new Error(`Unexpected table ${table}`);
  });

  (createClient as jest.Mock).mockResolvedValue({
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: options.user ?? null },
        error: options.userError ?? null,
      }),
    },
    from,
  });

  return { from, profileBuilder, connectionBuilder };
}

describe('Bitcode transaction write routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejects deposit writes when the operator is unauthenticated', async () => {
    installSupabaseReadinessMocks({
      user: null,
      userError: { message: 'no auth' },
    });

    const response = await postDeposit(
      new Request('http://localhost/api/deposits', {
        method: 'POST',
        body: JSON.stringify({ repositoryAnchor: 'bitcode/bitcode', title: 'asset draft' }),
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(401);
    expect(payload.error).toContain('review-only mode');
    expect(mockCreateDeposit).not.toHaveBeenCalled();
  });

  it('rejects deposit writes while wallet verification remains staged', async () => {
    installSupabaseReadinessMocks({
      user: { id: 'user-1' },
      githubConnection: { installationId: 123 },
      profile: {
        id: 'user-1',
        settings: {
          bitcodeProfile: {
            walletBinding: {
              address: 'bc1qbitcodeoperator',
              provider: 'manual',
              status: 'manual',
              boundAt: '2026-04-22T00:00:00.000Z',
            },
          },
        },
      },
    });

    const response = await postDeposit(
      new Request('http://localhost/api/deposits', {
        method: 'POST',
        body: JSON.stringify({ repositoryAnchor: 'bitcode/bitcode', title: 'asset draft' }),
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(409);
    expect(payload.error).toContain('signed settlement remains staged');
    expect(mockCreateDeposit).not.toHaveBeenCalled();
  });

  it('rejects branch writes when the repository anchor is missing', async () => {
    installSupabaseReadinessMocks({
      user: { id: 'user-1' },
      githubConnection: { installationId: 123 },
      profile: {
        id: 'user-1',
        settings: {
          bitcodeProfile: {
            walletBinding: {
              address: 'bc1qbitcodeoperator',
              provider: 'walletconnect',
              status: 'verified',
              boundAt: '2026-04-22T00:00:00.000Z',
            },
          },
        },
      },
    });

    const response = await postMakeBitcodeBranch(
      new Request('http://localhost/api/make-bitcode-branch', {
        method: 'POST',
        body: JSON.stringify({ scenarioId: 'need-1', branchMode: 'patch', principal: 'reviewer' }),
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(409);
    expect(payload.error).toContain('Select a repository anchor');
    expect(mockMakeBitcodeBranch).not.toHaveBeenCalled();
  });

  it('accepts ready deposit and branch writes once verified signing and repository scope are present', async () => {
    installSupabaseReadinessMocks({
      user: { id: 'user-1' },
      githubConnection: { installationId: 123 },
      profile: {
        id: 'user-1',
        settings: {
          bitcodeProfile: {
            walletBinding: {
              address: 'bc1qbitcodeoperator',
              provider: 'walletconnect',
              status: 'verified',
              boundAt: '2026-04-22T00:00:00.000Z',
            },
          },
        },
      },
    });

    const depositResponse = await postDeposit(
      new Request('http://localhost/api/deposits', {
        method: 'POST',
        body: JSON.stringify({
          repositoryAnchor: 'bitcode/bitcode',
          sourceRepo: 'bitcode/bitcode',
          title: 'asset draft',
        }),
      }),
    );
    const branchResponse = await postMakeBitcodeBranch(
      new Request('http://localhost/api/make-bitcode-branch', {
        method: 'POST',
        body: JSON.stringify({
          repositoryAnchor: 'bitcode/bitcode',
          scenarioId: 'need-1',
          branchMode: 'patch',
          principal: 'reviewer',
        }),
      }),
    );

    expect(depositResponse.status).toBe(200);
    expect(branchResponse.status).toBe(200);
    expect(mockCreateDeposit).toHaveBeenCalledWith(
      expect.objectContaining({ repositoryAnchor: 'bitcode/bitcode' }),
    );
    expect(mockMakeBitcodeBranch).toHaveBeenCalledWith(
      expect.objectContaining({ repositoryAnchor: 'bitcode/bitcode' }),
    );
  });
});
