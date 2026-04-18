import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • Connects Orbital',
  description: 'Application-owned Bitcode connections orbital route.',
  alternates: {
    canonical: '/orbitals/connects',
  },
};

export default function OrbitalsConnectsPage() {
  return <OrbitalsRouteClient step="connects" />;
}
