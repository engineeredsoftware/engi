"use client";

import React from 'react';
import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsUsersOrbitalHeader({
  isOnboardingComplete = false,
  isVerified = false,
}: { isOnboardingComplete?: boolean; isVerified?: boolean }) {
  const description = !isVerified
    ? "Verify your email to secure Bitcode access and unlock the rest of your orbitals."
    : "Manage wallet identity, balances, organization roles, and multi-sig membership from one orbital.";
  return (
    <OrbitalsOrbitalHeader
      title="Profile Orbital"
      completedTitle="Profile Orbital"
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
