import { GET as getRunHistory } from '@/app/api/executions/history/[runId]/route';

jest.mock('@bitcode/supabase/ssr/server', () => ({
  createClient: jest.fn(),
}));

jest.mock('@bitcode/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn(),
  },
}));

const { createClient } = require('@bitcode/supabase/ssr/server');
const { supabaseAdmin } = require('@bitcode/supabase');

describe('GET /api/executions/history/[runId]', () => {
  const mockUser = { id: 'user-1' };
  const mockGetUser = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (createClient as jest.Mock).mockResolvedValue({
      auth: { getUser: mockGetUser },
    });
  });

  it('fails closed to an empty run payload when unauthenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: new Error('no') });

    const req = new Request('http://localhost/api/executions/history/run-1');
    const res = await getRunHistory(req, { params: { runId: 'run-1' } });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ run: null, events: [] });
  });

  it('returns execution with normalized events', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });

    const runBuilder: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      maybeSingle: jest
        .fn()
        .mockResolvedValue({
          data: {
            id: 'run-1',
            user_id: mockUser.id,
            created_at: new Date().toISOString(),
            items: [],
            context: {},
          },
          error: null,
        }),
    };

    const eventsBuilder: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({
        data: [
          {
            id: '1',
            run_id: 'run-1',
            event_type: 'pipeline',
            event_data: { type: 'pipeline', status: 'start' },
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            run_id: 'run-1',
            event_type: 'completion',
            event_data: { type: 'completion' },
            created_at: new Date().toISOString(),
          },
        ],
        error: null,
      }),
    };

    (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => {
      if (table === 'executions') return runBuilder;
      if (table === 'execution_events') return eventsBuilder;
      return { select: jest.fn().mockReturnThis() };
    });

    const req = new Request('http://localhost/api/executions/history/run-1');
    const res = await getRunHistory(req, { params: { runId: 'run-1' } });
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.run.id).toBe('run-1');
    expect(Array.isArray(json.events)).toBe(true);
    expect(json.events[0].event.type).toBe('pipeline');
    expect(json.events[1].event.type).toBe('completion');
  });
});
