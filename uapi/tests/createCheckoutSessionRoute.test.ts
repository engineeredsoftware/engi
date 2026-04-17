// Mock Stripe SDK
const mockCreate = jest.fn();
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    checkout: { sessions: { create: mockCreate } },
  }));
});

import { POST } from '@/app/api/create-checkout-session/route';
jest.mock('@bitcode/supabase/ssr/server', () => ({ createClient: jest.fn() }));

import { createClient } from '@bitcode/supabase/ssr/server';

const ORIGINAL_ENV = process.env;

describe('POST /api/create-checkout-session', () => {
  const mockUser = { id: 'user-1', email: 'a@b.com' };
  const mockGetUser = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    process.env = {
      ...ORIGINAL_ENV,
      STRIPE_SECRET_KEY: 'sk_test',
      STRIPE_PRICE_ID_MINI: 'price_mini',
      STRIPE_PRICE_ID_STARTER: 'price_starter',
      STRIPE_PRICE_ID_PRO: 'price_pro',
    } as NodeJS.ProcessEnv;
    (createClient as jest.Mock).mockResolvedValue({ auth: { getUser: mockGetUser } });
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('returns 401 if unauthenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: { message: 'no auth' } });
    const res = await POST(new Request('http://localhost/api/create-checkout-session', { method: 'POST', body: JSON.stringify({ planId: 'mini' }) }));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body).toEqual({ error: 'Unauthorized' });
  });

  it('returns 400 on invalid JSON', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    const res = await POST(new Request('http://localhost/api/create-checkout-session', { method: 'POST', body: '{bad json', headers: { 'Content-Type': 'application/json' } }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ error: 'Invalid JSON' });
  });

  it('returns 400 if planId missing', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    const res = await POST(new Request('http://localhost/api/create-checkout-session', { method: 'POST', body: JSON.stringify({}) }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ error: 'planId is required' });
  });

  it('returns 400 on unknown planId', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    const res = await POST(new Request('http://localhost/api/create-checkout-session', { method: 'POST', body: JSON.stringify({ planId: 'foo' }) }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ error: 'Unknown planId: foo' });
  });

  it('returns 400 on ultra plan with invalid customCredits', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    const res = await POST(new Request('http://localhost/api/create-checkout-session', {
      method: 'POST', body: JSON.stringify({ planId: 'ultra', customCredits: -5 })
    }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toEqual({ error: 'customCredits must be a positive number for ultra plan' });
  });

  it('creates session for standard plan', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    mockCreate.mockResolvedValue({ id: 'sess-1', url: 'https://checkout.test' });
    const req = new Request('http://localhost/api/create-checkout-session', { method: 'POST', headers: { origin: 'https://app.test' }, body: JSON.stringify({ planId: 'mini' }) });
    const res = await POST(req);
    expect(mockCreate).toHaveBeenCalled();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ sessionId: 'sess-1', url: 'https://checkout.test' });
  });

  it('creates session for ultra plan', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    mockCreate.mockResolvedValue({ id: 'sess-2', url: 'https://checkout.ultra' });
    const req = new Request('http://localhost/api/create-checkout-session', { method: 'POST', headers: { origin: 'https://app.test' }, body: JSON.stringify({ planId: 'ultra', customCredits: 100 }) });
    const res = await POST(req);
    expect(mockCreate).toHaveBeenCalled();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ sessionId: 'sess-2', url: 'https://checkout.ultra' });
  });
});
