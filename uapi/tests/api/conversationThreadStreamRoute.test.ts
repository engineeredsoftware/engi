/**
 * @jest-environment node
 */

describe('/api/conversations/[conversationId]/stream POST (mock mode)', () => {
  const envBackup = { ...process.env };

  beforeAll(() => {
    process.env.NEXT_PUBLIC_ENABLE_MOCKS = 'true';
    process.env.NEXT_PUBLIC_MOCK_CHAT_STREAM = 'true';
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it('returns an event-stream response with mocked data for a specific conversation', async () => {
    const { POST } = await import('@/app/api/conversations/[conversationId]/stream/route');

    const request = new Request('https://example.com/api/conversations/conv-bitcode-proof-closure/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'hello thread', pipeline: false }),
    });

    const response = await POST(request, {
      params: Promise.resolve({ conversationId: 'conv-bitcode-proof-closure' }),
    });

    // @ts-ignore test polyfill compatibility
    if (response.headers && typeof response.headers.get === 'function') {
      expect(response.headers.get('Content-Type')).toContain('text/event-stream');
    }

    expect(response.status).toBe(200);
  });
});
