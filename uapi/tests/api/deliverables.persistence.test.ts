/**
 * @jest-environment node
 *
 * Verifies POST /api/executions creates canonical executions
 * without legacy fallbacks.
 */

// Mock auth
jest.mock('@bitcode/supabase/ssr/server', () => ({
  createClient: jest.fn().mockResolvedValue({
    auth: { getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'user-1', email: 'u@example.com', user_metadata: {} } }, error: null }) }
  })
}));

// Mock ORM
const pipelineExecutionsCreate = jest.fn().mockResolvedValue({ id: 'fixed-corr' });
const pipelineExecutionsUpdate = jest.fn();
jest.mock('@bitcode/orm', () => ({
  createAdminClient: () => ({
    pipelineExecutions: { create: pipelineExecutionsCreate, update: pipelineExecutionsUpdate },
    notifications: { create: jest.fn() },
    userConnections: { getByUserAndProvider: jest.fn().mockResolvedValue({ connection_data: { installation_id: 0 } }) },
    userCredits: { getByUserId: jest.fn(), addCredits: jest.fn() }
  })
}));

// Mock dependencies
jest.mock('@bitcode/models', () => ({ getModelPricing: () => ({ multiplier: 1 }), defaultModelPricing: { provider: 'openai', model: 'gpt-4o' } }));
jest.mock('@bitcode/google-analytics', () => ({ sendServerEvent: jest.fn() }));
jest.mock('@bitcode/email', () => ({ sendEmail: jest.fn() }));
jest.mock('@bitcode/pipeline-deliverable', () => ({ deliverablePipeline: jest.fn().mockResolvedValue({}) }));
jest.mock('@bitcode/credits', () => ({ withCreditReservation: (_: any, fn: any) => fn() }));

describe('POST /api/executions persistence', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    // Fix correlationId
    jest.spyOn(require('crypto'), 'randomUUID').mockReturnValue('fixed-corr');
  });

  it('creates executions with correct id', async () => {
    const { POST } = await import('@/app/api/executions/route');
    const req = new Request('http://localhost/api/executions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: 'x', repoOwner: 'o', repoName: 'r', repoBranch: 'main', attachments: [] })
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    expect(pipelineExecutionsCreate).toHaveBeenCalledTimes(1);
    expect(pipelineExecutionsCreate.mock.calls[0][0]).toMatchObject({ id: 'fixed-corr', type: 'deliverable' });
  });
});
