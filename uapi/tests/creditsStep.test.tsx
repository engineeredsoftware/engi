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

describe('CreditsStep (SSR)', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: {
        id: 'user-1',
        email_confirmed_at: '2026-04-18T12:00:00.000Z',
      },
      loading: false,
    } as any);

    mockUseUserData.mockReturnValue({
      data: {
        profile: {
          wallet_address: 'bc1qbitcodeoperator',
          btc_balance: '0.250',
          team_members: [
            { id: 'tm-1', display_name: 'Lin Ortega', role: 'admin' },
          ],
        },
        modelPreferences: {
          btdDefaults: {
            shareLens: 'organization',
            settlementView: 'replay',
            btdDetailView: 'proofs',
            automationBias: 'decisive',
            walletSync: 'live',
          },
        },
      },
      hasGitHubConnection: true,
      credits: 250,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
      isOnboardingComplete: true,
      onboardedSteps: ['profile', 'connects', 'interfaces', 'btd'],
    } as any);
  });

  it('renders the authenticated $BTD auxillary summary and need-space controls', () => {
    const html = renderToString(
      <CreditsStep
        onSave={() => {}}
        loading={false}
        isOnboardingComplete
        onCompletionStatusChange={() => {}}
      />,
    );

    expect(html).toContain('$BTD Auxillary');
    expect(html).toContain('Keep balances, identity, and membership readable together');
    expect(html).toContain('250 BTD');
    expect(html).toContain('0.250 BTC');
    expect(html).toContain('Set it and forget it repository knowledge sharing');
  });
});
