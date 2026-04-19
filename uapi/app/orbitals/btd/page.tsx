import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • $BTD Auxillary',
  description:
    'Retained /orbitals compatibility route converging on Bitcode auxillaries through the $BTD auxillary read.',
  alternates: {
    canonical: '/orbitals/btd',
  },
};

export default function OrbitalsBTDPage() {
  return <OrbitalsRouteClient step="btd" />;
}
