'use client';

import { useEffect, useState } from 'react';

import { ExecutionDetailsView } from '@/app/executions/components/ExecutionsDetailsView';
import DeliverablesCardsPanel from '@/components/base/engi/execution/DeliverablesCardsPanel';
import DeliverablesDocPanel from '@/components/base/engi/execution/DeliverablesDocPanel';

import ApplicationRunActivitySurface from './ApplicationRunActivitySurface';
import type { ApplicationRunDetailSnapshot } from './application-run-detail';
import type { WorkspaceRun } from './application-run-data';
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

function countDeliverableSurfaces(detail: ApplicationRunDetailSnapshot | null) {
  const deliverables = detail?.deliverables;
  if (!deliverables) return 0;

  let count = 0;
  if (deliverables.pullRequest) count += 1;
  count += deliverables.pullRequestReviews?.length || 0;
  count += deliverables.issues?.length || 0;
  count += deliverables.comments?.length || 0;
  return count;
}

interface ApplicationRunDetailSurfaceProps {
  selectedRun: WorkspaceRun;
  detail: ApplicationRunDetailSnapshot | null;
  isLoadingDetail: boolean;
  detailError: string | null;
  mockMode: boolean;
}

export default function ApplicationRunDetailSurface({
  selectedRun,
  detail,
  isLoadingDetail,
  detailError,
  mockMode,
}: ApplicationRunDetailSurfaceProps) {
  const [summaryOpen, setSummaryOpen] = useState(true);
  const deliverableSurfaceCount = countDeliverableSurfaces(detail) || selectedRun.itemCount || 0;

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

  return (
    <div className="space-y-6">
      {detailError ? (
        <div className="rounded-[1.4rem] border border-amber-500/20 bg-amber-500/10 px-4 py-4 text-sm text-amber-100">
          {detailError}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
        <div className="space-y-5">
          <article className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Application-owned transaction detail</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{selectedRun.type || 'pipeline:deliverables'}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-300">
                  {detail.summary || 'The selected transaction now reads through an inward Bitcode detail carrier inside `/application`.'}
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-200">
                {mockMode ? 'mock review' : 'live detail'}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[1.15rem] border border-white/8 bg-white/5 px-4 py-4">
                <p className="text-[0.64rem] uppercase tracking-[0.16em] text-neutral-500">Deliverable surfaces</p>
                <p className="mt-2 text-sm font-semibold text-white">{formatNumber(deliverableSurfaceCount)}</p>
              </div>
              <div className="rounded-[1.15rem] border border-white/8 bg-white/5 px-4 py-4">
                <p className="text-[0.64rem] uppercase tracking-[0.16em] text-neutral-500">History items</p>
                <p className="mt-2 text-sm font-semibold text-white">{formatNumber(detail.historyItemCount)}</p>
              </div>
              <div className="rounded-[1.15rem] border border-white/8 bg-white/5 px-4 py-4">
                <p className="text-[0.64rem] uppercase tracking-[0.16em] text-neutral-500">Event count</p>
                <p className="mt-2 text-sm font-semibold text-white">{formatNumber(detail.eventCount)}</p>
              </div>
              <div className="rounded-[1.15rem] border border-white/8 bg-white/5 px-4 py-4">
                <p className="text-[0.64rem] uppercase tracking-[0.16em] text-neutral-500">Proof posture</p>
                <p className="mt-2 text-sm font-semibold text-white">{detail.proofStatus || 'closure state in flight'}</p>
              </div>
            </div>
          </article>

          {detail.deliverables ? (
            <section
              id="applicationRunDeliverables"
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
          ) : (
            <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5 text-sm leading-6 text-neutral-300">
              No materialized deliverable surfaces are attached to this selected transaction yet. The transaction still
              remains part of the same master-detail Bitcode workspace for proof and history reading.
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Selected run</p>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-neutral-500">Transaction id</dt>
                <dd className="mt-1 font-mono text-neutral-100">{selectedRun.id}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Started</dt>
                <dd className="mt-1 text-neutral-100">{formatRunTimestamp(selectedRun.created_at)}</dd>
              </div>
              {detail.repoSnapshot ? (
                <>
                  <div>
                    <dt className="text-neutral-500">Repository</dt>
                    <dd className="mt-1 text-neutral-100">{`${detail.repoSnapshot.org}/${detail.repoSnapshot.repo}`}</dd>
                  </div>
                  <div>
                    <dt className="text-neutral-500">Branch</dt>
                    <dd className="mt-1 text-neutral-100">{detail.repoSnapshot.branch || 'n/a'}</dd>
                  </div>
                  <div>
                    <dt className="text-neutral-500">Commit</dt>
                    <dd className="mt-1 font-mono text-neutral-100">{detail.repoSnapshot.commit || 'n/a'}</dd>
                  </div>
                </>
              ) : null}
            </dl>
          </div>

          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Closure posture</p>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-neutral-500">Proof posture</dt>
                <dd className="mt-1 text-neutral-100">{detail.proofStatus || 'closure state in flight'}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Closure focus</dt>
                <dd className="mt-1 text-neutral-100">{detail.closureFocus || 'application consequence reading'}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Processing time</dt>
                <dd className="mt-1 text-neutral-100">{detail.processingStats.time || 'n/a'}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Token total</dt>
                <dd className="mt-1 text-neutral-100">{formatNumber(detail.processingStats.tokenTotal)}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Credits</dt>
                <dd className="mt-1 text-neutral-100">{formatNumber(detail.processingStats.credits, { maximumFractionDigits: 1 })}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Spend</dt>
                <dd className="mt-1 text-neutral-100">{formatUsd(detail.processingStats.usdTotal)}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Latency</dt>
                <dd className="mt-1 text-neutral-100">
                  {detail.processingStats.averageLatencyMs
                    ? `${formatNumber(detail.processingStats.averageLatencyMs)} ms`
                    : 'n/a'}
                </dd>
              </div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => jumpToShellSection('panelSettlement')}
                className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/15"
              >
                Open settlement
              </button>
              <button
                type="button"
                onClick={() => jumpToShellSection('panelLedger')}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-neutral-200 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
              >
                Open history
              </button>
            </div>
          </div>
        </div>
      </div>

      <ApplicationRunActivitySurface selectedRun={selectedRun} mockMode={mockMode} />

      {!mockMode ? (
        <section className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-[rgba(5,9,18,0.9)]">
          <div className="border-b border-white/8 px-5 py-4">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Compatibility console</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Detailed execution console</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-300">
              This remains available during second-gate convergence, but it is now secondary to the application-owned run
              detail surface above.
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
