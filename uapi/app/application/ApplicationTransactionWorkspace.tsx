'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import {
  getTransactionDataModeLabel,
  isMockTransactionDataMode,
} from '@/components/base/bitcode/execution/bitcode-transaction-data-mode';
import BitcodeDetailPanel from '@/components/base/bitcode/execution/BitcodeDetailPanel';
import type {
  TransactionDataMode,
  TransactionFilters,
  TransactionPagination,
} from '@/components/base/bitcode/execution/bitcode-transaction-types';
import type { ShippablesDoc } from '@/components/base/bitcode/execution/ShippablesDocPanel';
import type { BitcodeDetailRow } from '@/components/base/bitcode/execution/BitcodeDetailRowList';
import type { BitcodeMetric } from '@/components/base/bitcode/execution/BitcodeMetricGrid';

import ApplicationTransactionDetailSurface from './ApplicationTransactionDetailSurface';
import type { ApplicationActivityRecordDraft } from './application-activity-history';
import ApplicationTransactionsTable from './ApplicationTransactionsTable';
import type { ApplicationTransactionDetailSection } from './application-transaction-query';
import {
  buildApplicationRunDetailFromSelectedRun,
  normalizeApplicationRunDetailPayload,
  type ApplicationRunDetailSnapshot,
} from './application-transaction-detail-snapshot';
import { MASTER_DETAIL_SUBSTRUCTURES } from './application-experience-architecture';
import { APPLICATION_SURFACE_COPY } from './application-workspace-copy';
import { MOCK_RUN_ASSET_PACK_SURFACES, type WorkspaceRun } from './application-run-data';
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

function countShippableSurfaces(shippables?: ShippablesDoc | null) {
  if (!shippables) return 0;

  let count = 0;
  if (shippables.pullRequest) count += 1;
  count += shippables.pullRequestReviews?.length || 0;
  count += shippables.issues?.length || 0;
  count += shippables.comments?.length || 0;

  return count;
}

type ApplicationMasterDetailSubstructure = (typeof MASTER_DETAIL_SUBSTRUCTURES)[number] & {
  summary: string;
  metrics: BitcodeMetric[];
  rows: BitcodeDetailRow[];
};

function buildMasterDetailSubstructures(
  selectedRun: WorkspaceRun,
  detail: ApplicationRunDetailSnapshot | null,
): ApplicationMasterDetailSubstructure[] {
  const writtenAssets = detail?.writtenAssets || detail?.deliverables || null;
  const deliveryMechanism = detail?.shippables || detail?.deliveryMechanism || detail?.deliverables || writtenAssets;
  const mergedAssetPackSurface = {
    pullRequest: deliveryMechanism?.pullRequest ?? writtenAssets?.pullRequest ?? null,
    pullRequestReviews: deliveryMechanism?.pullRequestReviews ?? writtenAssets?.pullRequestReviews ?? null,
    comments: deliveryMechanism?.comments ?? writtenAssets?.comments ?? null,
    issues: deliveryMechanism?.issues ?? writtenAssets?.issues ?? null,
    fileChanges: writtenAssets?.fileChanges ?? deliveryMechanism?.fileChanges ?? null,
    summary: writtenAssets?.summary ?? deliveryMechanism?.summary ?? null,
  };
  const shippableSurfaceCount =
    countShippableSurfaces(deliveryMechanism || writtenAssets) ||
    detail?.historyItemCount ||
    selectedRun.itemCount ||
    0;

  return MASTER_DETAIL_SUBSTRUCTURES.map((substructure) => {
    if (substructure.id === 'transactions') {
      return {
        ...substructure,
        summary:
          detail?.summary ||
          selectedRun.summary ||
          'This selected Bitcode activity is the active detail surface inside the Bitcode Terminal.',
        metrics: [
          { label: 'Status', value: selectedRun.status || 'running' },
          { label: 'Started', value: formatRunTimestamp(selectedRun.created_at) },
        ],
        rows: [
          { label: 'Activity id', value: selectedRun.id },
          ...(selectedRun.repository ? [{ label: 'Repository', value: selectedRun.repository }] : []),
          ...(selectedRun.branch ? [{ label: 'Branch', value: selectedRun.branch }] : []),
        ],
      };
    }

    if (substructure.id === 'shippables') {
      return {
        ...substructure,
        summary:
          mergedAssetPackSurface.summary ||
          'Finish-delivered Shippables and AssetPack evidence stay inside the selected Bitcode activity context so you can inspect output without leaving the Bitcode Terminal.',
        metrics: [
          { label: 'Shippables', value: formatNumber(shippableSurfaceCount) },
          { label: 'Closure focus', value: detail?.closureFocus || selectedRun.closureFocus || 'materialized output' },
        ],
        rows: [
          ...(mergedAssetPackSurface.pullRequest
            ? [{ label: 'Pull request', value: `#${mergedAssetPackSurface.pullRequest.number}` }]
            : []),
          ...(mergedAssetPackSurface.pullRequestReviews
            ? [{ label: 'Reviews', value: formatNumber(mergedAssetPackSurface.pullRequestReviews.length) }]
            : []),
          ...(mergedAssetPackSurface.issues
            ? [{ label: 'Issues', value: formatNumber(mergedAssetPackSurface.issues.length) }]
            : []),
          ...(mergedAssetPackSurface.comments
            ? [{ label: 'Comments', value: formatNumber(mergedAssetPackSurface.comments.length) }]
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
          'Verification, settlement, and bounded proof remain explicit closure stages of the selected Bitcode activity.',
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
        'Activity history, ledger reading, and processing posture remain part of the same Bitcode Terminal surface.',
      metrics: [
        { label: 'History items', value: formatNumber(detail?.historyItemCount ?? selectedRun.itemCount) },
        {
          label: 'BTD throughput',
          value: formatNumber(detail?.processingStats.btdUsed ?? selectedRun.btdUsed, { maximumFractionDigits: 1 }),
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
  transactionDataMode: TransactionDataMode;
  onSelectTransaction: (transactionId: string) => void;
  onRecordActivity?: (draft: ApplicationActivityRecordDraft) => Promise<unknown>;
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
  transactionDataMode,
  onSelectTransaction,
  onRecordActivity,
}: ApplicationTransactionWorkspaceProps) {
  const mockAssetPackSurface = selectedRun ? MOCK_RUN_ASSET_PACK_SURFACES[selectedRun.id] : null;
  const usesMockTransactions = isMockTransactionDataMode(transactionDataMode);
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

    const fallbackDetail = buildApplicationRunDetailFromSelectedRun(selectedRun, mockAssetPackSurface);
    setRunDetail(fallbackDetail);
    setRunDetailError(null);

    if (usesMockTransactions || selectedRun.sourceModel === 'protocol-projection') {
      setIsLoadingRunDetail(false);
      setRunDetailError(null);
      return () => {
        disposed = true;
      };
    }

    setIsLoadingRunDetail(true);

    fetch(`/api/executions/history/${selectedRun.id}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Unable to load selected Bitcode activity detail (${response.status})`);
        }
        return response.json();
      })
      .then((payload) => {
        if (disposed) return;
        setRunDetail(normalizeApplicationRunDetailPayload(payload, selectedRun, mockAssetPackSurface));
      })
      .catch((error) => {
        if (disposed) return;
        setRunDetail(fallbackDetail);
        setRunDetailError(
          error instanceof Error
            ? `${error.message}. Falling back to the activity summary while live detail stays unavailable.`
            : 'Unable to load live selected activity detail. Falling back to the activity summary.',
        );
      })
      .finally(() => {
        if (!disposed) setIsLoadingRunDetail(false);
      });

    return () => {
      disposed = true;
    };
  }, [mockAssetPackSurface, selectedRun, usesMockTransactions]);

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
          <div className="max-w-4xl">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">Bitcode Terminal</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Master-detail activity, asset packs, proofs, and history
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">
              Use the central ledger as the main read surface: select Bitcode activity, inspect its asset packs,
              proofs, and history, and keep the full operating chain readable without leaving the page.
            </p>
          </div>
          {selectedRun ? (
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full border px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.22em] ${getRunStatusTone(selectedRun.status)}`}
              >
                {selectedRun.status || 'running'}
              </span>
              <span className="rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-neutral-200">
                {getTransactionDataModeLabel(transactionDataMode)}
              </span>
              <Link
                href={`/application?transactionId=${encodeURIComponent(selectedRun.id)}&transactionDetail=activity`}
                className="rounded-full border border-white/12 bg-white/5 px-3 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-neutral-200 transition hover:border-white/20 hover:bg-white/10"
              >
                Open in Bitcode Terminal
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      <div className="px-6 py-6">
        {isLoadingRuns ? (
          <div className="rounded-[1.5rem] border border-white/6 bg-black/20 px-5 py-10 text-sm text-neutral-400">
            Loading Bitcode Terminal…
          </div>
        ) : runsError ? (
          <div className="rounded-[1.5rem] border border-red-500/20 bg-red-500/10 px-5 py-5 text-sm text-red-200">
            {runsError}
          </div>
        ) : !selectedRun ? (
          <div className="rounded-[1.5rem] border border-white/6 bg-black/20 px-5 py-10 text-sm text-neutral-400">
            {APPLICATION_SURFACE_COPY.detail.emptySelection}
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
              transactionDataMode={transactionDataMode}
            />

            <div className="grid gap-4 2xl:grid-cols-4">
              {masterDetailSubstructures.map((substructure) => (
                <BitcodeDetailPanel
                  key={substructure.id}
                  badge={substructure.badge}
                  title={substructure.label}
                  summary={substructure.summary}
                  metrics={substructure.metrics}
                  rows={substructure.rows}
                  tagLabel="substructure"
                  actionLabel={`Open ${substructure.label.toLowerCase()}`}
                  onAction={() => jumpToShellSection(substructure.targetId)}
                />
              ))}
            </div>

            <ApplicationTransactionDetailSurface
              selectedRun={selectedRun}
              detail={runDetail}
              isLoadingDetail={isLoadingRunDetail}
              detailError={runDetailError}
              transactionDataMode={transactionDataMode}
              detailSection={detailSection}
              onDetailSectionChange={onDetailSectionChange}
              onRecordActivity={onRecordActivity}
            />
          </div>
        )}
      </div>
    </section>
  );
}
