'use client';

import Link from 'next/link';
import { useState } from 'react';

import { ExecutionDetailsView } from '@/app/executions/components/ExecutionsDetailsView';
import DeliverablesCardsPanel from '@/components/base/engi/execution/DeliverablesCardsPanel';
import DeliverablesDocPanel from '@/components/base/engi/execution/DeliverablesDocPanel';

import ApplicationMockRunDetails from './ApplicationMockRunDetails';
import { MOCK_RUN_DELIVERABLES, type WorkspaceRun } from './application-run-data';

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

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(6,10,20,0.96),rgba(4,8,16,0.94))] shadow-[0_32px_110px_rgba(0,0,0,0.48)]">
      <div className="border-b border-white/8 px-6 py-5">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">Run workspace</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Application-owned run and deliverable detail</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">
              This is the inward master-detail carrier V26 second-gate calls for. The run selection stays accessible in the
              rail, but the real inspection surface now lives inside `/application`.
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
                  </dl>
                </div>
              </div>
            </div>

            {mockMode && mockDeliverables ? (
              <div className="space-y-6 rounded-[1.5rem] border border-white/8 bg-[rgba(5,10,20,0.88)] px-4 py-5">
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
