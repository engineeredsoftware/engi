import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • $BTD Orbital',
  description: 'Application-owned Bitcode $BTD orbital route.',
  alternates: {
    canonical: '/orbitals/btd',
  },
};

export default function OrbitalsBTDPage() {
  return <OrbitalsRouteClient step="btd" />;
}
