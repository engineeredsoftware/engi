import { GET, POST } from '@/app/api/executions/instructions/route';
import { createClient } from '@bitcode/supabase/ssr/server';
import { supabaseAdmin } from '@bitcode/supabase';
import { getUserBySessionOrThrow } from '@bitcode/auth';

jest.mock('@bitcode/supabase/ssr/server');
jest.mock('@bitcode/supabase');
jest.mock('@bitcode/auth');

describe('AssetPack OTF Instructions API', () => {
  const fakeUser = { id: 'user-1' };
  beforeEach(() => {
    (getUserBySessionOrThrow as jest.Mock).mockResolvedValue(fakeUser);
    const mockFrom: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
    };
    (supabaseAdmin.from as jest.Mock).mockReturnValue(mockFrom);
  });

  it('GET should return stored instructions', async () => {
    const instr = { id: 'i1', content: 'Test', attachments: null, state: 'accepted', created_at: '2025-01-01T00:00:00Z' };
    (supabaseAdmin.from().select as jest.Mock).mockReturnThis();
    supabaseAdmin.from().single.mockResolvedValue({ data: [instr], error: null });
    // Actually we need .select().eq().eq().order() => returns { data, error }
    supabaseAdmin.from().select.mockReturnValue({ data: [instr], error: null });
    const req = new Request('https://test/?runId=run1');
    const res = await GET(req as any);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual([instr]);
  });

  it('POST should insert and return new instruction', async () => {
    const newInst = { id: 'i2', content: 'Hello', attachments: [], state: 'accepted', created_at: '2025-01-01T01:00:00Z' };
    supabaseAdmin.from().insert.mockReturnValue({ data: newInst, error: null, single: () => Promise.resolve({ data: newInst, error: null }) });
    const body = { runId: 'run1', content: 'Hello' };
    const req = new Request('https://test/', { method: 'POST', body: JSON.stringify(body) });
    const res = await POST(req as any);
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data).toEqual(newInst);
  });
});
