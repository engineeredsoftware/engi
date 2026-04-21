"use client";

import React from 'react';
import { AuxillariesPaneHeader } from './AuxillariesPaneHeader';

export default function AuxillariesConnectsPaneHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <AuxillariesPaneHeader
      title="Connects Auxillary"
      completedTitle="Connects Auxillary"
      description={!isOnboardingComplete
        ? 'Connect GitHub so Bitcode can measure need, synthesize asset packs, and settle against live repositories.'
        : 'Manage GitHub and future repository or interface connections from one auxillary.'}
      stepNumber={2}
      isOnboardingComplete={isOnboardingComplete}
      showInfoBox
      infoTitle="Connect live repositories"
      infoDescription="Attach GitHub so Bitcode can read source context, measure need, synthesize asset packs, and stay aligned with your live workflow."
    />
  );
}
