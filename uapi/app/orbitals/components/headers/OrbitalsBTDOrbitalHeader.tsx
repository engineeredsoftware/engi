"use client";

"use client";

import React from 'react';

import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsBTDOrbitalHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <OrbitalsOrbitalHeader
      title="$BTD Orbital"
      completedTitle="$BTD Orbital"
      description={!isOnboardingComplete
        ? 'Review wallet posture, balances, and $BTD readiness before you run heavier Bitcode work.'
        : 'Review balances, share posture, throughput history, and advanced $BTD defaults.'}
      stepNumber={4}
      isOnboardingComplete={isOnboardingComplete}
      badgeTestId="btd-step-badge"
      showInfoBox
      infoTitle="Review wallet + $BTD posture"
      infoDescription="Keep wallet balances, share posture, throughput history, and advanced $BTD configuration visible in one orbital."
      infoNote="Refine advanced $BTD behavior whenever needed."
    />
  );
}
