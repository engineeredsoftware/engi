"use client";

import React from 'react';

import { AuxillariesPaneHeader } from './AuxillariesPaneHeader';

export default function AuxillariesBTDPaneHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <AuxillariesPaneHeader
      title="$BTD Auxillary"
      completedTitle="$BTD Auxillary"
      description={!isOnboardingComplete
        ? 'Review wallet posture, balances, and $BTD readiness before you run heavier Bitcode work.'
        : 'Review balances, share posture, throughput history, and advanced $BTD defaults.'}
      stepNumber={4}
      isOnboardingComplete={isOnboardingComplete}
      badgeTestId="btd-step-badge"
      showInfoBox
      infoTitle="Review wallet + $BTD posture"
      infoDescription="Keep wallet balances, share posture, throughput history, and advanced $BTD defaults visible in one auxillary."
      infoNote="Refine advanced $BTD behavior whenever needed."
    />
  );
}
