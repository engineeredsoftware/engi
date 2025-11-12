"use client";

import React from "react";
import PipelineExecutionLog from "@/components/base/engi/execution/pipeline-execution-log";
import PipelineExecutionLogHeader from "@/components/base/engi/execution/pipeline-execution-log-header";

interface SidebarLogsProps {
  show: boolean;
  showLinksPane?: boolean;

  isProcessing: boolean;
  executionState: Record<string, any> | null;
  generationCount: number;
  error: Error | null;

  output: string;
  outputDetails: any;
  userHasScrolled: boolean;
  setUserHasScrolled: (v: boolean) => void;
  processLogRef: React.RefObject<HTMLDivElement>;

  onRetry: () => void;
  onDismissError: () => void;

  runs: any[];
  activeRunId: string | null;
  setActiveRunId: (id: string | null) => void;

  linksPane: React.ReactNode;
  onOpenDetails?: (runId: string) => void;
  onNavigateToExecution?: (runId: string) => void;
}

export function SidebarLogs({
  show,
  showLinksPane,
  isProcessing,
  executionState,
  generationCount,
  error,
  output,
  outputDetails,
  onRetry,
  onDismissError,
  userHasScrolled,
  setUserHasScrolled,
  processLogRef,
  runs,
  activeRunId,
  setActiveRunId,
  linksPane,
  onOpenDetails = () => {},
  onNavigateToExecution = () => {},
}: SidebarLogsProps) {
  const activeRun = activeRunId ? runs.find((r) => r.id === activeRunId) : null;
  const headerError = error ? error.message : null;
  const isComplete = activeRun ? activeRun.status !== 'running' : !isProcessing;

  if (!show) return null;

  return (
    <div className="fullscreen-sidebar fullscreen-sidebar-right flex flex-col relative">
      {runs.length > 1 && (
        <div className="p-2 border-b border-gray-700">
          <select
            className="bg-gray-800 text-gray-200 text-xs w-full p-1 rounded"
            value={activeRunId || ""}
            onChange={(e) => setActiveRunId(e.target.value || null)}
          >
            {runs.map((r) => (
              <option key={r.id} value={r.id}>
                {`${r.pipelineType ?? 'pipeline'}-${r.id.substring(0, 4)} · ${new Date(
                  r.started_at
                ).toLocaleString()} · ${r.status}`}
              </option>
            ))}
          </select>
        </div>
      )}

      <PipelineExecutionLogHeader
        isProcessing={isProcessing}
        executionState={executionState || {}}
        isStreamingComplete={isComplete}
        generationCount={generationCount}
        error={headerError}
        runId={activeRunId || undefined}
        onOpenDetails={onOpenDetails}
        onNavigateToExecution={onNavigateToExecution}
        onClose={() => setActiveRunId(null)}
      />

      <PipelineExecutionLog
        ref={processLogRef as any}
        output={output}
        isProcessing={isProcessing || runs.find((r) => r.id === activeRunId)?.status === "running"}
        error={error}
        outputDetails={outputDetails}
        onRetry={onRetry}
        onDismissError={onDismissError}
        userHasScrolled={userHasScrolled}
        setUserHasScrolled={setUserHasScrolled}
      />

      {showLinksPane && <div className="right-links-pane flex-1 overflow-auto border-t border-gray-700 p-2">{linksPane}</div>}
    </div>
  );
}
