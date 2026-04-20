import React from 'react';
import { renderToString } from 'react-dom/server';

import CreditsStep from '@/app/auxillaries/components/AuxillariesCredits';
import { useAuth } from '@/components/base/engi/auth/AuthProvider';
import { useUserData } from '@/hooks/useUserData';

jest.mock('@/components/base/engi/auth/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/hooks/useUserData', () => ({
  useUserData: jest.fn(),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseUserData = useUserData as jest.MockedFunction<typeof useUserData>;

describe('CreditsStep SSR Onboarding View', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
    } as any);

    mockUseUserData.mockReturnValue({
      data: null,
      hasGitHubConnection: false,
      credits: 0,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
      isOnboardingComplete: false,
      onboardedSteps: [],
    } as any);
  });

  it('renders the unauthenticated $BTD auxillary posture', () => {
    const html = renderToString(
      <CreditsStep
        onSave={() => {}}
        loading={false}
        onCompletionStatusChange={() => {}}
      />,
    );

    expect(html).toContain('$BTD Auxillary');
    expect(html).toContain('Sign in before opening $BTD posture');
    expect(html).toContain('Open Profile orbital');
  });
});
