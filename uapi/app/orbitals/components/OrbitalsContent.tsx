"use client";

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { OrbitalPane } from './index';

export interface OrbitalContentProps {
  mode?: 'onboarding' | 'settings';
  steps: OrbitalPane[];
  currentStep: OrbitalPane;
  completedSteps: OrbitalPane[];
  availableSteps: OrbitalPane[];
  showContent: boolean;
  showSuccessAnimation: boolean;
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
    mode = 'onboarding',
    onStepClick = (_: OrbitalPane) => {},
    renderStepContent = (_: OrbitalPane) => null,
    isOnboardingComplete = false,
  } = props;
  const isSettingsMode = mode === 'settings';

  const stepMeta = useMemo(() => {
    const pos = new Map<OrbitalPane, number>();
    steps.forEach((s, i) => pos.set(s, i));

    const currentIdx = currentStep ? pos.get(currentStep) ?? -1 : -1;
    const lastCompletedIdx = completedSteps.length
      ? Math.max(...completedSteps.map(s => pos.get(s) ?? -1))
      : -1;

    return { pos, currentIdx, lastCompletedIdx };
  }, [steps, currentStep, completedSteps]);

  return (
    <>
      {showSuccessAnimation && !isSettingsMode && currentStep && !completedSteps.includes(currentStep) && (
        <div className="step-completion-success">
          <div className="success-icon">✓</div>
          <div className="success-ring-outer" />
          <div className="success-ring-middle" />
          <div className="success-ring-inner" />
          <div className="success-glow" />
        </div>
      )}

      {currentStep && (isSettingsMode || !isOnboardingComplete) && (
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
            <h3 className="step-indicator-title">{isSettingsMode ? 'Settings Areas' : 'Onboarding Progress'}</h3>
            <div className="step-indicator-steps">
              {steps.map((step) => {
                const index = stepMeta.pos.get(step)!;
                const isActive = step === currentStep;
                const isCompleted = isSettingsMode
                  ? completedSteps.includes(step)
                  : step === 'models' && !isOnboardingComplete
                  ? completedSteps.includes('connects') && completedSteps.includes('models')
                  : completedSteps.includes(step);
                const isAvailable = availableSteps.includes(step);
                const highest = Math.max(stepMeta.currentIdx, stepMeta.lastCompletedIdx);
                const isNext = !isSettingsMode && index === highest + 1;
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
                          const { trackEvent } = require('@engi/google-analytics');
                          trackEvent(isSettingsMode ? 'settings_step_click' : 'onboarding_step_click', { step });
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
                      {step.charAt(0).toUpperCase() + step.slice(1)}
                      {step === 'models' && (
                        <span className="optional-label">(Optional)</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      <div className="orbital-rings-container">
        {steps.map((step) => {
          const i = stepMeta.pos.get(step)!;
          const isCompleted = completedSteps.includes(step);
          const isAvailable = availableSteps.includes(step);
          const highest = Math.max(stepMeta.currentIdx, stepMeta.lastCompletedIdx);
          const isNext = !isSettingsMode && i === highest + 1;
          const size = 30 + i * 15;
          const style: React.CSSProperties = {
            position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
            width: `${size}%`, height: `${size}%`, borderRadius: '50%', border: isAvailable ? `2px solid rgba(103,254,183,0.05)` : 'none',
            boxSizing: 'border-box', cursor: isAvailable ? 'pointer' : 'default', pointerEvents: isAvailable ? 'auto' : 'none',
            zIndex: steps.length - i,
          };
          return (
            <div
              key={step}
              className={`clickable-ring ${isAvailable ? 'available' : ''} ${isNext ? 'next-available' : ''}`}
              style={style}
              onClick={() => isAvailable && onStepClick(step)}
            >
              <div
                className="orbital-label"
                style={{ '--index': i } as React.CSSProperties}
              >
                {step.charAt(0).toUpperCase() + step.slice(1)}
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {showContent && currentStep && (
          <motion.div key={currentStep} className="orbital-content-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {renderStepContent(currentStep)}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default React.memo(OrbitalContent);
