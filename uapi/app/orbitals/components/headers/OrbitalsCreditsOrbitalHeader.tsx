"use client";

import React from 'react';
import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsCreditsOrbitalHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <OrbitalsOrbitalHeader
      title="Credits & Usage"
      completedTitle="Credits & Usage"
      description={!isOnboardingComplete
        ? 'Add credits to start running Bitcode workloads.'
        : 'Review balances, usage, and purchase history.'}
      stepNumber={4}
      isOnboardingComplete={isOnboardingComplete}
      badgeTestId="credits-step-badge"
      showInfoBox
      infoTitle="Fund Bitcode usage"
      infoDescription="Credits fund Bitcode execution, model calls, and workflow throughput."
      infoNote="Purchase what you need now and top up later."
    />
  );
}
