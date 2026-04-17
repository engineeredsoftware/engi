"use client";

import { openOrbital } from '@/app/orbitals/components/OrbitalsProvider';
import { ExecutionDetailsView } from '@/app/executions/components/ExecutionsDetailsView';

import ApplicationMockRunDetails from './ApplicationMockRunDetails';
import type { WorkspaceRun } from './application-run-data';

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

interface ApplicationWorkspaceRailProps {
  onOpenConversations: () => void;
  runs: WorkspaceRun[];
  isLoadingRuns: boolean;
  runsError: string | null;
  selectedRun: WorkspaceRun | null;
  onSelectRun: (runId: string) => void;
  mockMode: boolean;
}

export default function ApplicationWorkspaceRail({
  onOpenConversations,
  runs,
  isLoadingRuns,
  runsError,
  selectedRun,
  onSelectRun,
  mockMode,
}: ApplicationWorkspaceRailProps) {
  return (
    <div className="space-y-5 xl:sticky xl:top-40">
      <section className="overflow-hidden rounded-[1.75rem] border border-emerald-400/15 bg-[linear-gradient(180deg,rgba(8,14,28,0.96),rgba(4,8,18,0.94))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-emerald-300/80">Application control</p>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">Primary Bitcode surface</h2>
        <p className="mt-3 text-sm leading-6 text-neutral-300">
          `/application` carries the operating workspace. Conversations and orbitals are entered from here, while run and
          deliverable inspection is being ported inward as master-detail behavior.
        </p>
        <div className="mt-5 grid gap-3">
          <button
            type="button"
            onClick={onOpenConversations}
            className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-left text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
          >
            Open conversations fullscreen
          </button>
          <button
            type="button"
            onClick={() => openOrbital('account')}
            className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-left text-sm font-medium text-neutral-100 transition hover:border-white/20 hover:bg-white/10"
          >
            Open orbitals settings
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[rgba(6,10,20,0.92)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-neutral-400">Run inspector</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Recent Bitcode runs</h3>
          </div>
          {mockMode ? (
            <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-emerald-200">
              mock
            </span>
          ) : null}
        </div>

        <div className="mt-4 space-y-3">
          {isLoadingRuns ? (
            <div className="rounded-2xl border border-white/6 bg-black/20 px-4 py-6 text-sm text-neutral-400">
              Loading recent runs…
            </div>
          ) : runsError ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-200">
              {runsError}
            </div>
          ) : runs.length === 0 ? (
            <div className="rounded-2xl border border-white/6 bg-black/20 px-4 py-6 text-sm text-neutral-400">
              No runs available yet for this application context.
            </div>
          ) : (
            <div className="space-y-2">
              {runs.slice(0, 6).map((run) => {
                const isSelected = run.id === selectedRun?.id;
                return (
                  <button
                    key={run.id}
                    type="button"
                    onClick={() => onSelectRun(run.id)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      isSelected
                        ? 'border-emerald-400/35 bg-emerald-400/10'
                        : 'border-white/6 bg-black/20 hover:border-white/15 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{run.type || 'pipeline:deliverables'}</p>
                        <p className="mt-1 text-xs leading-5 text-neutral-400">
                          {run.summary || 'Open this run to inspect logs, work updates, and resulting deliverable surfaces.'}
                        </p>
                      </div>
                      <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.18em] ${getRunStatusTone(run.status)}`}>
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
          )}
        </div>
      </section>

      {selectedRun ? (
        mockMode ? (
          <ApplicationMockRunDetails run={selectedRun} />
        ) : (
          <section className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[rgba(6,10,20,0.92)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Detail surface</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Run detail and deliverable inspection</h3>
            <div className="mt-4">
              <ExecutionDetailsView runId={selectedRun.id} />
            </div>
          </section>
        )
      ) : null}
    </div>
  );
}
