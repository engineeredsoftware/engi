import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';

jest.mock('@/app/terminal/TerminalTransactionDetailSurface', () => ({
  __esModule: true,
  default: () => null,
}));

import TerminalTransactionDetailActionBar from '@/app/terminal/TerminalTransactionDetailActionBar';
import TerminalTransactionWorkspace from '@/app/terminal/TerminalTransactionWorkspace';
import {
  summarizeTerminalUxBrowserProofContract,
  TERMINAL_UX_BROWSER_PROOF_CONTRACT,
} from '@/app/terminal/terminal-ux-browser-proof';
import { buildTerminalTransactionFilters } from '@/app/terminal/terminal-transactions';
import BitcodeTransactionsDataTable from '@/components/base/bitcode/execution/BitcodeTransactionsDataTable';
import { DEFAULT_TRANSACTION_PAGINATION } from '@/components/base/bitcode/execution/bitcode-transaction-types';
import type { TransactionRecord } from '@/components/base/bitcode/execution/bitcode-transaction-types';

const noop = jest.fn();

function renderWorkspaceState({
  isLoadingRuns = false,
  runsError = null,
}: {
  isLoadingRuns?: boolean;
  runsError?: string | null;
}) {
  return render(
    <TerminalTransactionWorkspace
      runs={[]}
      selectedRun={null}
      routeSearchParams={new URLSearchParams()}
      filters={buildTerminalTransactionFilters()}
      onFiltersChange={noop}
      onResetFilters={noop}
      pagination={DEFAULT_TRANSACTION_PAGINATION}
      onPaginationChange={noop}
      detailSection="shippables"
      onDetailSectionChange={noop}
      isLoadingRuns={isLoadingRuns}
      runsError={runsError}
      transactionDataMode="mock-review"
      onSelectTransaction={noop}
    />,
  );
}

const transactionRecord: TransactionRecord = {
  id: 'tx-browser-proof-1',
  summary: 'Browser proof transaction row.',
  type: 'agentic-execution:read-measurement',
  typeLabel: 'Read measurement execution',
  status: 'completed',
  participant: 'engineeredsoftware',
  repository: 'engineeredsoftware/ENGI',
  branch: 'main',
  proofStatus: 'proof witness ready',
  closureFocus: 'source-safe preview',
  createdAt: '2026-05-21T12:00:00.000Z',
  tokenTotal: 1200,
  isOwnTransaction: true,
  transactionLens: 'read',
};

describe('Terminal UX browser proof contract', () => {
  it('exports the Gate 9 landmarks, states, viewports, routes, and evidence files', () => {
    expect(TERMINAL_UX_BROWSER_PROOF_CONTRACT.gate).toBe(
      'V29 Gate 9: Terminal UX Quality And Browser Proof',
    );
    expect(summarizeTerminalUxBrowserProofContract()).toEqual({
      gate: 'V29 Gate 9: Terminal UX Quality And Browser Proof',
      landmarkCount: 3,
      viewportCount: 4,
      stateCount: 5,
      routeCheckCount: 3,
      evidenceFileCount: 4,
    });
    expect(TERMINAL_UX_BROWSER_PROOF_CONTRACT.landmarks.map((landmark) => landmark.id)).toEqual(
      expect.arrayContaining([
        'terminalMain',
        'terminalTransactionWorkspace',
        'terminalSelectedActivityDetail',
      ]),
    );
    expect(TERMINAL_UX_BROWSER_PROOF_CONTRACT.states.map((state) => state.id)).toEqual(
      expect.arrayContaining(['loading', 'empty', 'failed', 'blocked', 'source-safe-preview']),
    );
    expect(TERMINAL_UX_BROWSER_PROOF_CONTRACT.viewports.map((viewport) => viewport.id)).toEqual([
      'phone',
      'tablet',
      'laptop',
      'widescreen',
    ]);
    expect(TERMINAL_UX_BROWSER_PROOF_CONTRACT.evidenceFiles).toContain(
      'uapi/tests/e2e/commercial-mvp.terminal-ux.spec.ts',
    );
  });

  it('renders Terminal workspace loading, failed, and empty states with explicit semantics', () => {
    const { rerender } = renderWorkspaceState({ isLoadingRuns: true });
    const loadingState = screen.getByTestId('terminal-workspace-loading-state');
    expect(loadingState.getAttribute('role')).toBe('status');
    expect(loadingState.textContent).toContain('Loading Bitcode Terminal');

    rerender(
      <TerminalTransactionWorkspace
        runs={[]}
        selectedRun={null}
        routeSearchParams={new URLSearchParams()}
        filters={buildTerminalTransactionFilters()}
        onFiltersChange={noop}
        onResetFilters={noop}
        pagination={DEFAULT_TRANSACTION_PAGINATION}
        onPaginationChange={noop}
        detailSection="shippables"
        onDetailSectionChange={noop}
        isLoadingRuns={false}
        runsError="Pipeline history read failed."
        transactionDataMode="mock-review"
        onSelectTransaction={noop}
      />,
    );
    const errorState = screen.getByTestId('terminal-workspace-error-state');
    expect(errorState.getAttribute('role')).toBe('alert');
    expect(errorState.textContent).toContain('Pipeline history read failed.');

    rerender(
      <TerminalTransactionWorkspace
        runs={[]}
        selectedRun={null}
        routeSearchParams={new URLSearchParams()}
        filters={buildTerminalTransactionFilters()}
        onFiltersChange={noop}
        onResetFilters={noop}
        pagination={DEFAULT_TRANSACTION_PAGINATION}
        onPaginationChange={noop}
        detailSection="shippables"
        onDetailSectionChange={noop}
        isLoadingRuns={false}
        runsError={null}
        transactionDataMode="mock-review"
        onSelectTransaction={noop}
      />,
    );
    const emptyState = screen.getByTestId('terminal-workspace-empty-state');
    expect(emptyState.getAttribute('role')).toBe('status');
    expect(emptyState.textContent).toContain('Select recent Terminal activity');
  });

  it('keeps transaction-table state semantics and selectable row access stable', () => {
    const onSelectTransaction = jest.fn();
    const { rerender } = render(
      <BitcodeTransactionsDataTable
        records={[]}
        selectedTransactionId={null}
        onSelectTransaction={onSelectTransaction}
        isLoading={true}
        error={null}
      />,
    );

    expect(screen.getByTestId('bitcode-transactions-loading-state').getAttribute('role')).toBe('status');

    rerender(
      <BitcodeTransactionsDataTable
        records={[]}
        selectedTransactionId={null}
        onSelectTransaction={onSelectTransaction}
        isLoading={false}
        error="Unable to read transactions."
      />,
    );
    expect(screen.getByTestId('bitcode-transactions-error-state').getAttribute('role')).toBe('alert');

    rerender(
      <BitcodeTransactionsDataTable
        records={[]}
        selectedTransactionId={null}
        onSelectTransaction={onSelectTransaction}
        isLoading={false}
        error={null}
      />,
    );
    expect(screen.getByTestId('bitcode-transactions-empty-state').getAttribute('role')).toBe('status');

    rerender(
      <BitcodeTransactionsDataTable
        records={[transactionRecord]}
        selectedTransactionId="tx-browser-proof-1"
        onSelectTransaction={onSelectTransaction}
        isLoading={false}
        error={null}
      />,
    );
    expect(screen.getByRole('table', { name: /Recent Bitcode transactions/i })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /tx-browser-proof-1/i }));
    expect(onSelectTransaction).toHaveBeenCalledWith('tx-browser-proof-1');
  });

  it('marks selected detail sections as route-owned controls with blocked actions disabled', () => {
    const onChangeSection = jest.fn();
    render(
      <TerminalTransactionDetailActionBar
        activeSection="activity"
        detailActions={[
          { id: 'shippables', label: 'Shippables' },
          { id: 'activity', label: 'Execution stream' },
          {
            id: 'console',
            label: 'Console',
            disabled: true,
            disabledReason: 'Console detail is available only for live execution-history rows.',
          },
        ]}
        onChangeSection={onChangeSection}
        onRunClosure={noop}
        onRefreshDetail={noop}
        isActing={false}
        shellReady={true}
        mockMode={true}
      />,
    );

    const controlGroup = screen.getByRole('group', { name: /Selected activity detail sections/i });
    const activityButton = within(controlGroup).getByRole('button', { name: 'Execution stream' });
    const consoleButton = within(controlGroup).getByRole('button', { name: 'Console' }) as HTMLButtonElement;

    expect(activityButton.getAttribute('aria-pressed')).toBe('true');
    expect(consoleButton.disabled).toBe(true);
    fireEvent.click(activityButton);
    expect(onChangeSection).toHaveBeenCalledWith('activity');
  });
});
