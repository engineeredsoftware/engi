'use client';

import React from 'react';

import BitcodePayloadRowsCard from '@/components/base/engi/execution/BitcodePayloadRowsCard';

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
      summary="The selected transaction now carries both a compact visual identity read and a raw Bitcode payload view inside the same application-owned detail card."
      payload={payload}
      rawLabel="Transaction payload"
      rows={identityRows}
    />
  );
}
