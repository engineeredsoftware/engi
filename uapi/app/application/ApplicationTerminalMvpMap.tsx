'use client';

import { jumpToShellSection } from './application-shell-reading';

const TERMINAL_MVP_STATIONS = [
  {
    id: 'recent-activity',
    label: 'Recent activity',
    value: 'selected results',
    targetId: 'applicationTransactionWorkspace',
  },
  {
    id: 'give',
    label: 'Give',
    value: 'source supply',
    targetId: 'applicationSupplySelection',
  },
  {
    id: 'need',
    label: 'Need',
    value: 'measurement + fit',
    targetId: 'applicationNeedScenarios',
  },
  {
    id: 'closure',
    label: 'Closure',
    value: 'proof + settlement',
    targetId: 'applicationClosureControls',
  },
] as const;

export default function ApplicationTerminalMvpMap() {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-[rgba(5,10,20,0.72)] px-5 py-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Terminal workflow</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Operator lanes</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-neutral-300">
          Recent activity stays first; Give, Need, and closure controls remain one jump away while deeper transaction
          sequencing stays out of the current surface.
        </p>
      </div>

      <div className="mt-5 grid gap-3 tablet:grid-cols-2 desktop:grid-cols-4">
        {TERMINAL_MVP_STATIONS.map((station) => (
          <button
            key={station.id}
            type="button"
            onClick={() => jumpToShellSection(station.targetId)}
            className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] px-4 py-4 text-left transition hover:border-emerald-300/35 hover:bg-emerald-400/10 focus:outline-none focus-visible:border-emerald-300/50 focus-visible:ring-2 focus-visible:ring-emerald-300/25"
          >
            <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-neutral-500">{station.value}</span>
            <span className="mt-2 block text-sm font-semibold text-neutral-100">{station.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
