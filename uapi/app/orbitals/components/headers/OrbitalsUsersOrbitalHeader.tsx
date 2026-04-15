"use client";

import React from 'react';
import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsUsersOrbitalHeader({
  isOnboardingComplete = false,
  isVerified = false,
}: { isOnboardingComplete?: boolean; isVerified?: boolean }) {
  const description = !isVerified
    ? "Let's secure your account with your email. It's fast and easy."
    : "Update your personal and team information.";
  return (
    <OrbitalsOrbitalHeader
      title="Welcome aboard!"
      completedTitle="Your Profile"
      description={description}
      stepNumber={1}
      isOnboardingComplete={isOnboardingComplete}
      badgeTestId="profile-step-badge"
      showInfoBox
      infoTitle="Secure your account"
      infoDescription="Verify your email to secure your Bitcode account. You’ll be ready to explore features and collaborate in seconds."
    />
  );
}
