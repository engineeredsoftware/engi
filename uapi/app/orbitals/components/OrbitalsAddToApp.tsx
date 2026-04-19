"use client";
import { useEffect } from 'react';
import { prefetchAuxillaries } from '@/app/auxillaries/components/AuxillariesProvider';

export default function AddOrbitalToApp() {
  useEffect(() => {
    prefetchAuxillaries?.();
  }, []);
  return null;
}
