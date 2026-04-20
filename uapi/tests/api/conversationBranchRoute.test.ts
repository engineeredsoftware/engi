/**
 * @jest-environment node
 */

describe('/api/conversations/branch POST (mock mode)', () => {
  const envBackup = { ...process.env };

  beforeAll(() => {
    process.env.NEXT_PUBLIC_ENABLE_MOCKS = 'true';
    process.env.NEXT_PUBLIC_MOCK_USER_ORBITAL = 'true';
    process.env.NEXT_PUBLIC_MOCK_USER_ORBITAL_SCENARIO = 'demo';
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it('branches a mock conversation through the FS route binding', async () => {
    const { POST } = await import('@/app/api/conversations/branch/route');

    const request = new Request('https://example.com/api/conversations/branch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sourceConversationId: 'conv-bitcode-proof-closure',
        title: 'Bitcode proof closure branch',
      }),
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.id).toMatch(/^conv-/);
    expect(payload.title).toBe('Bitcode proof closure branch');
    expect(payload.user_id).toBeTruthy();
  });
});
