import { GET } from '@/app/api/auxillaries/profile/route';

jest.mock('@bitcode/supabase/ssr/server', () => ({
  createClient: jest.fn(),
}));
jest.mock('@bitcode/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    maybeSingle: jest.fn(),
  },
}));

import { createClient } from '@bitcode/supabase/ssr/server';
import { supabaseAdmin } from '@bitcode/supabase';
import { POST } from '@/app/api/auxillaries/profile/route';

describe('GET /api/auxillaries/profile', () => {
  const mockUser = { id: 'user-1' };

  beforeEach(() => {
    (createClient as jest.Mock).mockReset();
    // Reset only call history, preserve mockReturnThis behavior
    (supabaseAdmin.from as jest.Mock).mockClear();
    (supabaseAdmin.select as jest.Mock).mockClear();
    (supabaseAdmin.eq as jest.Mock).mockClear();
    (supabaseAdmin.maybeSingle as jest.Mock).mockClear();
  });

  it('returns 401 if unauthenticated', async () => {
    const mockSupabase = { auth: { getUser: jest.fn().mockResolvedValue({ data: { user: null }, error: { message: 'no auth' } }) } };
    (createClient as jest.Mock).mockResolvedValue(mockSupabase);
    const request = new Request('http://localhost/api/auxillaries/profile');
    const response = await GET(request);
    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Authentication required');
  });

  it('returns profile data on success', async () => {
    const profileData = { user_id: 'user-1', username: 'alice' };
    const mockSupabase = { auth: { getUser: jest.fn().mockResolvedValue({ data: { user: mockUser }, error: null }) } };
    (createClient as jest.Mock).mockResolvedValue(mockSupabase);
    (supabaseAdmin.from().select().eq().maybeSingle as jest.Mock).mockResolvedValue({ data: profileData, error: null });
    const request = new Request('http://localhost/api/auxillaries/profile');
    const response = await GET(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual(profileData);
  });
});

describe('POST /api/auxillaries/profile', () => {
  const mockUser = { id: 'user-1' };
  const mockGetUser = jest.fn();
  beforeEach(() => {
    (createClient as jest.Mock).mockReset();
    (supabaseAdmin.from as jest.Mock).mockReset();
    (createClient as jest.Mock).mockResolvedValue({ auth: { getUser: mockGetUser } });
  });

  it('returns 401 if unauthenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: { message: 'no auth' } });
    const req = new Request('http://localhost/api/auxillaries/profile', { method: 'POST', body: JSON.stringify({ username: 'bob' }) });
    const res = await POST(req as any);
    expect(res.status).toBe(401);
  });

  it('returns 400 on invalid JSON', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    const badReq: any = { json: async () => { throw new Error('bad'); } };
    const res = await POST(badReq);
    expect(res.status).toBe(400);
  });

  it('returns 400 when username missing', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    const req = new Request('http://localhost/api/auxillaries/profile', { method: 'POST', body: JSON.stringify({}) });
    const res = await POST(req as any);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ error: 'Username is required' });
  });

  it('upserts profile on valid input', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    const builder: any = { upsert: jest.fn().mockReturnThis() };
    (supabaseAdmin.from as jest.Mock).mockReturnValue(builder);
    const req = new Request('http://localhost/api/auxillaries/profile', { method: 'POST', body: JSON.stringify({ username: 'bob', bio: 'hello' }) });
    const res = await POST(req as any);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body).toEqual({ success: true });
    expect(supabaseAdmin.from).toHaveBeenCalledWith('user_profiles');
    expect(builder.upsert).toHaveBeenCalledWith(expect.objectContaining({ username: 'bob', bio: 'hello' }), { onConflict: 'user_id' });
  });
});
