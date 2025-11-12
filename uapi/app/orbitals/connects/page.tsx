"use client";

import { useEffect } from 'react';
import { openOrbital, prefetchOrbital } from '@/app/orbitals/components/OrbitalsProvider';

export default function OrbitalsConnectsPage() {
  useEffect(() => {
    prefetchOrbital();
    openOrbital('SignUpWindow', 'connects');
  }, []);
  return null;
}
