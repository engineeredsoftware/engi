/**
 * @jest-environment node
 */

describe('/api/activity GET', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('returns combined execution and notification activity in mock mode', async () => {
    jest.doMock('@/config/featureFlags', () => ({
      ENABLE_MOCKS: true,
      MOCK_USER_ORBITAL: true,
      MOCK_USER_ORBITAL_SCENARIO: 'demo',
    }));

    const { GET } = await import('@/app/api/activity/route');
    const response = await GET(new Request('https://example.com/api/activity?limit=6'));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(Array.isArray(payload.records)).toBe(true);
    expect(payload.records.length).toBeGreaterThan(0);
    expect(payload.summary.transactions).toBe(0);
    expect(payload.summary.executions).toBeGreaterThan(0);
    expect(payload.summary.notifications).toBeGreaterThan(0);
    expect(payload.summary.kinds).toContain('execution');
    expect(payload.summary.kinds).toContain('notification');
  });

  it('returns an empty live activity payload when unauthenticated', async () => {
    jest.doMock('@/config/featureFlags', () => ({
      ENABLE_MOCKS: false,
      MOCK_USER_ORBITAL: false,
      MOCK_USER_ORBITAL_SCENARIO: 'default',
    }));
    jest.doMock('@bitcode/supabase/ssr/server', () => ({
      createClient: jest.fn().mockResolvedValue({
        auth: {
          getUser: jest.fn().mockResolvedValue({
            data: { user: null },
            error: new Error('unauthenticated'),
          }),
        },
      }),
    }));
    jest.doMock('@bitcode/supabase', () => ({
      supabaseAdmin: {
        from: jest.fn(),
      },
    }));

    const { GET } = await import('@/app/api/activity/route');
    const response = await GET(new Request('https://example.com/api/activity'));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({
      ok: true,
      records: [],
      summary: {
        total: 0,
        kinds: [],
        transactions: 0,
        executions: 0,
        notifications: 0,
        network: 0,
        personal: 0,
      },
    });
  });
});
