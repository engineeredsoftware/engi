"use client";

import React from 'react';
import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsUsersOrbitalHeader({
  isOnboardingComplete = false,
  isVerified = false,
}: { isOnboardingComplete?: boolean; isVerified?: boolean }) {
  const description = !isVerified
    ? "Verify your email to secure Bitcode access and unlock the rest of your settings."
    : "Manage your profile, organization, and team settings.";
  return (
    <OrbitalsOrbitalHeader
      title="Account & Team"
      completedTitle="Account & Team"
      description={description}
      stepNumber={1}
      isOnboardingComplete={isOnboardingComplete}
      badgeTestId="profile-step-badge"
      showInfoBox
      infoTitle="Secure account access"
      infoDescription="Verify your email to secure your Bitcode account before connecting repositories, configuring models, or funding usage."
    />
  );
}
