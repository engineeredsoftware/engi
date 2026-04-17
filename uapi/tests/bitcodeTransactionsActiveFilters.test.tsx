import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import BitcodeTransactionsActiveFilters from '@/components/base/engi/execution/BitcodeTransactionsActiveFilters';

describe('BitcodeTransactionsActiveFilters', () => {
  it('renders active chips and clears one filter at a time', () => {
    const onFiltersChange = jest.fn();
    const onResetFilters = jest.fn();

    render(
      <BitcodeTransactionsActiveFilters
        filters={{
          searchTerm: 'proof bundle',
          status: 'completed',
          ownership: 'all',
          transactionLens: 'all',
          repository: 'all',
          participant: 'garrett',
          proofStatus: 'all',
          sort: 'newest',
        }}
        onFiltersChange={onFiltersChange}
        onResetFilters={onResetFilters}
      />,
    );

    expect(screen.getByText('Active filter posture')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Search: proof bundle ×' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Status: completed ×' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Participant: garrett ×' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Participant: garrett ×' }));
    expect(onFiltersChange).toHaveBeenCalledWith({
      searchTerm: 'proof bundle',
      status: 'completed',
      ownership: 'all',
      transactionLens: 'all',
      repository: 'all',
      participant: 'all',
      proofStatus: 'all',
      sort: 'newest',
    });

    fireEvent.click(screen.getByRole('button', { name: 'Clear all filters' }));
    expect(onResetFilters).toHaveBeenCalled();
  });

  it('renders nothing when the transaction filters are at default posture', () => {
    const { container } = render(
      <BitcodeTransactionsActiveFilters
        filters={{
          searchTerm: '',
          status: 'all',
          ownership: 'all',
          transactionLens: 'all',
          repository: 'all',
          participant: 'all',
          proofStatus: 'all',
          sort: 'newest',
        }}
        onFiltersChange={() => undefined}
      />,
    );

    expect(container.firstChild).toBeNull();
  });
});
