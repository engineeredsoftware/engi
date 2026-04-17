'use client';

import React from 'react';

import type { ApplicationTransactionClosureFollowThrough } from './application-transaction-detail';

interface ApplicationTransactionClosureCardProps {
  rows: Array<{ label: string; value: string }>;
  settlementMetrics: ApplicationTransactionClosureFollowThrough['settlementMetrics'];
  branchArtifacts: ApplicationTransactionClosureFollowThrough['branchArtifacts'];
  onOpenVerification: () => void;
  onOpenBranch: () => void;
  onOpenSettlement: () => void;
}

export default function ApplicationTransactionClosureCard({
  rows,
  settlementMetrics,
  branchArtifacts,
  onOpenVerification,
  onOpenBranch,
  onOpenSettlement,
}: ApplicationTransactionClosureCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5">
      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Closure posture</p>
      <dl className="mt-3 space-y-3 text-sm">
        {rows.map((row) => (
          <div key={`${row.label}-${row.value}`}>
            <dt className="text-neutral-500">{row.label}</dt>
            <dd className="mt-1 text-neutral-100">{row.value}</dd>
          </div>
        ))}
      </dl>

      {settlementMetrics.length ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {settlementMetrics.map((metric) => (
            <div
              key={`${metric.label}-${metric.value}`}
              className="rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4"
            >
              <p className="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">{metric.label}</p>
              <p className="mt-2 text-sm font-semibold text-white">{metric.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      {branchArtifacts.length ? (
        <div className="mt-4 rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4">
          <p className="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">Branch artifacts</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {branchArtifacts.map((artifact) => (
              <span
                key={artifact}
                className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-200"
              >
                {artifact}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onOpenVerification}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-neutral-200 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
        >
          Open verification
        </button>
        <button
          type="button"
          onClick={onOpenBranch}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-neutral-200 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
        >
          Open branch
        </button>
        <button
          type="button"
          onClick={onOpenSettlement}
          className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/15"
        >
          Open settlement
        </button>
      </div>
    </div>
  );
}
