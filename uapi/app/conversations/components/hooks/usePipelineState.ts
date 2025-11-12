/**
 * Pipeline execution state management hook
 * 
 * Manages:
 * - Active pipeline executions
 * - Execution logs and status
 * - Pipeline events from SSE
 * - Thinking logs for UI feedback
 */

import { useState, useCallback } from 'react';

export interface RunRow {
  id: string;
  status: 'running' | 'completed' | 'error';
  started_at: string;
  completed_at?: string;
  pipelineType?: string;
  kind?: string;
}

export interface ThinkingLogEntry {
  id: string;
  type: 'info' | 'success' | 'error' | 'warning';
  content: string;
  timestamp: Date;
}

interface UsePipelineStateOptions {
  onPipelineStart?: (runId: string, type: string) => void;
  onPipelineComplete?: (runId: string, success: boolean) => void;
}

export function usePipelineState(options: UsePipelineStateOptions = {}) {
  const { onPipelineStart, onPipelineComplete } = options;

  // Pipeline run state
  const [runs, setRuns] = useState<RunRow[]>([]);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [runLog, setRunLog] = useState<string>('');
  const [latestWorkUpdate, setLatestWorkUpdate] = useState<any | null>(null);
  const [iterationUpdates, setIterationUpdates] = useState<any[]>([]);
  
  // Thinking/status logs
  const [thinkingLog, setThinkingLog] = useState<ThinkingLogEntry[]>([]);
  
  // Execution state
  const [executionState, setExecutionState] = useState<any>(null);
  const [generationCount, setLlmCallCount] = useState(0);

  // Append to thinking log
  const appendThinkingLog = useCallback((entry: Omit<ThinkingLogEntry, 'id' | 'timestamp'>) => {
    const newEntry: ThinkingLogEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setThinkingLog(prev => [...prev, newEntry]);
  }, []);

  // Clear thinking log
  const clearThinkingLog = useCallback(() => {
    setThinkingLog([]);
  }, []);

  // Start a new pipeline run
  const startPipelineRun = useCallback((
    runId: string,
    pipelineType: string,
  ) => {
    const newRun: RunRow = {
      id: runId,
      status: 'running',
      started_at: new Date().toISOString(),
      pipelineType,
      kind: pipelineType,
    };

    setRuns(prev => [newRun, ...prev]);
    setActiveRunId(runId);
    setRunLog(''); // Clear previous log
    setLatestWorkUpdate(null);
    setIterationUpdates([]);

    // Add to thinking log
    appendThinkingLog({
      type: 'success',
      content: `Pipeline ${pipelineType} started`
    });

    // Callback
    if (onPipelineStart) {
      onPipelineStart(runId, pipelineType);
    }
  }, [onPipelineStart, appendThinkingLog]);

  // Complete a pipeline run
  const completePipelineRun = useCallback((
    runId: string,
    success: boolean,
    summary?: string
  ) => {
    setRuns(prev => prev.map(run => 
      run.id === runId ? {
        ...run,
        status: success ? 'completed' : 'error',
        completed_at: new Date().toISOString()
      } : run
    ));

    // Add to thinking log
    const status = success ? 'completed successfully' : 'failed';
    appendThinkingLog({
      type: success ? 'success' : 'error',
      content: `Pipeline ${status}${summary ? ': ' + summary : ''}`
    });

    // Clear active run if it was this one
    if (activeRunId === runId) {
      setActiveRunId(null);
    }

    // Callback
    if (onPipelineComplete) {
      onPipelineComplete(runId, success);
    }
  }, [activeRunId, onPipelineComplete, appendThinkingLog]);

  // Append to run log
  const appendRunLog = useCallback((content: string) => {
    setRunLog(prev => prev + content + '\n');
  }, []);

  // Handle pipeline event from SSE
  const handlePipelineEvent = useCallback((runId: string, event: any) => {
    if (activeRunId !== runId) return;

    if (event?.type === 'work-update' && event?.update) {
      setLatestWorkUpdate(event.update);
      const scope = event.scope || '';
      if (scope.includes('iteration') && scope !== 'latest-agent-step' && event.update) {
        setIterationUpdates(prev => {
          const filtered = prev.filter(item => item?.iteration !== event.update?.iteration && item?.id !== event.update?.id);
          return [...filtered, event.update];
        });
      }
      return;
    }

    const logEntry = typeof event === 'string' ? event : 
      event?.message || JSON.stringify(event);
    
    appendRunLog(logEntry);

    // Update execution state if relevant
    if (event.type === 'phase') {
      setExecutionState(event);
    }

    // Update generation count
    if (event.type === 'generation') {
      setLlmCallCount(prev => prev + 1);
    }
  }, [activeRunId, appendRunLog]);

  // Get run by ID
  const getRunById = useCallback((runId: string): RunRow | undefined => {
    return runs.find(r => r.id === runId);
  }, [runs]);

  // Get active run
  const getActiveRun = useCallback((): RunRow | undefined => {
    return activeRunId ? getRunById(activeRunId) : undefined;
  }, [activeRunId, getRunById]);

  // Clear all runs
  const clearRuns = useCallback(() => {
    setRuns([]);
    setActiveRunId(null);
    setRunLog('');
    setExecutionState(null);
    setLlmCallCount(0);
    setLatestWorkUpdate(null);
    setIterationUpdates([]);
  }, []);

  // Reset execution state
  const resetExecutionState = useCallback(() => {
    setExecutionState(null);
    setLlmCallCount(0);
  }, []);

  return {
    // State
    runs,
    activeRunId,
    runLog,
    thinkingLog,
    executionState,
    generationCount,
    latestWorkUpdate,
    iterationUpdates,
    
    // Actions
    startPipelineRun,
    completePipelineRun,
    appendRunLog,
    appendThinkingLog,
    clearThinkingLog,
    handlePipelineEvent,
    clearRuns,
    resetExecutionState,
    setActiveRunId,
    
    // Getters
    getRunById,
    getActiveRun
  };
}
