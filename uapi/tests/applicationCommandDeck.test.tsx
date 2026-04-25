import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import ApplicationCommandDeck from '@/app/application/ApplicationCommandDeck';

jest.mock('@/app/application/ApplicationWorkspaceCard', () => ({
  __esModule: true,
  default: function MockApplicationWorkspaceCard({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <section>
        <h2>{title}</h2>
        {children}
      </section>
    );
  },
}));

jest.mock('@/components/base/bitcode/execution/BitcodeInlineExplainer', () => ({
  __esModule: true,
  default: function MockBitcodeInlineExplainer() {
    return null;
  },
}));

jest.mock('@/app/application/ApplicationFlowGuideCard', () => ({
  __esModule: true,
  default: function MockApplicationFlowGuideCard() {
    return null;
  },
}));

jest.mock('@/app/application/application-workspace-explainers', () => ({
  APPLICATION_WORKSPACE_EXPLAINERS: {
    controls: [],
    activityMap: [],
  },
  APPLICATION_INLINE_EXPLAINERS: {
    scenario: [],
    projection: [],
    branchMode: [],
    transactionReadiness: [],
  },
}));

jest.mock('@/app/application/application-experience-architecture', () => ({
  APPLICATION_ACTIONS: [],
}));

jest.mock('@/app/application/application-shell-sections', () => ({
  APPLICATION_SHELL_SECTIONS: [],
}));

jest.mock('@/app/application/application-shell-bridge', () => ({
  useApplicationShellBridge: () => ({
    snapshot: {},
    runControl: jest.fn(),
  }),
}));

jest.mock('@/app/application/application-command-state', () => ({
  normalizeApplicationCommandState: () => ({
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
    flowGuideStepIndex: 0,
    flowGuideStepCount: 0,
    shellReady: true,
  }),
}));

jest.mock('@/app/application/application-closure-state', () => ({
  normalizeApplicationClosureState: () => ({
    bundleId: 'bundle-1',
  }),
}));

jest.mock('@/app/application/application-command-presentation', () => ({
  deriveApplicationCommandPresentation: () => ({
    draftSummary: 'Working flow ready.',
    continuationTip: 'Continue the active flow.',
  }),
}));

jest.mock('@/app/application/application-activity-history', () => ({
  buildApplicationClosureFinalWorkSummary: jest.fn(() => null),
  readApplicationRouteError: jest.fn(async () => 'route error'),
}));

const baseTransactionReadiness = {
  status: 'wallet-verification-pending' as const,
  label: 'wallet verification pending',
  summary: 'Signed settlement remains staged until verified wallet-provider signing is present.',
  nextAction: 'Return to Profile for verified signing.',
  blockers: [{ id: 'wallet-verification' as const, label: 'Verified wallet-provider signing access' }],
  canReview: true as const,
  canTransact: true,
  canSettle: false,
  signedIn: true,
  hasRepositoryProvider: true,
  hasValidRepositoryProvider: true,
  hasWalletBinding: true,
  hasVerifiedWalletBinding: false,
  hasStoredVerifiedWalletBinding: false,
  hasRepositoryAnchor: true,
  requiresRepositoryAnchor: true,
};

describe('ApplicationCommandDeck', () => {
  it('keeps branch creation disabled until settlement readiness is complete', () => {
    const { rerender } = render(
      <ApplicationCommandDeck
        repositoryAnchor="bitcode/bitcode"
        transactionReadiness={baseTransactionReadiness}
      />,
    );

    expect(screen.getByRole('button', { name: 'Make Bitcode branch' })).toBeDisabled();
    expect(
      screen.getByText('Signed settlement remains staged until verified wallet-provider signing is present.'),
    ).toBeInTheDocument();

    rerender(
      <ApplicationCommandDeck
        repositoryAnchor="bitcode/bitcode"
        transactionReadiness={{
          ...baseTransactionReadiness,
          status: 'ready',
          label: 'ready',
          summary: 'Wallet identity, verified signing, and repository scope are ready.',
          blockers: [],
          canSettle: true,
          hasVerifiedWalletBinding: true,
          hasStoredVerifiedWalletBinding: true,
        }}
      />,
    );

    expect(screen.getByRole('button', { name: 'Make Bitcode branch' })).toBeEnabled();
  });

  it('keeps branch creation disabled when repository scope must be reconnected', () => {
    render(
      <ApplicationCommandDeck
        repositoryAnchor="bitcode/bitcode"
        transactionReadiness={{
          ...baseTransactionReadiness,
          status: 'repository-provider-pending',
          label: 'repository reconnect required',
          summary:
            'Bitcode is in review-only mode. Reconnect GitHub or equivalent repository scope in Connects before you transact, settle, or sign Bitcode activity.',
          nextAction: 'Open Connects and restore a valid repository-provider connection.',
          blockers: [
            {
              id: 'repository-provider',
              label: 'Reconnect GitHub or equivalent repository scope in Connects',
            },
          ],
          canTransact: false,
          canSettle: false,
          hasValidRepositoryProvider: false,
          hasVerifiedWalletBinding: true,
          hasStoredVerifiedWalletBinding: true,
        }}
      />,
    );

    expect(screen.getByRole('button', { name: 'Make Bitcode branch' })).toBeDisabled();
    expect(
      screen.getAllByText(/Reconnect GitHub or equivalent repository scope in Connects/i).length,
    ).toBeGreaterThan(0);
  });
});
