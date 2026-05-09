"use client";

import React from 'react';

import { AuxillariesPaneHeader } from './AuxillariesPaneHeader';

export default function AuxillariesProfilePaneHeader({
  isOnboardingComplete = false,
  isVerified = false,
}: { isOnboardingComplete?: boolean; isVerified?: boolean }) {
  const description = !isVerified
    ? 'Connect a Bitcoin wallet first, connect GitHub second, and optionally add email for notifications.'
    : 'Manage wallet identity, optional notification email, organization roles, and multi-sig membership from one auxillary.';

  return (
    <AuxillariesPaneHeader
      title="Profile Auxillary"
      completedTitle="Profile Auxillary"
      description={description}
      stepNumber={1}
      isOnboardingComplete={isOnboardingComplete}
      badgeTestId="profile-step-badge"
      showInfoBox
      infoTitle="Wallet-first profile access"
      infoDescription="Bitcoin wallet identity is the authentication minimum. GitHub enables Give and Need work; email is optional notification posture."
    />
  );
}
