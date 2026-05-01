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
    <div
      className="orbital-workspace-panel-list auxillaries-bitcode-selector-list"
      role="list"
      aria-label="Auxillaries workspace panels"
    >
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
              className={`orbital-workspace-panel auxillaries-bitcode-selector-card ${
                isActive
                  ? 'orbital-workspace-panel-current auxillaries-bitcode-selector-card-current'
                  : isAvailable
                    ? 'orbital-workspace-panel-available auxillaries-bitcode-selector-card-available'
                    : 'orbital-workspace-panel-locked auxillaries-bitcode-selector-card-locked'
              }`}
              aria-label={`${descriptor.label} auxillary`}
            >
              <div className="orbital-workspace-panel-topline auxillaries-bitcode-selector-card-topline">
                <span className="orbital-workspace-panel-layer auxillaries-bitcode-selector-card-layer">
                  {getAuxillaryLayerLabel(step)}
                </span>
                <span className="orbital-workspace-panel-state auxillaries-bitcode-selector-card-state">
                  {isActive ? 'active' : isAvailable ? 'ready' : 'locked'}
                </span>
              </div>
              <p className="orbital-workspace-panel-label auxillaries-bitcode-selector-card-label">
                {descriptor.label}
              </p>
              <p className="orbital-workspace-panel-copy auxillaries-bitcode-selector-card-copy">
                {descriptor.routeDescription}
              </p>
            </button>
          </div>
        );
      })}
    </div>
  );
}
