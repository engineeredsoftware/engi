'use client';

import React from 'react';

import {
  getAuxillaryDescriptor,
  getAuxillaryLayerLabel,
  type AuxillaryPane,
} from '../auxillary-pane-meta';

interface AuxillariesWorkspacePanelsProps {
  steps: AuxillaryPane[];
  currentStep: AuxillaryPane;
  availableSteps: AuxillaryPane[];
  onStepClick: (step: AuxillaryPane) => void;
}

export default function AuxillariesWorkspacePanels({
  steps,
  currentStep,
  availableSteps,
  onStepClick,
}: AuxillariesWorkspacePanelsProps) {
  return (
    <div className="orbital-workspace-panel-list" role="list" aria-label="Auxillaries workspace panels">
      {steps.map((step) => {
        if (!step) return null;

        const descriptor = getAuxillaryDescriptor(step);
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
              aria-label={`${descriptor.label} auxillary`}
            >
              <div className="orbital-workspace-panel-topline">
                <span className="orbital-workspace-panel-layer">{getAuxillaryLayerLabel(step)}</span>
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
