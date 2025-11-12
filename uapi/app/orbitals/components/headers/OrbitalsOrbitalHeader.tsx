"use client";

import React from 'react';
import { PaneTitle } from '../shared/PaneTitle';
import OnboardingInfoBox from '../shared/OnboardingInfoBox';

export interface OrbitalsOrbitalHeaderProps {
  title: string;
  completedTitle?: string;
  description: string;
  stepNumber: 1 | 2 | 3 | 4;
  isOnboardingComplete?: boolean;
  badgeTestId?: string;
  showInfoBox?: boolean;
  infoTitle?: string;
  infoDescription?: string;
  infoNote?: string;
}

export function OrbitalsOrbitalHeader({
  title,
  completedTitle,
  description,
  stepNumber,
  isOnboardingComplete = false,
  badgeTestId,
  showInfoBox,
  infoTitle,
  infoDescription,
  infoNote,
}: OrbitalsOrbitalHeaderProps) {
  return (
    <div className="orbital-header">
      <PaneTitle
        title={title}
        completedTitle={completedTitle}
        description={description}
        stepNumber={stepNumber}
        isOnboardingComplete={isOnboardingComplete}
        badgeTestId={badgeTestId}
      />
      {showInfoBox && !isOnboardingComplete && (
        <OnboardingInfoBox
          step={stepNumber}
          title={infoTitle || title}
          description={infoDescription || ''}
          note={infoNote}
          visible
        />
      )}
    </div>
  );
}
