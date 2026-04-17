'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  readBitcodeApplicationShellControls,
  readBitcodeApplicationShellSnapshot,
} from '@bitcode/bitcode/src/client-entry.js';

import { jumpToShellSection } from './application-shell-reading';
import {
  normalizeApplicationClosureState,
  type ApplicationClosureState,
} from './application-closure-state';
import {
  normalizeApplicationCommandState,
  type ApplicationCommandState,
} from './application-command-state';
import {
  normalizeApplicationClosureControlState,
  type ApplicationClosureControlState,
} from './application-closure-controls';

type ShellControls = {
  makeBranch?: () => unknown;
  resetApplication?: () => unknown;
  refresh?: () => unknown;
};

function toneClasses(tone: ApplicationClosureControlState['statusTone']) {
  if (tone === 'settled') return 'border-emerald-500/25 bg-emerald-500/10 text-emerald-100';
  if (tone === 'running') return 'border-amber-500/25 bg-amber-500/10 text-amber-100';
  if (tone === 'attention') return 'border-red-500/25 bg-red-500/10 text-red-100';
  return 'border-sky-500/25 bg-sky-500/10 text-sky-100';
}

export default function ApplicationClosureControlDeck() {
  const [commandState, setCommandState] = useState<ApplicationCommandState | null>(null);
  const [closureState, setClosureState] = useState<ApplicationClosureState | null>(null);
  const [isActing, setIsActing] = useState(false);

  const refreshFromShell = useCallback(async () => {
    const snapshot = await readBitcodeApplicationShellSnapshot();
    setCommandState(normalizeApplicationCommandState(snapshot));
    setClosureState(normalizeApplicationClosureState(snapshot));
  }, []);

  const runControl = useCallback(
    async (callback: (controls: ShellControls) => unknown | Promise<unknown>) => {
      const controls = (await readBitcodeApplicationShellControls()) as ShellControls | null;
      if (!controls) return;
      setIsActing(true);
      try {
        await callback(controls);
      } finally {
        await refreshFromShell();
        setIsActing(false);
      }
    },
    [refreshFromShell],
  );

  useEffect(() => {
    void refreshFromShell();
    const intervalId = window.setInterval(() => {
      void refreshFromShell();
    }, 900);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [refreshFromShell]);

  const state = normalizeApplicationClosureControlState(commandState, closureState);

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,8,18,0.95))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Application closure control</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-[2.05rem]">
            Route-local closure operation
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 tablet:text-base">
            Verification, branch execution, settlement review, and ledger follow-through now have an application-owned
            control surface. The Bitcode shell still executes the exact closure semantics underneath.
          </p>
        </div>

        <div className="grid gap-3 text-xs uppercase tracking-[0.2em] text-neutral-400 tablet:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Scenario</p>
            <p className="mt-2 text-neutral-200">{state.scenario}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Branch mode</p>
            <p className="mt-2 text-neutral-200">{state.branchMode}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <article className="rounded-[1.6rem] border border-white/8 bg-black/20 px-5 py-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.66rem] uppercase tracking-[0.2em] text-emerald-300/75">Closure status</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{state.primaryActionLabel}</h3>
            </div>
            <span className={`rounded-full border px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.18em] ${toneClasses(state.statusTone)}`}>
              {state.statusTone}
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-neutral-300">{state.primaryActionSummary}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">Visible artifacts</p>
              <p className="mt-2 text-base font-semibold text-white">{state.visibleArtifactCount}</p>
            </div>
            <div className="rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">Proof families</p>
              <p className="mt-2 text-base font-semibold text-white">{state.proofFamilyCount}</p>
            </div>
            <div className="rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">Credited assets</p>
              <p className="mt-2 text-base font-semibold text-white">{state.creditedAssetCount}</p>
            </div>
            <div className="rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">Bundle</p>
              <p className="mt-2 break-all text-base font-semibold text-white">{state.bundleId}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <button
              type="button"
              disabled={isActing || !state.shellReady}
              onClick={() => {
                void runControl((controls) => controls.makeBranch?.());
              }}
              className="rounded-[1.4rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-4 text-left text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isActing ? 'Running closure…' : state.primaryActionLabel}
            </button>
            <button
              type="button"
              disabled={isActing || !state.shellReady}
              onClick={() => {
                void runControl((controls) => controls.refresh?.());
              }}
              className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Refresh closure
            </button>
            <button
              type="button"
              disabled={isActing || !state.shellReady}
              onClick={() => {
                void runControl((controls) => controls.resetApplication?.());
              }}
              className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset closure state
            </button>
          </div>

          <div className="mt-4 rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-4 text-sm">
            <p className="text-neutral-500">Shell status</p>
            <p className="mt-2 text-neutral-100">{state.status}</p>
            <p className="mt-3 text-neutral-500">Tutorial posture</p>
            <p className="mt-1 text-neutral-100">{state.tutorialDetail}</p>
          </div>
        </article>

        <article className="rounded-[1.6rem] border border-white/8 bg-black/20 px-5 py-5">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Closure follow-through</p>
          <div className="mt-4 grid gap-3">
            <button
              type="button"
              onClick={() => jumpToShellSection('panelEvaluations')}
              className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
            >
              Focus verification
            </button>
            <button
              type="button"
              onClick={() => jumpToShellSection('panelBranchArtifacts')}
              className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
            >
              Focus branch artifacts
            </button>
            <button
              type="button"
              onClick={() => jumpToShellSection('panelSettlement')}
              className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
            >
              Focus settlement + proof
            </button>
            <button
              type="button"
              onClick={() => jumpToShellSection('panelLedger')}
              className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
            >
              Focus ledger + history
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
