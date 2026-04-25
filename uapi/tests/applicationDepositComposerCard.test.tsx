import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import ApplicationDepositComposer from '@/app/application/ApplicationDepositComposer';

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

jest.mock('@/components/base/bitcode/execution/BitcodeMetricGrid', () => ({
  __esModule: true,
  default: function MockBitcodeMetricGrid() {
    return null;
  },
}));

jest.mock('@/components/base/bitcode/execution/BitcodeChipCloud', () => ({
  __esModule: true,
  default: function MockBitcodeChipCloud() {
    return null;
  },
}));

jest.mock('@/app/application/application-workspace-explainers', () => ({
  APPLICATION_WORKSPACE_EXPLAINERS: {
    depositComposer: [],
  },
  APPLICATION_INLINE_EXPLAINERS: {
    sourceRepo: [],
    sourceCommit: [],
    workflowRunId: [],
    signerAddress: [],
    visualPreview: [],
    depositSubmission: [],
    transactionReadiness: [],
  },
}));

jest.mock('@/app/application/application-shell-reading', () => ({
  jumpToShellSection: jest.fn(),
}));

jest.mock('@/app/application/application-shell-bridge', () => ({
  useApplicationShellBridge: () => ({
    snapshot: {},
    runControl: jest.fn(),
  }),
}));

jest.mock('@/app/application/application-deposit-composer', () => ({
  normalizeApplicationDepositComposer: () => ({
    authSessionId: 'session-1',
    selectedInventoryEntryIds: ['entry-1'],
    selectedEntries: [
      {
        inventoryEntryId: 'entry-1',
        title: 'rollback runbook',
      },
    ],
    selectedCount: 1,
    sourceRepo: 'bitcode/bitcode',
    signerAddress: 'bc1qbitcode',
  }),
}));

jest.mock('@/app/application/application-activity-history', () => ({
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
  hasRepositoryAnchor: true,
  requiresRepositoryAnchor: true,
};

describe('ApplicationDepositComposer', () => {
  it('keeps deposit submission disabled until settlement readiness is complete', () => {
    const { rerender } = render(
      <ApplicationDepositComposer
        repositoryAnchor="bitcode/bitcode"
        transactionReadiness={baseTransactionReadiness}
      />,
    );

    expect(screen.getByRole('button', { name: 'Deposit into Bitcode' })).toBeDisabled();
    expect(
      screen.getByText('Signed settlement remains staged until verified wallet-provider signing is present.'),
    ).toBeInTheDocument();

    rerender(
      <ApplicationDepositComposer
        repositoryAnchor="bitcode/bitcode"
        transactionReadiness={{
          ...baseTransactionReadiness,
          status: 'ready',
          label: 'ready',
          summary: 'Wallet identity, verified signing, and repository scope are ready.',
          blockers: [],
          canSettle: true,
          hasVerifiedWalletBinding: true,
        }}
      />,
    );

    expect(screen.getByRole('button', { name: 'Deposit into Bitcode' })).toBeEnabled();
  });

  it('keeps deposit submission disabled when repository scope must be reconnected', () => {
    render(
      <ApplicationDepositComposer
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
        }}
      />,
    );

    expect(screen.getByRole('button', { name: 'Deposit into Bitcode' })).toBeDisabled();
    expect(
      screen.getAllByText(/Reconnect GitHub or equivalent repository scope in Connects/i).length,
    ).toBeGreaterThan(0);
  });
});
