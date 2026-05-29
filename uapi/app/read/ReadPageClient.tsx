'use client';

import Link from 'next/link';
import React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GitBranch, GitCommitHorizontal, RefreshCw, ShieldCheck, Workflow } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { fetchPipelineExecutionHistory } from '@/networking/api-client';
import type { PipelineExecution } from '@/types/api';

import TerminalDepositReadWorkbench from '@/app/terminal/TerminalDepositReadWorkbench';
import TerminalRepositoryContextPanel from '@/app/terminal/TerminalRepositoryContextPanel';
import TerminalReadScenarioPanel from '@/app/terminal/TerminalReadScenarioPanel';
import { TerminalShellBridgeProvider } from '@/app/terminal/terminal-shell-bridge';
import type { TerminalDepositedSourceRevision } from '@/app/terminal/terminal-deposit-read-workbench';
import {
  buildTerminalExecutionHistoryRequest,
  mapExecutionHistoryRunToWorkspaceRun,
  readTerminalRouteError,
  type TerminalActivityRecordDraft,
  upsertWorkspaceRun,
} from '@/app/terminal/terminal-activity-history';
import type { TerminalRepositoryContextState } from '@/app/terminal/terminal-repository-context';
import { readTerminalTransactionId, writeTerminalTransactionId } from '@/app/terminal/terminal-transaction-query';
import { shouldRecoverTerminalTransactionRoute } from '@/app/terminal/terminal-transaction-query';
import type { WorkspaceRun } from '@/app/terminal/terminal-run-data';
import { buildReadHref } from '@/app/terminal/terminal-routes';

import { buildReadRouteSession, readReadRouteStage, writeReadRouteStage } from './read-route-model';

function shortIdentifier(value: string | null | undefined) {
  if (!value) return 'pending';
  return value.length > 18 ? `${value.slice(0, 12)}...` : value;
}

function formatDate(value: string | null | undefined) {
  if (!value) return 'pending';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ReadPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const routeSearchParams = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);
  const selectedTransactionId = useMemo(() => readTerminalTransactionId(routeSearchParams), [routeSearchParams]);
  const routeReadingStage = useMemo(() => readReadRouteStage(routeSearchParams), [routeSearchParams]);
  const [liveRuns, setLiveRuns] = useState<WorkspaceRun[]>([]);
  const [isLoadingRuns, setIsLoadingRuns] = useState(true);
  const [runsLoadError, setRunsLoadError] = useState<string | null>(null);
  const [repositoryContext, setRepositoryContext] = useState<TerminalRepositoryContextState | null>(null);

  const readCurrentSearchParams = useCallback(
    () =>
      typeof window !== 'undefined' && window.location.pathname === '/read'
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  const replaceReadSearchParams = useCallback(
    (nextParams: URLSearchParams) => {
      const query = nextParams.toString();
      router.replace(buildReadHref(query), { scroll: false });
    },
    [router],
  );

  const replaceReadRouteTransaction = useCallback(
    (transactionId: string) => {
      replaceReadSearchParams(writeTerminalTransactionId(readCurrentSearchParams(), transactionId));
    },
    [readCurrentSearchParams, replaceReadSearchParams],
  );

  const refreshLiveRuns = useCallback(async () => {
    setIsLoadingRuns(true);
    setRunsLoadError(null);

    try {
      const history = await fetchPipelineExecutionHistory();
      const nextRuns = history.map(mapExecutionHistoryRunToWorkspaceRun);
      setLiveRuns(nextRuns);
      return nextRuns;
    } catch (error) {
      setLiveRuns([]);
      setRunsLoadError(error instanceof Error ? error.message : 'Unable to load recent Reading activity.');
      return [];
    } finally {
      setIsLoadingRuns(false);
    }
  }, []);

  useEffect(() => {
    void refreshLiveRuns();
  }, [refreshLiveRuns]);

  useEffect(() => {
    if (
      !shouldRecoverTerminalTransactionRoute({
        transactionIds: liveRuns.map((run) => run.id),
        selectedTransactionId,
      })
    ) {
      return;
    }
    replaceReadRouteTransaction(liveRuns[0].id);
  }, [liveRuns, replaceReadRouteTransaction, selectedTransactionId]);

  const selectedRun = useMemo(
    () => liveRuns.find((run) => run.id === selectedTransactionId) || liveRuns[0] || null,
    [liveRuns, selectedTransactionId],
  );

  const depositedSourceRevision = useMemo<TerminalDepositedSourceRevision | null>(() => {
    const selectedRepository = repositoryContext?.selectedRepository || null;
    if (!selectedRepository) return null;
    const selectedBranch = repositoryContext?.selectedBranch || selectedRepository.defaultBranch || 'main';
    const matchingSubmission = liveRuns.find(
      (run) =>
        run.contextSource === 'terminal-deposit-composer' &&
        run.repository === selectedRepository.fullName &&
        run.branch === selectedBranch &&
        Boolean(run.sourceCommit) &&
        Boolean(run.candidateAssetId),
    );
    if (!matchingSubmission?.sourceCommit) return null;

    return {
      repositoryFullName: selectedRepository.fullName,
      branch: selectedBranch,
      commit: matchingSubmission.sourceCommit,
      activityId: matchingSubmission.id,
      createdAt: matchingSubmission.created_at,
      depositAssetId: matchingSubmission.candidateAssetId || null,
      hasWalletOrAttestationProof: Boolean(matchingSubmission.candidateAssetId),
      hasAssetMeasurementEvidence: Boolean(matchingSubmission.candidateAssetId),
      proofRoot: matchingSubmission.depositProofRoot || null,
      measurementRoot: matchingSubmission.depositMeasurementRoot || null,
      reconciliationReadbackRoot: matchingSubmission.depositReconciliationReadbackRoot || null,
      depositorySearchDocumentRoot: matchingSubmission.depositorySearchDocumentRoot || null,
      lexicalDocumentRoot: matchingSubmission.lexicalDocumentRoot || null,
      vectorDocumentRoot: matchingSubmission.vectorDocumentRoot || null,
      compensationPreviewRoot: matchingSubmission.compensationPreviewRoot || null,
      sourceToSharesPreviewRoot: matchingSubmission.sourceToSharesPreviewRoot || null,
      compensationState: matchingSubmission.compensationState || null,
      compensationAllocationMethod: matchingSubmission.compensationAllocationMethod || null,
      compensationPriceAsset: matchingSubmission.compensationPriceAsset || null,
      depositorWalletId: matchingSubmission.depositorWalletId || null,
      depositoryIndexState: matchingSubmission.depositoryIndexState || null,
    };
  }, [liveRuns, repositoryContext]);

  const admittedReadActivityId = useMemo(() => {
    const selectedRepository = repositoryContext?.selectedRepository || null;
    if (!selectedRepository) return null;
    const sourceBranch = depositedSourceRevision?.branch || repositoryContext?.selectedBranch || selectedRepository.defaultBranch || 'main';
    const sourceCommit = depositedSourceRevision?.commit || repositoryContext?.selectedCommit || null;
    const matchingRead = liveRuns.find(
      (run) =>
        run.contextSource === 'terminal-deposit-read-workbench' &&
        run.contextWorkbench === 'read-admission' &&
        run.repository === selectedRepository.fullName &&
        run.branch === sourceBranch &&
        (!sourceCommit || run.sourceCommit === sourceCommit),
    );
    return matchingRead?.id || null;
  }, [depositedSourceRevision, liveRuns, repositoryContext]);

  const readRouteSession = useMemo(
    () =>
      buildReadRouteSession({
        transactionId: selectedTransactionId || admittedReadActivityId || null,
        routeReadingStage,
        repositoryFullName: repositoryContext?.selectedRepository?.fullName || null,
        sourceBranch: depositedSourceRevision?.branch || repositoryContext?.selectedBranch || null,
        sourceCommit: depositedSourceRevision?.commit || repositoryContext?.selectedCommit || null,
        hasRepositorySource: Boolean(repositoryContext?.selectedRepository),
        hasReadMeasurement: Boolean(admittedReadActivityId || selectedRun?.contextWorkbench === 'read-admission' || selectedRun?.transactionLens === 'read'),
        hasSynthesizedNeed: Boolean(admittedReadActivityId || selectedRun?.contextSource === 'terminal-staged-reading'),
        hasAcceptedNeed: Boolean(admittedReadActivityId),
        findingFitsRunning: Boolean(selectedRun?.type?.includes('asset-pack') && selectedRun.status === 'running'),
        hasSourceSafePreview: Boolean(selectedRun?.type?.includes('asset-pack') && selectedRun.status === 'completed'),
        hasSettlementReadback: Boolean(selectedRun?.closureFocus?.toLowerCase().includes('settlement')),
        hasDeliveryReadback: Boolean(selectedRun?.closureFocus?.toLowerCase().includes('delivery')),
      }),
    [admittedReadActivityId, depositedSourceRevision, repositoryContext, routeReadingStage, selectedRun, selectedTransactionId],
  );

  const handleRecordActivity = useCallback(
    async (draft: TerminalActivityRecordDraft) => {
      const response = await fetch('/api/executions/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          buildTerminalExecutionHistoryRequest(draft, {
            repositoryContext,
            fallbackRun: selectedRun,
          }),
        ),
      });

      if (!response.ok) {
        throw new Error(await readTerminalRouteError(response, 'Unable to record Reading activity.'));
      }

      const payload = (await response.json()) as { execution?: PipelineExecution };
      if (!payload.execution) throw new Error('Reading activity response did not include an execution row.');

      const nextRun = mapExecutionHistoryRunToWorkspaceRun(payload.execution);
      setLiveRuns((currentRuns) => upsertWorkspaceRun(currentRuns, nextRun));
      if (draft.selectAfterRecord !== false) replaceReadRouteTransaction(nextRun.id);
      void refreshLiveRuns();
      return nextRun;
    },
    [refreshLiveRuns, replaceReadRouteTransaction, repositoryContext, selectedRun],
  );

  const recentReadingRuns = useMemo(
    () =>
      liveRuns
        .filter((run) =>
          ['terminal-deposit-read-workbench', 'terminal-staged-reading', 'pipeline-harness'].includes(
            run.contextSource || '',
          ) || Boolean(run.type?.includes('pipeline')),
        )
        .slice(0, 6),
    [liveRuns],
  );

  const sessionRows = [
    { label: 'Repository', value: readRouteSession.routeState.repositoryFullName || 'select repository' },
    { label: 'Branch', value: readRouteSession.routeState.sourceBranch || 'pending' },
    { label: 'Commit', value: shortIdentifier(readRouteSession.routeState.sourceCommit) },
    { label: 'Transaction', value: shortIdentifier(readRouteSession.routeState.transactionId) },
    { label: 'Need pipeline', value: readRouteSession.pipelineOwnership.readNeedPipeline },
    { label: 'Fits pipeline', value: readRouteSession.pipelineOwnership.findingFitsPipeline },
  ];

  return (
    <TerminalShellBridgeProvider>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_30%),linear-gradient(180deg,#050915_0%,#02050d_100%)] px-4 pb-24 pt-32 text-neutral-100 tablet:px-6 desktop:px-8">
        <div className="mx-auto grid w-full max-w-[1800px] gap-5">
          <header className="grid gap-5 border border-sky-300/15 bg-[linear-gradient(135deg,rgba(7,14,26,0.96),rgba(4,9,18,0.92))] px-5 py-5 shadow-[0_30px_100px_rgba(0,0,0,0.34)] xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.6fr)] xl:items-end">
            <div>
              <p className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.34em] text-sky-200/80">
                <Workflow className="h-4 w-4" aria-hidden="true" />
                Read
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-4xl">
                Reading
              </h1>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-neutral-300 tablet:text-base">
                Request a repository read, review the synthesized Need, request Finding Fits, inspect a source-safe AssetPack preview, then settle before delivery.
              </p>
            </div>
            <dl className="grid gap-2 text-xs uppercase tracking-[0.18em] text-neutral-300 tablet:grid-cols-3">
              <div className="border border-white/10 bg-white/[0.045] px-4 py-3">
                <dt className="text-neutral-500">Stage</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{readRouteSession.activeStepId.replace(/-/g, ' ')}</dd>
              </div>
              <div className="border border-white/10 bg-white/[0.045] px-4 py-3">
                <dt className="text-neutral-500">Rows</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{isLoadingRuns ? 'reading' : String(liveRuns.length)}</dd>
              </div>
              <div className="border border-white/10 bg-white/[0.045] px-4 py-3">
                <dt className="text-neutral-500">Boundary</dt>
                <dd className="mt-1 text-sm font-semibold text-white">source-safe</dd>
              </div>
            </dl>
          </header>

          <section className="grid gap-3 md:grid-cols-5" aria-label="Reading steps">
            {readRouteSession.steps.map((step) => {
              const active = step.id === readRouteSession.activeStepId;
              return (
                <button
                  type="button"
                  key={step.id}
                  data-testid={`read-route-step-${step.id}`}
                  data-reading-step-state={step.state}
                  onClick={() => replaceReadSearchParams(writeReadRouteStage(readCurrentSearchParams(), step.id))}
                  className={`min-h-[9rem] border px-4 py-4 text-left transition ${
                    active
                      ? 'border-sky-300/38 bg-sky-300/12 shadow-[0_0_24px_rgba(56,189,248,0.12)]'
                      : 'border-white/10 bg-white/[0.035] hover:border-sky-300/24 hover:bg-sky-300/[0.06]'
                  }`}
                >
                  <span className="text-[0.6rem] uppercase tracking-[0.18em] text-neutral-500">{step.state}</span>
                  <span className="mt-2 block text-sm font-semibold text-neutral-100">{step.label}</span>
                  <span className="mt-2 block text-xs leading-5 text-neutral-400">{step.lowDetailGuidance}</span>
                </button>
              );
            })}
          </section>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.6fr)]">
            <div className="grid min-w-0 gap-5">
              <div className="grid gap-5 xl:grid-cols-2">
                <TerminalRepositoryContextPanel
                  preferredRepository={selectedRun?.repository || null}
                  onContextChange={setRepositoryContext}
                  onRecordActivity={handleRecordActivity}
                />
                <TerminalReadScenarioPanel onRecordActivity={handleRecordActivity} showDemonstrationScenarios={false} />
              </div>
              <TerminalDepositReadWorkbench
                repositoryContext={repositoryContext}
                depositedSourceRevision={depositedSourceRevision}
                admittedReadActivityId={admittedReadActivityId}
                routeReadingStage={routeReadingStage}
                onRecordActivity={handleRecordActivity}
                onHarnessCompleted={refreshLiveRuns}
                showDemonstrationWorkbench={false}
              />
            </div>

            <aside className="grid h-fit gap-5" aria-label="Reading route state">
              <section className="border border-white/10 bg-white/[0.035] px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-sky-200/80">Session</p>
                    <h2 className="mt-2 text-lg font-semibold text-white">Source-safe read state</h2>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-emerald-200" aria-hidden="true" />
                </div>
                <dl className="mt-4 grid gap-2">
                  {sessionRows.map((row) => (
                    <div key={row.label} className="border border-white/8 bg-black/20 px-3 py-2">
                      <dt className="text-[0.58rem] uppercase tracking-[0.14em] text-neutral-500">{row.label}</dt>
                      <dd className="mt-1 break-words font-mono text-[0.68rem] text-neutral-200">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <details className="mt-3 border border-sky-300/15 bg-sky-300/[0.04] px-3 py-3">
                  <summary className="cursor-pointer text-[0.62rem] uppercase tracking-[0.16em] text-sky-100/85">
                    Disclosure boundary
                  </summary>
                  <p className="mt-2 text-xs leading-5 text-neutral-300">
                    Low-detail state and expandable metadata can show Need measurements, fit ids, proof roots, fee quotes, settlement readback, and delivery posture. Source-bearing AssetPack contents stay withheld until paid read rights are proven.
                  </p>
                </details>
              </section>

              <section className="border border-white/10 bg-white/[0.035] px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-neutral-500">Readback</p>
                    <h2 className="mt-2 text-lg font-semibold text-white">Recent Reading activity</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      void refreshLiveRuns();
                    }}
                    className="inline-flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.04] text-neutral-200 transition hover:border-sky-300/30 hover:bg-sky-300/10"
                    aria-label="Refresh Reading activity"
                  >
                    <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                {runsLoadError ? (
                  <p className="mt-3 border border-red-300/20 bg-red-300/10 px-3 py-3 text-sm leading-6 text-red-100">
                    {runsLoadError}
                  </p>
                ) : null}
                <div className="mt-4 grid gap-2">
                  {recentReadingRuns.length ? (
                    recentReadingRuns.map((run) => (
                      <Link
                        key={run.id}
                        href={buildReadHref(writeTerminalTransactionId(readCurrentSearchParams(), run.id))}
                        className="border border-white/8 bg-black/20 px-3 py-3 transition hover:border-sky-300/25 hover:bg-sky-300/[0.05]"
                      >
                        <span className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.16em] text-neutral-500">
                          <span>{run.type}</span>
                          <span>{run.status}</span>
                        </span>
                        <span className="mt-2 block text-sm font-medium text-neutral-100">{run.summary || run.id}</span>
                        <span className="mt-2 flex flex-wrap gap-2 text-[0.68rem] text-neutral-400">
                          <span className="inline-flex items-center gap-1">
                            <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                            {run.branch || 'branch pending'}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <GitCommitHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                            {shortIdentifier(run.sourceCommit)}
                          </span>
                          <span>{formatDate(run.created_at)}</span>
                        </span>
                      </Link>
                    ))
                  ) : (
                    <p className="border border-white/8 bg-black/20 px-3 py-4 text-sm leading-6 text-neutral-400">
                      {isLoadingRuns ? 'Reading recent activity...' : 'No recent Reading activity found for this workspace.'}
                    </p>
                  )}
                </div>
                <Link
                  href="/packs?type=read-need-fit-preview"
                  className="mt-3 inline-flex w-full items-center justify-center border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-200/40 hover:bg-emerald-300/15"
                >
                  Open pack activity
                </Link>
              </section>
            </aside>
          </section>
        </div>
      </main>
    </TerminalShellBridgeProvider>
  );
}
