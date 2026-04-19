import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • $BTD Auxiliary',
  description:
    'Retained /orbitals compatibility route converging on Bitcode auxiliaries through the $BTD auxiliary read.',
  alternates: {
    canonical: '/orbitals/btd',
  },
};

export default function OrbitalsBTDPage() {
  return <OrbitalsRouteClient step="btd" />;
}
