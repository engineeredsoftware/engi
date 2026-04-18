"use client";

import React from 'react';
import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsCreditsOrbitalHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <OrbitalsOrbitalHeader
      title="$BTD Orbital"
      completedTitle="$BTD Orbital"
      description={!isOnboardingComplete
        ? 'Review wallet posture, balances, and $BTD readiness before you run heavier Bitcode work.'
        : 'Review balances, usage, share posture, and advanced $BTD defaults.'}
      stepNumber={4}
      isOnboardingComplete={isOnboardingComplete}
      badgeTestId="credits-step-badge"
      showInfoBox
      infoTitle="Review wallet + $BTD posture"
      infoDescription="Keep wallet balances, usage throughput, share posture, and advanced $BTD configuration visible in one orbital."
      infoNote="Top up or refine advanced $BTD behavior whenever needed."
    />
  );
}
