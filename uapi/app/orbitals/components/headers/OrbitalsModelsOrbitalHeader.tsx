"use client";

import React from 'react';
import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsModelsOrbitalHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <OrbitalsOrbitalHeader
      title="Models Orbital"
      completedTitle="Models Orbital"
      description={!isOnboardingComplete
        ? 'Choose defaults now or keep the standard Bitcode model profile.'
        : 'Configure model defaults, prompts, and execution behavior in this orbital.'}
      stepNumber={3}
      isOnboardingComplete={isOnboardingComplete}
      showInfoBox
      infoTitle="Configure model defaults"
      infoDescription="Use the default Bitcode model profile or tailor it to your team."
      infoNote="You can revise this orbital at any time."
    />
  );
}
