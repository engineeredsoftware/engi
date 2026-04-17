import React from 'react';
import { render, screen } from '@testing-library/react';

import ApplicationOperatorCard from '@/app/application/ApplicationOperatorCard';

describe('ApplicationOperatorCard', () => {
  it('renders shared operator framing, header aside, and explainer trigger', () => {
    render(
      <ApplicationOperatorCard
        kicker="Give intake"
        title="Draft and submit a give-side deposit"
        summary="Build the deposit from selected supply and keep the working draft resumable."
        headerAside={<div>Header metrics</div>}
        explainer={{
          kicker: 'Give-side intake',
          title: 'Deposit drafting and submission',
          summary: 'Deposits should read like resumable drafts.',
        }}
      >
        <button type="button">Submit deposit</button>
      </ApplicationOperatorCard>,
    );

    expect(screen.getByText('Give intake')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Draft and submit a give-side deposit' })).toBeTruthy();
    expect(
      screen.getByText('Build the deposit from selected supply and keep the working draft resumable.'),
    ).toBeTruthy();
    expect(screen.getByText('Header metrics')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Submit deposit' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Explain Deposit drafting and submission' })).toBeTruthy();
  });
});
