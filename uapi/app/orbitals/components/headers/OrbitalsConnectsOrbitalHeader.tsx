"use client";

import React from 'react';
import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsConnectsOrbitalHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <OrbitalsOrbitalHeader
      title="Connects Auxillary"
      completedTitle="Connects Auxillary"
      description={!isOnboardingComplete
        ? 'Connect GitHub so Bitcode can operate on live repositories.'
        : 'Manage GitHub and future repository connections from one auxillary.'}
      stepNumber={2}
      isOnboardingComplete={isOnboardingComplete}
      showInfoBox
      infoTitle="Connect live repositories"
      infoDescription="Attach GitHub so Bitcode can read source context, create deliverables, and stay aligned with your live workflow."
    />
  );
}
