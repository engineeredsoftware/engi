'use client';

import { useEffect, useMemo, useState } from 'react';

import { ExecutionDetailsView } from '@/app/executions/components/ExecutionsDetailsView';
import {
  getTransactionDataModeLabel,
  isMockTransactionDataMode,
} from '@/components/base/engi/execution/bitcode-transaction-data-mode';
import DeliverablesCardsPanel from '@/components/base/engi/execution/DeliverablesCardsPanel';
import DeliverablesDocPanel from '@/components/base/engi/execution/DeliverablesDocPanel';
import type { TransactionDataMode } from '@/components/base/engi/execution/bitcode-transaction-types';

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
}

export default function ApplicationTransactionDetailSurface({
  selectedRun,
  detail,
  isLoadingDetail,
  detailError,
  transactionDataMode,
  detailSection,
  onDetailSectionChange,
}: ApplicationTransactionDetailSurfaceProps) {
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [isActing, setIsActing] = useState(false);
  const { snapshot, runControl, controls } = useApplicationShellBridge();
  const usesMockTransactions = isMockTransactionDataMode(transactionDataMode);
  const closureState = useMemo(() => normalizeApplicationClosureState(snapshot), [snapshot]);
  const closureFollowThrough = useMemo(
    () => buildApplicationTransactionClosureFollowThrough(closureState),
    [closureState],
  );
  const shellReady = Boolean(controls);
  const showDeliverables = detailSection === 'deliverables';
  const showTransaction = detailSection === 'transaction';
  const showClosure = detailSection === 'closure';
  const showProofs = detailSection === 'proofs';
  const showHistory = detailSection === 'history';
  const showActivity = detailSection === 'activity';
  const showConsole = detailSection === 'console' && !usesMockTransactions;
  const normalizedSummary =
    detail?.summary || 'The selected transaction is loaded into the main Bitcode detail workspace.';
  const sectionSummary = useMemo(() => {
    if (showTransaction) {
      return `${normalizedSummary} Transaction identity, repository, and timing posture are the active detail focus.`;
    }
    if (showClosure) {
      return `${normalizedSummary} Closure proof, settlement follow-through, and re-run controls are the active detail focus.`;
    }
    if (showProofs) {
      return `${normalizedSummary} Proof families and bounded verification posture are the active detail focus.`;
    }
    if (showHistory) {
      return `${normalizedSummary} Ledger-linked transaction history and recent closure continuity are the active detail focus.`;
    }
    if (showActivity) {
      return `${normalizedSummary} Activity streaming, work updates, and retained execution posture are the active detail focus.`;
    }
    if (showConsole) {
      return `${normalizedSummary} The execution console remains available when you need the lower-level runtime view.`;
    }
    return `${normalizedSummary} Deliverables, reviews, issues, comments, and summary text are the active detail focus.`;
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

  useEffect(() => {
    setSummaryOpen(true);
  }, [selectedRun.id]);

  if (isLoadingDetail && !detail) {
    return (
      <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-10 text-sm text-neutral-400">
        Loading transaction detail…
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-10 text-sm text-neutral-400">
        Selected transaction detail is not available yet for this application context.
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

  return (
    <div className="space-y-6">
      {detailError ? (
        <div className="rounded-[1.4rem] border border-amber-500/20 bg-amber-500/10 px-4 py-4 text-sm text-amber-100">
          {detailError}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
        <div className="space-y-5">
          <ApplicationTransactionDetailHero
            title={selectedRun.type || 'pipeline:deliverables'}
            summary={sectionSummary}
            proofPosture={detail.proofStatus || 'closure state in flight'}
            modeLabel={getTransactionDataModeLabel(transactionDataMode)}
            metrics={overviewMetrics}
          />

          <ApplicationTransactionDetailActionBar
            activeSection={detailSection}
            onChangeSection={onDetailSectionChange}
            onRunClosure={() => {
              void handleClosureAction((nextControls) => nextControls.makeBranch?.());
            }}
            onRefreshDetail={() => {
              void handleClosureAction((nextControls) => nextControls.refresh?.());
            }}
            isActing={isActing}
            shellReady={shellReady}
            mockMode={usesMockTransactions}
          />

          {showDeliverables && detail.deliverables ? (
            <section
              id="applicationTransactionDeliverables"
              className="space-y-6 rounded-[1.5rem] border border-white/8 bg-[rgba(5,10,20,0.88)] px-4 py-5"
            >
              <div className="px-2">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Deliverable surfaces</p>
                <h3 className="mt-2 text-lg font-semibold text-white">Deliverables attached to this transaction</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  Pull requests, reviews, issues, comments, and summary text stay attached to the selected transaction in
                  both mock and live posture.
                </p>
              </div>
              <DeliverablesDocPanel
                deliverables={detail.deliverables}
                summaryOpen={summaryOpen}
                onToggleSummary={() => setSummaryOpen((current) => !current)}
              />
              <DeliverablesCardsPanel
                deliverables={{
                  pullRequest: detail.deliverables.pullRequest ?? null,
                  pullRequestReviews: detail.deliverables.pullRequestReviews ?? null,
                  comments: detail.deliverables.comments ?? null,
                  issues: detail.deliverables.issues ?? null,
                }}
              />
            </section>
          ) : showDeliverables ? (
            <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5 text-sm leading-6 text-neutral-300">
              No materialized deliverable surfaces are attached to this transaction yet. The same detail workspace still
              keeps proofs, history, and closure reading available.
            </div>
          ) : null}
        </div>

        <div className="space-y-5">
          {showTransaction ? (
            <ApplicationTransactionIdentityCard
              startedAt={formatRunTimestamp(selectedRun.created_at)}
              rows={identityRows}
              payload={transactionPayload}
            />
          ) : null}

          {showClosure ? (
            <ApplicationTransactionClosureCard
              rows={closureRows}
              settlementMetrics={closureFollowThrough.settlementMetrics}
              branchArtifacts={closureFollowThrough.branchArtifacts}
              payload={closurePayload}
              onOpenVerification={() => jumpToShellSection('panelEvaluations')}
              onOpenBranch={() => jumpToShellSection('panelBranchArtifacts')}
              onOpenSettlement={() => jumpToShellSection('panelSettlement')}
            />
          ) : null}

          {showProofs ? (
            <ApplicationTransactionProofsCard
              proofFamilies={closureFollowThrough.proofFamilies}
              onOpenVerification={() => jumpToShellSection('panelEvaluations')}
              onOpenSettlement={() => jumpToShellSection('panelSettlement')}
              payload={proofsPayload}
            />
          ) : null}

          {showHistory ? (
            <ApplicationTransactionHistoryCard
              recentHistory={closureFollowThrough.recentHistory}
              onOpenHistory={() => jumpToShellSection('panelLedger')}
              payload={historyPayload}
            />
          ) : null}
        </div>
      </div>

      {showActivity ? (
        <ApplicationTransactionActivitySurface
          selectedRun={selectedRun}
          transactionDataMode={transactionDataMode}
        />
      ) : null}

      {showConsole ? (
        <section className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-[rgba(5,9,18,0.9)]">
          <div className="border-b border-white/8 px-5 py-4">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Compatibility console</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Detailed execution console</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-300">
              Use this lower execution view when you need compatibility-level detail beyond the main transaction cards.
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
