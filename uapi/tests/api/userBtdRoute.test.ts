import { POST } from '@/app/api/auxillaries/btd/route';

jest.mock('@bitcode/supabase/ssr/server', () => ({ createClient: jest.fn() }));
jest.mock('@bitcode/supabase', () => ({ supabaseAdmin: { from: jest.fn(), rpc: jest.fn() } }));

import { createClient } from '@bitcode/supabase/ssr/server';
import { supabaseAdmin } from '@bitcode/supabase';

const mockUser = { id: 'user-1' };
const mockGetUser = jest.fn();

function createQueryBuilder(returnData: any) {
  return {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    maybeSingle: jest.fn().mockResolvedValue({ data: returnData, error: null }),
    upsert: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: returnData, error: null }),
    update: jest.fn().mockReturnThis(),
  } as any;
}

beforeEach(() => {
  jest.resetAllMocks();
  (createClient as jest.Mock).mockResolvedValue({ auth: { getUser: mockGetUser } });
});

describe('POST /api/auxillaries/btd RBAC', () => {
  it('rejects unauthenticated user with 401', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: { message: 'no auth' } });
    const res = await POST(new Request('http://localhost', { method: 'POST', body: '{}' }));
    expect(res.status).toBe(401);
  });

  it('allows admin to update BTD balance', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });

    const profileBuilder = createQueryBuilder({ role: 'admin' });
    const record = { id: 'tx-1', balance: 42 };
    const balanceBuilder: any = {
      upsert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: record, error: null }),
    };

    (supabaseAdmin.from as jest.Mock)
      .mockReturnValueOnce(profileBuilder)
      .mockReturnValueOnce(balanceBuilder)
      .mockReturnValueOnce(profileBuilder);

    const res = await POST(
      new Request('http://localhost', { method: 'POST', body: JSON.stringify({ btdBalance: 42 }) }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.btdBalance).toBe(42);
    expect(body.newBalance).toBe(42);
  });

  it('forbids non-admin user with 403', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });

    const profileBuilder = createQueryBuilder({ role: 'dev' });
    (supabaseAdmin.from as jest.Mock).mockReturnValue(profileBuilder);

    const res = await POST(
      new Request('http://localhost', { method: 'POST', body: JSON.stringify({ btdBalance: 5 }) }),
    );
    expect(res.status).toBe(403);
  });
});
