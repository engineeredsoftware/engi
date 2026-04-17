'use client';

import { useMemo, useState } from 'react';

import WorkUpdatePanel from '@/components/base/engi/execution/WorkUpdatePanel';
import { PipelineExecutionLog } from '@/components/base/engi/execution/pipeline-execution-log';
import { PipelineExecutionLogHeader } from '@/components/base/engi/execution/pipeline-execution-log-header';
import { usePipelineExecution } from '@/hooks/usePipelineExecution';

import { buildApplicationRunActivityFromEvents, buildApplicationRunActivityFromMock } from './application-run-activity';
import { MOCK_RUN_ACTIVITY, type WorkspaceRun } from './application-run-data';

interface ApplicationTransactionActivitySurfaceProps {
  selectedRun: WorkspaceRun;
  mockMode: boolean;
}

export default function ApplicationTransactionActivitySurface({
  selectedRun,
  mockMode,
}: ApplicationTransactionActivitySurfaceProps) {
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const liveRun = usePipelineExecution(mockMode ? null : selectedRun.id);

  const activity = useMemo(() => {
    if (mockMode) {
      return buildApplicationRunActivityFromMock(MOCK_RUN_ACTIVITY[selectedRun.id]);
    }

    return buildApplicationRunActivityFromEvents(
      liveRun.events,
      liveRun.latestWorkUpdate,
      liveRun.iterationUpdates,
      liveRun.error,
    );
  }, [liveRun.error, liveRun.events, liveRun.iterationUpdates, liveRun.latestWorkUpdate, mockMode, selectedRun.id]);

  if (!activity) {
    return (
      <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-8 text-sm text-neutral-400">
        No application-owned activity surface is available for this selected transaction yet.
      </div>
    );
  }

  const orderedIterationUpdates = [...(activity.iterationUpdates || [])].sort(
    (a, b) => (b?.iteration ?? 0) - (a?.iteration ?? 0),
  );

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-[rgba(5,9,18,0.9)]">
      <div className="border-b border-white/8 px-5 py-4">
        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">Application-owned activity</p>
        <h3 className="mt-2 text-lg font-semibold text-white">Transaction activity and work updates</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-300">
          This elevates the older execution/log system into Bitcode’s application-owned detail space. The central
          workspace now reads the selected transaction’s stream, state, and iteration updates directly instead of leaving
          that as a compatibility-only page behavior.
        </p>
      </div>
      <div className="relative">
        <PipelineExecutionLogHeader
          isProcessing={!activity.isStreamingComplete && !activity.error}
          executionState={activity.executionState}
          isStreamingComplete={activity.isStreamingComplete}
          generationCount={activity.generationCount}
          error={activity.error}
          runId={selectedRun.id}
        />
        <PipelineExecutionLog
          output={activity.output}
          isProcessing={!activity.isStreamingComplete && !activity.error}
          error={activity.error}
          outputDetails={activity.outputDetails}
          onRetry={() => {}}
          onDismissError={() => {}}
          userHasScrolled={userHasScrolled}
          setUserHasScrolled={setUserHasScrolled}
          compact={true}
        />
        {(activity.latestWorkUpdate || orderedIterationUpdates.length > 0) && (
          <div className="space-y-4 border-t border-gray-700/60 bg-gray-900/40 px-4 pb-4">
            {activity.latestWorkUpdate ? <WorkUpdatePanel variant="latest" update={activity.latestWorkUpdate} /> : null}
            {orderedIterationUpdates.map((iterationUpdate) => (
              <WorkUpdatePanel
                key={iterationUpdate?.id || `application-iteration-${iterationUpdate?.iteration}`}
                variant="iteration"
                update={iterationUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
