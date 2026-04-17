'use client';

import { useEffect, useMemo, useState } from 'react';

import { ExecutionDetailsView } from '@/app/executions/components/ExecutionsDetailsView';
import DeliverablesCardsPanel from '@/components/base/engi/execution/DeliverablesCardsPanel';
import DeliverablesDocPanel from '@/components/base/engi/execution/DeliverablesDocPanel';

import ApplicationTransactionDetailActionBar from './ApplicationTransactionDetailActionBar';
import ApplicationTransactionActivitySurface from './ApplicationTransactionActivitySurface';
import type { ApplicationTransactionDetailSection } from './application-transaction-query';
import type { ApplicationRunDetailSnapshot } from './application-transaction-detail-snapshot';
import type { WorkspaceRun } from './application-run-data';
import ApplicationTransactionClosureCard from './ApplicationTransactionClosureCard';
import ApplicationTransactionDetailHero from './ApplicationTransactionDetailHero';
import ApplicationTransactionIdentityCard from './ApplicationTransactionIdentityCard';
import {
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
  mockMode: boolean;
  detailSection: ApplicationTransactionDetailSection;
  onDetailSectionChange: (detailSection: ApplicationTransactionDetailSection) => void;
}

export default function ApplicationTransactionDetailSurface({
  selectedRun,
  detail,
  isLoadingDetail,
  detailError,
  mockMode,
  detailSection,
  onDetailSectionChange,
}: ApplicationTransactionDetailSurfaceProps) {
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [isActing, setIsActing] = useState(false);
  const { runControl, controls } = useApplicationShellBridge();

  useEffect(() => {
    setSummaryOpen(true);
  }, [selectedRun.id]);

  if (isLoadingDetail && !detail) {
    return (
      <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-10 text-sm text-neutral-400">
        Loading application-owned transaction detail…
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
  const shellReady = Boolean(controls);

  const handleClosureAction = async (callback: Parameters<typeof runControl>[0]) => {
    setIsActing(true);
    try {
      await runControl(callback);
    } finally {
      setIsActing(false);
    }
  };

  const showDeliverables = detailSection === 'deliverables';
  const showIdentity = detailSection === 'identity';
  const showClosure = detailSection === 'closure';
  const showActivity = detailSection === 'activity';
  const showConsole = detailSection === 'console' && !mockMode;

  const sectionSummary = useMemo(() => {
    const normalizedSummary =
      detail.summary || 'The selected transaction now reads through an inward Bitcode detail carrier inside `/application`.';

    if (showIdentity) return `${normalizedSummary} Identity, repository, and timing posture are the active detail focus.`;
    if (showClosure) return `${normalizedSummary} Closure proof, settlement follow-through, and re-run controls are the active detail focus.`;
    if (showActivity) return `${normalizedSummary} Activity streaming, work updates, and retained execution posture are the active detail focus.`;
    if (showConsole) return `${normalizedSummary} Compatibility execution console remains available as the active detail focus during second-gate convergence.`;
    return `${normalizedSummary} Deliverables, reviews, issues, comments, and summary text are the active detail focus.`;
  }, [detail.summary, showActivity, showClosure, showConsole, showIdentity]);

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
            modeLabel={mockMode ? 'mock review' : 'live detail'}
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
            mockMode={mockMode}
          />

          {showDeliverables && detail.deliverables ? (
            <section
              id="applicationTransactionDeliverables"
              className="space-y-6 rounded-[1.5rem] border border-white/8 bg-[rgba(5,10,20,0.88)] px-4 py-5"
            >
              <div className="px-2">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Deliverable surfaces</p>
                <h3 className="mt-2 text-lg font-semibold text-white">Transaction outputs stay inside `/application`</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  Pull requests, reviews, issues, comments, and summary text now read through the application-owned detail
                  carrier in both mock and live posture.
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
              No materialized deliverable surfaces are attached to this selected transaction yet. The transaction still
              remains part of the same master-detail Bitcode workspace for proof and history reading.
            </div>
          ) : null}
        </div>

        <div className="space-y-5">
          {showIdentity ? (
            <ApplicationTransactionIdentityCard
              startedAt={formatRunTimestamp(selectedRun.created_at)}
              rows={identityRows}
            />
          ) : null}

          {showClosure ? (
            <ApplicationTransactionClosureCard
              rows={closureRows}
              onOpenSettlement={() => jumpToShellSection('panelSettlement')}
              onOpenHistory={() => jumpToShellSection('panelLedger')}
            />
          ) : null}
        </div>
      </div>

      {showActivity ? <ApplicationTransactionActivitySurface selectedRun={selectedRun} mockMode={mockMode} /> : null}

      {showConsole ? (
        <section className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-[rgba(5,9,18,0.9)]">
          <div className="border-b border-white/8 px-5 py-4">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Compatibility console</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Detailed execution console</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-300">
              This remains available during second-gate convergence, but it is now secondary to the application-owned
              transaction detail surface above.
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
