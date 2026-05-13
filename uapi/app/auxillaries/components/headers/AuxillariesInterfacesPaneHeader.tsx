"use client";

import React from 'react';

import { AuxillariesPaneHeader } from './AuxillariesPaneHeader';

export default function AuxillariesInterfacesPaneHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <AuxillariesPaneHeader
      title="Interfaces Auxillary"
      completedTitle="Interfaces Auxillary"
      description={!isOnboardingComplete
        ? 'Choose interface defaults now or keep the standard Bitcode reading behavior.'
        : 'Set transaction, conversation, prompt, and default reading behavior in this auxillary.'}
      stepNumber={4}
      isOnboardingComplete={isOnboardingComplete}
      badgeTestId="interfaces-step-badge"
      showInfoBox
      infoTitle="Shape interface defaults"
      infoDescription="Set how transactions, conversations, proofs, and default reading behavior read for your team."
      infoNote="You can revise this auxillary any time."
    />
  );
}
