import { GET, POST } from '@/app/api/auxillaries/onboarding/route';

jest.mock('@bitcode/supabase/ssr/server', () => ({ createClient: jest.fn() }));
jest.mock('@bitcode/supabase', () => ({ supabaseAdmin: { from: jest.fn() } }));

import { createClient } from '@bitcode/supabase/ssr/server';
import { supabaseAdmin } from '@bitcode/supabase';

describe('/api/auxillaries/onboarding', () => {
  const mockUser = { id: 'user-1' };
  const mockGetUser = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (createClient as jest.Mock).mockResolvedValue({ auth: { getUser: mockGetUser } });
  });

  it('normalizes legacy onboarding steps on GET', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });

    const builder: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      maybeSingle: jest.fn().mockResolvedValue({
        data: { onboarded_steps: '["profile","connects","models","credits"]' },
        error: null,
      }),
    };

    (supabaseAdmin.from as jest.Mock).mockReturnValue(builder);

    const response = await GET();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({
      completedPanes: ['profile', 'connects', 'interfaces', 'btd'],
      currentPane: null,
      completedSteps: ['profile', 'connects', 'interfaces', 'btd'],
      currentStep: null,
      isOnboardingComplete: true,
    });
  });

  it('returns the canonical anonymous onboarding payload when unauthenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: { message: 'Unauthorized' } });

    const response = await GET();
    const payload = await response.json();

    expect(response.status).toBe(401);
    expect(payload).toEqual({
      completedPanes: [],
      currentPane: 'profile',
      completedSteps: [],
      currentStep: 'profile',
      isOnboardingComplete: false,
    });
  });

  it('appends a canonical auxillary pane and persists normalized onboarding state on POST', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });

    const selectBuilder: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      maybeSingle: jest.fn().mockResolvedValue({
        data: { onboarded_steps: '["profile","connects","models"]' },
        error: null,
      }),
    };

    const updateBuilder: any = {
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ error: null }),
    };

    (supabaseAdmin.from as jest.Mock)
      .mockReturnValueOnce(selectBuilder)
      .mockReturnValueOnce(updateBuilder);

    const request = new Request('http://localhost/api/auxillaries/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completedPane: 'btd' }),
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(updateBuilder.update).toHaveBeenCalledWith(
      expect.objectContaining({
        onboarded_steps: JSON.stringify(['profile', 'connects', 'interfaces', 'btd']),
      }),
    );
    expect(response.status).toBe(200);
    expect(payload).toEqual({
      completedPanes: ['profile', 'connects', 'interfaces', 'btd'],
      currentPane: null,
      completedSteps: ['profile', 'connects', 'interfaces', 'btd'],
      currentStep: null,
      isOnboardingComplete: true,
    });
  });

  it('still accepts the legacy completedStep payload during compatibility transition', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });

    const selectBuilder: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      maybeSingle: jest.fn().mockResolvedValue({
        data: { onboarded_steps: '["profile"]' },
        error: null,
      }),
    };

    const updateBuilder: any = {
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ error: null }),
    };

    (supabaseAdmin.from as jest.Mock)
      .mockReturnValueOnce(selectBuilder)
      .mockReturnValueOnce(updateBuilder);

    const request = new Request('http://localhost/api/auxillaries/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completedStep: 'connects' }),
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(updateBuilder.update).toHaveBeenCalledWith(
      expect.objectContaining({
        onboarded_steps: JSON.stringify(['profile', 'connects']),
      }),
    );
    expect(payload).toEqual({
      completedPanes: ['profile', 'connects'],
      currentPane: 'interfaces',
      completedSteps: ['profile', 'connects'],
      currentStep: 'interfaces',
      isOnboardingComplete: false,
    });
  });
});
