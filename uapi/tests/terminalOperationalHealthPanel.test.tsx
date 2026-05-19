import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, within } from '@testing-library/react';

import TerminalOperationalHealthPanel from '@/app/terminal/TerminalOperationalHealthPanel';
import { buildTerminalOperationalHealthRead } from '@bitcode/btd/terminal-operational-health';

describe('TerminalOperationalHealthPanel', () => {
  it('renders lane, telemetry, upgrade, provider, settlement, and minting readiness', () => {
    render(<TerminalOperationalHealthPanel />);

    expect(screen.getByRole('heading', { name: /Terminal lanes, telemetry, upgrade, and testnet minting/i })).toBeInTheDocument();
    expect(screen.getByText('mainnet-value-bearing')).toBeInTheDocument();
    expect(screen.getByText('Blocked until an operational approval root is present.')).toBeInTheDocument();
    expect(screen.getByText('BTC broadcaster')).toBeInTheDocument();
    expect(screen.getByText('Ledger observer')).toBeInTheDocument();
    expect(screen.getByText('Migration root')).toBeInTheDocument();
    expect(screen.getByText('terminal-migration-root')).toBeInTheDocument();
    expect(screen.getByText('bitcoin-taproot-psbt')).toBeInTheDocument();
    expect(screen.getByText('binance-web3-wallet')).toBeInTheDocument();
    expect(screen.getByText('terminal-testnet-asset-pack')).toBeInTheDocument();
    expect(screen.getByText('in sync')).toBeInTheDocument();
  });

  it('renders a ready mainnet value-bearing lane when the package model admits approval', () => {
    const healthRead = buildTerminalOperationalHealthRead({
      issuedAt: 'terminal-operational-health-panel-test',
      operationalApprovalRoots: {
        'mainnet-value-bearing': 'approval-root',
      },
      generatedTypeRefreshState: 'current',
    });

    render(<TerminalOperationalHealthPanel healthRead={healthRead} />);

    const mainnetValueLane = screen.getByText('mainnet-value-bearing').closest('article');
    expect(mainnetValueLane).not.toBeNull();
    expect(within(mainnetValueLane as HTMLElement).getByText('ready')).toBeInTheDocument();
    expect(
      within(mainnetValueLane as HTMLElement).getByText('Operational approval root present for value-bearing mainnet.'),
    ).toBeInTheDocument();
    expect(screen.getByText('current')).toBeInTheDocument();
  });
});
