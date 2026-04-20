import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import OrbitalsBTDPane from '@/app/auxillaries/components/AuxillariesBTDPane';
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

describe('AuxillariesBTDPane', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, repos: [] }),
    }) as jest.Mock;

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
          btc_balance: '0.125',
          team_members: [
            { id: 'tm-1', display_name: 'Lin Ortega', role: 'admin' },
            { id: 'tm-2', display_name: 'Sora Ames', role: 'lead' },
          ],
        },
        modelPreferences: {
          existingSetting: 'keep-me',
          btdDefaults: {
            shareLens: 'account',
            settlementView: 'bounded',
            btdDetailView: 'transactions',
            automationBias: 'review-first',
            walletSync: 'manual',
          },
        },
      },
      hasGitHubConnection: true,
      credits: 1200,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
      isOnboardingComplete: true,
      onboardedSteps: ['profile', 'connects', 'interfaces', 'btd'],
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders wallet and share posture and submits merged btd defaults', async () => {
    const onSave = jest.fn();

    render(
      <OrbitalsBTDPane
        onSave={onSave}
        loading={false}
        isOnboardingComplete={false}
      />,
    );

    await waitFor(() => {
      expect(screen.queryByText('loading…')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('btd-step-badge')).toHaveTextContent('Auxillary step 4');
    expect(screen.getByText(/Keep balances, identity, and membership readable together/i)).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Choose how \$BTD detail should read back into transactions/i })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /organization/i }));
    fireEvent.click(
      screen.getByRole('button', {
        name: /replay bias toward replayable accounting and witness detail\./i,
      }),
    );
    fireEvent.click(screen.getByRole('button', { name: /proofs/i }));
    fireEvent.click(
      screen.getByRole('button', {
        name: /decisive bias toward shorter, stronger default follow-through\./i,
      }),
    );
    fireEvent.click(screen.getByRole('button', { name: /live/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        existingSetting: 'keep-me',
        btdDefaults: expect.objectContaining({
          shareLens: 'organization',
          settlementView: 'replay',
          btdDetailView: 'proofs',
          automationBias: 'decisive',
          walletSync: 'live',
        }),
      }),
    );
  });
});
