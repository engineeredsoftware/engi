/**
 * @jest-environment node
 */

jest.mock('@bitcode/supabase/ssr/server', () => ({
  createClient: jest.fn(),
}));

jest.mock('@bitcode/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn(),
  },
}));

jest.mock('@bitcode/api/src/vcs/github-service', () => ({
  GitHubService: {
    getValidAuth: jest.fn(async () => ({ accessToken: 'ghs_installation_token' })),
  },
}));

jest.mock('@bitcode/pipelines-generics', () => ({
  createStreamingExecution: jest.fn(() => ({
    id: 'streaming-execution-1',
    store: jest.fn(),
    child: jest.fn(),
  })),
  emitPhaseTransition: jest.fn(async () => undefined),
}));

jest.mock('@bitcode/execution-generics', () => ({
  ExecutionStreamAdapter: {
    emitEvent: jest.fn(async () => undefined),
    unregisterStreamer: jest.fn(),
  },
}));

jest.mock('@bitcode/pipeline-asset-pack/runtime-inference-policy', () => ({
  isAssetPackRealInferenceEnabled: jest.fn(() => true),
}));

jest.mock('@bitcode/pipeline-asset-pack/deposit-option-real-synthesis', () => {
  const actual = jest.requireActual('@bitcode/pipeline-asset-pack/deposit-option-real-synthesis');
  return {
    ...actual,
    synthesizeRealDepositOptionCandidates: jest.fn(),
  };
});

import { createClient } from '@bitcode/supabase/ssr/server';
import { supabaseAdmin } from '@bitcode/supabase';
import { isAssetPackRealInferenceEnabled } from '@bitcode/pipeline-asset-pack/runtime-inference-policy';
import { synthesizeRealDepositOptionCandidates } from '@bitcode/pipeline-asset-pack/deposit-option-real-synthesis';
import { POST } from '@/app/api/deposit/synthesize-options/route';

const mockSynthesize = synthesizeRealDepositOptionCandidates as jest.Mock;
const mockRealInference = isAssetPackRealInferenceEnabled as jest.Mock;

function installSupabaseMocks(options: {
  user?: { id: string } | null;
  ownedRepository?: Record<string, unknown> | null;
  githubConnection?: Record<string, unknown> | null;
}) {
  (createClient as jest.Mock).mockResolvedValue({
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: {
          user: Object.prototype.hasOwnProperty.call(options, 'user') ? options.user : { id: 'user-1' },
        },
        error: null,
      }),
    },
  });

  const executionInsert = {
    insert: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        single: jest.fn().mockResolvedValue({ data: { id: 'execution-1' }, error: null }),
      }),
    }),
    upsert: jest.fn().mockResolvedValue({ error: null }),
  };

  (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => {
    if (table === 'vcs_repositories') {
      const builder = {
        select: jest.fn(),
        eq: jest.fn(),
        maybeSingle: jest.fn().mockResolvedValue({
          data: Object.prototype.hasOwnProperty.call(options, 'ownedRepository')
            ? options.ownedRepository
            : { repo_full_name: 'engineeredsoftware/demo-python' },
          error: null,
        }),
      };
      builder.select.mockReturnValue(builder);
      builder.eq.mockReturnValue(builder);
      return builder;
    }
    if (table === 'user_connections') {
      const builder = {
        select: jest.fn(),
        eq: jest.fn(),
        maybeSingle: jest.fn().mockResolvedValue({
          data: Object.prototype.hasOwnProperty.call(options, 'githubConnection')
            ? options.githubConnection
            : { connection_data: { connectionId: '139922918', access_token: 'token' } },
          error: null,
        }),
      };
      builder.select.mockReturnValue(builder);
      builder.eq.mockReturnValue(builder);
      return builder;
    }
    if (table === 'executions') return executionInsert;
    throw new Error(`Unexpected table ${table}`);
  });

  return { executionInsert };
}

function githubTreeResponse() {
  return {
    ok: true,
    json: async () => ({
      tree: [
        { type: 'blob', path: 'README.md' },
        { type: 'blob', path: 'src/app.py' },
        { type: 'blob', path: 'secret/keys.py' },
      ],
    }),
  };
}

function githubContentResponse() {
  return {
    ok: true,
    json: async () => ({
      encoding: 'base64',
      content: Buffer.from('A demo python project.').toString('base64'),
    }),
  };
}

function createRequest(overrides: Record<string, unknown> = {}) {
  return new Request('http://localhost/api/deposit/synthesize-options', {
    method: 'POST',
    body: JSON.stringify({
      repositoryFullName: 'engineeredsoftware/demo-python',
      sourceBranch: 'main',
      sourceCommit: 'abc123',
      obfuscations: 'demo instructions',
      protectedIpExclusions: 'secret/',
      ...overrides,
    }),
  });
}

function synthesisResult() {
  return {
    lens: 'deposit',
    candidates: [
      {
        kind: 'capability-slice',
        title: 'Demo Python capability slice',
        summary:
          'A source-safe slice describing the demo application capability, its entry points, and operational behavior for future reading demand.',
        coveredSourcePaths: ['README.md', 'src/app.py'],
        measurements: [
          { measurementKind: 'source-coverage', label: 'Source coverage', weight: 0.36, volume: 0.6 },
          { measurementKind: 'demand-alignment', label: 'Demand alignment', weight: 0.4, volume: 0.7 },
          { measurementKind: 'reuse-likelihood', label: 'Reuse likelihood', weight: 0.24, volume: 0.5 },
        ],
        measurementRationale: 'Covers the primary application path and documentation.',
        confidence: 0.8,
      },
    ],
    droppedCandidateCount: 0,
    exclusionViolations: [],
    inference: { provider: 'anthropic', model: 'test-model', totalTokens: 4200, durationMs: 9000 },
  };
}

describe('POST /api/deposit/synthesize-options', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRealInference.mockReturnValue(true);
    global.fetch = jest.fn(async (url: string) =>
      url.includes('/git/trees/') ? githubTreeResponse() : githubContentResponse(),
    ) as unknown as typeof fetch;
  });

  it('requires a session', async () => {
    installSupabaseMocks({ user: null });
    const response = await POST(createRequest());
    expect(response.status).toBe(401);
  });

  it('fails closed when real inference is disabled', async () => {
    installSupabaseMocks({});
    mockRealInference.mockReturnValue(false);
    const response = await POST(createRequest());
    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({ code: 'real_inference_required' }),
    );
  });

  it('rejects repositories outside the connected inventory', async () => {
    installSupabaseMocks({ ownedRepository: null });
    const response = await POST(createRequest());
    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({ code: 'repository_not_connected' }),
    );
  });

  it('synthesizes measured options, filters exclusions from inventory, and persists real accounting', async () => {
    const { executionInsert } = installSupabaseMocks({});
    mockSynthesize.mockResolvedValue(synthesisResult());

    const response = await POST(createRequest());
    expect(response.status).toBe(200);
    const payload = await response.json();

    expect(payload.ok).toBe(true);
    expect(payload.synthesis.synthesisMode).toBe('real-bounded-inference');
    expect(payload.synthesis.pipelineCore).toBe('AssetPacksSynthesis');
    expect(payload.synthesis.optionCount).toBe(1);
    expect(payload.synthesis.exclusionPosture.excludedPathCount).toBe(1);
    expect(payload.reviewProjections[0].coveredSourcePaths).toEqual(['README.md', 'src/app.py']);

    const synthesizeInput = mockSynthesize.mock.calls[0][0];
    expect(synthesizeInput.inventory.paths).toEqual(['README.md', 'src/app.py']);
    expect(synthesizeInput.protectedIpExclusions).toEqual(['secret/']);

    expect(executionInsert.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'user-1',
        type: 'agentic-execution:asset-pack',
        status: 'completed',
        total_tokens: 4200,
        context: expect.objectContaining({
          source: 'deposit-option-synthesis',
          pipelineCore: 'AssetPacksSynthesis',
          synthesisMode: 'real-bounded-inference',
          exclusionCount: 1,
        }),
      }),
      { onConflict: 'id' },
    );
    expect(payload.runId).toMatch(/^[0-9a-f-]{36}$/i);
  });

  it('returns 502 with the failure reason when synthesis fails', async () => {
    installSupabaseMocks({});
    mockSynthesize.mockRejectedValue(new Error('AssetPacksSynthesis produced no admissible candidates.'));

    const response = await POST(createRequest());
    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({ code: 'deposit_option_synthesis_failed' }),
    );
  });
});
