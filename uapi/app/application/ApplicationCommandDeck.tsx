'use client';

import { useCallback, useEffect, useState } from 'react';

import { APPLICATION_ACTIONS } from './application-experience-architecture';
import { APPLICATION_SHELL_SECTIONS } from './application-shell-sections';

type SelectOption = {
  value: string;
  label: string;
};

function readOptions(element: HTMLSelectElement | null): SelectOption[] {
  if (!element) return [];
  return Array.from(element.options).map((option) => ({
    value: option.value,
    label: option.textContent?.trim() || option.value,
  }));
}

function readButtonLabel(id: string, fallback: string) {
  const button = document.getElementById(id);
  return button?.textContent?.trim() || fallback;
}

function updateShellSelect(id: string, value: string) {
  const element = document.getElementById(id) as HTMLSelectElement | null;
  if (!element || element.value === value) return;
  element.value = value;
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

function triggerShellButton(id: string) {
  (document.getElementById(id) as HTMLButtonElement | null)?.click();
}

function jumpToShellSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
}

export default function ApplicationCommandDeck() {
  const [scenarioOptions, setScenarioOptions] = useState<SelectOption[]>([]);
  const [projectionOptions, setProjectionOptions] = useState<SelectOption[]>([]);
  const [branchOptions, setBranchOptions] = useState<SelectOption[]>([]);
  const [scenario, setScenario] = useState('');
  const [projection, setProjection] = useState('');
  const [branchMode, setBranchMode] = useState('');
  const [heroLede, setHeroLede] = useState('Awaiting preserved Bitcode shell posture…');
  const [heroTip, setHeroTip] = useState('Waiting for current appendix and report posture…');
  const [status, setStatus] = useState('Loading application command state…');
  const [tutorialLabel, setTutorialLabel] = useState('Toggle tutorial');
  const [shellReady, setShellReady] = useState(false);

  const refreshFromShell = useCallback(() => {
    const scenarioSelect = document.getElementById('scenarioPicker') as HTMLSelectElement | null;
    const projectionSelect = document.getElementById('projectionPicker') as HTMLSelectElement | null;
    const branchSelect = document.getElementById('branchModePicker') as HTMLSelectElement | null;

    setScenarioOptions(readOptions(scenarioSelect));
    setProjectionOptions(readOptions(projectionSelect));
    setBranchOptions(readOptions(branchSelect));
    setScenario(scenarioSelect?.value || '');
    setProjection(projectionSelect?.value || '');
    setBranchMode(branchSelect?.value || '');
    setHeroLede(document.getElementById('heroLede')?.textContent?.trim() || 'Awaiting preserved Bitcode shell posture…');
    setHeroTip(document.getElementById('heroTip')?.textContent?.trim() || 'Waiting for current appendix and report posture…');
    setStatus(document.getElementById('status')?.textContent?.trim() || 'Application command state is syncing from the preserved shell.');
    setTutorialLabel(readButtonLabel('tutorialToggleButton', 'Toggle tutorial'));
    setShellReady(Boolean(scenarioSelect && projectionSelect && branchSelect));
  }, []);

  useEffect(() => {
    refreshFromShell();

    const intervalId = window.setInterval(refreshFromShell, 600);
    const handleDocumentChange = () => window.setTimeout(refreshFromShell, 0);

    document.addEventListener('change', handleDocumentChange, true);
    document.addEventListener('click', handleDocumentChange, true);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('change', handleDocumentChange, true);
      document.removeEventListener('click', handleDocumentChange, true);
    };
  }, [refreshFromShell]);

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
            <p className="mt-2 text-neutral-200">{tutorialLabel.replace(/\s+/g, ' ')}</p>
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
                  setScenario(nextValue);
                  updateShellSelect('scenarioPicker', nextValue);
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
                  setProjection(nextValue);
                  updateShellSelect('projectionPicker', nextValue);
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
                  setBranchMode(nextValue);
                  updateShellSelect('branchModePicker', nextValue);
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
              onClick={() => triggerShellButton('makeBranchButton')}
              className="rounded-[1.4rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-4 text-left text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
            >
              Make Bitcode branch
            </button>
            <button
              type="button"
              onClick={() => triggerShellButton('tutorialToggleButton')}
              className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10"
            >
              {tutorialLabel}
            </button>
            <button
              type="button"
              onClick={() => triggerShellButton('resetButton')}
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
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Shell status</p>
            <p className="mt-3 text-sm leading-6 text-neutral-200">{status}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
