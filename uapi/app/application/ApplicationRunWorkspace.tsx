'use client';

import Link from 'next/link';
import { useState } from 'react';

import { ExecutionDetailsView } from '@/app/executions/components/ExecutionsDetailsView';
import DeliverablesCardsPanel from '@/components/base/engi/execution/DeliverablesCardsPanel';
import DeliverablesDocPanel, { type DeliverablesDoc } from '@/components/base/engi/execution/DeliverablesDocPanel';

import ApplicationMockRunDetails from './ApplicationMockRunDetails';
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

function buildMasterDetailSubstructures(selectedRun: WorkspaceRun, mockDeliverables?: DeliverablesDoc | null) {
  const deliverableSurfaceCount = countDeliverableSurfaces(mockDeliverables) || selectedRun.itemCount || 0;

  return MASTER_DETAIL_SUBSTRUCTURES.map((substructure) => {
    if (substructure.id === 'runs') {
      return {
        ...substructure,
        summary:
          selectedRun.summary || 'This selected run is the active master-detail detail surface inside the Bitcode application.',
        metrics: [
          { label: 'Status', value: selectedRun.status || 'running' },
          { label: 'Started', value: formatRunTimestamp(selectedRun.created_at) },
        ],
        rows: [
          { label: 'Run id', value: selectedRun.id },
          ...(selectedRun.repository ? [{ label: 'Repository', value: selectedRun.repository }] : []),
          ...(selectedRun.branch ? [{ label: 'Branch', value: selectedRun.branch }] : []),
        ],
      };
    }

    if (substructure.id === 'deliverables') {
      return {
        ...substructure,
        summary:
          mockDeliverables?.summary ||
          'Deliverable surfaces stay inside the selected run context so the operator can inspect output without leaving `/application`.',
        metrics: [
          { label: 'Surfaced outputs', value: formatNumber(deliverableSurfaceCount) },
          { label: 'Closure focus', value: selectedRun.closureFocus || 'materialized output' },
        ],
        rows: [
          ...(mockDeliverables?.pullRequest ? [{ label: 'Pull request', value: `#${mockDeliverables.pullRequest.number}` }] : []),
          ...(mockDeliverables?.pullRequestReviews ? [{ label: 'Reviews', value: formatNumber(mockDeliverables.pullRequestReviews.length) }] : []),
          ...(mockDeliverables?.issues ? [{ label: 'Issues', value: formatNumber(mockDeliverables.issues.length) }] : []),
          ...(mockDeliverables?.comments ? [{ label: 'Comments', value: formatNumber(mockDeliverables.comments.length) }] : []),
        ],
      };
    }

    if (substructure.id === 'proofs') {
      return {
        ...substructure,
        summary:
          selectedRun.proofStatus ||
          'Verification, settlement, and bounded proof remain explicit closure stages of the selected run.',
        metrics: [
          { label: 'Proof posture', value: selectedRun.proofStatus || 'in flight' },
          { label: 'Tokens', value: formatNumber(selectedRun.tokenTotal) },
        ],
        rows: [
          { label: 'Closure focus', value: selectedRun.closureFocus || 'proof-bearing closure' },
          { label: 'Latency', value: selectedRun.averageLatencyMs ? `${formatNumber(selectedRun.averageLatencyMs)} ms` : 'n/a' },
          { label: 'Spend', value: formatUsd(selectedRun.usdTotal) },
        ],
      };
    }

    return {
      ...substructure,
      summary:
        'Run history, ledger reading, and processing posture remain part of the same Bitcode application workspace.',
      metrics: [
        { label: 'History items', value: formatNumber(selectedRun.itemCount) },
        { label: 'Credits', value: formatNumber(selectedRun.creditsTotal, { maximumFractionDigits: 1 }) },
      ],
      rows: [
        ...(selectedRun.repository ? [{ label: 'Repository', value: selectedRun.repository }] : []),
        ...(selectedRun.branch ? [{ label: 'Branch', value: selectedRun.branch }] : []),
        { label: 'Started', value: formatRunTimestamp(selectedRun.created_at) },
      ],
    };
  });
}

interface ApplicationRunWorkspaceProps {
  runs: WorkspaceRun[];
  selectedRun: WorkspaceRun | null;
  isLoadingRuns: boolean;
  runsError: string | null;
  mockMode: boolean;
  onSelectRun: (runId: string) => void;
}

export default function ApplicationRunWorkspace({
  runs,
  selectedRun,
  isLoadingRuns,
  runsError,
  mockMode,
  onSelectRun,
}: ApplicationRunWorkspaceProps) {
  const [summaryOpen, setSummaryOpen] = useState(true);
  const mockDeliverables = selectedRun ? MOCK_RUN_DELIVERABLES[selectedRun.id] : null;
  const masterDetailSubstructures = selectedRun ? buildMasterDetailSubstructures(selectedRun, mockDeliverables) : [];

  return (
    <section
      id="applicationRunWorkspace"
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(6,10,20,0.96),rgba(4,8,16,0.94))] shadow-[0_32px_110px_rgba(0,0,0,0.48)]"
    >
      <div className="border-b border-white/8 px-6 py-5">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">Run workspace</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Master-detail run, deliverable, proof, and history detail
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">
              This is the inward master-detail carrier V26 second-gate calls for. The run selection stays accessible in the
              rail, but the selected run, its deliverables, proof posture, and history now read as one application-owned
              Bitcode workspace.
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
            Loading inward run workspace…
          </div>
        ) : runsError ? (
          <div className="rounded-[1.5rem] border border-red-500/20 bg-red-500/10 px-5 py-5 text-sm text-red-200">
            {runsError}
          </div>
        ) : !selectedRun ? (
          <div className="rounded-[1.5rem] border border-white/6 bg-black/20 px-5 py-10 text-sm text-neutral-400">
            Select a Bitcode run to inspect its application-owned detail surface.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-3 xl:grid-cols-3">
              {runs.slice(0, 3).map((run) => {
                const isSelected = run.id === selectedRun.id;
                return (
                  <button
                    key={run.id}
                    type="button"
                    onClick={() => onSelectRun(run.id)}
                    className={`rounded-[1.5rem] border px-4 py-4 text-left transition ${
                      isSelected
                        ? 'border-emerald-400/35 bg-emerald-400/10'
                        : 'border-white/8 bg-black/20 hover:border-white/16 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{run.type || 'pipeline:deliverables'}</p>
                        <p className="mt-1 text-xs leading-5 text-neutral-400">
                          {run.summary || 'Inspect this run inside the application-owned Bitcode workspace.'}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.18em] ${getRunStatusTone(
                          run.status,
                        )}`}
                      >
                        {run.status || 'running'}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[0.68rem] uppercase tracking-[0.16em] text-neutral-500">
                      <span className="font-mono">{run.id.slice(0, 8)}</span>
                      <span>{formatRunTimestamp(run.created_at)}</span>
                    </div>
                  </button>
                );
              })}
            </div>

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

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)]">
              <div className="min-w-0">
                {mockMode ? <ApplicationMockRunDetails run={selectedRun} /> : <ExecutionDetailsView runId={selectedRun.id} />}
              </div>

              <div className="space-y-5">
                <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5">
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Bitcode inward port</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">Master-detail now lives in the application</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-300">
                    Executions remains available as a compatibility route, but the operator no longer needs to leave
                    `/application` to read the selected run, its deliverable surfaces, or its proof-bearing detail state.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5">
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Selected run</p>
                  <dl className="mt-3 space-y-3 text-sm">
                    <div>
                      <dt className="text-neutral-500">Run id</dt>
                      <dd className="mt-1 font-mono text-neutral-100">{selectedRun.id}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">Started</dt>
                      <dd className="mt-1 text-neutral-100">{formatRunTimestamp(selectedRun.created_at)}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">Summary</dt>
                      <dd className="mt-1 leading-6 text-neutral-200">
                        {selectedRun.summary || 'This run is available for inward application inspection.'}
                      </dd>
                    </div>
                    {selectedRun.repository ? (
                      <div>
                        <dt className="text-neutral-500">Repository</dt>
                        <dd className="mt-1 text-neutral-100">{selectedRun.repository}</dd>
                      </div>
                    ) : null}
                    {selectedRun.branch ? (
                      <div>
                        <dt className="text-neutral-500">Branch</dt>
                        <dd className="mt-1 text-neutral-100">{selectedRun.branch}</dd>
                      </div>
                    ) : null}
                  </dl>
                </div>

                <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5">
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Closure posture</p>
                  <dl className="mt-3 space-y-3 text-sm">
                    <div>
                      <dt className="text-neutral-500">Proof posture</dt>
                      <dd className="mt-1 text-neutral-100">{selectedRun.proofStatus || 'Closure state in flight'}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">Closure focus</dt>
                      <dd className="mt-1 text-neutral-100">{selectedRun.closureFocus || 'Application consequence reading'}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">Token total</dt>
                      <dd className="mt-1 text-neutral-100">{formatNumber(selectedRun.tokenTotal)}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">Spend</dt>
                      <dd className="mt-1 text-neutral-100">{formatUsd(selectedRun.usdTotal)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {mockMode && mockDeliverables ? (
              <div
                id="applicationRunDeliverables"
                className="space-y-6 rounded-[1.5rem] border border-white/8 bg-[rgba(5,10,20,0.88)] px-4 py-5"
              >
                <div className="px-2">
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Deliverable surfaces</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">Inward reuse of deliverable-reading panels</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-300">
                    Mock review keeps the strongest deliverable panels visible here so second-gate can evaluate the
                    application-owned reading flow before production/staging/dev completeness work begins.
                  </p>
                </div>
                <DeliverablesDocPanel
                  deliverables={mockDeliverables}
                  summaryOpen={summaryOpen}
                  onToggleSummary={() => setSummaryOpen((current) => !current)}
                />
                <DeliverablesCardsPanel
                  deliverables={{
                    pullRequest: mockDeliverables.pullRequest ?? null,
                    pullRequestReviews: mockDeliverables.pullRequestReviews ?? null,
                    comments: mockDeliverables.comments ?? null,
                    issues: mockDeliverables.issues ?? null,
                  }}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
