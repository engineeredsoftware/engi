"use client";

import React from 'react';
import { OrbitalsOrbitalHeader } from './OrbitalsOrbitalHeader';

export default function OrbitalsModelsOrbitalHeader({
  isOnboardingComplete = false,
}: { isOnboardingComplete?: boolean }) {
  return (
    <OrbitalsOrbitalHeader
      title="Customize AI (Optional)"
      completedTitle="AI Settings"
      description={!isOnboardingComplete
        ? 'Fine-tune AI settings now or skip and use defaults.'
        : 'Configure AI models and settings.'}
      stepNumber={3}
      isOnboardingComplete={isOnboardingComplete}
      showInfoBox
      infoTitle="Customize AI (Optional)"
      infoDescription="Use default AI settings or adjust to match your team's style. You can always change these later."
      infoNote="No pressure — update AI settings anytime in your workspace."
    />
  );
}
