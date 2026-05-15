import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import TerminalCoreNativeSections from '@/app/terminal/TerminalCoreNativeSections';

jest.mock('@/app/terminal/terminal-shell-reading', () => ({
  toneForPanel: () => 'border-white/10 bg-black/20',
  jumpToShellSection: jest.fn(),
}));

jest.mock('@/app/terminal/terminal-shell-bridge', () => ({
  useTerminalShellBridge: () => ({
    snapshot: {
      coreSurface: {
        depositing: {
          label: 'Depositing',
          cards: [
            {
              title: 'Mock deposit session',
              subtitle: 'Protocol demonstration data',
              metrics: [],
              rows: [
                {
                  label: 'Deposit session',
                  value: 'preview:ghapp_frontier-demo-auth_gh-inst-bitcode-001:0',
                },
                {
                  label: 'Installation account',
                  value: 'frontier-code-systems',
                },
              ],
            },
          ],
        },
      },
    },
  }),
}));

const liveRepositoryContext = {
  provider: 'github',
  connectionStatus: {
    connected: true,
    valid: true,
    provider: 'github',
    username: 'engineeredsoftware',
    metadata: { mock_mode: false, repositories: 1 },
  },
  inventorySource: 'stored_repository_inventory',
  repositories: [
    {
      id: '1094184056',
      name: 'ENGI',
      fullName: 'engineeredsoftware/ENGI',
      private: false,
      defaultBranch: 'main',
      url: 'https://github.com/engineeredsoftware/ENGI',
      cloneUrl: 'https://github.com/engineeredsoftware/ENGI.git',
      owner: { id: '84343342', username: 'engineeredsoftware', type: 'organization' },
      language: 'TypeScript',
      topics: ['ai', 'crypto'],
    },
  ],
  selectedRepository: {
    id: '1094184056',
    name: 'ENGI',
    fullName: 'engineeredsoftware/ENGI',
    private: false,
    defaultBranch: 'main',
    url: 'https://github.com/engineeredsoftware/ENGI',
    cloneUrl: 'https://github.com/engineeredsoftware/ENGI.git',
    owner: { id: '84343342', username: 'engineeredsoftware', type: 'organization' },
    language: 'TypeScript',
    topics: ['ai', 'crypto'],
  },
} as const;

describe('TerminalCoreNativeSections', () => {
  it('does not render protocol demonstration snapshot cards in live staging mode', () => {
    render(
      <TerminalCoreNativeSections
        repositoryContext={liveRepositoryContext}
        showDemonstrationPanels={false}
      />,
    );

    expect(screen.getByText('engineeredsoftware/ENGI')).toBeInTheDocument();
    expect(screen.queryByText(/frontier/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Installation account/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Deposit session/i)).not.toBeInTheDocument();
  });
});
