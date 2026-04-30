import type { Metadata } from 'next';

import PublicShellFrame from './(root)/components/PublicShellFrame';
import MarketingLandingPage from './(root)/components/MarketingLandingPage';

export const metadata: Metadata = {
  title: 'Bitcode Exchange',
  description:
    'The Bitcode Exchange for Source Shares, measured technical intelligence, Terminal, and docs.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <PublicShellFrame>
      <MarketingLandingPage />
    </PublicShellFrame>
  );
}
