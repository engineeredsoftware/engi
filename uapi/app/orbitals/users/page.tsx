import type { Metadata } from 'next';

import OrbitalsRouteClient from '@/app/orbitals/OrbitalsRouteClient';

export const metadata: Metadata = {
  title: '$BTD • Account & Team',
  description: 'Application-owned Bitcode account and team orbital route.',
  alternates: {
    canonical: '/orbitals/users',
  },
};

export default function OrbitalsUsersPage() {
  return <OrbitalsRouteClient step="profile" />;
}
