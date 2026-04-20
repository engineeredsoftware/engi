import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import CreditsStep from '@/app/auxillaries/components/AuxillariesCredits';
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

describe('CreditsStep Promo Code Flow', () => {
  beforeEach(() => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          repos: [
            {
              fullName: 'engineeredsoftware/bitcode',
              branch: 'main',
              commit: 'abcdef1234567',
              enabled: false,
            },
          ],
        }),
      })
      .mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
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
          team_members: [],
        },
        modelPreferences: {},
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

  it('enables continuous need-space repository sharing from the $BTD alias', async () => {
    render(
      <CreditsStep
        onSave={() => {}}
        loading={false}
        isOnboardingComplete
      />,
    );

    await waitFor(() => {
      expect(screen.queryByText('loading…')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Need-space knowledge sharing')).toBeInTheDocument();
    expect(screen.getByText('engineeredsoftware/bitcode')).toBeInTheDocument();

    const [toggle] = screen.getAllByRole('checkbox');
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText(/All current and future Connects-approved repositories/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/auxillaries/user/data-share',
      expect.objectContaining({
        method: 'POST',
      }),
    );
  });
});
