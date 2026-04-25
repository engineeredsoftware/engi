/**
 * @jest-environment node
 */

describe('/api/vcs routes (mock mode)', () => {
  const envBackup = { ...process.env };

  beforeAll(() => {
    process.env.NEXT_PUBLIC_ENABLE_MOCKS = 'true';
    process.env.NEXT_PUBLIC_MOCK_USER_ORBITAL = 'true';
    process.env.NEXT_PUBLIC_MOCK_USER_ORBITAL_SCENARIO = 'demo';
  });

  afterAll(() => {
    process.env = envBackup;
  });

  beforeEach(() => {
    jest.resetModules();
  });

  it('returns a deterministic GitHub connection payload for the orbitals connects pane', async () => {
    const { GET } = await import('@/app/api/vcs/[provider]/connection/route');
    const request = new Request('https://example.com/api/vcs/github/connection');

    const response = await GET(request as any, { params: { provider: 'github' } } as any);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.connected).toBe(true);
    expect(payload.valid).toBe(true);
    expect(payload.provider).toBe('github');
    expect(payload.username).toBe('bitcode');
    expect(payload.metadata.account).toBe('bitcode');
  });

  it('returns deterministic mock repositories for the application-owned GitHub carrier', async () => {
    const { GET } = await import('@/app/api/vcs/[provider]/repositories/route');
    const request = new Request('https://example.com/api/vcs/github/repositories');

    const response = await GET(request as any, { params: { provider: 'github' } } as any);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(payload.repositories)).toBe(true);
    expect(payload.repositories.length).toBeGreaterThan(0);
    expect(payload.inventorySource).toBe('mock_repository_inventory');
    expect(payload.repositories[0].fullName).toBe('bitcode/bitcode');
  });

  it('accepts PAT connect requests in mock mode without falling through to legacy HTML routes', async () => {
    const { POST } = await import('@/app/api/vcs/[provider]/connect-token/route');
    const request = new Request('https://example.com/api/vcs/github/connect-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: 'mock-token',
      }),
    });

    const response = await POST(request as any, { params: { provider: 'github' } } as any);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.success).toBe(true);
    expect(payload.provider).toBe('github');
    expect(payload.connection.connected).toBe(true);
  });
});
