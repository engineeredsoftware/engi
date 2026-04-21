'use client';

import { useMemo, useState } from 'react';

import BitcodeMetricGrid from '@/components/base/bitcode/execution/BitcodeMetricGrid';

import ApplicationWorkspaceCard from './ApplicationWorkspaceCard';
import {
  buildApplicationClosureFinalWorkSummary,
  readApplicationRouteError,
  type ApplicationActivityRecordDraft,
} from './application-activity-history';
import { APPLICATION_WORKSPACE_EXPLAINERS } from './application-workspace-explainers';
import { jumpToShellSection } from './application-shell-reading';
import {
  normalizeApplicationClosureState,
  type ApplicationClosureState,
} from './application-closure-state';
import {
  normalizeApplicationCommandState,
  type ApplicationCommandState,
} from './application-command-state';
import { useApplicationShellBridge } from './application-shell-bridge';
import {
  normalizeApplicationClosureControlState,
  type ApplicationClosureControlState,
} from './application-closure-controls';

function toneClasses(tone: ApplicationClosureControlState['statusTone']) {
  if (tone === 'settled') return 'border-emerald-500/25 bg-emerald-500/10 text-emerald-100';
  if (tone === 'running') return 'border-amber-500/25 bg-amber-500/10 text-amber-100';
  if (tone === 'attention') return 'border-red-500/25 bg-red-500/10 text-red-100';
  return 'border-sky-500/25 bg-sky-500/10 text-sky-100';
}

interface ApplicationClosureControlDeckProps {
  onRecordActivity?: (draft: ApplicationActivityRecordDraft) => Promise<unknown>;
}

export default function ApplicationClosureControlDeck({
  onRecordActivity,
}: ApplicationClosureControlDeckProps) {
  const { snapshot, runControl } = useApplicationShellBridge();
  const [isActing, setIsActing] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const commandState = useMemo<ApplicationCommandState | null>(
    () => normalizeApplicationCommandState(snapshot),
    [snapshot],
  );
  const closureState = useMemo<ApplicationClosureState | null>(
    () => normalizeApplicationClosureState(snapshot),
    [snapshot],
  );
  const handleControlAction = async (
    callback: Parameters<typeof runControl>[0],
  ) => {
    setIsActing(true);
    try {
      await runControl(callback);
    } finally {
      setIsActing(false);
    }
  };

  const state = normalizeApplicationClosureControlState(commandState, closureState);
  const handlePrimaryClosureAction = async () => {
    setIsActing(true);
    setActionError(null);

    try {
      const response = await fetch('/api/make-bitcode-branch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          branchMode: commandState?.branchMode || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(
          await readApplicationRouteError(response, 'Unable to run the closure branch activity.'),
        );
      }

      const payload = (await response.json()) as Record<string, unknown>;
      await runControl((controls) => controls.refresh?.());
      await onRecordActivity?.({
        type: 'agentic-execution:branch-artifact',
        detailSection: 'closure',
        summary: state.primaryActionSummary,
        context: {
          source: 'application-closure-control-deck',
          branchMode: commandState?.branchMode || null,
          scenario: commandState?.scenario || null,
          specVersion: payload.specVersion ?? null,
        },
          output: {
            protocol: {
              ok: payload.ok ?? true,
              latestRun: payload.latestRun ?? null,
            },
            finalWorkSummary: buildApplicationClosureFinalWorkSummary(closureState),
          },
        });
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : 'Unable to run the closure branch activity.',
      );
    } finally {
      setIsActing(false);
    }
  };

  return (
    <ApplicationWorkspaceCard
      id="applicationClosureControls"
      kicker="Closure controls"
      title="Run closure and settlement follow-through"
      summary="Keep verification, branch execution, settlement review, and ledger follow-through adjacent to the active Bitcode activity detail."
      explainer={APPLICATION_WORKSPACE_EXPLAINERS.closureControls}
      headerAside={
        <BitcodeMetricGrid
          metrics={[
            { label: 'Scenario', value: state.scenario },
            { label: 'Branch mode', value: state.branchMode },
          ]}
          columnsClassName="tablet:grid-cols-2"
          itemClassName="rounded-2xl border border-white/8 bg-black/20 px-4 py-4"
          labelClassName="text-[0.62rem] uppercase tracking-[0.16em] text-emerald-300/85"
          valueClassName="text-sm font-semibold text-neutral-200"
        />
      }
    >

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
                void handlePrimaryClosureAction();
              }}
              className="rounded-[1.4rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-4 text-left text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isActing ? 'Running closure…' : state.primaryActionLabel}
            </button>
            <button
              type="button"
              disabled={isActing || !state.shellReady}
              onClick={() => {
                void handleControlAction((controls) => controls.refresh?.());
              }}
              className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Refresh closure
            </button>
            <button
              type="button"
              disabled={isActing || !state.shellReady}
              onClick={() => {
                void handleControlAction((controls) => controls.resetApplication?.());
              }}
              className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset closure state
            </button>
          </div>

          <div className="mt-4 rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-4 text-sm">
            <p className="text-neutral-500">Runtime status</p>
            <p className="mt-2 text-neutral-100">{state.status}</p>
            <p className="mt-3 text-neutral-500">Flow continuity</p>
            <p className="mt-1 text-neutral-100">{state.flowGuideDetail}</p>
            {actionError ? (
              <>
                <p className="mt-3 text-neutral-500">Ledger write</p>
                <p className="mt-1 text-red-200">{actionError}</p>
              </>
            ) : null}
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
              Open live verification detail
            </button>
            <button
              type="button"
              onClick={() => jumpToShellSection('panelBranchArtifacts')}
              className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
            >
              Open live branch detail
            </button>
            <button
              type="button"
              onClick={() => jumpToShellSection('panelSettlement')}
              className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
            >
              Open live settlement detail
            </button>
            <button
              type="button"
              onClick={() => jumpToShellSection('panelLedger')}
              className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
            >
              Open live ledger detail
            </button>
          </div>
        </article>
      </div>
    </ApplicationWorkspaceCard>
  );
}
