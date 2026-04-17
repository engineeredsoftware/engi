'use client';

interface ApplicationTransactionIdentityCardProps {
  startedAt: string;
  rows: Array<{ label: string; value: string }>;
}

export default function ApplicationTransactionIdentityCard({
  startedAt,
  rows,
}: ApplicationTransactionIdentityCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5">
      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Selected transaction</p>
      <dl className="mt-3 space-y-3 text-sm">
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
    </div>
  );
}
