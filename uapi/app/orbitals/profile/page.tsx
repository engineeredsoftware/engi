import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • Profile Auxiliary',
  description:
    'Retained /orbitals compatibility route converging on Bitcode auxiliaries through the Profile auxiliary read.',
  alternates: {
    canonical: '/orbitals/profile',
  },
};

export default function OrbitalsProfilePage() {
  return <OrbitalsRouteClient step="profile" />;
}
