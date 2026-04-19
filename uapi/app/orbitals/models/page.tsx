import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • Interfaces Auxillary',
  description: 'Legacy route for the Bitcode interfaces auxillary.',
  alternates: {
    canonical: '/orbitals/interfaces',
  },
};

export default function OrbitalsInterfacesLegacyPage() {
  return <OrbitalsRouteClient step="interfaces" />;
}
