'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import type {
  TransactionFilters,
  TransactionPagination,
} from '@/components/base/engi/execution/bitcode-transaction-types';
import type { DeliverablesDoc } from '@/components/base/engi/execution/DeliverablesDocPanel';

import ApplicationTransactionDetailSurface from './ApplicationTransactionDetailSurface';
import ApplicationTransactionsTable from './ApplicationTransactionsTable';
import type { ApplicationTransactionDetailSection } from './application-transaction-query';
import {
  buildApplicationRunDetailFromSelectedRun,
  normalizeApplicationRunDetailPayload,
  type ApplicationRunDetailSnapshot,
} from './application-transaction-detail-snapshot';
import { MASTER_DETAIL_SUBSTRUCTURES } from './application-experience-architecture';
import { MOCK_RUN_DELIVERABLES, type WorkspaceRun } from './application-run-data';
import { jumpToShellSection } from './application-shell-reading';

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

function getRunStatusTone(status?: string | null) {
  if (status === 'completed') return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200';
  if (status === 'error' || status === 'failed') return 'border-red-500/30 bg-red-500/10 text-red-200';
  return 'border-amber-500/30 bg-amber-500/10 text-amber-100';
}

function formatNumber(value?: number | null, options?: Intl.NumberFormatOptions) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'n/a';
  return new Intl.NumberFormat('en-US', options).format(value);
}

function formatUsd(value?: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'n/a';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

function countDeliverableSurfaces(deliverables?: DeliverablesDoc | null) {
  if (!deliverables) return 0;

  let count = 0;
  if (deliverables.pullRequest) count += 1;
  count += deliverables.pullRequestReviews?.length || 0;
  count += deliverables.issues?.length || 0;
  count += deliverables.comments?.length || 0;

  return count;
}

function buildMasterDetailSubstructures(selectedRun: WorkspaceRun, detail: ApplicationRunDetailSnapshot | null) {
  const deliverableSurfaceCount = countDeliverableSurfaces(detail?.deliverables) || detail?.historyItemCount || selectedRun.itemCount || 0;

  return MASTER_DETAIL_SUBSTRUCTURES.map((substructure) => {
    if (substructure.id === 'transactions') {
      return {
        ...substructure,
        summary:
          detail?.summary ||
          selectedRun.summary ||
          'This selected transaction is the active master-detail detail surface inside the Bitcode application.',
        metrics: [
          { label: 'Status', value: selectedRun.status || 'running' },
          { label: 'Started', value: formatRunTimestamp(selectedRun.created_at) },
        ],
        rows: [
          { label: 'Transaction id', value: selectedRun.id },
          ...(selectedRun.repository ? [{ label: 'Repository', value: selectedRun.repository }] : []),
          ...(selectedRun.branch ? [{ label: 'Branch', value: selectedRun.branch }] : []),
        ],
      };
    }

    if (substructure.id === 'deliverables') {
      return {
        ...substructure,
        summary:
          detail?.deliverables?.summary ||
          'Deliverable surfaces stay inside the selected transaction context so the operator can inspect output without leaving `/application`.',
        metrics: [
          { label: 'Surfaced outputs', value: formatNumber(deliverableSurfaceCount) },
          { label: 'Closure focus', value: detail?.closureFocus || selectedRun.closureFocus || 'materialized output' },
        ],
        rows: [
          ...(detail?.deliverables?.pullRequest ? [{ label: 'Pull request', value: `#${detail.deliverables.pullRequest.number}` }] : []),
          ...(detail?.deliverables?.pullRequestReviews
            ? [{ label: 'Reviews', value: formatNumber(detail.deliverables.pullRequestReviews.length) }]
            : []),
          ...(detail?.deliverables?.issues ? [{ label: 'Issues', value: formatNumber(detail.deliverables.issues.length) }] : []),
          ...(detail?.deliverables?.comments
            ? [{ label: 'Comments', value: formatNumber(detail.deliverables.comments.length) }]
            : []),
        ],
      };
    }

    if (substructure.id === 'proofs') {
      return {
        ...substructure,
        summary:
          detail?.proofStatus ||
          selectedRun.proofStatus ||
          'Verification, settlement, and bounded proof remain explicit closure stages of the selected transaction.',
        metrics: [
          { label: 'Proof posture', value: detail?.proofStatus || selectedRun.proofStatus || 'in flight' },
          { label: 'Tokens', value: formatNumber(detail?.processingStats.tokenTotal ?? selectedRun.tokenTotal) },
        ],
        rows: [
          { label: 'Closure focus', value: detail?.closureFocus || selectedRun.closureFocus || 'proof-bearing closure' },
          {
            label: 'Latency',
            value:
              detail?.processingStats.averageLatencyMs ?? selectedRun.averageLatencyMs
                ? `${formatNumber(detail?.processingStats.averageLatencyMs ?? selectedRun.averageLatencyMs)} ms`
                : 'n/a',
          },
          { label: 'Spend', value: formatUsd(detail?.processingStats.usdTotal ?? selectedRun.usdTotal) },
        ],
      };
    }

    return {
      ...substructure,
      summary:
        'Transaction history, ledger reading, and processing posture remain part of the same Bitcode application workspace.',
      metrics: [
        { label: 'History items', value: formatNumber(detail?.historyItemCount ?? selectedRun.itemCount) },
        {
          label: 'Credits',
          value: formatNumber(detail?.processingStats.credits ?? selectedRun.creditsTotal, { maximumFractionDigits: 1 }),
        },
      ],
      rows: [
        ...(detail?.repoSnapshot
          ? [{ label: 'Repository', value: `${detail.repoSnapshot.org}/${detail.repoSnapshot.repo}` }]
          : selectedRun.repository
            ? [{ label: 'Repository', value: selectedRun.repository }]
            : []),
        ...(detail?.repoSnapshot?.branch
          ? [{ label: 'Branch', value: detail.repoSnapshot.branch }]
          : selectedRun.branch
            ? [{ label: 'Branch', value: selectedRun.branch }]
            : []),
        { label: 'Started', value: formatRunTimestamp(selectedRun.created_at) },
      ],
    };
  });
}

interface ApplicationTransactionWorkspaceProps {
  runs: WorkspaceRun[];
  selectedRun: WorkspaceRun | null;
  filters: TransactionFilters;
  onFiltersChange: (nextFilters: TransactionFilters) => void;
  onResetFilters: () => void;
  pagination: TransactionPagination;
  onPaginationChange: (nextPagination: TransactionPagination) => void;
  detailSection: ApplicationTransactionDetailSection;
  onDetailSectionChange: (detailSection: ApplicationTransactionDetailSection) => void;
  isLoadingRuns: boolean;
  runsError: string | null;
  mockMode: boolean;
  onSelectTransaction: (transactionId: string) => void;
}

export default function ApplicationTransactionWorkspace({
  runs,
  selectedRun,
  filters,
  onFiltersChange,
  onResetFilters,
  pagination,
  onPaginationChange,
  detailSection,
  onDetailSectionChange,
  isLoadingRuns,
  runsError,
  mockMode,
  onSelectTransaction,
}: ApplicationTransactionWorkspaceProps) {
  const mockDeliverables = selectedRun ? MOCK_RUN_DELIVERABLES[selectedRun.id] : null;
  const [runDetail, setRunDetail] = useState<ApplicationRunDetailSnapshot | null>(null);
  const [isLoadingRunDetail, setIsLoadingRunDetail] = useState(false);
  const [runDetailError, setRunDetailError] = useState<string | null>(null);

  useEffect(() => {
    let disposed = false;

    if (!selectedRun) {
      setRunDetail(null);
      setIsLoadingRunDetail(false);
      setRunDetailError(null);
      return () => {
        disposed = true;
      };
    }

    const fallbackDetail = buildApplicationRunDetailFromSelectedRun(selectedRun, mockDeliverables);
    setRunDetail(fallbackDetail);
    setRunDetailError(null);

    if (mockMode) {
      setIsLoadingRunDetail(false);
      return () => {
        disposed = true;
      };
    }

    setIsLoadingRunDetail(true);

    fetch(`/api/executions/history/${selectedRun.id}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Unable to load selected transaction detail (${response.status})`);
        }
        return response.json();
      })
      .then((payload) => {
        if (disposed) return;
        setRunDetail(normalizeApplicationRunDetailPayload(payload, selectedRun, mockDeliverables));
      })
      .catch((error) => {
        if (disposed) return;
        setRunDetail(fallbackDetail);
        setRunDetailError(
          error instanceof Error
            ? `${error.message}. Falling back to the route-owned workspace summary while live detail stays unavailable.`
            : 'Unable to load live selected-transaction detail. Falling back to the route-owned workspace summary.',
        );
      })
      .finally(() => {
        if (!disposed) setIsLoadingRunDetail(false);
      });

    return () => {
      disposed = true;
    };
  }, [mockDeliverables, mockMode, selectedRun]);

  const masterDetailSubstructures = useMemo(
    () => (selectedRun ? buildMasterDetailSubstructures(selectedRun, runDetail) : []),
    [runDetail, selectedRun],
  );

  return (
    <section
      id="applicationTransactionWorkspace"
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(6,10,20,0.96),rgba(4,8,16,0.94))] shadow-[0_32px_110px_rgba(0,0,0,0.48)]"
    >
      <div className="border-b border-white/8 px-6 py-5">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">Transaction workspace</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Master-detail transactions, deliverables, proofs, and history
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">
              This is the inward master-detail carrier V26 second-gate calls for. Bitcode transactions now act as the
              master surface, while the selected transaction, its deliverables, proof posture, and history read as one
              application-owned Bitcode detail workspace.
            </p>
          </div>
          {selectedRun ? (
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full border px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.22em] ${getRunStatusTone(selectedRun.status)}`}
              >
                {selectedRun.status || 'running'}
              </span>
              <Link
                href={`/executions?runId=${encodeURIComponent(selectedRun.id)}`}
                className="rounded-full border border-white/12 bg-white/5 px-3 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-neutral-200 transition hover:border-white/20 hover:bg-white/10"
              >
                Compatibility route
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      <div className="px-6 py-6">
        {isLoadingRuns ? (
          <div className="rounded-[1.5rem] border border-white/6 bg-black/20 px-5 py-10 text-sm text-neutral-400">
            Loading Bitcode transactions…
          </div>
        ) : runsError ? (
          <div className="rounded-[1.5rem] border border-red-500/20 bg-red-500/10 px-5 py-5 text-sm text-red-200">
            {runsError}
          </div>
        ) : !selectedRun ? (
          <div className="rounded-[1.5rem] border border-white/6 bg-black/20 px-5 py-10 text-sm text-neutral-400">
            Select a Bitcode transaction to inspect its application-owned detail surface.
          </div>
        ) : (
          <div className="space-y-6">
            <ApplicationTransactionsTable
              runs={runs}
              selectedTransactionId={selectedRun.id}
              onSelectTransaction={onSelectTransaction}
              filters={filters}
              onFiltersChange={onFiltersChange}
              onResetFilters={onResetFilters}
              pagination={pagination}
              onPaginationChange={onPaginationChange}
              isLoadingRuns={isLoadingRuns}
              runsError={runsError}
              mockMode={mockMode}
            />

            <div className="grid gap-4 2xl:grid-cols-4">
              {masterDetailSubstructures.map((substructure) => (
                <article key={substructure.id} className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.66rem] uppercase tracking-[0.2em] text-emerald-300/75">{substructure.badge}</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{substructure.label}</h3>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-300">
                      substructure
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-neutral-300">{substructure.summary}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {substructure.metrics.map((metric) => (
                      <div
                        key={`${substructure.id}-${metric.label}-${metric.value}`}
                        className="rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4"
                      >
                        <p className="text-[0.64rem] uppercase tracking-[0.16em] text-neutral-500">{metric.label}</p>
                        <p className="mt-2 text-sm font-semibold text-white">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                  {substructure.rows.length ? (
                    <dl className="mt-4 space-y-3 rounded-[1.15rem] border border-white/8 bg-white/5 px-4 py-4 text-sm">
                      {substructure.rows.map((row) => (
                        <div key={`${substructure.id}-${row.label}-${row.value}`}>
                          <dt className="text-neutral-500">{row.label}</dt>
                          <dd className="mt-1 break-words text-neutral-100">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => jumpToShellSection(substructure.targetId)}
                      className="rounded-[1.2rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/15"
                    >
                      Open {substructure.label.toLowerCase()}
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <ApplicationTransactionDetailSurface
              selectedRun={selectedRun}
              detail={runDetail}
              isLoadingDetail={isLoadingRunDetail}
              detailError={runDetailError}
              mockMode={mockMode}
              detailSection={detailSection}
              onDetailSectionChange={onDetailSectionChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}
