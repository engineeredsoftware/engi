'use client';

import React from 'react';

import BitcodeDetailCollection from '@/components/base/engi/execution/BitcodeDetailCollection';
import BitcodePayloadDetailCard from '@/components/base/engi/execution/BitcodePayloadDetailCard';

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
    <BitcodePayloadDetailCard
      kicker="History"
      title="Recent transaction history stays inline"
      summary="Ledger-linked run history remains part of the same transaction detail space so consequence reading does not fragment into a separate route."
      payload={payload}
      rawLabel="History payload"
      actions={[{ label: 'Open history', onClick: onOpenHistory }]}
    >
      <>
        <BitcodeDetailCollection
          items={historyItems}
          emptyMessage="No recent history is surfaced on the selected transaction yet. The ledger and bounded proof chain remain part of the same Bitcode detail path."
        />
      </>
    </BitcodePayloadDetailCard>
  );
}
