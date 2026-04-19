import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • Connects Auxillary',
  description:
    'Retained /orbitals compatibility route converging on Bitcode auxillaries through the Connects auxillary read.',
  alternates: {
    canonical: '/orbitals/connects',
  },
};

export default function OrbitalsConnectsPage() {
  return <OrbitalsRouteClient step="connects" />;
}
