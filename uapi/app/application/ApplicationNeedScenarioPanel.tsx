'use client';

import { useMemo } from 'react';

import {
  normalizeApplicationNeedScenarios,
  type ApplicationNeedScenariosState,
} from './application-need-scenarios';
import { useApplicationShellBridge } from './application-shell-bridge';
import { jumpToShellSection } from './application-shell-reading';

export default function ApplicationNeedScenarioPanel() {
  const { snapshot, runControl } = useApplicationShellBridge();
  const needState = useMemo<ApplicationNeedScenariosState | null>(
    () => normalizeApplicationNeedScenarios(snapshot),
    [snapshot],
  );

  const selectScenario = async (scenarioId: string) => {
    await runControl((controls) => controls.setScenario?.(scenarioId));
  };

  if (!needState) {
    return (
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,8,18,0.95))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
        <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Application need scenarios</p>
        <p className="mt-4 text-sm leading-6 text-neutral-300">Reading mounted Bitcode need scenarios…</p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,8,18,0.95))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Application need scenarios</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-[2.05rem]">
            Native scenario selection in the need workspace
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 tablet:text-base">
            Second-gate now brings need selection further inward. `/application` can choose the active Bitcode scenario
            directly while keeping parser, closure, and target-kind posture visible before deeper fit and proof closure.
          </p>
        </div>

        <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-3">
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Active parser</p>
            <p className="mt-2 text-neutral-200">{needState.parserKind}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Closure criteria</p>
            <p className="mt-2 text-neutral-200">{needState.closureCriteriaCount}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Target kinds</p>
            <p className="mt-2 text-neutral-200">{needState.targetKindCount}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => jumpToShellSection('panelNeeding')}
          className="rounded-[1.4rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
        >
          Open live need section
        </button>
        <button
          type="button"
          onClick={() => jumpToShellSection('panelFit')}
          className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10"
        >
          Open live fit section
        </button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {needState.scenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            onClick={() => {
              void selectScenario(scenario.id);
            }}
            className={`rounded-[1.35rem] border px-4 py-4 text-left transition ${
              scenario.selected
                ? 'border-emerald-400/35 bg-emerald-400/10'
                : 'border-white/8 bg-black/20 hover:border-white/16 hover:bg-white/5'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{scenario.label}</p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-neutral-500">{scenario.profile}</p>
              </div>
              <span
                className={`rounded-full border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] ${
                  scenario.selected
                    ? 'border-emerald-300/35 bg-emerald-300/15 text-emerald-100'
                    : 'border-white/10 bg-white/5 text-neutral-200'
                }`}
              >
                {scenario.selected ? 'active need' : 'available'}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-300">{scenario.repo}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
