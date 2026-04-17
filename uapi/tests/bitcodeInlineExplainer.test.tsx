import React from 'react';
import { render, screen } from '@testing-library/react';

import BitcodeInlineExplainer from '@/components/base/engi/execution/BitcodeInlineExplainer';

describe('BitcodeInlineExplainer', () => {
  it('renders an accessible explainer trigger with tooltip content', () => {
    render(
      <BitcodeInlineExplainer
        explainer={{
          kicker: 'Closure column',
          title: 'Proof posture',
          summary: 'Explains the current bounded-proof state carried by the transaction row.',
          detail: 'Use this when you need exact closure posture before opening detail.',
          points: ['Shows witness readiness', 'Shows settlement or replay posture'],
        }}
      />,
    );

    expect(screen.getByRole('button', { name: 'Explain Proof posture' })).toBeTruthy();
    expect(screen.getByRole('tooltip')).toBeTruthy();
    expect(screen.getByText('Closure column')).toBeTruthy();
    expect(screen.getByText('Explains the current bounded-proof state carried by the transaction row.')).toBeTruthy();
    expect(screen.getByText('Shows witness readiness')).toBeTruthy();
  });
});
