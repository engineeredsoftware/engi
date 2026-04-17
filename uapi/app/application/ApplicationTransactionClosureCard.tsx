'use client';

interface ApplicationTransactionClosureCardProps {
  rows: Array<{ label: string; value: string }>;
  onOpenSettlement: () => void;
  onOpenHistory: () => void;
}

export default function ApplicationTransactionClosureCard({
  rows,
  onOpenSettlement,
  onOpenHistory,
}: ApplicationTransactionClosureCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5">
      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Closure posture</p>
      <dl className="mt-3 space-y-3 text-sm">
        {rows.map((row) => (
          <div key={`${row.label}-${row.value}`}>
            <dt className="text-neutral-500">{row.label}</dt>
            <dd className="mt-1 text-neutral-100">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onOpenSettlement}
          className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/15"
        >
          Open settlement
        </button>
        <button
          type="button"
          onClick={onOpenHistory}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-neutral-200 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
        >
          Open history
        </button>
      </div>
    </div>
  );
}
