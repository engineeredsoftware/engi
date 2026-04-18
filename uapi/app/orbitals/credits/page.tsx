import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: '$BTD • Credits & Usage',
  description: 'Application-owned Bitcode credits and usage orbital route.',
  alternates: {
    canonical: '/orbitals/credits',
  },
};

export default function OrbitalsCreditsPage() {
  return <OrbitalsRouteClient step="credits" />;
}
