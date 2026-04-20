"use client";

import React from 'react';

import { AuxillariesPaneHeader } from './AuxillariesPaneHeader';

export default function AuxillariesProfilePaneHeader({
  isOnboardingComplete = false,
  isVerified = false,
}: { isOnboardingComplete?: boolean; isVerified?: boolean }) {
  const description = !isVerified
    ? 'Verify your email to secure Bitcode access and unlock the rest of your Auxillaries.'
    : 'Manage wallet identity, balances, organization roles, and multi-sig membership from one auxillary.';

  return (
    <AuxillariesPaneHeader
      title="Profile Auxillary"
      completedTitle="Profile Auxillary"
      description={description}
      stepNumber={1}
      isOnboardingComplete={isOnboardingComplete}
      badgeTestId="profile-step-badge"
      showInfoBox
      infoTitle="Secure wallet profile access"
      infoDescription="Verify your email before opening Connects, shaping Interfaces, or reviewing $BTD posture."
    />
  );
}
