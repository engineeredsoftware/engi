import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • Connects Auxiliary',
  description:
    'Retained /orbitals compatibility route converging on Bitcode auxiliaries through the Connects auxiliary read.',
  alternates: {
    canonical: '/orbitals/connects',
  },
};

export default function OrbitalsConnectsPage() {
  return <OrbitalsRouteClient step="connects" />;
}
