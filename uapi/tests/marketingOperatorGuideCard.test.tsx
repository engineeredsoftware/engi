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
      await screen.findByRole('button', { name: /Recorded operator walkthrough/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Use the walkthrough when you want the Bitcode flow narrated before you move into the Bitcode Terminal.',
      ),
    ).toBeInTheDocument();
  });

  it('falls back cleanly when no operator guide asset is available', async () => {
    render(<MarketingOperatorGuideCard initialSourceResolved />);

    expect(await screen.findByText('Walkthrough')).toBeInTheDocument();
    expect(
      await screen.findByText(
        'The recorded walkthrough is being refreshed. Use the docs panels and the Bitcode Terminal while the next capture is published.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Open Bitcode Terminal' }),
    ).toHaveAttribute('href', '/terminal');
  });

  it('resolves only the Bitcode guide media source', () => {
    expect(MARKETING_OPERATOR_GUIDE_SOURCE.src).toBe('/videos/bitcode-operator-guide.mp4');
    expect(MARKETING_OPERATOR_GUIDE_SOURCE.relativeSourcePath).toBe(
      'public/videos/bitcode-operator-guide.mp4',
    );
  });
});
