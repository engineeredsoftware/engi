"use client";

import { openOrbital } from '@/app/orbitals/components/OrbitalsProvider';
import {
  getTransactionDataModeLabel,
  isMockTransactionDataMode,
} from '@/components/base/engi/execution/bitcode-transaction-data-mode';
import type { TransactionDataMode } from '@/components/base/engi/execution/bitcode-transaction-types';

import type { WorkspaceRun } from './application-run-data';
import { APPLICATION_OPERATOR_EXPLAINERS } from './application-operator-explainers';
import { APPLICATION_SURFACE_COPY } from './application-operator-copy';
import ApplicationWorkspaceRailCard from './ApplicationWorkspaceRailCard';

function formatRunTimestamp(value: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function getRunStatusTone(status?: string | null) {
  if (status === 'completed') return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200';
  if (status === 'error' || status === 'failed') return 'border-red-500/30 bg-red-500/10 text-red-200';
  return 'border-amber-500/30 bg-amber-500/10 text-amber-100';
}

interface ApplicationWorkspaceRailProps {
  onOpenConversations: () => void;
  runs: WorkspaceRun[];
  isLoadingRuns: boolean;
  runsError: string | null;
  selectedRun: WorkspaceRun | null;
  transactionDataMode: TransactionDataMode;
}

export default function ApplicationWorkspaceRail({
  onOpenConversations,
  runs,
  isLoadingRuns,
  runsError,
  selectedRun,
  transactionDataMode,
}: ApplicationWorkspaceRailProps) {
  const usesMockTransactions = isMockTransactionDataMode(transactionDataMode);

  return (
    <div className="space-y-5 xl:sticky xl:top-40">
      <ApplicationWorkspaceRailCard
        kicker={APPLICATION_SURFACE_COPY.rail.control.kicker}
        title={APPLICATION_SURFACE_COPY.rail.control.title}
        summary={APPLICATION_SURFACE_COPY.rail.control.summary}
        tone="emerald"
        explainer={APPLICATION_OPERATOR_EXPLAINERS.railModes}
      >
        <div className="mt-5 grid gap-3">
          <button
            type="button"
            onClick={onOpenConversations}
            className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-left text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
          >
            Open conversations fullscreen
          </button>
          <button
            type="button"
            onClick={() => openOrbital('account', 'connects')}
            className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-left text-sm font-medium text-neutral-100 transition hover:border-white/20 hover:bg-white/10"
          >
            Open settings
          </button>
        </div>
      </ApplicationWorkspaceRailCard>

      <ApplicationWorkspaceRailCard
        kicker={APPLICATION_SURFACE_COPY.rail.support.kicker}
        title={APPLICATION_SURFACE_COPY.rail.support.title}
        summary={APPLICATION_SURFACE_COPY.rail.support.summary}
        explainer={APPLICATION_OPERATOR_EXPLAINERS.railSupport}
      >
        <div className="flex items-center justify-between gap-3">
          {usesMockTransactions ? (
            <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-emerald-200">
              {getTransactionDataModeLabel(transactionDataMode)}
            </span>
          ) : null}
        </div>

        <div className="mt-4 space-y-3">
          {isLoadingRuns ? (
            <div className="rounded-2xl border border-white/6 bg-black/20 px-4 py-6 text-sm text-neutral-400">
              Loading transaction support…
            </div>
          ) : runsError ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-200">
              {runsError}
            </div>
          ) : !selectedRun ? (
            <div className="rounded-2xl border border-white/6 bg-black/20 px-4 py-6 text-sm text-neutral-400">
              Select a Bitcode transaction in the ledger to load support context here.
            </div>
          ) : (
            <div className="rounded-2xl border border-white/6 bg-black/20 px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{selectedRun.type || 'pipeline:deliverables'}</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">
                    {selectedRun.summary || 'The selected Bitcode transaction is now loaded in the central detail surface.'}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.18em] ${getRunStatusTone(selectedRun.status)}`}>
                  {selectedRun.status || 'running'}
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-3">
                  <p className="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">Transactions loaded</p>
                  <p className="mt-2 text-sm font-semibold text-white">{runs.length}</p>
                </div>
                <div className="rounded-[1rem] border border-white/8 bg-white/5 px-3 py-3">
                  <p className="text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">Started</p>
                  <p className="mt-2 text-sm font-semibold text-white">{formatRunTimestamp(selectedRun.created_at)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ApplicationWorkspaceRailCard>

      {selectedRun ? (
        <ApplicationWorkspaceRailCard
          kicker={APPLICATION_SURFACE_COPY.rail.focus.kicker}
          title={APPLICATION_SURFACE_COPY.rail.focus.title}
          summary={APPLICATION_SURFACE_COPY.rail.focus.summary}
          explainer={APPLICATION_OPERATOR_EXPLAINERS.railFocus}
        >
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-neutral-500">Transaction id</dt>
              <dd className="mt-1 font-mono text-neutral-100">{selectedRun.id}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Summary</dt>
              <dd className="mt-1 text-neutral-100">
                {selectedRun.summary || 'Select the central Bitcode detail surface to inspect this transaction.'}
              </dd>
            </div>
          </dl>
        </ApplicationWorkspaceRailCard>
      ) : null}
    </div>
  );
}
