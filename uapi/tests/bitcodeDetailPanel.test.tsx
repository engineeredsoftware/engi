import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import BitcodeDetailPanel from '@/components/base/bitcode/execution/BitcodeDetailPanel';

describe('BitcodeDetailPanel', () => {
  it('renders summary, metrics, rows, and action follow-through', () => {
    const onAction = jest.fn();

    render(
      <BitcodeDetailPanel
        badge="master"
        title="Transactions"
        summary="Search, filter, and inspect Bitcode transactions inside the application."
        metrics={[
          { label: 'Status', value: 'completed' },
          { label: 'Started', value: 'Apr 16, 12:00 PM' },
        ]}
        rows={[
          { label: 'Transaction id', value: 'tx-001' },
          { label: 'Repository', value: 'bitcode/bitcode' },
        ]}
        tagLabel="substructure"
        actionLabel="Open transactions"
        onAction={onAction}
      />,
    );

    expect(screen.getByText('master')).toBeTruthy();
    expect(screen.getByText('Transactions')).toBeTruthy();
    expect(screen.getByText('Search, filter, and inspect Bitcode transactions inside the application.')).toBeTruthy();
    expect(screen.getByText('Status')).toBeTruthy();
    expect(screen.getByText('completed')).toBeTruthy();
    expect(screen.getByText('Transaction id')).toBeTruthy();
    expect(screen.getByText('tx-001')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Open transactions' }));

    expect(onAction).toHaveBeenCalled();
  });
});
