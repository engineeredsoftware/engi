'use client';

import React from 'react';

import BitcodeChipCloud from '@/components/base/engi/execution/BitcodeChipCloud';
import BitcodeDetailRowList from '@/components/base/engi/execution/BitcodeDetailRowList';
import BitcodeMetricGrid from '@/components/base/engi/execution/BitcodeMetricGrid';
import BitcodePayloadInspector from '@/components/base/engi/execution/BitcodePayloadInspector';

import type { ApplicationTransactionClosureFollowThrough } from './application-transaction-detail';

interface ApplicationTransactionClosureCardProps {
  rows: Array<{ label: string; value: string }>;
  settlementMetrics: ApplicationTransactionClosureFollowThrough['settlementMetrics'];
  branchArtifacts: ApplicationTransactionClosureFollowThrough['branchArtifacts'];
  payload: unknown;
  onOpenVerification: () => void;
  onOpenBranch: () => void;
  onOpenSettlement: () => void;
}

export default function ApplicationTransactionClosureCard({
  rows,
  settlementMetrics,
  branchArtifacts,
  payload,
  onOpenVerification,
  onOpenBranch,
  onOpenSettlement,
}: ApplicationTransactionClosureCardProps) {
  return (
    <BitcodePayloadInspector
      kicker="Closure posture"
      title="Closure summary, settlement, and branch follow-through"
      summary="Closure now stays inspectable inside the selected transaction with the same visual-versus-raw posture used for identity, proofs, and history."
      payload={payload}
      rawLabel="Closure payload"
    >
      <>
        <BitcodeDetailRowList rows={rows} />

        {settlementMetrics.length ? (
          <BitcodeMetricGrid metrics={settlementMetrics} className="mt-4" columnsClassName="sm:grid-cols-2" />
        ) : null}

        {branchArtifacts.length ? (
          <div className="mt-4 rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4">
            <p className="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">Branch artifacts</p>
            <BitcodeChipCloud chips={branchArtifacts} className="mt-3" />
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
      </>
    </BitcodePayloadInspector>
  );
}
