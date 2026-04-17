import { GET as getStream } from '@/app/api/executions/stream/route';

jest.mock('@bitcode/supabase/ssr/server', () => ({ createClient: jest.fn() }));
jest.mock('@bitcode/supabase', () => ({ supabaseAdmin: { from: jest.fn() } }));

import { createClient } from '@bitcode/supabase/ssr/server';
import { supabaseAdmin } from '@bitcode/supabase';

const createQueryBuilder = (overrides: Partial<Record<string, any>> = {}) => {
  const builder: any = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    gt: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: null, error: null }),
    maybeSingle: jest.fn().mockResolvedValue({ data: null, error: null }),
    ...overrides
  };
  return builder;
};

describe('Deliverables Stream Route (SSE)', () => {
  const mockUser = { id: 'user-1' };
  const mockGetUser = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (createClient as jest.Mock).mockResolvedValue({ auth: { getUser: mockGetUser } });
  });

  it('requires runId param', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    const req = new Request('http://localhost/api/executions/stream');
    const res = await getStream(req);
    expect(res.status).toBe(400);
  });

  it('returns 404 for non-owned run', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    const runOwner = createQueryBuilder({ single: jest.fn().mockResolvedValue({ data: { user_id: 'other' }, error: null }) });
    const defaultBuilder = createQueryBuilder();
    (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => (table === 'executions' ? runOwner : defaultBuilder));
    const req = new Request('http://localhost/api/executions/stream?runId=run-1');
    const res = await getStream(req);
    expect(res.status).toBe(404);
  });

  it('streams SSE with initial status and end marker', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    const ownerBuilder = createQueryBuilder({ single: jest.fn().mockResolvedValue({ data: { user_id: mockUser.id }, error: null }) });
    const runDataBuilder = createQueryBuilder({ single: jest.fn().mockResolvedValue({ data: { id: 'run-1', status: 'running' }, error: null }) });
    const eventsBuilder: any = {
      select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), gt: jest.fn().mockReturnThis(), order: jest.fn().mockReturnThis(),
      // First poll: return two events; subsequent calls return an empty array
      mockEvents: [
        { id: 1, event_data: { type: 'pipeline', status: 'start' } },
        { id: 2, event_data: { type: 'phase', phase: 'setup', status: 'start' } },
      ],
      async then() { return { data: this.mockEvents.splice(0), error: null }; }
    };
    const statusBuilder: any = {
      select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { status: 'completed', result: { success: true } }, error: null })
    };
    (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => {
      if (table === 'executions') {
        // owner check called first, then run data, then status checks; return appropriate builder
        if (!ownerBuilder.__used) { ownerBuilder.__used = true; return ownerBuilder; }
        if (!runDataBuilder.__used) { runDataBuilder.__used = true; return runDataBuilder; }
        return statusBuilder;
      }
      if (table === 'execution_events') return eventsBuilder;
      return {} as any;
    });

    const req = new Request('http://localhost/api/executions/stream?runId=run-1');
    const res = await getStream(req);
    const contentType = typeof res.headers?.get === 'function'
      ? res.headers.get('Content-Type')
      : (res.headers as any)?.['Content-Type'];
    expect(contentType).toContain('text/event-stream');

    // Consume a few chunks from the stream
    const reader = (res.body as any).getReader();
    const decoder = new TextDecoder();
    const chunks: string[] = [];
    // Read until stream ends
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(decoder.decode(value));
    }
    const joined = chunks.join('');
    expect(joined).toContain('"type":"stream_start"');
    expect(joined).toContain('"type":"pipeline"');
    expect(joined).toContain('"type":"phase"');
    expect(joined).toContain('"type":"stream_end"');
  }, 15000);
});
