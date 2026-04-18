'use client';

import React from 'react';

import {
  getOrbitalDescriptor,
  getOrbitalLayerLabel,
  type OrbitalPane,
} from '../orbital-pane-meta';

interface OrbitalsWorkspacePanelsProps {
  steps: OrbitalPane[];
  currentStep: OrbitalPane;
  availableSteps: OrbitalPane[];
  onStepClick: (step: OrbitalPane) => void;
}

export default function OrbitalsWorkspacePanels({
  steps,
  currentStep,
  availableSteps,
  onStepClick,
}: OrbitalsWorkspacePanelsProps) {
  return (
    <div className="orbital-workspace-panel-list" role="list" aria-label="Orbital workspace panels">
      {steps.map((step) => {
        if (!step) return null;

        const descriptor = getOrbitalDescriptor(step);
        const isActive = currentStep === step;
        const isAvailable = availableSteps.includes(step);

        return (
          <div key={step} role="listitem">
            <button
              type="button"
              disabled={!isAvailable}
              onClick={() => {
                if (isAvailable) {
                  onStepClick(step);
                }
              }}
              className={`orbital-workspace-panel ${
                isActive
                  ? 'orbital-workspace-panel-current'
                  : isAvailable
                    ? 'orbital-workspace-panel-available'
                    : 'orbital-workspace-panel-locked'
              }`}
              aria-label={`${descriptor.label} orbital`}
            >
              <div className="orbital-workspace-panel-topline">
                <span className="orbital-workspace-panel-layer">{getOrbitalLayerLabel(step)}</span>
                <span className="orbital-workspace-panel-state">
                  {isActive ? 'active' : isAvailable ? 'ready' : 'locked'}
                </span>
              </div>
              <p className="orbital-workspace-panel-label">{descriptor.label}</p>
              <p className="orbital-workspace-panel-copy">{descriptor.routeDescription}</p>
            </button>
          </div>
        );
      })}
    </div>
  );
}
