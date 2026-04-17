/**
 * @jest-environment node
 */
import { POST } from '@/app/api/stripe/route';
import { createClient } from '@bitcode/supabase/ssr/server';
import { supabaseAdmin } from '@bitcode/supabase';

// Provide a stub implementation for the singleton admin client used by the
// API route. Each test case rewires the behaviour of `.from`, so we only need
// to supply an object with that method mocked.
jest.mock('@bitcode/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn(),
  },
}));

// Stub the server-side Supabase client factory for all tests in this file. We
// initialise it with `jest.fn()` so individual test cases can safely call
// `.mockResolvedValue()` on it without worrying about TypeScript narrowing.
jest.mock('@bitcode/supabase/ssr/server', () => ({
  createClient: jest.fn(),
}));

// ---------------------------------------------
// Stripe mock helpers
// ---------------------------------------------

// We need a reference to `mockConstructEvent` in both the jest.mock factory
// (which is hoisted) and in the tests themselves.  Using `let` avoids the TDZ
// "cannot access before initialization" error that occurs with `const` when the
// mock factory executes prior to the assignment.

let mockConstructEvent: jest.Mock;

jest.mock('stripe', () => {
  return function(_secret: string) {
    return {
      webhooks: {
        constructEvent: (...args: any[]) => mockConstructEvent(...args),
      },
      customers: { create: jest.fn() },
      paymentMethods: { attach: jest.fn() },
      checkout: {
        sessions: {
          // Provide a stub listLineItems that returns an adjustable quantity of 1
          listLineItems: jest.fn().mockResolvedValue({ data: [ { quantity: 150 } ] }),
        },
      },
    };
  };
});

// Initialise the mock after the factory has been evaluated.
mockConstructEvent = jest.fn();

// Helper to build Next.js Request with headers and body
function makeRequest(body: any, signature: string) {
  return new Request('https://example.com/api/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'stripe-signature': signature
    },
    body: JSON.stringify(body)
  });
}

describe('Stripe Webhook POST', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';
  });

  it('handles valid checkout.session.completed and ai_documents credits', async () => {
    // Mock event verification
    const fakeEvent = {
      id: 'evt_test',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'sess_test',
          mode: 'payment',
          payment_status: 'paid',
          metadata: { user_id: 'user123', credits: '150' }
        }
      }
    };
    mockConstructEvent.mockReturnValueOnce(fakeEvent);
    // Mock auth client
    (createClient as jest.Mock).mockResolvedValue({
      auth: { getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'user123' } } }) }
    });
    // Track calls per table
    const processedBuilder: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: null }),
      insert: jest.fn().mockResolvedValue({ data: null }),
      then: function(resolve: any) { return resolve({ data: null }); }
    };
    const creditUpsertBuilder: any = {
      upsert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { credits: 150 }, error: null }),
      then: function(resolve: any) { return resolve({ data: null }); }
    };
    const creditSelectBuilder: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { credits: 0 }, error: null }),
      upsert: jest.fn().mockImplementation((...args: any[]) => {
        // Delegate to the upsert spy on the second builder so tests can assert
        // that the upsert operation occurred.
        creditUpsertBuilder.upsert(...args);
        return creditUpsertBuilder;
      }),
      then: function(resolve: any) { return resolve({ data: null }); }
    };
    const usageInsertBuilder: any = { insert: jest.fn().mockResolvedValue({}) };
    // Mock supabaseAdmin.from
    (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => {
      if (table === 'processed_stripe_sessions') return processedBuilder;
      if (table === 'user_credits') return creditSelectBuilder;
      if (table === 'user_credit_usages') return usageInsertBuilder;
      return { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: null }), insert: jest.fn() };
    });
    // Execute handler
    const req = makeRequest({}, 'sig');
    const res = await POST(req as any);
    const json = await res.json();
    expect(json.success).toBe(true);
    // Check credit upsert and usage insert called. Depending on how the
    // Supabase query builders are reused inside the webhook handler the
    // `upsert` invocation may be recorded on either the original builder or
    // the secondary builder returned by `upsert()`.  Accept either to keep
    // the test resilient to implementation details.
    expect(
      creditUpsertBuilder.upsert.mock.calls.length +
        (creditSelectBuilder.upsert as jest.Mock).mock.calls.length
    ).toBeGreaterThan(0);
    expect(usageInsertBuilder.insert).toHaveBeenCalledWith(expect.objectContaining({
      user_id: 'user123',
      change: 150,
      balance: 150
    }));
    expect(processedBuilder.insert).toHaveBeenCalledWith({ session_id: 'sess_test', event_id: 'evt_test' });
  });

  it('returns 400 for invalid signature', async () => {
    mockConstructEvent.mockImplementationOnce(() => { throw new Error('Invalid signature'); });
    const req = makeRequest({}, 'bad_sig');
    const res = await POST(req as any);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
  });

  it('skips processing duplicate sessions', async () => {
    const fakeEvent = { id: 'e1', type: 'checkout.session.completed', data: { object: { id: 's1', mode: 'payment', payment_status: 'paid', metadata: { user_id: 'u1', credits: '10' } } } };
    mockConstructEvent.mockReturnValueOnce(fakeEvent);
    (createClient as jest.Mock).mockResolvedValue({
      auth: { getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'u1' } } }) }
    });
    const processedBuilder: any = { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { session_id: 's1' } }), then: (r: any) => r({ data: null }) };
    (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => processedBuilder);
    const req = makeRequest({}, 'sig');
    const res = await POST(req as any);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    // Should not attempt to upsert credits or record usage
    expect((supabaseAdmin.from as jest.Mock)).toHaveBeenCalledTimes(1);
    expect(processedBuilder.select).toHaveBeenCalled();
  });
});