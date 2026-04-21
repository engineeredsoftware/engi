/**
 * @jest-environment node
 *
 * Verifies POST /api/executions creates canonical executions
 * without legacy fallbacks.
 */

jest.mock('next/server', () => ({
  NextRequest: Request,
  NextResponse: {
    json: (data: any, init?: ResponseInit) =>
      new Response(JSON.stringify(data), {
        status: init?.status ?? 200,
        headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
      }),
  },
}));

// Mock auth
jest.mock('@bitcode/supabase/ssr/server', () => ({
  createClient: jest.fn().mockResolvedValue({
    auth: { getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'user-1', email: 'u@example.com', user_metadata: {} } }, error: null }) }
  })
}));

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(),
}));

// Mock ORM
const pipelineExecutionsCreate = jest.fn().mockResolvedValue({ id: 'fixed-corr' });
const pipelineExecutionsUpdate = jest.fn();
const executionEventsCreate = jest.fn().mockResolvedValue({});
const pipelineRunsUpdate = jest.fn().mockResolvedValue({});
const log = jest.fn();
jest.mock('@bitcode/orm', () => ({
  createAdminClient: () => ({
    pipelineExecutions: { create: pipelineExecutionsCreate, update: pipelineExecutionsUpdate },
    executionEvents: { create: executionEventsCreate },
    pipelineRuns: { update: pipelineRunsUpdate },
    notifications: { create: jest.fn() },
    userConnections: { getByUserAndProvider: jest.fn().mockResolvedValue({ connection_data: { installation_id: 0 } }) },
    userCredits: { getByUserId: jest.fn(), addCredits: jest.fn() }
  })
}));

// Mock dependencies
jest.mock('@bitcode/logger', () => ({
  log,
  reinitLoggerFile: jest.fn(),
}));
jest.mock('@bitcode/vcs', () => ({
  VCSService: jest.fn().mockImplementation(() => ({})),
}));
jest.mock('@bitcode/models', () => ({
  DEFAULT_PROVIDER: 'openai',
  DEFAULT_MODEL_API: 'gpt-4o',
  getUsdPricingForApiModel: jest.fn(() => ({ input: 1, output: 1 })),
  getModelPricing: () => ({ multiplier: 1 }),
  defaultModelPricing: { provider: 'openai', model: 'gpt-4o' },
}));
jest.mock('@bitcode/google-analytics', () => ({ sendServerEvent: jest.fn() }));
jest.mock('@bitcode/email', () => ({ sendEmail: jest.fn() }));
jest.mock('@bitcode/pipeline-deliverable', () => ({ deliverablePipeline: jest.fn().mockResolvedValue({}) }));
jest.mock('@bitcode/btd', () => ({ withBtdReservation: (_: any, fn: any) => fn() }));
jest.mock('@bitcode/generic-llms', () => ({ factoryLLMRegistryWithProviders: jest.fn(() => ({})) }));
jest.mock('@bitcode/execution-generics', () => ({
  Execution: jest.fn().mockImplementation(() => ({
    id: 'fixed-corr',
    set: jest.fn(),
    store: jest.fn(),
    get: jest.fn(),
  })),
  ExecutionStreamAdapter: jest.fn(),
  NS_EXEC_DELIVERABLE_VALIDATION_RTS: 'validation-rts',
}));
jest.mock('@bitcode/pipelines-generics/src/execution/PipelineExecution', () => ({
  PipelineExecution: jest.fn().mockImplementation(() => ({})),
}));
jest.mock('@bitcode/errors', () => ({
  BitcodeError: class BitcodeError extends Error {},
  reportError: jest.fn((error: unknown) =>
    error instanceof Error ? error : new Error(typeof error === 'string' ? error : JSON.stringify(error))
  ),
}));
jest.mock('@bitcode/responses', () => ({
  createJsonResponse: (data: any, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    }),
  createErrorResponse: (error: any, status = 500) =>
    new Response(JSON.stringify({ error: String(error?.message || error) }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    }),
  createAuthErrorResponse: () =>
    new Response(JSON.stringify({ error: 'auth' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    }),
}));
jest.mock('@bitcode/streams', () => ({
  Streamer: jest.fn().mockImplementation(() => ({
    subscribe: jest.fn(),
    push: jest.fn(),
    close: jest.fn(),
    complete: jest.fn(),
    toResponse: () => new Response('', { status: 200 }),
  })),
}));

describe('POST /api/executions persistence', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env.LONG_RUNNER_QUEUE = 'true';
    // Fix correlationId
    jest.spyOn(require('crypto'), 'randomUUID').mockReturnValue('fixed-corr');
  });

  it('persists the canonical execution row with a deterministic id', async () => {
    const { POST } = await import('@/app/api/executions/route');
    const req = new Request('http://localhost/api/executions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        definition_of_done: 'x',
        repoOwner: 'o',
        repoName: 'r',
        repoBranch: 'main',
        attachments: [],
      })
    });

    const res = await POST(req);
    expect(pipelineExecutionsCreate).toHaveBeenCalledTimes(1);
    expect(pipelineExecutionsCreate.mock.calls[0][0]).toMatchObject({ id: 'fixed-corr', type: 'deliverable' });
    expect(executionEventsCreate).toHaveBeenCalledTimes(1);
    expect(executionEventsCreate.mock.calls[0][0]).toMatchObject({
      execution_id: 'fixed-corr',
      event_type: 'status',
    });
    expect(res.status).not.toBe(401);
  });
});
