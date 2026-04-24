'use client';

import { useMemo } from 'react';

import ApplicationWorkspaceCard from './ApplicationWorkspaceCard';
import { APPLICATION_WORKSPACE_EXPLAINERS } from './application-workspace-explainers';
import {
  normalizeApplicationLiveSummary,
  type ApplicationLiveSummaryItem,
} from './application-live-summary';
import { useApplicationShellBridge } from './application-shell-bridge';

const PINNED_LABELS = new Set([
  'Active scenario',
  'Branch mode',
  'Projection',
  'Fit pressure',
  'Visible proof families',
  'Blocking external interfaces',
]);

export default function ApplicationLiveSummaryStrip() {
  const { snapshot } = useApplicationShellBridge();
  const items = useMemo<ApplicationLiveSummaryItem[]>(
    () => normalizeApplicationLiveSummary(snapshot),
    [snapshot],
  );

  const pinnedItems = items.filter((item) => PINNED_LABELS.has(item.label));

  return (
    <ApplicationWorkspaceCard
      kicker="Terminal pulse"
      title="Pinned operating signals"
      summary="Keep scenario, proof pressure, and blocking interfaces close to the ledger before you dive into deeper Shippable, proof, or history detail."
      explainer={APPLICATION_WORKSPACE_EXPLAINERS.ledgerPulse}
    >
      <div className="grid gap-3 text-xs uppercase tracking-[0.2em] text-neutral-400 tablet:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
          <p className="text-emerald-300/85">Signal source</p>
          <p className="mt-2 text-neutral-200">live Bitcode flow</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
          <p className="text-emerald-300/85">Reading mode</p>
          <p className="mt-2 text-neutral-200">at-a-glance</p>
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
                Waiting for live summary signals.
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
    </ApplicationWorkspaceCard>
  );
}
