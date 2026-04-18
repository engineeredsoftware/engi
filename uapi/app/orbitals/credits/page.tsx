import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • $BTD Orbital',
  description: 'Legacy route for the Bitcode $BTD orbital.',
  alternates: {
    canonical: '/orbitals/btd',
  },
};

export default function OrbitalsBTDLegacyPage() {
  return <OrbitalsRouteClient step="btd" />;
}
