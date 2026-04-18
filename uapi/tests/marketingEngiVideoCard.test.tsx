import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import MarketingEngiVideoCard from '@/app/(root)/components/MarketingEngiVideoCard';

describe('MarketingEngiVideoCard', () => {
  it('renders the Bitcode operator guide posture', async () => {
    render(
      <MarketingEngiVideoCard
        initialPlayableSourceIndex={0}
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
    render(<MarketingEngiVideoCard initialSourceResolved />);

    expect(await screen.findByText('Operator guide')).toBeInTheDocument();
    expect(
      await screen.findByText(
        'Drop the recorded Bitcode operator guide at public/videos/bitcode-operator-guide.mp4 to enable inline playback.',
      ),
    ).toBeInTheDocument();
  });
});
