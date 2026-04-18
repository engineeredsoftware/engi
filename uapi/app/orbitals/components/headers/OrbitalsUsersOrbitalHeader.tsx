"use client";

import React from 'react';
import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsUsersOrbitalHeader({
  isOnboardingComplete = false,
  isVerified = false,
}: { isOnboardingComplete?: boolean; isVerified?: boolean }) {
  const description = !isVerified
    ? "Verify your email to secure Bitcode access and unlock the rest of your orbitals."
    : "Manage your profile, wallet identity, organization roles, and team posture.";
  return (
    <OrbitalsOrbitalHeader
      title="Profile Orbital"
      completedTitle="Profile Orbital"
      description={description}
      stepNumber={1}
      isOnboardingComplete={isOnboardingComplete}
      badgeTestId="profile-step-badge"
      showInfoBox
      infoTitle="Secure profile access"
      infoDescription="Verify your email before opening Connects, shaping Interfaces defaults, or reviewing $BTD posture."
    />
  );
}
