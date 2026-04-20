'use client';

import React from 'react';

import BitcodePayloadRowsCard from '@/components/base/bitcode/execution/BitcodePayloadRowsCard';

interface ApplicationTransactionIdentityCardProps {
  startedAt: string;
  rows: Array<{ label: string; value: string }>;
  payload: unknown;
}

export default function ApplicationTransactionIdentityCard({
  startedAt,
  rows,
  payload,
}: ApplicationTransactionIdentityCardProps) {
  const identityRows = [...rows, { label: 'Started', value: startedAt }];

  return (
    <BitcodePayloadRowsCard
      kicker="Selected transaction"
      title="Transaction identity and payload"
      summary="Read the transaction identity in one compact card, then switch straight into the raw Bitcode payload when you need the underlying shape."
      payload={payload}
      rawLabel="Transaction payload"
      rows={identityRows}
    />
  );
}
