import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import TerminalFlowGuideCard from '@/app/terminal/TerminalFlowGuideCard';
import type { TerminalCommandState } from '@/app/terminal/terminal-command-state';

const baseCommandState: TerminalCommandState = {
  scenario: 'need-1',
  projection: 'reviewer',
  branchMode: 'patch',
  scenarioOptions: [{ value: 'need-1', label: 'priority need · producer' }],
  projectionOptions: [{ value: 'reviewer', label: 'reviewer' }],
  branchOptions: [{ value: 'patch', label: 'patch' }],
  heroLede: 'shell posture',
  heroTip: 'shell tip',
  status: 'ready',
  flowGuideLabel: 'Flow guide',
  flowGuideOpen: false,
  flowGuideStepIndex: 2,
  flowGuideStepCount: 8,
  shellReady: true,
};

describe('TerminalFlowGuideCard', () => {
  it('renders repository reconnect posture as a first-class flow-guide state', () => {
    render(
      <TerminalFlowGuideCard
        commandState={baseCommandState}
        continuationTip="Continue the active flow."
        transactionReadiness={{
          status: 'repository-provider-pending',
          label: 'repository reconnect required',
          summary:
            'Bitcode is in review-only mode. Reconnect GitHub or equivalent repository scope in Externals before you transact, settle, or sign Bitcode activity.',
          nextAction: 'Open Externals and restore a valid repository-provider connection.',
          blockers: [
            {
              id: 'repository-provider',
              label: 'Reconnect GitHub or equivalent repository scope in Externals',
            },
          ],
          canReview: true,
          canTransact: false,
          canSettle: false,
          signedIn: true,
          hasRepositoryProvider: true,
          hasValidRepositoryProvider: false,
          hasWalletBinding: true,
          hasVerifiedWalletBinding: true,
          hasStoredVerifiedWalletBinding: true,
          hasRepositoryAnchor: true,
          requiresRepositoryAnchor: true,
        }}
      />,
    );

    expect(screen.getByText('repository-reconnect-required')).toBeInTheDocument();
    expect(
      screen.getByText(/Reconnect GitHub or equivalent repository scope in Externals before you transact/i),
    ).toBeInTheDocument();
    expect(screen.getByText('Continue the active flow.')).toBeInTheDocument();
    expect(screen.getByText('1. Source')).toBeInTheDocument();
  });

  it('renders wallet reconnect posture as a first-class flow-guide state', () => {
    render(
      <TerminalFlowGuideCard
        commandState={{
          ...baseCommandState,
          flowGuideOpen: true,
          flowGuideStepIndex: 4,
          flowGuideStepCount: 10,
        }}
        continuationTip="Reconnect signing, then continue."
        transactionReadiness={{
          status: 'wallet-verification-pending',
          label: 'wallet reconnect required',
          summary:
            'Bitcode can reread the saved verified wallet signer posture in Wallet, but the live wallet-provider signing session is no longer available. Reconnect the wallet provider before you settle or sign Bitcode activity.',
          nextAction: 'Reconnect the wallet provider so verified signing access is live again.',
          blockers: [
            {
              id: 'wallet-verification',
              label: 'Reconnect verified wallet-provider signing access',
            },
          ],
          canReview: true,
          canTransact: true,
          canSettle: false,
          signedIn: true,
          hasRepositoryProvider: true,
          hasValidRepositoryProvider: true,
          hasWalletBinding: true,
          hasVerifiedWalletBinding: false,
          hasStoredVerifiedWalletBinding: true,
          hasRepositoryAnchor: true,
          requiresRepositoryAnchor: true,
        }}
      />,
    );

    expect(screen.getByText('wallet-reconnect-required')).toBeInTheDocument();
    expect(screen.getByText(/live wallet-provider signing session is no longer available/i)).toBeInTheDocument();
    expect(screen.getByText('Reconnect signing, then continue.')).toBeInTheDocument();
    expect(screen.getByText('4. Fit + proof')).toBeInTheDocument();
  });
});
