import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import ApplicationLiveSummaryStrip from '@/app/application/ApplicationLiveSummaryStrip';

const mockUseApplicationShellBridge = jest.fn();

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

jest.mock('@/app/application/application-workspace-explainers', () => ({
  APPLICATION_WORKSPACE_EXPLAINERS: {
    ledgerPulse: [],
  },
}));

jest.mock('@/app/application/application-shell-bridge', () => ({
  useApplicationShellBridge: () => mockUseApplicationShellBridge(),
}));

describe('ApplicationLiveSummaryStrip', () => {
  beforeEach(() => {
    mockUseApplicationShellBridge.mockReset();
  });

  it('renders exact repository and settlement reconnect posture in the Terminal pulse', () => {
    mockUseApplicationShellBridge.mockReturnValue({
      snapshot: {
        summarySurface: [
          { label: 'Settlement posture', value: 'stale shell value' },
          { label: 'Active scenario', value: 'monorepo-auth-rollback' },
        ],
      },
    });

    render(
      <ApplicationLiveSummaryStrip
        transactionReadiness={{
          label: 'wallet reconnect required',
          canTransact: true,
          canSettle: false,
        }}
        repositoryContext={{
          provider: 'github',
          connectionStatus: {
            connected: true,
            provider: 'github',
            valid: false,
          },
          inventorySource: 'stored_repository_inventory',
          selectedRepository: {
            id: 'repo-1',
            name: 'bitcode',
            fullName: 'bitcode/bitcode',
            owner: {
              id: 'org-1',
              username: 'bitcode',
            },
          },
        }}
      />,
    );

    expect(screen.getByText('Pinned operating signals')).toBeInTheDocument();
    expect(screen.getAllByText('Settlement posture').length).toBeGreaterThan(0);
    expect(screen.getAllByText('wallet reconnect required').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Repository posture').length).toBeGreaterThan(0);
    expect(screen.getAllByText('GitHub reconnect required · stored Exchange inventory').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Repository anchor').length).toBeGreaterThan(0);
    expect(screen.getAllByText('bitcode/bitcode').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Active scenario').length).toBeGreaterThan(0);
    expect(screen.getAllByText('monorepo-auth-rollback').length).toBeGreaterThan(0);
    expect(screen.queryByText('stale shell value')).not.toBeInTheDocument();
  });
});
