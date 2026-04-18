import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • Interfaces Orbital',
  description: 'Application-owned Bitcode interfaces orbital route.',
  alternates: {
    canonical: '/orbitals/interfaces',
  },
};

export default function OrbitalsInterfacesPage() {
  return <OrbitalsRouteClient step="interfaces" />;
}
