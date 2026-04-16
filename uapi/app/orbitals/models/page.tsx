import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: '$BTD • Model Settings',
  description: 'Application-owned Bitcode model settings route.',
  alternates: {
    canonical: '/orbitals/models',
  },
};

export default function OrbitalsModelsPage() {
  return <OrbitalsRouteClient step="models" />;
}
