/**
 * @jest-environment node
 */

import { GET } from '@/app/api/orbitals/profile/route';

// Utility to build a minimal Next.js Request object
function makeRequest() {
  return new Request('https://example.com/api/orbitals/profile', {
    method: 'GET'
  });
}

// The route relies on two Supabase helpers.  Provide light-weight mocks so we
// can exercise the handler logic without network or database access.

jest.mock('@engi/supabase/ssr/server', () => ({
  createClient: jest.fn()
}));

jest.mock('@engi/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    maybeSingle: jest.fn()
  }
}));

import { createClient } from '@engi/supabase/ssr/server';
import { supabaseAdmin } from '@engi/supabase';

describe('/api/orbitals/profile GET', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 401 when user is not authenticated', async () => {
    // Mock auth.getUser to return null user and an auth error
    (createClient as jest.Mock).mockResolvedValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: null }, error: new Error('unauth') })
      }
    });

    const res = await GET(makeRequest());
    expect(res.status).toBe(401);
  });

  it('returns profile data for an authenticated user', async () => {
    // Fake user id and mock profile row
    const userId = 'user123';
    const profileRow = { id: 'p1', user_id: userId, name: 'Jane' };

    (createClient as jest.Mock).mockResolvedValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: { id: userId } }, error: null })
      }
    });

    // Mock supabaseAdmin query chain
    (supabaseAdmin.from as jest.Mock).mockReturnThis();
    (supabaseAdmin.select as jest.Mock).mockReturnThis();
    (supabaseAdmin.eq as jest.Mock).mockReturnThis();
    (supabaseAdmin.maybeSingle as jest.Mock).mockResolvedValue({ data: profileRow, error: null });

    const res = await GET(makeRequest());
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual(profileRow);
  });
});
