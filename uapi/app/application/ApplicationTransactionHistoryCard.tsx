'use client';

import React from 'react';

import BitcodePayloadCollectionCard from '@/components/base/bitcode/execution/BitcodePayloadCollectionCard';

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
    <BitcodePayloadCollectionCard
      kicker="History"
      title="Recent transaction history stays inline"
      summary="Ledger-linked run history remains part of the same transaction detail space so consequence reading does not fragment into a separate route."
      payload={payload}
      rawLabel="History payload"
      items={historyItems}
      actions={[{ label: 'Open history', onClick: onOpenHistory }]}
      emptyMessage="No recent history is surfaced on the selected transaction yet. The ledger and bounded proof chain remain part of the same Bitcode detail path."
    />
  );
}
