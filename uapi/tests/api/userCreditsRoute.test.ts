import { POST } from '@/app/api/orbitals/credits/route';

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
    selectColumns: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: returnData, error: null }),
    update: jest.fn().mockReturnThis(),
  } as any;
}

beforeEach(() => {
  jest.resetAllMocks();
  (createClient as jest.Mock).mockResolvedValue({ auth: { getUser: mockGetUser } });
});

describe('POST /api/orbitals/credits RBAC', () => {
  it('rejects unauthenticated user with 401', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: { message: 'no auth' } });
    const res = await POST(new Request('http://localhost', { method: 'POST', body: '{}' }));
    expect(res.status).toBe(401);
  });

  it('allows admin to update credits', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });

    const profileBuilder = createQueryBuilder({ role: 'admin' });
    const record = { id: 'tx-1', credits: 42 };
    const creditsBuilder: any = {
      upsert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: record, error: null }),
    };

    (supabaseAdmin.from as jest.Mock)
      .mockReturnValueOnce(profileBuilder) // profile lookup
      .mockReturnValueOnce(creditsBuilder) // credits upsert
      .mockReturnValueOnce(profileBuilder);  // onboarding flag update

    const res = await POST(new Request('http://localhost', { method: 'POST', body: JSON.stringify({ totalCredits: 42 }) }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.newBalance).toBe(42);
  });

  it('forbids non-admin user with 403', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });

    const profileBuilder = createQueryBuilder({ role: 'dev' });
    (supabaseAdmin.from as jest.Mock).mockReturnValue(profileBuilder);

    const res = await POST(new Request('http://localhost', { method: 'POST', body: JSON.stringify({ totalCredits: 5 }) }));
    expect(res.status).toBe(403);
  });
});
