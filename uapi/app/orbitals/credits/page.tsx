"use client";

import { useEffect } from 'react';
import { openOrbital, prefetchOrbital } from '@/app/orbitals/components/OrbitalsProvider';

export default function OrbitalsCreditsPage() {
  useEffect(() => {
    prefetchOrbital();
    openOrbital('SignUpWindow', 'credits');
  }, []);
  return null;
}
