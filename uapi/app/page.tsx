import type { Metadata } from 'next';

import PublicShellFrame from './(root)/components/PublicShellFrame';
import MarketingLandingPage from './(root)/components/MarketingLandingPage';

export const metadata: Metadata = {
  title: 'Bitcode',
  description:
    'Bitcode public home for Source Shares, measured technical intelligence, Exchange, Terminal, and docs.',
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
