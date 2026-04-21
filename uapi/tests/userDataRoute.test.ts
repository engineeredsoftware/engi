import { GET } from '@/app/api/auxillaries/data/route';

jest.mock('@bitcode/supabase/ssr/server', () => ({ createClient: jest.fn() }));

import { createClient } from '@bitcode/supabase/ssr/server';

describe('GET /api/auxillaries/data', () => {
  const mockUser = { id: 'user-1' };
  const mockGetUser = jest.fn();

  let mockFrom: jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
    mockFrom = jest.fn();
    (createClient as jest.Mock).mockResolvedValue({ auth: { getUser: mockGetUser }, from: mockFrom });
  });

  it('returns anonymous auxillary data if unauthenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: { message: 'no auth' } });
    const req = new Request('http://localhost/api/auxillaries/data');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({
      profile: null,
      githubConnection: null,
      btdBalance: 0,
      modelPreferences: null,
      onboardedPanes: [],
      onboarded_steps: [],
      isOnboardingComplete: false,
    });
    expect(mockFrom).not.toHaveBeenCalled();
  });

  it('returns user data with only GitHub connection', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    // Mock profile
    const profileData = { user_id: 'user-1', name: 'Test', onboarded_steps: '["profile","interfaces","btd"]' };
    const profileBuilder: any = {
      select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), maybeSingle: jest.fn().mockResolvedValue({ data: profileData, error: null })
    };
    // Mock GitHub connection row
    const connectionData = { installationId: 123 };
    const connectionBuilder: any = {
      select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), maybeSingle: jest.fn().mockResolvedValue({ data: { connection_data: connectionData }, error: null })
    };
    // Mock BTD balance
    const creditsData = { balance: 50 };
    const creditsBuilder: any = {
      select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), maybeSingle: jest.fn().mockResolvedValue({ data: creditsData, error: null })
    };
    // Mock model preferences
    const prefData = { preferences: { model: 'gpt' } };
    const prefBuilder: any = {
      select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: prefData, error: null })
    };
    // Route multiplexing by table
    mockFrom.mockImplementation((table: string) => {
      if (table === 'user_profiles') return profileBuilder;
      if (table === 'user_connections') return connectionBuilder;
      if (table === 'user_credits') return creditsBuilder;
      if (table === 'user_model_preferences') return prefBuilder;
      throw new Error('Unexpected table ' + table);
    });
    const req = new Request('http://localhost/api/auxillaries/data');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({
      profile: profileData,
      githubConnection: connectionData,
      btdBalance: 50,
      modelPreferences: prefData.preferences,
      onboardedPanes: ['profile', 'interfaces', 'btd'],
      onboarded_steps: ['profile', 'interfaces', 'btd'],
      isOnboardingComplete: false,
    });
    // Ensure queries were scoped correctly
    expect(profileBuilder.eq).toHaveBeenCalledWith('user_id', 'user-1');
    expect(connectionBuilder.eq).toHaveBeenCalledWith('provider', 'github');
  });
});
