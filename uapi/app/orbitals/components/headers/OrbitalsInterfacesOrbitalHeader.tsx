"use client";

"use client";

import React from 'react';

import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsInterfacesOrbitalHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <OrbitalsOrbitalHeader
      title="Interfaces Orbital"
      completedTitle="Interfaces Orbital"
      description={!isOnboardingComplete
        ? 'Choose interface defaults now or keep the standard Bitcode workspace behavior.'
        : 'Configure transaction, conversation, prompt, and default workspace behavior in this orbital.'}
      stepNumber={3}
      isOnboardingComplete={isOnboardingComplete}
      badgeTestId="interfaces-step-badge"
      showInfoBox
      infoTitle="Shape interface defaults"
      infoDescription="Set how transactions, conversations, proofs, and default workspace behavior read for your team."
      infoNote="You can revise this orbital any time."
    />
  );
}
