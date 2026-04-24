'use client';

import type { ApplicationTransactionDetailSection } from './application-transaction-query';

type DetailAction = {
  id: ApplicationTransactionDetailSection;
  label: string;
};

const DETAIL_ACTIONS: DetailAction[] = [
  { id: 'shippables', label: 'Shippables' },
  { id: 'transaction', label: 'Identity' },
  { id: 'closure', label: 'Closure' },
  { id: 'proofs', label: 'Proofs' },
  { id: 'history', label: 'History' },
  { id: 'activity', label: 'Execution stream' },
  { id: 'console', label: 'Console' },
];

interface ApplicationTransactionDetailActionBarProps {
  activeSection: ApplicationTransactionDetailSection;
  onChangeSection: (section: ApplicationTransactionDetailSection) => void;
  onRunClosure: () => void;
  onRefreshDetail: () => void;
  isActing: boolean;
  shellReady: boolean;
  mockMode: boolean;
}

export default function ApplicationTransactionDetailActionBar({
  activeSection,
  onChangeSection,
  onRunClosure,
  onRefreshDetail,
  isActing,
  shellReady,
  mockMode,
}: ApplicationTransactionDetailActionBarProps) {
  const visibleActions = mockMode ? DETAIL_ACTIONS.filter((action) => action.id !== 'console') : DETAIL_ACTIONS;

  return (
    <section className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Activity interaction</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Route-owned detail focus and closure actions</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">
            Switch detail focus, rerun closure, and refresh the selected Bitcode activity from the same place you read it.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={isActing || !shellReady}
            onClick={onRunClosure}
            className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isActing ? 'Running closure…' : 'Re-run closure'}
          </button>
          <button
            type="button"
            disabled={isActing || !shellReady}
            onClick={onRefreshDetail}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-neutral-200 transition hover:border-emerald-300/35 hover:bg-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Refresh detail
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {visibleActions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onChangeSection(action.id)}
            className={`rounded-full border px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] transition ${
              activeSection === action.id
                ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'
                : 'border-white/10 bg-white/5 text-neutral-200 hover:border-emerald-300/35 hover:bg-emerald-400/10'
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}
