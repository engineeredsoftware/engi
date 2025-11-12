"use client";

import { useEffect } from 'react';
import { openOrbital, prefetchOrbital } from '@/app/orbitals/components/OrbitalsProvider';

export default function OrbitalsUsersPage() {
  useEffect(() => {
    prefetchOrbital();
    openOrbital('SignUpWindow', 'profile');
  }, []);
  return null;
}
