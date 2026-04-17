'use client';

import React from 'react';

import BitcodePayloadInspector from '@/components/base/engi/execution/BitcodePayloadInspector';

import type { ApplicationClosureHistoryEntry } from './application-closure-state';

interface ApplicationTransactionHistoryCardProps {
  recentHistory: ApplicationClosureHistoryEntry[];
  onOpenHistory: () => void;
  payload: unknown;
}

export default function ApplicationTransactionHistoryCard({
  recentHistory,
  onOpenHistory,
  payload,
}: ApplicationTransactionHistoryCardProps) {
  return (
    <BitcodePayloadInspector
      kicker="History"
      title="Recent transaction history stays inline"
      summary="Ledger-linked run history remains part of the same transaction detail space so consequence reading does not fragment into a separate route."
      payload={payload}
      rawLabel="History payload"
    >
      <>
        {recentHistory.length ? (
          <div className="space-y-3 text-sm">
            {recentHistory.map((entry) => (
              <div
                key={`${entry.label}-${entry.summary}`}
                className="rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4"
              >
                <p className="font-medium text-white">{entry.label}</p>
                <p className="mt-1 text-neutral-300">{entry.summary}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-neutral-300">
            No recent history is surfaced on the selected transaction yet. The ledger and bounded proof chain remain part
            of the same Bitcode detail path.
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onOpenHistory}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-neutral-200 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
          >
            Open history
          </button>
        </div>
      </>
    </BitcodePayloadInspector>
  );
}
