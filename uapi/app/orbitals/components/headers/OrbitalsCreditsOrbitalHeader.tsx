"use client";

import React from 'react';
import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsCreditsOrbitalHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <OrbitalsOrbitalHeader
      title="Add Credits"
      completedTitle="Credits & Usage"
      description={!isOnboardingComplete
        ? 'Add credits now to start using Engi.'
        : 'View and manage your credit balance.'}
      stepNumber={4}
      isOnboardingComplete={isOnboardingComplete}
      badgeTestId="credits-step-badge"
      showInfoBox
      infoTitle="Add Credits"
      infoDescription="Credits power AI tasks. Buy what you need now and add more anytime."
      infoNote="New users save on their first purchase. Credits never expire and are ready to use immediately."
    />
  );
}
