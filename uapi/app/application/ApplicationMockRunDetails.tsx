"use client";

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

export default function ApplicationMockRunDetails({ run }: { run: WorkspaceRun }) {
  return (
    <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-[rgba(6,10,20,0.92)] p-5 text-sm text-neutral-200 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-emerald-300/80">Mock transaction detail</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{run.type || 'pipeline:deliverables'}</h3>
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.2em] ${getRunStatusTone(run.status)}`}>
          {run.status || 'running'}
        </span>
      </div>
      <dl className="grid gap-3 text-xs text-neutral-400 sm:grid-cols-2">
        <div>
          <dt className="uppercase tracking-[0.2em] text-neutral-500">Transaction id</dt>
          <dd className="mt-1 font-mono text-neutral-200">{run.id}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-[0.2em] text-neutral-500">Started</dt>
          <dd className="mt-1 text-neutral-200">{formatRunTimestamp(run.created_at)}</dd>
        </div>
        {run.repository ? (
          <div>
            <dt className="uppercase tracking-[0.2em] text-neutral-500">Repository</dt>
            <dd className="mt-1 text-neutral-200">{run.repository}</dd>
          </div>
        ) : null}
        {run.proofStatus ? (
          <div>
            <dt className="uppercase tracking-[0.2em] text-neutral-500">Proof posture</dt>
            <dd className="mt-1 text-neutral-200">{run.proofStatus}</dd>
          </div>
        ) : null}
      </dl>
      <div className="rounded-2xl border border-white/6 bg-black/20 p-4">
        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Summary</p>
        <p className="mt-2 leading-6 text-neutral-200">
          {run.summary || 'Mock mode keeps this inspection surface stable even when real-world runs are unavailable.'}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/6 bg-black/20 p-4">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Carry into V26</p>
          <p className="mt-2 leading-6 text-neutral-200">
            This panel stands in for the inward-ported executions/deliverables detail surface that will live directly inside
            `/application`.
          </p>
        </div>
        <div className="rounded-2xl border border-white/6 bg-black/20 p-4">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Review posture</p>
          <p className="mt-2 leading-6 text-neutral-200">
            Mock mode preserves application inspection quality without claiming live execution provenance.
          </p>
        </div>
      </div>
    </div>
  );
}
