import { GET as getHistory } from '@/app/api/executions/history/route';

jest.mock('@bitcode/supabase/ssr/server', () => ({ createClient: jest.fn() }));
jest.mock('@bitcode/supabase', () => ({ supabaseAdmin: { from: jest.fn() } }));

import { createClient } from '@bitcode/supabase/ssr/server';
import { supabaseAdmin } from '@bitcode/supabase';

describe('Deliverables History GET', () => {
  const mockUser = { id: 'user-1' };
  const mockGetUser = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (createClient as jest.Mock).mockResolvedValue({ auth: { getUser: mockGetUser } });
  });

  it('returns 401 when unauthenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: new Error('no') });
    const req = new Request('http://localhost/api/executions/history');
    const res = await getHistory(req);
    expect(res.status).toBe(401);
  });

  it('returns user runs with items on success', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    const rows = [{ id: 'run-1', items: [], context: {} }];
    const builder: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: rows, error: null }),
    };
    (supabaseAdmin.from as jest.Mock).mockReturnValue(builder);
    const req = new Request('http://localhost/api/executions/history');
    const res = await getHistory(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body[0].id).toBe('run-1');
  });
});

