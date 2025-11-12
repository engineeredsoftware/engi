import { GET as getStream } from '@/app/api/executions/stream/route';

jest.mock('@engi/supabase/ssr/server', () => ({ createClient: jest.fn() }));
jest.mock('@engi/supabase', () => ({ supabaseAdmin: { from: jest.fn() } }));

import { createClient } from '@engi/supabase/ssr/server';
import { supabaseAdmin } from '@engi/supabase';

describe('Deliverables Stream Route (ordering + abort)', () => {
  const mockUser = { id: 'user-1' };
  const mockGetUser = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (createClient as jest.Mock).mockResolvedValue({ auth: { getUser: mockGetUser } });
  });

  it('orders events by created_at and respects lastTs cursor', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });

    const ownerBuilder: any = { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { user_id: mockUser.id }, error: null }) };
    const runDataBuilder: any = { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { id: 'run-1', status: 'running' }, error: null }) };

    const eventsBuilder: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      gt: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      calls: 0,
      async then() {
        this.calls++;
        if (this.calls === 1) {
          return { data: [
            { id: 'b', created_at: '2025-08-23T12:00:02Z', event_data: { type: 'phase', phase: 'setup', status: 'start' } },
            { id: 'a', created_at: '2025-08-23T12:00:01Z', event_data: { type: 'pipeline', status: 'start' } },
          ], error: null };
        }
        return { data: [], error: null };
      }
    };
    const statusBuilder: any = { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { status: 'completed', result: {} }, error: null }) };

    (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => {
      if (table === 'executions') {
        if (!ownerBuilder.__used) { ownerBuilder.__used = true; return ownerBuilder; }
        if (!runDataBuilder.__used) { runDataBuilder.__used = true; return runDataBuilder; }
        return statusBuilder;
      }
      if (table === 'execution_events') return eventsBuilder;
      return {} as any;
    });

    const req = new Request('http://localhost/api/executions/stream?runId=run-1&lastTs=2025-08-23T12:00:00Z');
    const res = await getStream(req);
    const reader = (res.body as any).getReader();
    const decoder = new TextDecoder();
    const chunks: string[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(decoder.decode(value));
    }
    const joined = chunks.join('');
    // Should include both events and maintain logical ordering by created_at
    const firstIndex = joined.indexOf('"pipeline"');
    const secondIndex = joined.indexOf('"phase"');
    expect(firstIndex).toBeGreaterThan(-1);
    expect(secondIndex).toBeGreaterThan(-1);
    expect(firstIndex).toBeLessThan(secondIndex);
  }, 15000);

  it('closes stream on client abort', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    const ownerBuilder: any = { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { user_id: mockUser.id }, error: null }) };
    const runDataBuilder: any = { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { id: 'run-1', status: 'running' }, error: null }) };
    const eventsBuilder: any = { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), gt: jest.fn().mockReturnThis(), order: jest.fn().mockReturnThis(), async then() { return { data: [], error: null }; } };
    const statusBuilder: any = { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { status: 'running' }, error: null }) };
    (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => table === 'executions' ? (!ownerBuilder.__used ? (ownerBuilder.__used=true, ownerBuilder) : (!runDataBuilder.__used ? (runDataBuilder.__used=true, runDataBuilder) : statusBuilder)) : eventsBuilder);

    // Abort the request right after starting
    const controller = new AbortController();
    const req = new Request('http://localhost/api/executions/stream?runId=run-1', { signal: controller.signal as any });
    const res = await getStream(req);
    const reader = (res.body as any).getReader();
    controller.abort();
    const { done } = await reader.read();
    expect(done).toBe(true);
  }, 15000);
});
