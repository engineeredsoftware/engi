/**
 * @jest-environment node
 */

jest.mock('@bitcode/supabase/ssr/server', () => ({
  createClient: jest.fn(async () => ({
    auth: {
      getUser: jest.fn(async () => ({
        data: { user: null },
        error: null,
      })),
    },
  })),
}));

describe('/api/templates/deliverables route', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('fails closed to an empty template list when no user session is present', async () => {
    const { GET } = await import('@/app/api/templates/deliverables/route');

    const response = await GET(new Request('https://example.com/api/templates/deliverables'));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({ templates: [] });
  });
});
