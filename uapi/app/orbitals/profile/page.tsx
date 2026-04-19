import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • Profile Auxillary',
  description:
    'Retained /orbitals compatibility route converging on Bitcode auxillaries through the Profile auxillary read.',
  alternates: {
    canonical: '/orbitals/profile',
  },
};

export default function OrbitalsProfilePage() {
  return <OrbitalsRouteClient step="profile" />;
}
