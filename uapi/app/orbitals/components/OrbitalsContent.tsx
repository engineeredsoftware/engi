"use client";

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getOrbitalDescriptor,
  getOrbitalsWorkspaceDescription,
  getOrbitalsWorkspaceHeading,
  labelForOrbitalPane,
  ORBITALS_ACCESS_LABEL,
  type OrbitalPane,
} from './orbital-pane-meta';
import OrbitalsPaneTabs from './shared/OrbitalsPaneTabs';
import OrbitalsWorkspacePanels from './shared/OrbitalsWorkspacePanels';

export interface OrbitalContentProps {
  mode?: 'onboarding' | 'orbitals';
  steps: OrbitalPane[];
  currentStep: OrbitalPane;
  completedSteps: OrbitalPane[];
  availableSteps: OrbitalPane[];
  showContent: boolean;
  showSuccessAnimation: boolean;
  navigationMode?: 'orbital' | 'tabs';
  surfaceVariant?: 'default' | 'contained';
  onStepClick: (step: OrbitalPane) => void;
  renderStepContent: (step: OrbitalPane) => React.ReactNode;
  isOnboardingComplete?: boolean;
}

function OrbitalContent(props: OrbitalContentProps) {
  const {
    steps = [],
    currentStep = null,
    completedSteps = [],
    availableSteps = [],
    showContent = false,
    showSuccessAnimation = false,
    navigationMode = 'orbital',
    surfaceVariant = 'default',
    mode = 'onboarding',
    onStepClick = (_: OrbitalPane) => {},
    renderStepContent = (_: OrbitalPane) => null,
    isOnboardingComplete = false,
  } = props;
  const isOrbitalMode = mode === 'orbitals';
  const usesTabNavigation = navigationMode === 'tabs';
  const usesContainedLayout = surfaceVariant === 'contained';

  const stepMeta = useMemo(() => {
    const pos = new Map<OrbitalPane, number>();
    steps.forEach((s, i) => pos.set(s, i));

    const currentIdx = currentStep ? pos.get(currentStep) ?? -1 : -1;
    const lastCompletedIdx = completedSteps.length
      ? Math.max(...completedSteps.map(s => pos.get(s) ?? -1))
      : -1;

    return { pos, currentIdx, lastCompletedIdx };
  }, [steps, currentStep, completedSteps]);

  const ringElements = useMemo(
    () => {
      if (usesContainedLayout) return null;

      return steps.map((step) => {
        if (!step) return null;

        const stepPosition = stepMeta.pos.get(step)!;
        const ringIndex = getOrbitalDescriptor(step).ringIndex;
        const isAvailable = availableSteps.includes(step);
        const highest = Math.max(stepMeta.currentIdx, stepMeta.lastCompletedIdx);
        const isNext = !isOrbitalMode && stepPosition === highest + 1;
        const descriptor = getOrbitalDescriptor(step);
        const size = 30 + ringIndex * 15;
        const style: React.CSSProperties = {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${size}%`,
          height: `${size}%`,
          borderRadius: '50%',
          border: isAvailable ? '2px solid rgba(103,254,183,0.05)' : 'none',
          boxSizing: 'border-box',
          cursor: isAvailable ? 'pointer' : 'default',
          pointerEvents: isAvailable ? 'auto' : 'none',
          zIndex: steps.length - ringIndex,
        };

        return (
          <div
            key={step}
            className={`clickable-ring ${isAvailable ? 'available' : ''} ${isNext ? 'next-available' : ''}`}
            style={style}
            onClick={() => isAvailable && onStepClick(step)}
          >
            <div
              className={`orbital-label position-${descriptor.labelPosition} ${
                currentStep === step ? 'orbital-label-active' : ''
              }`}
              style={{ '--index': ringIndex } as React.CSSProperties}
            >
              {descriptor.label}
            </div>
          </div>
        );
      });
    },
    [
      availableSteps,
      currentStep,
      isOrbitalMode,
      onStepClick,
      stepMeta.currentIdx,
      stepMeta.lastCompletedIdx,
      stepMeta.pos,
      steps,
      usesContainedLayout,
    ],
  );

  const contentPanel =
    showContent && currentStep ? (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="orbital-content-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderStepContent(currentStep)}
        </motion.div>
      </AnimatePresence>
    ) : null;

  return (
    <>
      {showSuccessAnimation && !isOrbitalMode && currentStep && !completedSteps.includes(currentStep) && (
        <div className="step-completion-success">
          <div className="success-icon">✓</div>
          <div className="success-ring-outer" />
          <div className="success-ring-middle" />
          <div className="success-ring-inner" />
          <div className="success-glow" />
        </div>
      )}

      {usesTabNavigation && !usesContainedLayout ? (
        <OrbitalsPaneTabs
          mode={mode}
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          availableSteps={availableSteps}
          onStepClick={onStepClick}
        />
      ) : null}

      {currentStep && (isOrbitalMode || !isOnboardingComplete) && !usesTabNavigation && !usesContainedLayout && (
        <motion.div
          className="orbital-step-indicator"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            x: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }
          }}
        >
          <div className="step-indicator-content">
            <h3 className="step-indicator-title">{isOrbitalMode ? 'Orbital rings' : ORBITALS_ACCESS_LABEL}</h3>
            <div className="step-indicator-steps">
              {steps.map((step) => {
                const index = stepMeta.pos.get(step)!;
                const isActive = step === currentStep;
                const isCompleted = isOrbitalMode
                  ? completedSteps.includes(step)
                  : completedSteps.includes(step);
                const isAvailable = availableSteps.includes(step);
                const highest = Math.max(stepMeta.currentIdx, stepMeta.lastCompletedIdx);
                const isNext = !isOrbitalMode && index === highest + 1;
                const classes = ['step-indicator-item'];
                if (isActive) classes.push('active');
                if (isCompleted) classes.push('completed');
                if (isNext) classes.push('next-available');
                return (
                  <div
                    key={step}
                    className={classes.join(' ')}
                    onClick={() => {
                      if (isAvailable) {
                        try {
                          const { trackEvent } = require('@bitcode/google-analytics');
                          trackEvent(isOrbitalMode ? 'orbital_step_click' : 'onboarding_step_click', { step });
                        } catch {}
                        onStepClick(step);
                      }
                    }}
                  >
                    <div className="step-indicator-circle">
                      {isCompleted ? (
                        <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className="step-indicator-label">
                      {labelForOrbitalPane(step)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {usesContainedLayout ? (
        <div className="orbital-workspace-shell">
          <aside className="orbital-workspace-nav">
            <div className="orbital-workspace-nav-copy">
              <p className="orbital-workspace-kicker">{isOrbitalMode ? 'Orbitals' : ORBITALS_ACCESS_LABEL}</p>
              <h3 className="orbital-workspace-title">{getOrbitalsWorkspaceHeading(mode)}</h3>
              <p className="orbital-workspace-description">{getOrbitalsWorkspaceDescription(mode)}</p>
            </div>
            <OrbitalsWorkspacePanels
              steps={steps}
              currentStep={currentStep}
              availableSteps={availableSteps}
              onStepClick={onStepClick}
            />
            <OrbitalsPaneTabs
              mode={mode}
              steps={steps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              availableSteps={availableSteps}
              onStepClick={onStepClick}
            />
          </aside>
          <div className="orbital-workspace-stage">{contentPanel}</div>
        </div>
      ) : (
        <>
          {!usesTabNavigation ? <div className="orbital-rings-container">{ringElements}</div> : null}
          {contentPanel}
        </>
      )}
    </>
  );
}

export default React.memo(OrbitalContent);
