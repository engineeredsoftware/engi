"use client";

"use client";

import React from 'react';

import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsInterfacesOrbitalHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <OrbitalsOrbitalHeader
      title="Interfaces Auxillary"
      completedTitle="Interfaces Auxillary"
      description={!isOnboardingComplete
        ? 'Choose interface defaults now or keep the standard Bitcode reading behavior.'
        : 'Set transaction, conversation, prompt, and default reading behavior in this auxillary.'}
      stepNumber={3}
      isOnboardingComplete={isOnboardingComplete}
      badgeTestId="interfaces-step-badge"
      showInfoBox
      infoTitle="Shape interface defaults"
      infoDescription="Set how transactions, conversations, proofs, and default reading behavior read for your team."
      infoNote="You can revise this auxillary any time."
    />
  );
}
