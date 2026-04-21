'use client';

import { useMemo, useState } from 'react';

import { getBitcodeActivityKindLabel } from '@/components/base/bitcode/activity/bitcode-activity-model';
import { isMockTransactionDataMode } from '@/components/base/bitcode/execution/bitcode-transaction-data-mode';
import BitcodeExecutionStreamPanel from '@/components/base/bitcode/execution/BitcodeExecutionStreamPanel';
import type { TransactionDataMode } from '@/components/base/bitcode/execution/bitcode-transaction-types';
import { usePipelineExecution } from '@/hooks/usePipelineExecution';

import { buildApplicationRunActivityFromEvents, buildApplicationRunActivityFromMock } from './application-run-activity';
import { MOCK_RUN_ACTIVITY, type WorkspaceRun } from './application-run-data';

interface ApplicationTransactionActivitySurfaceProps {
  selectedRun: WorkspaceRun;
  transactionDataMode: TransactionDataMode;
}

export default function ApplicationTransactionActivitySurface({
  selectedRun,
  transactionDataMode,
}: ApplicationTransactionActivitySurfaceProps) {
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const usesMockTransactions = isMockTransactionDataMode(transactionDataMode);
  const liveRun = usePipelineExecution(usesMockTransactions ? null : selectedRun.id);

  const activity = useMemo(() => {
    if (usesMockTransactions) {
      return buildApplicationRunActivityFromMock(MOCK_RUN_ACTIVITY[selectedRun.id]);
    }

    return buildApplicationRunActivityFromEvents(
      liveRun.events,
      liveRun.latestWorkUpdate,
      liveRun.iterationUpdates,
      liveRun.error,
    );
  }, [liveRun.error, liveRun.events, liveRun.iterationUpdates, liveRun.latestWorkUpdate, selectedRun.id, usesMockTransactions]);

  if (!activity) {
    return (
      <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-8 text-sm text-neutral-400">
        No activity stream is available for this selected transaction yet.
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-[rgba(5,9,18,0.9)]">
      <div className="border-b border-white/8 px-5 py-4">
        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Bitcode activity</p>
        <h3 className="mt-2 text-lg font-semibold text-white">Execution activity and work updates</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-300">
          Read the selected transaction&apos;s execution stream, state, and iteration updates directly from the Bitcode Terminal.
          Fourth-gate convergence keeps execution primitives explicit here while the broader Bitcode activity family also admits
          transactions, notifications, and later public or personal system usage.
        </p>
        {activity.activityKinds.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {activity.activityKinds.map((kind) => (
              <span
                key={kind}
                className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[0.64rem] uppercase tracking-[0.18em] text-emerald-200/80"
              >
                {getBitcodeActivityKindLabel(kind)}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <BitcodeExecutionStreamPanel
        className="relative"
        isProcessing={!activity.isStreamingComplete && !activity.error}
        executionState={activity.executionState}
        isStreamingComplete={activity.isStreamingComplete}
        generationCount={activity.generationCount}
        error={activity.error}
        runId={selectedRun.id}
        output={activity.output}
        outputDetails={activity.outputDetails}
        onRetry={() => {}}
        onDismissError={() => {}}
        userHasScrolled={userHasScrolled}
        setUserHasScrolled={setUserHasScrolled}
        compact={true}
        latestWorkUpdate={activity.latestWorkUpdate}
        iterationUpdates={activity.iterationUpdates || []}
        workUpdatesClassName="space-y-4 border-t border-gray-700/60 bg-gray-900/40 px-4 pb-4"
      />
    </section>
  );
}
