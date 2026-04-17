'use client';

import BitcodeChipCloud from '@/components/base/engi/execution/BitcodeChipCloud';
import BitcodeDetailRowList from '@/components/base/engi/execution/BitcodeDetailRowList';
import BitcodeMetricGrid from '@/components/base/engi/execution/BitcodeMetricGrid';

import { jumpToShellSection } from './application-shell-reading';

interface ApplicationActionWorkbenchCardProps {
  badge: string;
  title: string;
  summary: string;
  metrics: { label: string; value: string }[];
  rows: { label: string; value: string }[];
  chips?: string[];
  actionLabel: string;
  actionTarget: string;
}

export default function ApplicationActionWorkbenchCard({
  badge,
  title,
  summary,
  metrics,
  rows,
  chips,
  actionLabel,
  actionTarget,
}: ApplicationActionWorkbenchCardProps) {
  return (
    <article className="rounded-[1.6rem] border border-white/8 bg-black/20 px-5 py-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.66rem] uppercase tracking-[0.2em] text-emerald-300/75">{badge}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
        </div>
        <button
          type="button"
          onClick={() => jumpToShellSection(actionTarget)}
          className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-[0.66rem] uppercase tracking-[0.18em] text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
        >
          {actionLabel}
        </button>
      </div>

      <p className="mt-3 text-sm leading-6 text-neutral-300">{summary}</p>

      <BitcodeMetricGrid
        metrics={metrics}
        className="mt-5"
        columnsClassName="sm:grid-cols-2"
        itemClassName="rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4"
        labelClassName="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500"
        valueClassName="text-base font-semibold text-white"
      />

      <div className="mt-4 rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-4 text-sm">
        <BitcodeDetailRowList rows={rows} />
      </div>

      {chips?.length ? (
        <BitcodeChipCloud
          chips={chips}
          className="mt-4"
          chipClassName="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-200"
        />
      ) : null}
    </article>
  );
}
