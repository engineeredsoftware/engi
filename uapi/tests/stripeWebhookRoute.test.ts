// Tests for Stripe webhook handler
import '@/tests/setupTests';
// Mock Supabase admin
jest.mock('@bitcode/supabase', () => ({ supabaseAdmin: { from: jest.fn() } }));
// Mock stripe SDK
const mockRetrieve = jest.fn();
const mockCreate = jest.fn();
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    customers: { create: mockCreate },
    setupIntents: { retrieve: mockRetrieve }
  }));
});

import { supabaseAdmin } from '@bitcode/supabase';
import { POST } from '@/app/api/stripe/route';

describe('POST /api/stripe webhook', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns 400 on invalid JSON', async () => {
    const badReq: any = {
      headers: new Map(),
      json: async () => { throw new Error('bad'); }
    };
    const res = await POST(badReq);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toEqual({ success: false });
  });

  it('ignores non checkout events', async () => {
    const body = { type: 'other.event', data: {}, id: 'evt' };
    const req: any = {
      headers: new Map(),
      json: async () => body
    };
    // stub processed_stripe_sessions select
    (supabaseAdmin.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null })
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ success: true });
  });

  it('processes payment events and updates credits', async () => {
    const session = { id: 's1', mode: 'payment', metadata: { user_id: 'u1', credits: '5' } };
    const body = { type: 'checkout.session.completed', data: { object: session }, id: 'evt1' };
    // stub supabase process and user_credits
    (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => {
      if (table === 'processed_stripe_sessions') {
        return { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: null }), insert: jest.fn().mockReturnThis() };
      }
      if (table === 'user_credits') {
        return { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { credits: 10 }, error: null }), upsert: jest.fn().mockReturnThis(), select: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { credits: 15 }, error: null }) };
      }
      if (table === 'user_credit_usages') {
        return { insert: jest.fn().mockReturnThis() };
      }
      return { select: jest.fn(), eq: jest.fn(), single: jest.fn(), insert: jest.fn(), upsert: jest.fn(), returning: jest.fn() };
    });
    const req: any = {
      headers: new Map(),
      json: async () => body
    };
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ success: true });
    expect(supabaseAdmin.from).toHaveBeenCalledWith('user_credits');
    expect(supabaseAdmin.from).toHaveBeenCalledWith('user_credit_usages');
    expect(supabaseAdmin.from).toHaveBeenCalledWith('processed_stripe_sessions');
  });
});