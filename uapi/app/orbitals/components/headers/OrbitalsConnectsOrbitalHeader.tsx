"use client";

import React from 'react';
import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsConnectsOrbitalHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <OrbitalsOrbitalHeader
      title="Connections"
      completedTitle="Connections"
      description={!isOnboardingComplete
        ? "Connect GitHub and related tools so Bitcode can operate on live repositories."
        : "Manage GitHub and future application integrations."}
      stepNumber={2}
      isOnboardingComplete={isOnboardingComplete}
      showInfoBox
      infoTitle="Connect repositories"
      infoDescription="Attach GitHub so Bitcode can read source context, create deliverables, and stay aligned with your live workflow."
    />
  );
}
