import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • Interfaces Orbital',
  description: 'Legacy route for the Bitcode interfaces orbital.',
  alternates: {
    canonical: '/orbitals/interfaces',
  },
};

export default function OrbitalsInterfacesLegacyPage() {
  return <OrbitalsRouteClient step="interfaces" />;
}
