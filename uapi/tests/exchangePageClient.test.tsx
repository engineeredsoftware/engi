import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import ExchangePageClient from '@/app/exchange/ExchangePageClient';

const mockReplace = jest.fn();
let mockQuery = 'intent=buy-existing-btd';

jest.mock('next/navigation', () => ({
  usePathname: () => '/exchange',
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => new URLSearchParams(mockQuery),
}));

jest.mock('@/lib/mock-review-mode', () => ({
  isAuxillariesMockMode: () => true,
}));

jest.mock('@/networking/api-client', () => ({
  fetchPipelineExecutionHistory: jest.fn(),
}));

jest.mock('@/app/terminal/terminal-shell-bridge', () => ({
  TerminalShellBridgeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/app/terminal/TerminalTransactionWorkspace', () => ({
  __esModule: true,
  default: ({
    runs,
    selectedRun,
    surface,
  }: {
    runs: Array<{ id: string }>;
    selectedRun: { id: string } | null;
    surface?: string;
  }) => (
    <div
      data-testid="exchange-workspace"
      data-run-count={runs.length}
      data-selected-run={selectedRun?.id || ''}
      data-surface={surface || ''}
    />
  ),
}));

describe('ExchangePageClient', () => {
  beforeEach(() => {
    mockReplace.mockReset();
    mockQuery = 'intent=buy-existing-btd';
  });

  it('renders the Exchange activity master-detail surface without redirecting or route-focusing the first row', async () => {
    render(<ExchangePageClient />);

    expect(
      screen.getByRole('heading', { name: /Read market activity, select an order, and inspect Exchange state/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('market filters')).toBeInTheDocument();
    expect(screen.getByText('activity replay')).toBeInTheDocument();
    expect(screen.getByText('source-safe preview')).toBeInTheDocument();
    expect(screen.getByText('proof-rooted state')).toBeInTheDocument();
    expect(screen.getByTestId('exchange-workspace')).toHaveAttribute('data-surface', 'exchange');
    expect(screen.getByTestId('exchange-workspace')).toHaveAttribute(
      'data-selected-run',
      'mock-run-branch-remediation',
    );

    await waitFor(() => {
      expect(screen.getByTestId('exchange-workspace')).toHaveAttribute('data-run-count', '3');
    });
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('honors an explicit Exchange transaction focus without rewriting the entry URL', async () => {
    mockQuery = 'intent=buy-existing-btd&transactionId=mock-run-read-measurement-pass';

    render(<ExchangePageClient />);

    expect(screen.getByTestId('exchange-workspace')).toHaveAttribute(
      'data-selected-run',
      'mock-run-read-measurement-pass',
    );
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
