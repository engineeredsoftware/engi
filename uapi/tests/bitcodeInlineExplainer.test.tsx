import React from 'react';
import { render, screen } from '@testing-library/react';

import BitcodeInlineExplainer from '@/components/base/engi/execution/BitcodeInlineExplainer';

describe('BitcodeInlineExplainer', () => {
  it('renders an accessible explainer trigger with tooltip content', () => {
    render(
      <BitcodeInlineExplainer
        title="Proof posture"
        description="Explains the current bounded-proof state carried by the transaction row."
      />,
    );

    expect(screen.getByRole('button', { name: 'Explain Proof posture' })).toBeTruthy();
    expect(screen.getByRole('tooltip')).toBeTruthy();
    expect(screen.getByText('Explains the current bounded-proof state carried by the transaction row.')).toBeTruthy();
  });
});
