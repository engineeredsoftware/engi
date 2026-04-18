import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode • Profile Orbital',
  description: 'Application-owned Bitcode profile orbital route.',
  alternates: {
    canonical: '/orbitals/users',
  },
};

export default function OrbitalsUsersPage() {
  return <OrbitalsRouteClient step="profile" />;
}
