import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • Interfaces Auxillary',
  description:
    'Retained /orbitals compatibility route converging on Bitcode auxillaries through the Interfaces auxillary read.',
  alternates: {
    canonical: '/orbitals/interfaces',
  },
};

export default function OrbitalsInterfacesPage() {
  return <OrbitalsRouteClient step="interfaces" />;
}
