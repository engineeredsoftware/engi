"use client";

import { useEffect } from 'react';
import { openOrbital, prefetchOrbital } from '@/app/orbitals/components/OrbitalsProvider';

export default function OrbitalsModelsPage() {
  useEffect(() => {
    prefetchOrbital();
    openOrbital('SignUpWindow', 'models');
  }, []);
  return null;
}
