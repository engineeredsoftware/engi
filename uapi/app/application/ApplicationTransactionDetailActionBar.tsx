'use client';

import { DisabledTooltipWrapper } from '@/components/base/bitcode/overlays/disabled-tooltip-wrapper';

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
  surface?: 'terminal' | 'exchange';
}

export default function ApplicationTransactionDetailActionBar({
  activeSection,
  onChangeSection,
  onRunClosure,
  onRefreshDetail,
  isActing,
  shellReady,
  mockMode,
  surface = 'terminal',
}: ApplicationTransactionDetailActionBarProps) {
  const visibleActions = mockMode ? DETAIL_ACTIONS.filter((action) => action.id !== 'console') : DETAIL_ACTIONS;
  const isExchangeSurface = surface === 'exchange';
  const runtimeActionDisabled = isActing || !shellReady;
  const runtimeActionDisabledTooltip = isActing
    ? 'Disabled while closure is already running. When enabled, this button writes or refreshes the selected activity detail.'
    : !shellReady
      ? 'Disabled while the Terminal runtime is syncing. When enabled, this button writes or refreshes the selected activity detail.'
      : undefined;
  const runClosureButton = (
    <button
      type="button"
      disabled={runtimeActionDisabled}
      onClick={onRunClosure}
      className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isActing ? 'Running closure…' : 'Re-run closure'}
    </button>
  );
  const refreshButton = (
    <button
      type="button"
      disabled={runtimeActionDisabled}
      onClick={onRefreshDetail}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-neutral-200 transition hover:border-emerald-300/35 hover:bg-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Refresh detail
    </button>
  );

  return (
    <section className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">
            {isExchangeSurface ? 'Exchange detail interaction' : 'Activity interaction'}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">
            {isExchangeSurface ? 'Route-owned Exchange detail focus' : 'Route-owned detail focus and closure actions'}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">
            {isExchangeSurface
              ? 'Switch detail focus for the selected Exchange activity while preserving the route-owned master selection.'
              : 'Switch detail focus, rerun closure, and refresh the selected Bitcode activity from the same place you read it.'}
          </p>
        </div>

        {!isExchangeSurface ? (
          <div className="flex flex-wrap items-center gap-2">
            {runtimeActionDisabled && runtimeActionDisabledTooltip ? (
              <DisabledTooltipWrapper tooltip={runtimeActionDisabledTooltip} placement="top">
                {runClosureButton}
              </DisabledTooltipWrapper>
            ) : runClosureButton}
            {runtimeActionDisabled && runtimeActionDisabledTooltip ? (
              <DisabledTooltipWrapper tooltip={runtimeActionDisabledTooltip} placement="top">
                {refreshButton}
              </DisabledTooltipWrapper>
            ) : refreshButton}
          </div>
        ) : null}
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
