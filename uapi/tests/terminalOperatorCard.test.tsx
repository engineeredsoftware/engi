import React from 'react';
import { render, screen } from '@testing-library/react';

import TerminalOperatorCard from '@/app/terminal/TerminalOperatorCard';

describe('TerminalOperatorCard', () => {
  it('renders shared operator framing, header aside, and explainer trigger', () => {
    render(
      <TerminalOperatorCard
        kicker="Deposit intake"
        title="Draft and submit a deposit-side deposit"
        summary="Build the deposit from selected supply and keep the working draft resumable."
        headerAside={<div>Header metrics</div>}
        explainer={{
          kicker: 'Deposit-side intake',
          title: 'Deposit drafting and submission',
          summary: 'Deposits should read like resumable drafts.',
        }}
      >
        <button type="button">Submit deposit</button>
      </TerminalOperatorCard>,
    );

    expect(screen.getByText('Deposit intake')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Draft and submit a deposit-side deposit' })).toBeTruthy();
    expect(
      screen.getByText('Build the deposit from selected supply and keep the working draft resumable.'),
    ).toBeTruthy();
    expect(screen.getByText('Header metrics')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Submit deposit' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Explain Deposit drafting and submission' })).toBeTruthy();
  });
});
