import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • Interfaces Auxiliary',
  description:
    'Retained /orbitals compatibility route converging on Bitcode auxiliaries through the Interfaces auxiliary read.',
  alternates: {
    canonical: '/orbitals/interfaces',
  },
};

export default function OrbitalsInterfacesPage() {
  return <OrbitalsRouteClient step="interfaces" />;
}
