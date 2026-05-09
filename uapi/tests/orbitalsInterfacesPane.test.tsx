import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import OrbitalsInterfacesPane from '@/app/auxillaries/components/AuxillariesInterfacesPane';
import { useUserData } from '@/hooks/useUserData';

jest.mock('@/hooks/useUserData', () => ({
  useUserData: jest.fn(),
}));

jest.mock('@/app/auxillaries/components/models/GlobalModelSelection', () => ({
  __esModule: true,
  default: function MockGlobalModelSelection({
    onApplyGlobalModel,
  }: {
    onApplyGlobalModel: (value: string) => void;
  }) {
    return (
      <button type="button" onClick={() => onApplyGlobalModel('claude-3-7-sonnet')}>
        Apply review model
      </button>
    );
  },
}));

const mockUseUserData = useUserData as jest.MockedFunction<typeof useUserData>;

describe('AuxillariesInterfacesPane', () => {
  beforeEach(() => {
    mockUseUserData.mockReturnValue({
      data: {
        modelPreferences: {
          existingSetting: 'keep-me',
          review_profile: 'bitcode-review-lab',
        },
      },
      hasGitHubConnection: true,
      btdBalance: 1200,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
      isOnboardingComplete: true,
      onboardedSteps: ['profile', 'connects', 'interfaces', 'btd'],
    } as any);
  });

  it('renders production interfaces sections and autosaves merged defaults', async () => {
    const onSave = jest.fn();

    render(
      <OrbitalsInterfacesPane
        onSave={onSave}
        loading={false}
        isOnboardingComplete={false}
      />,
    );

    expect(screen.getAllByText('Auxillary step 3')).toHaveLength(2);
    expect(screen.getByText(/Exchange detail and conversation defaults/i)).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Shared instruction baseline/i })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /signal/i }));
    fireEvent.click(screen.getByRole('button', { name: /overlay/i }));
    fireEvent.click(
      screen.getByRole('button', {
        name: /raw bias toward exact payload reading first\./i,
      }),
    );
    fireEvent.click(screen.getByText('Apply review model'));
    fireEvent.change(screen.getByLabelText(/Global System Prompt/i), {
      target: { value: 'Keep closure exact and user-facing.' },
    });

    expect(screen.getByText(/Changes save automatically so transactions, proofs, and conversations/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Continue' })).not.toBeInTheDocument();

    await waitFor(
      () => {
        expect(onSave).toHaveBeenCalledWith(
          expect.objectContaining({
            existingSetting: 'keep-me',
            defaultModel: 'claude-3-7-sonnet',
            globalSystemPrompt: 'Keep closure exact and user-facing.',
            interfacesDefaults: expect.objectContaining({
              exchangeDetailDensity: 'signal',
              conversationLaunch: 'overlay',
              proofMode: 'raw',
            }),
            workspaceDefaults: expect.objectContaining({
              exchangeDetailDensity: 'signal',
              conversationLaunch: 'overlay',
              proofMode: 'raw',
            }),
          }),
        );
      },
      { timeout: 2000 },
    );
  });
});
