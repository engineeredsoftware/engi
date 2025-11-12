"use client";

import React from 'react';
import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsConnectsOrbitalHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <OrbitalsOrbitalHeader
      title="Connect Tools"
      description="Connect tools to enhance Engi's capabilities."
      stepNumber={2}
      isOnboardingComplete={isOnboardingComplete}
    />
  );
}
