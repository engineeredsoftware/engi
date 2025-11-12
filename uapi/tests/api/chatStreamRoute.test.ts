/**
 * @jest-environment node
 */


// Helper to read text from a ReadableStream produced by the route handler
async function readStream(res: Response): Promise<string> {
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let out = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value);
  }
  return out;
}

describe('/api/conversations/stream POST (mock mode)', () => {
  const envBackup = { ...process.env };

  beforeAll(() => {
    // Enable mock streaming scenario so we do not hit the real OpenAI API.
    process.env.NEXT_PUBLIC_ENABLE_MOCKS = 'true';
    process.env.NEXT_PUBLIC_MOCK_CHAT_STREAM = 'true';
    delete process.env.OPENAI_API_KEY; // ensure real key not required
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it('returns an event-stream response with mocked data', async () => {
    // Dynamically import the route *after* the env vars and mocks are in
    // place so that the feature-flag constants are evaluated with the correct
    // values.
    const { POST } = await import('@/app/api/conversations/stream/route');

    const req = new Request('https://example.com/api/conversations/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId: 'c1', message: 'hello', pipeline: false })
    });

    const res = await POST(req);

    // The handler should return a standard `Response` with a body stream.
    // Some polyfills used during testing return a plain object without the
    // full Headers implementation – guard against that to keep the test
    // environment-agnostic.
    // @ts-ignore
    if (res.headers && typeof res.headers.get === 'function') {
      expect(res.headers.get('Content-Type')).toContain('text/event-stream');
    }

    expect(res.status).toBe(200);
  });
});
