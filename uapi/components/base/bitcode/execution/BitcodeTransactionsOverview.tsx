'use client';

import React from 'react';

import {
  getTransactionDataModeDescription,
  getTransactionDataModeLabel,
} from './bitcode-transaction-data-mode';
import type { TransactionDataMode } from './bitcode-transaction-types';

interface BitcodeTransactionsOverviewProps {
  recordCount: number;
  ownTransactionCount: number;
  visibleTokenTotal: number;
  selectedTransactionId: string | null;
  dataMode: TransactionDataMode;
}

export default function BitcodeTransactionsOverview({
  recordCount,
  ownTransactionCount,
  visibleTokenTotal,
  selectedTransactionId,
  dataMode,
}: BitcodeTransactionsOverviewProps) {
  const modeLabel = getTransactionDataModeLabel(dataMode);
  const modeDescription = getTransactionDataModeDescription(dataMode);

  return (
    <>
      <div className="grid gap-3 text-xs uppercase tracking-[0.2em] text-neutral-400 tablet:grid-cols-3">
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
          <p className="text-emerald-300/85">Activity</p>
          <p className="mt-2 text-neutral-100">{recordCount}</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
          <p className="text-emerald-300/85">Own visible</p>
          <p className="mt-2 text-neutral-100">{ownTransactionCount}</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
          <p className="text-emerald-300/85">Visible tokens</p>
          <p className="mt-2 text-neutral-100">{visibleTokenTotal.toLocaleString('en-US')}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-500">
        <span className="cursor-default rounded-[0.65rem] border border-white/8 bg-white/[0.035] px-2.5 py-1">
          selected {selectedTransactionId ? 'activity active' : 'none'}
        </span>
        <span className="cursor-default rounded-[0.65rem] border border-white/8 bg-white/[0.035] px-2.5 py-1">
          mode {modeLabel}
        </span>
        <span className="cursor-default rounded-[0.65rem] border border-white/8 bg-white/[0.035] px-2.5 py-1">
          {modeDescription}
        </span>
        <span className="cursor-default rounded-[0.65rem] border border-white/8 bg-white/[0.035] px-2.5 py-1">
          search spans ids, repos, branches, participants, proof posture, and summaries
        </span>
      </div>
    </>
  );
}
