import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import MarketingOperatorGuideCard from '@/app/(root)/components/MarketingOperatorGuideCard';
import { MARKETING_OPERATOR_GUIDE_SOURCE } from '@/app/(root)/components/marketing-operator-guide-assets';

describe('MarketingOperatorGuideCard', () => {
  it('renders the Bitcode operator guide posture', async () => {
    render(
      <MarketingOperatorGuideCard
        initialSourcePlayable
        initialSourceResolved
      />,
    );

    expect(
      await screen.findByRole('button', { name: /Review Bitcode operator flow/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Give, need, transactions, conversations, orbitals, and shipping captured in one recorded operator session.',
      ),
    ).toBeInTheDocument();
  });

  it('falls back cleanly when no operator guide asset is available', async () => {
    render(<MarketingOperatorGuideCard initialSourceResolved />);

    expect(await screen.findByText('Operator guide')).toBeInTheDocument();
    expect(
      await screen.findByText(
        'The recorded operator guide is being refreshed. Continue in the transactions terminal while the next captured walkthrough is published.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Open transactions terminal' }),
    ).toHaveAttribute('href', '/application');
  });

  it('resolves only the Bitcode guide media source', () => {
    expect(MARKETING_OPERATOR_GUIDE_SOURCE.src).toBe('/videos/bitcode-operator-guide.mp4');
    expect(MARKETING_OPERATOR_GUIDE_SOURCE.relativeSourcePath).toBe(
      'public/videos/bitcode-operator-guide.mp4',
    );
  });
});
