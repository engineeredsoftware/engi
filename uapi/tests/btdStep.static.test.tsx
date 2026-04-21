import React from 'react';
import { renderToString } from 'react-dom/server';

import BtdStep from '@/app/auxillaries/components/AuxillariesBTDPane';
import { useAuth } from '@/components/base/bitcode/auth/AuthProvider';
import { useUserData } from '@/hooks/useUserData';

jest.mock('@/components/base/bitcode/auth/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/hooks/useUserData', () => ({
  useUserData: jest.fn(),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseUserData = useUserData as jest.MockedFunction<typeof useUserData>;

describe('BtdStep SSR Onboarding View', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
    } as any);

    mockUseUserData.mockReturnValue({
      data: null,
      hasGitHubConnection: false,
      btdBalance: 0,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
      isOnboardingComplete: false,
      onboardedSteps: [],
    } as any);
  });

  it('renders the unauthenticated $BTD auxillary posture', () => {
    const html = renderToString(
      <BtdStep
        onSave={() => {}}
        loading={false}
        onCompletionStatusChange={() => {}}
      />,
    );

    expect(html).toContain('$BTD Auxillary');
    expect(html).toContain('Sign in before opening $BTD posture');
    expect(html).toContain('Open Profile auxillary');
  });
});
