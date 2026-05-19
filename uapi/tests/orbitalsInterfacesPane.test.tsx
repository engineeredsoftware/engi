import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import OrbitalsInterfacesPane from '@/app/auxillaries/components/AuxillariesInterfacesPane';
import { useUserData } from '@/hooks/useUserData';

jest.mock('@/hooks/useUserData', () => ({
  useUserData: jest.fn(),
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
      onboardedSteps: ['profile', 'externals', 'interfaces', 'wallet'],
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

    expect(screen.getAllByText('Auxillary step 4')).toHaveLength(2);
    expect(screen.getByText(/Terminal detail and interface defaults/i)).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Interface instruction baseline/i })).toBeTruthy();
    expect(screen.getByText(/Registry fixed/i)).toBeInTheDocument();
    expect(screen.queryByText(/Apply review model/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /signal/i }));
    fireEvent.click(screen.getByRole('button', { name: /chatgpt app/i }));
    fireEvent.click(
      screen.getByRole('button', {
        name: /raw bias toward exact payload reading first\./i,
      }),
    );
    fireEvent.change(screen.getByLabelText(/Global System Prompt/i), {
      target: { value: 'Keep closure exact and user-facing.' },
    });

    expect(screen.getByText(/Changes save automatically so Terminal transactions, proofs, MCP API calls, and ChatGPT App work/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Continue' })).not.toBeInTheDocument();

    await waitFor(
      () => {
        expect(onSave).toHaveBeenCalledWith(
          expect.objectContaining({
            existingSetting: 'keep-me',
            globalSystemPrompt: 'Keep closure exact and user-facing.',
            ledgerizedPipelineModels: 'registry_deterministic',
            modelSelectionScope: 'non_ledgerized_conversation_only',
            interfacesDefaults: expect.objectContaining({
              terminalDetailDensity: 'signal',
              externalInterfaceEntry: 'chatgpt',
              proofMode: 'raw',
            }),
            workspaceDefaults: expect.objectContaining({
              terminalDetailDensity: 'signal',
              externalInterfaceEntry: 'chatgpt',
              proofMode: 'raw',
            }),
          }),
        );
        const payload = onSave.mock.calls.at(-1)?.[0] as Record<string, unknown>;
        expect(payload.defaultModel).toBeUndefined();
        expect(payload.defaultProvider).toBeUndefined();
        expect(payload.preferred_model).toBeUndefined();
      },
      { timeout: 2000 },
    );
  });
});
