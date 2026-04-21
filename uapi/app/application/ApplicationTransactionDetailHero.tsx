'use client';

import React from 'react';

import BitcodeMetricGrid from '@/components/base/bitcode/execution/BitcodeMetricGrid';

interface ApplicationTransactionDetailHeroProps {
  title: string;
  summary: string;
  proofPosture: string;
  modeLabel: string;
  metrics: Array<{ label: string; value: string }>;
}

export default function ApplicationTransactionDetailHero({
  title,
  summary,
  proofPosture,
  modeLabel,
  metrics,
}: ApplicationTransactionDetailHeroProps) {
  return (
    <article className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Bitcode Terminal activity detail</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-neutral-300">{summary}</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-200">
          {modeLabel}
        </span>
      </div>

      <BitcodeMetricGrid
        metrics={metrics}
        className="mt-5"
        columnsClassName="sm:grid-cols-2 xl:grid-cols-4"
        itemClassName="rounded-[1.15rem] border border-white/8 bg-white/5 px-4 py-4"
        labelClassName="text-[0.64rem] uppercase tracking-[0.16em] text-neutral-500"
        valueClassName="text-sm font-semibold text-white"
      />

      <div className="mt-4 rounded-[1.15rem] border border-white/8 bg-white/5 px-4 py-4 text-sm">
        <p className="text-neutral-500">Activity posture</p>
        <p className="mt-2 text-neutral-100">{proofPosture}</p>
      </div>
    </article>
  );
}
