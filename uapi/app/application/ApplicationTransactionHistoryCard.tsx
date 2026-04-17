'use client';

import React from 'react';

import BitcodeDetailCollection from '@/components/base/engi/execution/BitcodeDetailCollection';
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
  const historyItems = recentHistory.map((entry) => ({
    id: `${entry.label}-${entry.summary}`,
    title: entry.label,
    summary: entry.summary,
  }));

  return (
    <BitcodePayloadInspector
      kicker="History"
      title="Recent transaction history stays inline"
      summary="Ledger-linked run history remains part of the same transaction detail space so consequence reading does not fragment into a separate route."
      payload={payload}
      rawLabel="History payload"
    >
      <>
        <BitcodeDetailCollection
          items={historyItems}
          emptyMessage="No recent history is surfaced on the selected transaction yet. The ledger and bounded proof chain remain part of the same Bitcode detail path."
        />

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
