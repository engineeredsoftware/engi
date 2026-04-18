"use client";

import React from 'react';
import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsModelsOrbitalHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <OrbitalsOrbitalHeader
      title="Interfaces Orbital"
      completedTitle="Interfaces Orbital"
      description={!isOnboardingComplete
        ? 'Choose interface defaults now or keep the standard Bitcode workspace profile.'
        : 'Configure transaction, conversation, prompt, and execution defaults in this orbital.'}
      stepNumber={3}
      isOnboardingComplete={isOnboardingComplete}
      showInfoBox
      infoTitle="Shape interface defaults"
      infoDescription="Use the default Bitcode interface profile or tailor transactions, conversations, and prompts to your team."
      infoNote="You can revise this orbital any time."
    />
  );
}
