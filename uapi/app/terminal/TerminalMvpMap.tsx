'use client';

import { jumpToShellSection } from './terminal-shell-reading';

const TERMINAL_MVP_STATIONS = [
  {
    id: 'overview',
    label: 'Overview(s)',
    value: 'readiness + activity',
    targetId: 'terminalTransactionWorkspace',
  },
  {
    id: 'giving',
    label: 'Giving',
    value: 'repository + Giving',
    targetId: 'terminalSupplySelection',
  },
  {
    id: 'needing',
    label: 'Needing',
    value: 'measurement + fit',
    targetId: 'terminalNeedScenarios',
  },
  {
    id: 'proofs-finalities',
    label: 'Proofs + finalities',
    value: 'proofs + ledger',
    targetId: 'terminalClosureControls',
  },
] as const;

export default function TerminalMvpMap() {
  return (
    <section className="rounded-[1.35rem] border border-white/10 bg-[rgba(5,10,20,0.7)] px-4 py-3.5">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Terminal workflow</p>
          <h2 className="mt-1.5 text-lg font-semibold text-white">Overview, Giving, Needing, Proofs</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-neutral-300">
          Move from overview into Giving first, then Needing, then proof, settlement, ledger, and adjacent follow-through.
        </p>
      </div>

      <div className="mt-3 grid gap-2 tablet:grid-cols-2 desktop:grid-cols-4">
        {TERMINAL_MVP_STATIONS.map((station) => (
          <button
            key={station.id}
            type="button"
            onClick={() => jumpToShellSection(station.targetId)}
            className="rounded-[1rem] border border-white/10 bg-white/[0.045] px-3.5 py-3 text-left transition hover:border-emerald-300/35 hover:bg-emerald-400/10 focus:outline-none focus-visible:border-emerald-300/50 focus-visible:ring-2 focus-visible:ring-emerald-300/25"
          >
            <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-neutral-500">{station.value}</span>
            <span className="mt-1.5 block text-sm font-semibold text-neutral-100">{station.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
