'use client';

import React from 'react';

import type { OrbitalPane } from '../index';

interface OrbitalsPaneTabsProps {
  mode?: 'onboarding' | 'settings';
  steps: OrbitalPane[];
  currentStep: OrbitalPane;
  completedSteps: OrbitalPane[];
  availableSteps: OrbitalPane[];
  onStepClick: (step: OrbitalPane) => void;
}

function labelForStep(step: OrbitalPane) {
  if (!step) return '';
  return step.charAt(0).toUpperCase() + step.slice(1);
}

export default function OrbitalsPaneTabs({
  mode = 'onboarding',
  steps,
  currentStep,
  completedSteps,
  availableSteps,
  onStepClick,
}: OrbitalsPaneTabsProps) {
  return (
    <div className="mb-6 rounded-[1.35rem] border border-white/8 bg-black/20 px-4 py-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.66rem] uppercase tracking-[0.22em] text-emerald-300/80">
            {mode === 'settings' ? 'Orbital settings' : 'Orbital guide'}
          </p>
          <p className="mt-2 text-sm leading-6 text-neutral-300">
            {mode === 'settings'
              ? 'Move between settings areas without leaving the application overlay.'
              : 'Work through the account steps from this calmer application overlay instead of the older orbital ring layout.'}
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-200">
          {mode === 'settings' ? 'settings' : 'guided'}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {steps.map((step, index) => {
          if (!step) return null;

          const isCurrent = step === currentStep;
          const isCompleted = completedSteps.includes(step);
          const isAvailable = availableSteps.includes(step);

          return (
            <button
              key={step}
              type="button"
              onClick={() => {
                if (isAvailable) {
                  onStepClick(step);
                }
              }}
              disabled={!isAvailable}
              className={`rounded-full border px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] transition ${
                isCurrent
                  ? 'border-emerald-300/45 bg-emerald-400/12 text-emerald-100'
                  : isAvailable
                    ? 'border-white/10 bg-white/5 text-neutral-200 hover:border-white/20 hover:bg-white/10'
                    : 'border-white/6 bg-black/20 text-neutral-500'
              }`}
            >
              <span className="mr-2 text-neutral-400">{index + 1}</span>
              <span>{labelForStep(step)}</span>
              {isCompleted ? <span className="ml-2 text-emerald-300">done</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
