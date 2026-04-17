'use client';

import { useEffect, useState } from 'react';

import { readBitcodeApplicationShellSnapshot } from '@bitcode/bitcode/src/client-entry.js';

import {
  normalizeApplicationLiveSummary,
  type ApplicationLiveSummaryItem,
} from './application-live-summary';

const PINNED_LABELS = new Set([
  'Active scenario',
  'Branch mode',
  'Projection',
  'Fit pressure',
  'Visible proof families',
  'Blocking external interfaces',
]);

export default function ApplicationLiveSummaryStrip() {
  const [items, setItems] = useState<ApplicationLiveSummaryItem[]>([]);

  useEffect(() => {
    let disposed = false;

    const refresh = async () => {
      const snapshot = await readBitcodeApplicationShellSnapshot();
      if (disposed) return;
      setItems(normalizeApplicationLiveSummary(snapshot));
    };

    void refresh();
    const intervalId = window.setInterval(() => {
      void refresh();
    }, 700);

    return () => {
      disposed = true;
      window.clearInterval(intervalId);
    };
  }, []);

  const pinnedItems = items.filter((item) => PINNED_LABELS.has(item.label));

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(5,9,18,0.94))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.4)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Application live summary</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-[2.05rem]">
            Route-local operating posture
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 tablet:text-base">
            This summary strip now reads the Bitcode shell&apos;s semantic summary surface directly, so the application frame
            owns more of the operator read without depending on rendered shell cards.
          </p>
        </div>

        <div className="grid gap-3 text-xs uppercase tracking-[0.2em] text-neutral-400 tablet:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Semantic source</p>
            <p className="mt-2 text-neutral-200">shell summary bridge</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Application owner</p>
            <p className="mt-2 text-neutral-200">route-local posture read</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="rounded-[1.6rem] border border-white/8 bg-black/20 px-5 py-5">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Pinned signals</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(pinnedItems.length ? pinnedItems : items.slice(0, 6)).map((item) => (
              <div key={item.label} className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4">
                <p className="text-[0.66rem] uppercase tracking-[0.2em] text-neutral-500">{item.label}</p>
                <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
            {!items.length ? (
              <div className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-8 text-sm text-neutral-400 sm:col-span-2">
                Waiting for the preserved shell summary to populate.
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-white/8 bg-black/20 px-5 py-5">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Full summary grid</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <div key={item.label} className="rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4">
                <p className="text-[0.66rem] uppercase tracking-[0.18em] text-neutral-500">{item.label}</p>
                <p className="mt-3 text-sm leading-6 text-neutral-100">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
