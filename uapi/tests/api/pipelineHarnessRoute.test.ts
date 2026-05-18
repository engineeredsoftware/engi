/**
 * @jest-environment node
 */

const mockGetUser = jest.fn();
const mockBuildAssetPackSandboxHarness = jest.fn();
const mockLoadVercelSandboxFactory = jest.fn();
let mockHostOptions: { onEvent?: (event: unknown) => void | Promise<void> } | null = null;
let mockCapturedPlan: any = null;

jest.mock('@bitcode/supabase/ssr/server', () => ({
  createClient: jest.fn(async () => ({
    auth: {
      getUser: mockGetUser,
    },
  })),
}));

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({})),
}));

jest.mock('@bitcode/vcs', () => ({
  VCSConnections: jest.fn(),
}));

jest.mock('@bitcode/pipeline-hosts', () => ({
  buildAssetPackSandboxHarness: (...args: unknown[]) => mockBuildAssetPackSandboxHarness(...args),
  loadVercelSandboxFactory: (...args: unknown[]) => mockLoadVercelSandboxFactory(...args),
  VercelSandboxPipelineHost: class {
    constructor(options: { onEvent?: (event: unknown) => void | Promise<void> }) {
      mockHostOptions = options;
    }

    async runHarness(plan: unknown) {
      mockCapturedPlan = plan;
      await mockHostOptions?.onEvent?.({
        type: 'sandbox-created',
        timestamp: '2026-05-18T10:30:00.000Z',
        sandboxId: 'sbx-local-route-test',
        status: 'running',
      });
      return {
        sandboxId: 'sbx-local-route-test',
        finalStatus: 'stopped',
        manifest: (plan as { manifest?: unknown }).manifest,
        commands: [
          {
            label: 'asset-pack-pipeline-run',
            cmd: 'pnpm',
            args: ['qa'],
            exitCode: 0,
            stdout: `used ${process.env.OPENAI_API_KEY}`,
            stderr: `kept ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            startedAt: '2026-05-18T10:30:01.000Z',
            completedAt: '2026-05-18T10:30:02.000Z',
          },
        ],
        artifacts: {
          evidence: {
            schema: 'bitcode.pipeline-harness.evidence',
            resultState: 'blocked_readiness',
            output: {
              fitResult: {
                resultState: 'worthy_fit',
                selectedCandidateAssetIds: ['asset-repository-revision'],
              },
              depositorySearch: {
                searchedAssetCount: 1,
              },
              ledgerSettlement: {
                status: 'blocked',
              },
            },
          },
          telemetry: '{"type":"pipeline-stream-event","runId":"route-run","stage":"asset-pack-synthesis"}\n',
        },
        outcome: 'completed',
        stopped: true,
      };
    }
  },
}));

import { runAssetPackHarnessRoute } from '@/app/api/pipeline-harness/asset-pack/runner';
import { POST } from '@/app/api/pipeline-harness/asset-pack/route';

const responseWithJson = Response as typeof Response & {
  json?: (body: unknown, init?: ResponseInit) => Response;
};

if (typeof responseWithJson.json !== 'function') {
  responseWithJson.json = (body: unknown, init?: ResponseInit) => {
    return new Response(JSON.stringify(body), {
      ...init,
      headers: { 'Content-Type': 'application/json' },
    });
  };
}

function fakeSupabaseJwt(role: string, ref = 'route-test-project'): string {
  return [
    Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url'),
    Buffer.from(JSON.stringify({ role, ref })).toString('base64url'),
    'route-test-signature',
  ].join('.');
}

const adminCredential = fakeSupabaseJwt('service_role', 'staging-testnet');
const staleAdminCredential = fakeSupabaseJwt('service_role', 'production-mainnet');
const modelCredential = 'model-credential-placeholder';

const ENV_KEYS = [
  'BITCODE_ENABLE_PIPELINE_HARNESS_API',
  'BITCODE_PIPELINE_HARNESS_REQUIRE_REAL_INFERENCE',
  'BITCODE_ASSET_PACK_REAL_INFERENCE',
  'BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE',
  'BITCODE_PIPELINE_HARNESS_MAX_RUNTIME_MS',
  'OPENAI_API_KEY',
  'SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_SECRET_KEY',
  'SUPABASE_ADMIN_KEY',
  'SUPABASE_DB_URL',
  'DATABASE_URL',
  'NODE_ENV',
  'VERCEL',
  'VERCEL_ENV',
] as const;

const originalEnv = Object.fromEntries(
  ENV_KEYS.map((key) => [key, process.env[key]]),
) as Record<(typeof ENV_KEYS)[number], string | undefined>;

function restoreEnv() {
  for (const key of ENV_KEYS) {
    const value = originalEnv[key];
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

function validHarnessBody(overrides: Record<string, unknown> = {}) {
  return {
    mode: 'asset_pack_pipeline',
    repositoryFullName: 'engineeredsoftware/ENGI',
    sourceBranch: 'main',
    sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
    readId: 'read-activity',
    depositId: 'deposit-activity',
    assumeRepositoryPresent: true,
    ...overrides,
  };
}

function requestFor(body: Record<string, unknown>) {
  return new Request('http://localhost/api/pipeline-harness/asset-pack', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/pipeline-harness/asset-pack', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    restoreEnv();
    delete process.env.VERCEL;
    delete process.env.VERCEL_ENV;
    process.env.NODE_ENV = 'development';
    process.env.SUPABASE_URL = 'https://staging.example.test';
    process.env.SUPABASE_SERVICE_ROLE_KEY = adminCredential;
    process.env.OPENAI_API_KEY = modelCredential;
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-local-route' } }, error: null });
    mockBuildAssetPackSandboxHarness.mockImplementation((input) => ({
      manifest: {
        schema: 'bitcode.pipeline-harness.manifest',
        harnessMode: input.mode,
      },
      files: [],
      commands: [],
      artifactPaths: {
        evidence: '.bitcode/pipeline-harness/evidence.json',
        telemetry: '.bitcode/pipeline-harness/telemetry.jsonl',
      },
    }));
    mockLoadVercelSandboxFactory.mockResolvedValue({ create: jest.fn() });
    mockHostOptions = null;
    mockCapturedPlan = null;
  });

  afterAll(() => {
    restoreEnv();
  });

  it('fails closed in production unless the harness API is explicitly enabled', async () => {
    process.env.VERCEL_ENV = 'production';
    delete process.env.BITCODE_ENABLE_PIPELINE_HARNESS_API;

    const response = await POST(requestFor(validHarnessBody()) as any);

    await expect(response.json()).resolves.toEqual({ error: 'pipeline_harness_disabled' });
    expect(response.status).toBe(404);
    expect(mockGetUser).not.toHaveBeenCalled();
    expect(mockBuildAssetPackSandboxHarness).not.toHaveBeenCalled();
  });

  it('rejects unauthenticated route calls before sandbox execution', async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: null },
      error: new Error('missing session'),
    });

    const response = await POST(requestFor(validHarnessBody()) as any);

    await expect(response.json()).resolves.toEqual({ error: 'unauthorized' });
    expect(response.status).toBe(401);
    expect(mockBuildAssetPackSandboxHarness).not.toHaveBeenCalled();
  });

  it('rejects incomplete harness requests before sandbox execution', async () => {
    const response = await POST(requestFor({}) as any);

    await expect(response.json()).resolves.toEqual({ error: 'repositoryFullName is required' });
    expect(response.status).toBe(400);
    expect(mockBuildAssetPackSandboxHarness).not.toHaveBeenCalled();
  });

  it('streams a local strict preflight failure before sandbox creation', async () => {
    process.env.BITCODE_PIPELINE_HARNESS_REQUIRE_REAL_INFERENCE = '1';
    delete process.env.BITCODE_ASSET_PACK_REAL_INFERENCE;

    const events: Array<{ event: string; data: any }> = [];
    await runAssetPackHarnessRoute(
      validHarnessBody(),
      'user-local-route',
      (event, data) => events.push({ event, data }),
      { runId: 'route-test-run', logErrors: false },
    );

    expect(events.map((event) => event.event)).toEqual([
      'harness-started',
      'harness-preflight',
      'harness-failed',
    ]);
    expect(events[1].data).toMatchObject({
      realInferenceRequired: true,
      realInferenceEnabled: false,
      deployedRuntime: false,
    });
    expect(events[2].data.runId).toBe('route-test-run');
    expect(events[2].data.error).toContain('BITCODE_ASSET_PACK_REAL_INFERENCE=1');
    expect(mockBuildAssetPackSandboxHarness).not.toHaveBeenCalled();
    expect(mockLoadVercelSandboxFactory).not.toHaveBeenCalled();
  });

  it('blocks mixed Supabase REST and DB hosts before sandbox creation', async () => {
    process.env.BITCODE_PIPELINE_HARNESS_REQUIRE_REAL_INFERENCE = '1';
    process.env.BITCODE_ASSET_PACK_REAL_INFERENCE = '1';
    process.env.BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE = 'bounded';
    process.env.SUPABASE_DB_URL =
      'postgresql://postgres:password@db.other-staging.example.test:5432/postgres?sslmode=require';

    const events: Array<{ event: string; data: any }> = [];
    await runAssetPackHarnessRoute(
      validHarnessBody(),
      'user-local-route',
      (event, data) => events.push({ event, data }),
      { runId: 'route-test-run', logErrors: false },
    );

    expect(events.map((event) => event.event)).toEqual([
      'harness-started',
      'harness-preflight',
      'harness-failed',
    ]);
    expect(events[1].data).toMatchObject({
      supabaseHost: 'staging.example.test',
      supabaseDbHost: 'db.other-staging.example.test',
      supabaseRestDbHostAligned: false,
    });
    expect(events[2].data.runId).toBe('route-test-run');
    expect(events[2].data.error).toContain('Supabase REST host must match DB readback host');
    expect(mockBuildAssetPackSandboxHarness).not.toHaveBeenCalled();
  });

  it('blocks rejected staging Supabase REST credentials before sandbox creation', async () => {
    process.env.BITCODE_PIPELINE_HARNESS_REQUIRE_REAL_INFERENCE = '1';
    process.env.BITCODE_ASSET_PACK_REAL_INFERENCE = '1';
    process.env.BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE = 'bounded';

    const events: Array<{ event: string; data: any }> = [];
    await runAssetPackHarnessRoute(
      validHarnessBody(),
      'user-local-route',
      (event, data) => events.push({ event, data }),
      {
        runId: 'route-test-run',
        logErrors: false,
        fetchImpl: async () => ({
          ok: false,
          status: 401,
          statusText: 'Unauthorized',
          json: async () => ({ message: 'Invalid API key' }),
        } as Response),
      },
    );

    expect(events.map((event) => event.event)).toEqual([
      'harness-started',
      'harness-preflight',
      'harness-failed',
    ]);
    expect(events[2].data.runId).toBe('route-test-run');
    expect(events[2].data.error).toContain('Supabase REST readback credential check failed');
    expect(events[2].data.error).toContain('no admin-capable Supabase credential was accepted');
    expect(events[2].data.error).toContain('Invalid API key');
    expect(mockBuildAssetPackSandboxHarness).not.toHaveBeenCalled();
  });

  it('uses the Supabase credential accepted by the staging Data API when stale admin keys are also present', async () => {
    process.env.BITCODE_PIPELINE_HARNESS_REQUIRE_REAL_INFERENCE = '1';
    process.env.BITCODE_ASSET_PACK_REAL_INFERENCE = '1';
    process.env.BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE = 'bounded';
    process.env.SUPABASE_SERVICE_ROLE_KEY = staleAdminCredential;
    process.env.SUPABASE_SECRET_KEY = adminCredential;

    const events: Array<{ event: string; data: any }> = [];
    await runAssetPackHarnessRoute(
      validHarnessBody(),
      'user-local-route',
      (event, data) => events.push({ event, data }),
      {
        runId: 'route-test-run',
        logErrors: false,
        fetchImpl: async (_url, init) => {
          const headers = new Headers(init?.headers);
          const accepted = headers.get('apikey') === adminCredential;
          return {
            ok: accepted,
            status: accepted ? 200 : 401,
            statusText: accepted ? 'OK' : 'Unauthorized',
            json: async () => (accepted ? [] : { message: 'Invalid API key' }),
          } as Response;
        },
      },
    );

    expect(events.map((event) => event.event)).toEqual([
      'harness-started',
      'harness-preflight',
      'harness-event',
      'harness-completed',
    ]);
    expect(mockBuildAssetPackSandboxHarness).toHaveBeenCalledWith(
      expect.objectContaining({
        commandEnvironment: expect.objectContaining({
          SUPABASE_SERVICE_ROLE_KEY: adminCredential,
        }),
      }),
    );
  });

  it('forwards strict local route context and redacts secrets from completion output', async () => {
    process.env.BITCODE_PIPELINE_HARNESS_REQUIRE_REAL_INFERENCE = '1';
    process.env.BITCODE_ASSET_PACK_REAL_INFERENCE = '1';
    process.env.BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE = 'bounded';
    process.env.BITCODE_PIPELINE_HARNESS_MAX_RUNTIME_MS = '600000';

    const events: Array<{ event: string; data: any }> = [];
    await runAssetPackHarnessRoute(
      validHarnessBody(),
      'user-local-route',
      (event, data) => events.push({ event, data }),
      {
        runId: 'route-test-run',
        logErrors: false,
        fetchImpl: async () => ({
          ok: true,
          status: 200,
          statusText: 'OK',
          json: async () => ([]),
        } as Response),
      },
    );
    const eventText = JSON.stringify(events);

    expect(events.map((event) => event.event)).toEqual([
      'harness-started',
      'harness-preflight',
      'harness-event',
      'harness-completed',
    ]);
    expect(events[1].data).toMatchObject({
      realInferenceRequired: true,
      realInferenceEnabled: true,
      realInferenceProfile: 'bounded',
      runtimeBudgetMs: 600000,
      supabaseHost: 'staging.example.test',
    });
    expect(events[2].data).toMatchObject({
      type: 'sandbox-created',
      sandboxId: 'sbx-local-route-test',
    });
    expect(events[3].data).toMatchObject({
      outcome: 'completed',
      evidencePresent: true,
      telemetryPresent: true,
      telemetryLineCount: 1,
      evidence: {
        resultState: 'blocked_readiness',
        fitResult: {
          resultState: 'worthy_fit',
        },
      },
    });
    expect(eventText).toContain('[redacted]');
    expect(eventText).not.toContain(modelCredential);
    expect(eventText).not.toContain(adminCredential);
    expect(mockBuildAssetPackSandboxHarness).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'asset_pack_pipeline',
        assumeRepositoryPresent: true,
        commandEnvironment: expect.objectContaining({
          BITCODE_PIPELINE_HARNESS_REQUIRE_REAL_INFERENCE: '1',
          BITCODE_ASSET_PACK_REAL_INFERENCE: '1',
          BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE: 'bounded',
          BITCODE_PIPELINE_HARNESS_MAX_RUNTIME_MS: '600000',
          BITCODE_PIPELINE_USER_ID: 'user-local-route',
          BITCODE_PIPELINE_STREAM_TO_DATABASE: '1',
          BITCODE_PIPELINE_STRUCTURED_DB: '1',
          BITCODE_LLM_PROVIDER: 'openai',
        }),
      }),
    );
    expect(mockCapturedPlan).toMatchObject({
      manifest: {
        schema: 'bitcode.pipeline-harness.manifest',
      },
    });
  });
});
