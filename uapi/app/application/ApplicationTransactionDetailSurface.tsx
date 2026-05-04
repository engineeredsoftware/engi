'use client';

import { useEffect, useMemo, useState } from 'react';

import { formatAgenticExecutionLabel } from '@bitcode/api/src/executions/agentic-execution';
import { ExecutionDetailsView } from '@/app/executions/components/ExecutionsDetailsView';
import {
  getTransactionDataModeLabel,
  isMockTransactionDataMode,
} from '@/components/base/bitcode/execution/bitcode-transaction-data-mode';
import ShippablesCardsPanel from '@/components/base/bitcode/execution/ShippablesCardsPanel';
import ShippablesDocPanel from '@/components/base/bitcode/execution/ShippablesDocPanel';
import type { TransactionDataMode } from '@/components/base/bitcode/execution/bitcode-transaction-types';

import ApplicationTransactionDetailActionBar from './ApplicationTransactionDetailActionBar';
import ApplicationTransactionActivitySurface from './ApplicationTransactionActivitySurface';
import type { ApplicationTransactionDetailSection } from './application-transaction-query';
import type { ApplicationRunDetailSnapshot } from './application-transaction-detail-snapshot';
import type { WorkspaceRun } from './application-run-data';
import ApplicationTransactionClosureCard from './ApplicationTransactionClosureCard';
import ApplicationTransactionDetailHero from './ApplicationTransactionDetailHero';
import ApplicationTransactionHistoryCard from './ApplicationTransactionHistoryCard';
import ApplicationTransactionIdentityCard from './ApplicationTransactionIdentityCard';
import ApplicationTransactionProofsCard from './ApplicationTransactionProofsCard';
import {
  buildApplicationClosureAssetPackCompletion,
  readApplicationRouteError,
  type ApplicationActivityRecordDraft,
} from './application-activity-history';
import { normalizeApplicationClosureState } from './application-closure-state';
import {
  buildApplicationTransactionClosurePayload,
  buildApplicationTransactionClosureFollowThrough,
  buildApplicationTransactionClosureRows,
  buildApplicationTransactionIdentityRows,
  buildApplicationTransactionOverviewMetrics,
} from './application-transaction-detail';
import { jumpToShellSection } from './application-shell-reading';
import { useApplicationShellBridge } from './application-shell-bridge';

function formatRunTimestamp(value: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

interface ApplicationTransactionDetailSurfaceProps {
  selectedRun: WorkspaceRun;
  detail: ApplicationRunDetailSnapshot | null;
  isLoadingDetail: boolean;
  detailError: string | null;
  transactionDataMode: TransactionDataMode;
  detailSection: ApplicationTransactionDetailSection;
  onDetailSectionChange: (detailSection: ApplicationTransactionDetailSection) => void;
  onRecordActivity?: (draft: ApplicationActivityRecordDraft) => Promise<unknown>;
}

export default function ApplicationTransactionDetailSurface({
  selectedRun,
  detail,
  isLoadingDetail,
  detailError,
  transactionDataMode,
  detailSection,
  onDetailSectionChange,
  onRecordActivity,
}: ApplicationTransactionDetailSurfaceProps) {
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [isActing, setIsActing] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const { snapshot, runControl, controls } = useApplicationShellBridge();
  const usesMockTransactions = isMockTransactionDataMode(transactionDataMode);
  const runtimeClosureState = useMemo(() => normalizeApplicationClosureState(snapshot), [snapshot]);
  const closureState = runtimeClosureState || detail?.closureState || null;
  const closureFollowThrough = useMemo(
    () =>
      detail?.closureFollowThrough ||
      buildApplicationTransactionClosureFollowThrough(closureState),
    [closureState, detail?.closureFollowThrough],
  );
  const shellReady = Boolean(controls);
  const showShippables = detailSection === 'shippables';
  const showTransaction = detailSection === 'transaction';
  const showClosure = detailSection === 'closure';
  const showProofs = detailSection === 'proofs';
  const showHistory = detailSection === 'history';
  const showActivity = detailSection === 'activity';
  const showConsole = detailSection === 'console' && !usesMockTransactions;
  const normalizedSummary =
    detail?.summary || 'The selected Bitcode activity is loaded into the main Bitcode Terminal detail.';
  const sectionSummary = useMemo(() => {
    if (showTransaction) {
      return `${normalizedSummary} Activity identity, repository, and timing posture are the active detail focus.`;
    }
    if (showClosure) {
      return `${normalizedSummary} Closure proof, settlement follow-through, and re-run controls are the active detail focus.`;
    }
    if (showProofs) {
      return `${normalizedSummary} Proof families and bounded verification posture are the active detail focus.`;
    }
    if (showHistory) {
      return `${normalizedSummary} Ledger-linked activity history and recent closure continuity are the active detail focus.`;
    }
    if (showActivity) {
      return `${normalizedSummary} Activity streaming, work updates, and retained execution posture are the active detail focus.`;
    }
    if (showConsole) {
      return `${normalizedSummary} The execution console remains available when you need the lower-level runtime view.`;
    }
    return `${normalizedSummary} Finish-delivered pull-request Shippables, stored AssetPack evidence, and summary text are the active detail focus.`;
  }, [normalizedSummary, showActivity, showClosure, showConsole, showHistory, showProofs, showTransaction]);
  const transactionPayload = useMemo(
    () => ({
      transaction: {
        id: selectedRun.id,
        type: selectedRun.type || null,
        status: selectedRun.status || null,
        createdAt: selectedRun.created_at,
        summary: detail?.summary || selectedRun.summary || null,
      },
      repository: detail?.repoSnapshot
        ? {
            org: detail.repoSnapshot.org,
            repo: detail.repoSnapshot.repo,
            branch: detail.repoSnapshot.branch,
            commit: detail.repoSnapshot.commit,
          }
        : selectedRun.repository || null,
      processingStats: detail?.processingStats || null,
      proofStatus: detail?.proofStatus || selectedRun.proofStatus || null,
      closureFocus: detail?.closureFocus || selectedRun.closureFocus || null,
      bitcodeActivityState: detail?.bitcodeActivityState || null,
      historyItemCount: detail?.historyItemCount ?? selectedRun.itemCount ?? 0,
      eventCount: detail?.eventCount ?? 0,
    }),
    [detail, selectedRun],
  );
  const proofsPayload = useMemo(
    () => ({
      proofStatus: detail?.proofStatus || selectedRun.proofStatus || null,
      closureFocus: detail?.closureFocus || selectedRun.closureFocus || null,
      proofFamilies: closureFollowThrough.proofFamilies,
      processingStats: detail?.processingStats || null,
    }),
    [closureFollowThrough.proofFamilies, detail, selectedRun],
  );
  const historyPayload = useMemo(
    () => ({
      historyItemCount: detail?.historyItemCount ?? selectedRun.itemCount ?? 0,
      eventCount: detail?.eventCount ?? 0,
      repository: detail?.repoSnapshot
        ? {
            org: detail.repoSnapshot.org,
            repo: detail.repoSnapshot.repo,
            branch: detail.repoSnapshot.branch,
            commit: detail.repoSnapshot.commit,
          }
        : selectedRun.repository || null,
      recentHistory: closureFollowThrough.recentHistory,
    }),
    [closureFollowThrough.recentHistory, detail, selectedRun],
  );
  const closurePayload = useMemo(
    () => buildApplicationTransactionClosurePayload(selectedRun, detail, closureState, closureFollowThrough),
    [closureFollowThrough, closureState, detail, selectedRun],
  );
  const writtenAssets = detail?.writtenAssets || null;
  const deliveryMechanism = detail?.shippables || detail?.deliveryMechanism || writtenAssets;
  const mergedAssetPackSurface =
    writtenAssets || deliveryMechanism
      ? {
          pullRequest: deliveryMechanism?.pullRequest ?? writtenAssets?.pullRequest ?? null,
          fileChanges: writtenAssets?.fileChanges ?? deliveryMechanism?.fileChanges ?? null,
          summary: writtenAssets?.summary ?? deliveryMechanism?.summary ?? null,
        }
      : null;

  useEffect(() => {
    setSummaryOpen(true);
  }, [selectedRun.id]);

  if (isLoadingDetail && !detail) {
    return (
      <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-10 text-sm text-neutral-400">
        Loading Bitcode activity detail…
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-10 text-sm text-neutral-400">
        Selected Bitcode activity detail is not available yet for this application context.
      </div>
    );
  }

  const overviewMetrics = buildApplicationTransactionOverviewMetrics(selectedRun, detail);
  const identityRows = buildApplicationTransactionIdentityRows(selectedRun, detail);
  const closureRows = buildApplicationTransactionClosureRows(detail);

  const handleClosureAction = async (callback: Parameters<typeof runControl>[0]) => {
    setIsActing(true);
    try {
      await runControl(callback);
    } finally {
      setIsActing(false);
    }
  };
  const handleRunClosure = async () => {
    setIsActing(true);
    setActionError(null);

    try {
      const response = await fetch('/api/make-bitcode-branch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(
          await readApplicationRouteError(response, 'Unable to run the selected closure activity.'),
        );
      }

      const payload = (await response.json()) as Record<string, unknown>;
      await runControl((nextControls) => nextControls.refresh?.());
      await onRecordActivity?.({
        type: 'agentic-execution:asset-pack',
        detailSection: 'closure',
        summary: `Re-ran closure from selected Bitcode activity ${selectedRun.id}.`,
        context: {
          source: 'application-transaction-detail',
          selectedRunId: selectedRun.id,
          selectedRunType: selectedRun.type || null,
          specVersion: payload.specVersion ?? null,
        },
          output: {
            protocol: {
              ok: payload.ok ?? true,
              latestRun: payload.latestRun ?? null,
            },
            assetPackCompletion: buildApplicationClosureAssetPackCompletion(runtimeClosureState, detail),
          },
        });
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : 'Unable to run the selected closure activity.',
      );
    } finally {
      setIsActing(false);
    }
  };

  return (
    <div className="space-y-6">
      {detailError ? (
        <div className="rounded-[1.4rem] border border-amber-500/20 bg-amber-500/10 px-4 py-4 text-sm text-amber-100">
          {detailError}
        </div>
      ) : null}

      <div className="grid gap-6">
        <div className="space-y-5">
          <ApplicationTransactionDetailHero
            title={selectedRun.agentic_execution?.label || formatAgenticExecutionLabel(selectedRun.type)}
            summary={sectionSummary}
            proofPosture={detail.proofStatus || 'closure state in flight'}
            modeLabel={getTransactionDataModeLabel(transactionDataMode)}
            metrics={overviewMetrics}
          />

          <ApplicationTransactionDetailActionBar
            activeSection={detailSection}
            onChangeSection={onDetailSectionChange}
            onRunClosure={() => {
              void handleRunClosure();
            }}
            onRefreshDetail={() => {
              void handleClosureAction((nextControls) => nextControls.refresh?.());
            }}
            isActing={isActing}
            shellReady={shellReady}
            mockMode={usesMockTransactions}
          />

          {showShippables && mergedAssetPackSurface ? (
            <section
              id="applicationTransactionShippables"
              className="space-y-6 rounded-[1.5rem] border border-white/8 bg-[rgba(5,10,20,0.88)] px-4 py-5"
            >
              <div className="px-2">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Finish-delivered Shippables</p>
                <h3 className="mt-2 text-lg font-semibold text-white">Shippables attached to this activity</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  AssetPack evidence and file changes remain Exchange-owned, while the GitHub pull request is the
                  V26 Shippable delivered by Finish in both mock and live posture.
                </p>
              </div>
              <ShippablesDocPanel
                shippables={mergedAssetPackSurface}
                summaryOpen={summaryOpen}
                onToggleSummary={() => setSummaryOpen((current) => !current)}
              />
              <ShippablesCardsPanel
                shippables={{
                  pullRequest: mergedAssetPackSurface.pullRequest ?? null,
                }}
              />
            </section>
          ) : showShippables ? (
            <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5 text-sm leading-6 text-neutral-300">
              No materialized written asset or Delivering mechanism is attached to this Bitcode activity yet. The same
              activity detail still keeps proofs, history, and closure reading available.
            </div>
          ) : null}

          {actionError ? (
            <div className="rounded-[1.4rem] border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-200">
              {actionError}
            </div>
          ) : null}
        </div>

        <div className="space-y-5">
          {showTransaction ? (
            <div id="applicationTransactionTransaction">
              <ApplicationTransactionIdentityCard
                startedAt={formatRunTimestamp(selectedRun.created_at)}
                rows={identityRows}
                payload={transactionPayload}
              />
            </div>
          ) : null}

          {showClosure ? (
            <div id="applicationTransactionClosure">
              <ApplicationTransactionClosureCard
                rows={closureRows}
                settlementMetrics={closureFollowThrough.settlementMetrics}
                branchArtifacts={closureFollowThrough.branchArtifacts}
                payload={closurePayload}
                onOpenVerification={() => jumpToShellSection('panelEvaluations')}
                onOpenBranch={() => jumpToShellSection('panelBranchArtifacts')}
                onOpenSettlement={() => jumpToShellSection('panelSettlement')}
              />
            </div>
          ) : null}

          {showProofs ? (
            <div id="applicationTransactionProofs">
              <ApplicationTransactionProofsCard
                proofFamilies={closureFollowThrough.proofFamilies}
                onOpenVerification={() => jumpToShellSection('panelEvaluations')}
                onOpenSettlement={() => jumpToShellSection('panelSettlement')}
                payload={proofsPayload}
              />
            </div>
          ) : null}

          {showHistory ? (
            <div id="applicationTransactionHistory">
              <ApplicationTransactionHistoryCard
                recentHistory={closureFollowThrough.recentHistory}
                onOpenHistory={() => jumpToShellSection('panelLedger')}
                payload={historyPayload}
              />
            </div>
          ) : null}
        </div>
      </div>

      {showActivity ? (
        <div id="applicationTransactionActivity">
          <ApplicationTransactionActivitySurface
            selectedRun={selectedRun}
            detail={detail}
            transactionDataMode={transactionDataMode}
          />
        </div>
      ) : null}

      {showConsole ? (
        <section
          id="applicationTransactionConsole"
          className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-[rgba(5,9,18,0.9)]"
        >
          <div className="border-b border-white/8 px-5 py-4">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Execution console</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Detailed execution console</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-300">
              Use this execution view when you need exact runtime detail beyond the main activity cards.
            </p>
          </div>
          <div className="p-5">
            <ExecutionDetailsView runId={selectedRun.id} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
