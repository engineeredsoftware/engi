'use client';

import BitcodePayloadInspector from '@/components/base/engi/execution/BitcodePayloadInspector';

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
  return (
    <BitcodePayloadInspector
      kicker="Selected transaction"
      title="Transaction identity and payload"
      summary="The selected transaction now carries both a compact visual identity read and a raw Bitcode payload view inside the same application-owned detail card."
      payload={payload}
      rawLabel="Transaction payload"
    >
      <dl className="space-y-3 text-sm">
        {rows.map((row) => (
          <div key={`${row.label}-${row.value}`}>
            <dt className="text-neutral-500">{row.label}</dt>
            <dd className="mt-1 break-words text-neutral-100">{row.value}</dd>
          </div>
        ))}
        <div>
          <dt className="text-neutral-500">Started</dt>
          <dd className="mt-1 text-neutral-100">{startedAt}</dd>
        </div>
      </dl>
    </BitcodePayloadInspector>
  );
}
