"use client";
import { useEffect } from 'react';
import { prefetchOrbital } from '@/app/orbitals/components/OrbitalsProvider';

export default function AddOrbitalToApp() {
  useEffect(() => {
    prefetchOrbital?.();
  }, []);
  return null;
}
