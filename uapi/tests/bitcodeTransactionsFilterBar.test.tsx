import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import BitcodeTransactionsFilterBar from '@/components/base/bitcode/execution/BitcodeTransactionsFilterBar';

describe('BitcodeTransactionsFilterBar', () => {
  it('renders shared explainers and still emits filter changes', () => {
    const onFiltersChange = jest.fn();

    render(
      <BitcodeTransactionsFilterBar
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
        onFiltersChange={onFiltersChange}
        statusOptions={['completed']}
        repositoryOptions={['bitcode/bitcode']}
        participantOptions={['garrett']}
        proofStatusOptions={['bounded proof bundle ready']}
      />,
    );

    expect(screen.getByRole('button', { name: 'Explain Search transactions' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Explain Proof posture filter' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Explain Sort order' })).toBeTruthy();

    fireEvent.change(screen.getByRole('textbox', { name: 'Search transactions' }), {
      target: { value: 'proof bundle' },
    });

    expect(onFiltersChange).toHaveBeenCalledWith({
      searchTerm: 'proof bundle',
      status: 'all',
      ownership: 'all',
      transactionLens: 'all',
      repository: 'all',
      participant: 'all',
      proofStatus: 'all',
      sort: 'newest',
    });
  });
});
