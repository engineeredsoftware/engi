import type { Metadata } from 'next';

import PublicShellFrame from './(root)/components/PublicShellFrame';
import MarketingLandingPage from './(root)/components/MarketingLandingPage';

export const metadata: Metadata = {
  title: 'Bitcode Network',
  description:
    'Live Bitcode activity, market posture, and route entry across network, transactions, docs, and orbitals.',
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
