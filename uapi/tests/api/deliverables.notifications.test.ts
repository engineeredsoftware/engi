/**
 * @jest-environment node
 *
 * Verifies that notifications are skipped unless ENGI_ENABLE_NOTIFICATIONS==='true'.
 */

// Mock Supabase auth to return a user
jest.mock('@engi/supabase/ssr/server', () => ({
  createClient: jest.fn().mockResolvedValue({
    auth: { getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'user-1', email: 'u@example.com', user_metadata: {} } }, error: null }) }
  })
}));

// Mock ORM with notifications.create spy
const notificationsCreate = jest.fn();
jest.mock('@engi/orm', () => ({
  createAdminClient: () => ({
    deliverablePipeline: {
      createDeliverable: jest.fn().mockResolvedValue({ id: 'run-1' }),
      updateWithResults: jest.fn(),
      markFailed: jest.fn(),
      markCancelled: jest.fn()
    },
    deliverableEvents: { create: jest.fn() },
    notifications: { create: notificationsCreate },
    userCredits: { getByUserId: jest.fn(), addCredits: jest.fn() },
    userConnections: { getByUserAndProvider: jest.fn().mockResolvedValue({ connection_data: { installation_id: 1 } }) }
  })
}));

// Mock VCS service factory used by packages/api
jest.mock('@engi/vcs', () => ({ VCSService: class { constructor(_: any) {} } }));

// Mock models and credits
jest.mock('@engi/models', () => ({ getModelPricing: () => ({ multiplier: 1 }), defaultModelPricing: { provider: 'openai', model: 'gpt-4o' } }));
jest.mock('@engi/credits', () => ({ withCreditReservation: (_u: any, fn: any) => fn() }));

// Mock GA telemetry to no-op
jest.mock('@engi/google-analytics', () => ({ sendServerEvent: jest.fn() }));
jest.mock('@engi/email', () => ({ sendEmail: jest.fn() }));

describe('POST /api/executions notifications gating', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    delete process.env.ENGI_ENABLE_NOTIFICATIONS;
  });

  it('does not create notifications when flag is not enabled', async () => {
    const { POST } = await import('@/app/api/executions/route');
    const req = new Request('http://localhost/api/executions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: 'x', repoOwner: 'o', repoName: 'r', repoBranch: 'main', attachments: []
      })
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(notificationsCreate).not.toHaveBeenCalled();
  });
});

