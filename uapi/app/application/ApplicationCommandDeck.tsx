'use client';

import { useMemo } from 'react';

import ApplicationOperatorCard from './ApplicationOperatorCard';
import { APPLICATION_OPERATOR_EXPLAINERS } from './application-operator-explainers';
import { APPLICATION_ACTIONS } from './application-experience-architecture';
import { APPLICATION_SHELL_SECTIONS } from './application-shell-sections';
import {
  normalizeApplicationCommandState,
  type ApplicationCommandState,
} from './application-command-state';
import { useApplicationShellBridge } from './application-shell-bridge';

function jumpToShellSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
}

export default function ApplicationCommandDeck() {
  const { snapshot, runControl } = useApplicationShellBridge();
  const commandState = useMemo<ApplicationCommandState | null>(
    () => normalizeApplicationCommandState(snapshot),
    [snapshot],
  );

  const scenarioOptions = commandState?.scenarioOptions || [];
  const projectionOptions = commandState?.projectionOptions || [];
  const branchOptions = commandState?.branchOptions || [];
  const scenario = commandState?.scenario || 'waiting';
  const projection = commandState?.projection || 'waiting';
  const branchMode = commandState?.branchMode || 'waiting';
  const heroLede = commandState?.heroLede || 'Preparing the operator controls…';
  const heroTip = commandState?.heroTip || 'Waiting for the current flow guidance and runtime signals.';
  const status = commandState?.status || 'Loading control state…';
  const guideActionLabel = commandState?.tutorialOpen
    ? 'Hide flow guide'
    : commandState?.tutorialStepCount
      ? 'Resume flow guide'
      : 'Open flow guide';
  const shellReady = commandState?.shellReady || false;
  const guideDetail =
    commandState && commandState.tutorialStepCount > 0
      ? `${commandState.tutorialOpen ? 'open' : 'paused'} · step ${Math.min(commandState.tutorialStepIndex + 1, commandState.tutorialStepCount)} of ${commandState.tutorialStepCount}`
      : 'available';

  return (
    <ApplicationOperatorCard
      kicker="Operator controls"
      title="Give, need, and closure controls"
      summary="Set scenario, projection, and branch mode, then run closure or resume the flow from the same workspace you use to read the ledger."
      explainer={APPLICATION_OPERATOR_EXPLAINERS.controls}
      tone="emerald"
    >
      <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
          <p className="text-emerald-300/85">Workspace sync</p>
          <p className="mt-2 text-neutral-200">{shellReady ? 'live' : 'syncing'}</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
          <p className="text-emerald-300/85">Guide state</p>
          <p className="mt-2 text-neutral-200">{guideDetail}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        <div className="space-y-5">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Scenario</span>
              <select
                value={scenario}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  void runControl((controls) => controls.setScenario?.(nextValue));
                }}
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
              >
                {scenarioOptions.length ? (
                  scenarioOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))
                ) : (
                  <option value="">Waiting for shell…</option>
                )}
              </select>
            </label>

            <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Projection</span>
              <select
                value={projection}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  void runControl((controls) => controls.setProjection?.(nextValue));
                }}
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
              >
                {projectionOptions.length ? (
                  projectionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))
                ) : (
                  <option value="">Waiting for shell…</option>
                )}
              </select>
            </label>

            <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Branch mode</span>
              <select
                value={branchMode}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  void runControl((controls) => controls.setBranchMode?.(nextValue));
                }}
                className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
              >
                {branchOptions.length ? (
                  branchOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))
                ) : (
                  <option value="">Waiting for shell…</option>
                )}
              </select>
            </label>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            <button
              type="button"
              onClick={() => {
                void runControl((controls) => controls.makeBranch?.());
              }}
              className="rounded-[1.4rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-4 text-left text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
            >
              Make Bitcode branch
            </button>
            <button
              type="button"
              onClick={() => {
                void runControl((controls) => controls.toggleTutorial?.());
              }}
              className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10"
            >
              {guideActionLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                void runControl((controls) => controls.resetApplication?.());
              }}
              className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10"
            >
              Reset application
            </button>
          </div>

          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Jump links</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {APPLICATION_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => jumpToShellSection(action.targetId)}
                  className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/15"
                >
                  {action.label}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {APPLICATION_SHELL_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => jumpToShellSection(section.id)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-neutral-200 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
            <div className="flex items-center gap-2">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Working draft</p>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-emerald-100">
                resumable
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-200">{heroLede}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-3">
                <p className="text-[0.6rem] uppercase tracking-[0.14em] text-neutral-500">Scenario</p>
                <p className="mt-2 text-sm font-medium text-white">{scenario}</p>
              </div>
              <div className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-3">
                <p className="text-[0.6rem] uppercase tracking-[0.14em] text-neutral-500">Projection</p>
                <p className="mt-2 text-sm font-medium text-white">{projection}</p>
              </div>
              <div className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-3">
                <p className="text-[0.6rem] uppercase tracking-[0.14em] text-neutral-500">Branch mode</p>
                <p className="mt-2 text-sm font-medium text-white">{branchMode}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Guide and continuation</p>
            <p className="mt-3 text-sm leading-6 text-neutral-200">{status}</p>
            <p className="mt-3 text-xs leading-6 text-neutral-400">{heroTip}</p>
            <p className="mt-3 text-xs leading-6 text-neutral-400">Guide posture: {guideDetail}</p>
          </div>
        </div>
      </div>
    </ApplicationOperatorCard>
  );
}
