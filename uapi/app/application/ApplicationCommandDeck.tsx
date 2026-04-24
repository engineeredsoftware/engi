'use client';

import React from 'react';
import { useMemo, useState } from 'react';

import BitcodeInlineExplainer from '@/components/base/bitcode/execution/BitcodeInlineExplainer';

import ApplicationWorkspaceCard from './ApplicationWorkspaceCard';
import {
  buildApplicationClosureFinalWorkSummary,
  readApplicationRouteError,
  type ApplicationActivityRecordDraft,
} from './application-activity-history';
import {
  APPLICATION_INLINE_EXPLAINERS,
  APPLICATION_WORKSPACE_EXPLAINERS,
} from './application-workspace-explainers';
import { APPLICATION_ACTIONS } from './application-experience-architecture';
import { APPLICATION_SHELL_SECTIONS } from './application-shell-sections';
import {
  normalizeApplicationCommandState,
  type ApplicationCommandState,
} from './application-command-state';
import { normalizeApplicationClosureState } from './application-closure-state';
import { deriveApplicationCommandPresentation } from './application-command-presentation';
import ApplicationFlowGuideCard from './ApplicationFlowGuideCard';
import { useApplicationShellBridge } from './application-shell-bridge';
import type { BitcodeTransactionReadiness } from './bitcode-transaction-readiness';

function jumpToShellSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
}

function optionLabel(
  options: Array<{ value: string; label: string }>,
  value: string,
  fallback: string,
) {
  return options.find((option) => option.value === value)?.label || fallback;
}

interface ApplicationCommandDeckProps {
  onRecordActivity?: (draft: ApplicationActivityRecordDraft) => Promise<unknown>;
  repositoryAnchor?: string | null;
  transactionReadiness: BitcodeTransactionReadiness;
}

export default function ApplicationCommandDeck({
  onRecordActivity,
  repositoryAnchor,
  transactionReadiness,
}: ApplicationCommandDeckProps) {
  const { snapshot, runControl } = useApplicationShellBridge();
  const [isActing, setIsActing] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const commandState = useMemo<ApplicationCommandState | null>(
    () => normalizeApplicationCommandState(snapshot),
    [snapshot],
  );
  const closureState = useMemo(() => normalizeApplicationClosureState(snapshot), [snapshot]);

  const scenarioOptions = commandState?.scenarioOptions || [];
  const projectionOptions = commandState?.projectionOptions || [];
  const branchOptions = commandState?.branchOptions || [];
  const scenario = commandState?.scenario || 'waiting';
  const projection = commandState?.projection || 'waiting';
  const branchMode = commandState?.branchMode || 'waiting';
  const guideActionLabel = commandState?.flowGuideOpen
    ? 'Hide flow guide'
    : commandState?.flowGuideStepCount
      ? 'Resume flow guide'
      : 'Open flow guide';
  const shellReady = commandState?.shellReady || false;
  const guideDetail =
    commandState && commandState.flowGuideStepCount > 0
      ? `${commandState.flowGuideOpen ? 'drafting' : 'saved'} · step ${Math.min(commandState.flowGuideStepIndex + 1, commandState.flowGuideStepCount)} of ${commandState.flowGuideStepCount}`
      : 'ready';
  const currentScenarioLabel = optionLabel(scenarioOptions, scenario, scenario);
  const currentProjectionLabel = optionLabel(projectionOptions, projection, projection);
  const currentBranchLabel = optionLabel(branchOptions, branchMode, branchMode);
  const presentation = useMemo(
    () => deriveApplicationCommandPresentation(commandState),
    [commandState],
  );
  const settlementReady = transactionReadiness.canSettle;
  const readinessTone = settlementReady
    ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-100'
    : 'border-amber-400/25 bg-amber-400/10 text-amber-100';
  const handleMakeBranch = async () => {
    if (!settlementReady) {
      setActionMessage(transactionReadiness.summary);
      return;
    }

    setIsActing(true);
    setActionMessage(null);

    try {
      const response = await fetch('/api/make-bitcode-branch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenarioId: scenario || undefined,
          branchMode: branchMode || undefined,
          principal: projection || undefined,
          repositoryAnchor: repositoryAnchor || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(
          await readApplicationRouteError(response, 'Unable to materialize the Bitcode branch flow.'),
        );
      }

      const payload = (await response.json()) as Record<string, unknown>;
      await runControl((controls) => controls.refresh?.());

      try {
        await onRecordActivity?.({
          type: 'agentic-execution:asset-pack',
          detailSection: 'activity',
          summary: `Materialized an AssetPack activity from the ${currentScenarioLabel} give/need posture.`,
          context: {
            source: 'application-command-deck',
            scenarioId: scenario,
            projection,
            branchMode,
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
        setActionMessage('AssetPack activity recorded into the Bitcode ledger.');
      } catch (recordError) {
        const message =
          recordError instanceof Error
            ? recordError.message
            : 'The Bitcode branch ran, but the ledger activity row could not be recorded.';
        setActionMessage(message);
      }
    } catch (error) {
      setActionMessage(error instanceof Error ? error.message : 'Unable to materialize the Bitcode branch flow.');
    } finally {
      setIsActing(false);
    }
  };

  return (
    <ApplicationWorkspaceCard
      kicker="Flow controls"
      title="Give, need, and closure controls"
      summary="Set scenario, projection, and branch mode, then run closure or resume the working flow from the same Bitcode Terminal you use to read the ledger."
      explainer={APPLICATION_WORKSPACE_EXPLAINERS.controls}
      tone="emerald"
    >
      <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
          <p className="text-emerald-300/85">Terminal sync</p>
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
            <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">
                <span>Scenario</span>
                <BitcodeInlineExplainer explainer={APPLICATION_INLINE_EXPLAINERS.scenario} />
              </span>
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
            </div>

            <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">
                <span>Projection</span>
                <BitcodeInlineExplainer explainer={APPLICATION_INLINE_EXPLAINERS.projection} />
              </span>
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
            </div>

            <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
              <span className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">
                <span>Branch mode</span>
                <BitcodeInlineExplainer explainer={APPLICATION_INLINE_EXPLAINERS.branchMode} />
              </span>
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
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            <button
              type="button"
              disabled={isActing || !shellReady || !settlementReady}
              onClick={() => {
                void handleMakeBranch();
              }}
              className="rounded-[1.4rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-4 text-left text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isActing ? 'Materializing branch…' : 'Make Bitcode branch'}
            </button>
            <button
              type="button"
              disabled={isActing}
              onClick={() => {
                void runControl((controls) =>
                  controls.toggleFlowGuide?.() ?? controls.toggleTutorial?.(),
                );
              }}
              className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10"
            >
              {guideActionLabel}
            </button>
            <button
              type="button"
              disabled={isActing}
              onClick={() => {
                void runControl((controls) => controls.resetApplication?.());
              }}
              className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10"
            >
              Reset runtime
            </button>
          </div>

          {actionMessage ? (
            <div className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-neutral-200">
              {actionMessage}
            </div>
          ) : null}

          <div className={`rounded-[1.3rem] border px-4 py-4 text-sm leading-6 ${readinessTone}`}>
            <div className="flex items-center gap-2">
              <p className="text-[0.66rem] uppercase tracking-[0.18em] text-current/80">
                Transaction readiness
              </p>
              <BitcodeInlineExplainer
                explainer={APPLICATION_INLINE_EXPLAINERS.transactionReadiness}
                triggerClassName="h-4.5 w-4.5 border-current/20 bg-current/10 text-[0.58rem] text-current"
              />
            </div>
            <p className="mt-2 text-current">{transactionReadiness.summary}</p>
            {transactionReadiness.blockers.length ? (
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-current/80">
                Pending: {transactionReadiness.blockers.map((entry) => entry.label).join(' · ')}
              </p>
            ) : null}
          </div>

          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
            <div className="flex items-center gap-2">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Jump links</p>
              <BitcodeInlineExplainer explainer={APPLICATION_WORKSPACE_EXPLAINERS.activityMap} />
            </div>
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
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Current working flow</p>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-emerald-100">
                resumable
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-200">{presentation.draftSummary}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-3">
                <p className="text-[0.6rem] uppercase tracking-[0.14em] text-neutral-500">Scenario</p>
                <p className="mt-2 text-sm font-medium text-white">{currentScenarioLabel}</p>
              </div>
              <div className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-3">
                <p className="text-[0.6rem] uppercase tracking-[0.14em] text-neutral-500">Projection</p>
                <p className="mt-2 text-sm font-medium text-white">{currentProjectionLabel}</p>
              </div>
              <div className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-3">
                <p className="text-[0.6rem] uppercase tracking-[0.14em] text-neutral-500">Branch mode</p>
                <p className="mt-2 text-sm font-medium text-white">{currentBranchLabel}</p>
              </div>
            </div>
          </div>

          <ApplicationFlowGuideCard
            commandState={commandState}
            continuationTip={presentation.continuationTip}
            transactionReadiness={transactionReadiness}
          />
        </div>
      </div>
    </ApplicationWorkspaceCard>
  );
}
