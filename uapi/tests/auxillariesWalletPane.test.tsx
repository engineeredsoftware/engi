import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import AuxillariesWalletPane from '@/app/auxillaries/components/AuxillariesWalletPane';
import { useAuth } from '@/components/base/bitcode/auth/AuthProvider';
import { useUserData } from '@/hooks/useUserData';

jest.mock('@bitcode/orm', () => ({
  readBitcodeWalletBindingFromProfile: (profile: Record<string, any> | null | undefined) => {
    if (!profile) {
      return null;
    }

    if (profile.wallet_binding && typeof profile.wallet_binding === 'object') {
      return profile.wallet_binding;
    }

    if (typeof profile.wallet_address !== 'string' || !profile.wallet_address.trim()) {
      return null;
    }

    return {
      address: profile.wallet_address,
      provider: typeof profile.wallet_provider === 'string' ? profile.wallet_provider : 'manual',
      status: typeof profile.wallet_binding_status === 'string' ? profile.wallet_binding_status : 'manual',
    };
  },
}));

jest.mock('@/components/base/bitcode/auth/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/hooks/useUserData', () => ({
  useUserData: jest.fn(),
}));

jest.mock('@/app/auxillaries/components/AuxillariesDataSharingPanel', () => ({
  __esModule: true,
  default: function MockAuxillariesDataSharingPanel() {
    return <div data-testid="mock-data-sharing-panel">Data sharing panel</div>;
  },
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseUserData = useUserData as jest.MockedFunction<typeof useUserData>;

describe('AuxillariesWalletPane', () => {
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
          btdAccessPolicyId: 'policy-main',
          btdAccessPolicyHash: 'policy-hash-abcdef1234567890',
          btdRangeStart: 1200,
          btdRangeEndExclusive: 1212,
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
      btdBalance: 1200,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
      isOnboardingComplete: true,
      onboardedSteps: ['profile', 'externals', 'interfaces', 'wallet'],
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders wallet and share posture and autosaves merged btd defaults', async () => {
    const onSave = jest.fn();

    render(
      <AuxillariesWalletPane
        onSave={onSave}
        loading={false}
        isOnboardingComplete={false}
      />,
    );

    await waitFor(() => {
      expect(screen.queryByText('loading…')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('wallet-step-badge')).toHaveTextContent('Auxillary step 1');
    expect(screen.getByText(/Keep BTC fees, \$BTD holdings, identity, and membership readable together/i)).toBeTruthy();
    expect(screen.getByText('Access policy')).toBeInTheDocument();
    expect(screen.getByText('policy-main')).toBeInTheDocument();
    expect(screen.getByText('policy-has...567890')).toBeInTheDocument();
    expect(screen.getByText('1,200-1,211')).toBeInTheDocument();
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

    expect(screen.getByText(/Changes save automatically so the BTD posture/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Continue' })).not.toBeInTheDocument();

    await waitFor(
      () => {
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
      },
      { timeout: 2000 },
    );
  });

  it('surfaces reconnect-required copy when saved verified signer posture lacks a live wallet-provider session', async () => {
    mockUseUserData.mockReturnValue({
      data: {
        profile: {
          wallet_address: 'bc1qbitcodeoperator',
          wallet_provider: 'walletconnect',
          wallet_binding_status: 'verified',
          wallet_binding: {
            address: 'bc1qbitcodeoperator',
            provider: 'walletconnect',
            status: 'verified',
            boundAt: '2026-04-18T12:00:00.000Z',
          },
          team_members: [],
        },
        modelPreferences: null,
      },
      hasGitHubConnection: true,
      hasStoredVerifiedWalletConnection: true,
      hasVerifiedWalletConnection: false,
      walletConnectionStatus: {
        connected: false,
        provider: 'walletconnect',
        valid: false,
        address: 'bc1qbitcodeoperator',
        verificationState: 'verified',
      },
      btdBalance: 1200,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
      isOnboardingComplete: true,
      onboardedSteps: ['profile', 'externals', 'interfaces', 'wallet'],
    } as any);

    render(
      <AuxillariesWalletPane
        onSave={jest.fn()}
        loading={false}
        isOnboardingComplete={false}
      />,
    );

    expect(
      screen.getByLabelText(/saved verified wallet-provider signer posture exists, but the live signer session needs reconnect/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/wallet provider must reconnect before Bitcode can rely on live signing again/i),
    ).toBeInTheDocument();
  });
});
