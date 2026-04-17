'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  readBitcodeApplicationShellControls,
  readBitcodeApplicationShellSnapshot,
} from '@bitcode/bitcode/src/client-entry.js';

import { APPLICATION_ACTIONS } from './application-experience-architecture';
import { APPLICATION_SHELL_SECTIONS } from './application-shell-sections';
import {
  normalizeApplicationCommandState,
  type ApplicationCommandState,
} from './application-command-state';

type ShellControls = {
  setScenario?: (value: string) => unknown;
  setProjection?: (value: string) => unknown;
  setBranchMode?: (value: string) => unknown;
  toggleTutorial?: () => unknown;
  makeBranch?: () => unknown;
  resetApplication?: () => unknown;
};

function jumpToShellSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
}

export default function ApplicationCommandDeck() {
  const [commandState, setCommandState] = useState<ApplicationCommandState | null>(null);

  const refreshFromShell = useCallback(async () => {
    const snapshot = await readBitcodeApplicationShellSnapshot();
    setCommandState(normalizeApplicationCommandState(snapshot));
  }, []);

  const runControl = useCallback(
    async (callback: (controls: ShellControls) => unknown) => {
      const controls = await readBitcodeApplicationShellControls();
      if (!controls) return;
      callback(controls);
      await refreshFromShell();
    },
    [refreshFromShell],
  );

  useEffect(() => {
    void refreshFromShell();

    const intervalId = window.setInterval(() => {
      void refreshFromShell();
    }, 700);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [refreshFromShell]);

  const scenarioOptions = commandState?.scenarioOptions || [];
  const projectionOptions = commandState?.projectionOptions || [];
  const branchOptions = commandState?.branchOptions || [];
  const scenario = commandState?.scenario || '';
  const projection = commandState?.projection || '';
  const branchMode = commandState?.branchMode || '';
  const heroLede = commandState?.heroLede || 'Awaiting preserved Bitcode shell posture…';
  const heroTip = commandState?.heroTip || 'Waiting for current appendix and report posture…';
  const status = commandState?.status || 'Loading application command state…';
  const tutorialLabel = commandState?.tutorialLabel || 'Toggle tutorial';
  const shellReady = commandState?.shellReady || false;
  const tutorialDetail =
    commandState && commandState.tutorialStepCount > 0
      ? `${commandState.tutorialOpen ? 'open' : 'closed'} · step ${Math.min(commandState.tutorialStepIndex + 1, commandState.tutorialStepCount)} of ${commandState.tutorialStepCount}`
      : tutorialLabel.replace(/\s+/g, ' ');

  return (
    <section className="overflow-hidden rounded-[2rem] border border-emerald-400/15 bg-[linear-gradient(180deg,rgba(7,12,24,0.97),rgba(4,8,18,0.94))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.38)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-emerald-300/80">Application command deck</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-[2.1rem]">
            Master-detail control surface
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 tablet:text-base">
            Second-gate lifts scenario, projection, branch, tutorial, and reset controls into the application frame while
            keeping the give and need actions explicit and leaving the preserved Bitcode shell as the semantic source.
          </p>
        </div>
        <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
            <p className="text-emerald-300/85">Shell bridge</p>
            <p className="mt-2 text-neutral-200">{shellReady ? 'live' : 'syncing'}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
            <p className="text-emerald-300/85">Tutorial state</p>
            <p className="mt-2 text-neutral-200">{tutorialDetail}</p>
          </div>
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
              {tutorialLabel}
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
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Action and section index</p>
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
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Current canon posture</p>
            <p className="mt-3 text-sm leading-6 text-neutral-200">{heroLede}</p>
            <p className="mt-3 text-xs leading-6 text-neutral-400">{heroTip}</p>
          </div>

          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Shell command status</p>
            <p className="mt-3 text-sm leading-6 text-neutral-200">{status}</p>
            <p className="mt-3 text-xs leading-6 text-neutral-400">Tutorial posture: {tutorialDetail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
