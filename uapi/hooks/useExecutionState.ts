import { useState, useCallback, useRef } from 'react';
import { CompletionData, UrlEntry } from '../types/api';
import { parseStreamChunk } from '../utils/stream-parser';
import { callDeliverablesAPI } from '../networking/api-client';
import { ENABLE_COMPUTE_TOGGLE } from '@/config/featureFlags';

import { ExecutionPhase, ExecutionStep, FailsafeStep, GenerationStep } from '@bitcode/streams';

interface ExecutionProgress {
  phase?: ExecutionPhase;
  agent?: string;
  step?: ExecutionStep;
  failsafe?: FailsafeStep;
  generation?: GenerationStep;
}

interface ExecutionState {
  definitionOfDone: string;
  isProcessing: boolean;
  output: string;
  generationCount: number;
  outputDetails: Record<string, any>;
  executionProgress: ExecutionProgress;
  currentGuide: string | null;
  isStreamingComplete: boolean;
  error: string | null;
  completion: CompletionData | null;
  /** Active pipeline run ID */
  runId: string | null;
  latestWorkUpdate: any | null;
  latestIterationUpdate: any | null;
  iterationUpdates: any[];
}

// Initial default state for execution processing
const initialExecutionState: ExecutionState = {
  definitionOfDone: '',
  isProcessing: false,
  output: '',
  generationCount: 0,
  outputDetails: {},
  executionProgress: {},
  currentGuide: null,
  runId: null,
  isStreamingComplete: false,
  error: null,
  completion: null,
  latestWorkUpdate: null,
  latestIterationUpdate: null,
  iterationUpdates: [],
};

// SSE reconnection constants
const MAX_RECONNECT_ATTEMPTS = 3;
const RECONNECT_BASE_DELAY = 1000; // 1 second
const RECONNECT_MAX_DELAY = 30000; // 30 seconds

export const useExecutionState = () => {
  const [state, setState] = useState<ExecutionState>(initialExecutionState);
  const reconnectAttemptsRef = useRef(0);
  const isDebug = () => {
    try {
      // eslint-disable-next-line no-undef
      const envFlag = process.env.NEXT_PUBLIC_DEBUG_DELIVERABLES === '1';
      const lsFlag = typeof window !== 'undefined' && window.localStorage?.getItem('DEBUG_DELIVERABLES') === '1';
      // eslint-disable-next-line no-undef
      const devDefault = process.env.NODE_ENV !== 'production';
      return envFlag || lsFlag || devDefault;
    } catch { return false; }
  };
  const dlog = (...args: any[]) => { if (isDebug()) { try { console.debug('[Deliverables][stream]', ...args); } catch {} } };

  const setDefinitionOfDone = (definitionOfDone: string) => {
    setState(prev => ({ ...prev, definitionOfDone }));
  };

  /**
   * Triggers the deliverable pipeline and returns final completion data (or null on error)
   */
  const handleDoSubmit = useCallback(async (
    connectionId: number,
    repoOwner: string,
    repoName: string,
    repoBranch: string,
    commitSha: string,
    issueNumber: string | null,
    userHasScrolled: boolean,
    logContainerRef: React.RefObject<HTMLDivElement>,
    userTimezone: string,
    modelProvider: string,
    modelId: string,
    /** Optional attachments provided by the user */
    attachments: { id: string; type: string; content: string }[] = [],
    /** Enable compute mode */
    computeEnabled: boolean = false,
    /** Enable multi-agent mode */
    multiAgentEnabled: boolean = false,
    /** Number of iterations */
    iterationCount: number = 3,
    /** Optional file uploads */
    files?: File[],
    options?: {
      mcpConfig?: Record<string, any>;
      autoSync?: boolean;
      autoAlike?: boolean;
    }
  ): Promise<import('../types/api').CompletionData | null> => {
    setState(prev => ({
      ...prev,
      isProcessing: true,
      output: '',
      executionProgress: {},
      isStreamingComplete: false,
      error: null,
      runId: null,
      latestWorkUpdate: null,
      latestIterationUpdate: null,
      iterationUpdates: [],
    }));

    let hasError = false;
    let finalCompletion: import('../types/api').CompletionData | null = null;
    try {
      const computeEnabledEffective = ENABLE_COMPUTE_TOGGLE ? computeEnabled : false;
      dlog('Submitting pipeline', { connectionId, repoOwner, repoName, repoBranch, commitSha, issueNumber, modelProvider, modelId, attachmentsCount: attachments?.length || 0, computeEnabled: computeEnabledEffective, multiAgentEnabled, iterationCount });
      const pipelineType = options?.pipelineType || 'pipeline:deliverables';
      const stream = await callDeliverablesAPI(
            connectionId,
            repoOwner,
            repoName,
            repoBranch,
            commitSha,
            issueNumber,
            state.definitionOfDone,
            userTimezone,
            modelProvider,
            modelId,
            attachments,
            computeEnabledEffective,
            multiAgentEnabled,
            iterationCount,
            files
          );

      if (!stream) {
        dlog('No stream returned from API');
        throw new Error('No stream returned from API');
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const processStream = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              dlog('Stream done signal received');
              break;
            }

            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;
            // Process complete messages from buffer
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep incomplete line in buffer

            for (const line of lines) {
              if (!line.trim()) continue;

              const parsedChunk = parseStreamChunk(line);
              dlog('Chunk parsed', { type: (parsedChunk as any).type, hasStatus: Boolean(parsedChunk.status), hasError: Boolean(parsedChunk.error), textLen: (parsedChunk.text || '').length });

              if (parsedChunk.type === 'generation') {
                setState(prev => ({ ...prev, generationCount: prev.generationCount + 1 }));
              } else if (parsedChunk.type === 'work-update' && parsedChunk.update) {
                const scope = parsedChunk.scope || '';
                setState(prev => {
                  const update = parsedChunk.update;
                  const isIterationScope = scope.startsWith('iteration-') || scope === 'iteration' || scope === 'latest-iteration';
                  const iterationUpdates = isIterationScope
                    ? [...prev.iterationUpdates.filter((item: any) => item?.iteration !== update?.iteration && item?.id !== update?.id), update]
                    : prev.iterationUpdates;
                  return {
                    ...prev,
                    latestWorkUpdate: update,
                    latestIterationUpdate: isIterationScope ? update : prev.latestIterationUpdate,
                    iterationUpdates,
                  };
                });
                continue;
              } else if (parsedChunk.error) {
                hasError = true;
                dlog('Error in stream', parsedChunk.error);
                setState(prev => ({ ...prev, error: parsedChunk.error }));
                throw new Error(parsedChunk.error); // Throw to trigger reconnection
              }

              if (parsedChunk.status) {
          // Capture runId from parsed chunk
          if (parsedChunk.runId) {
            dlog('RunId detected', parsedChunk.runId);
            setState(prev => ({ ...prev, runId: parsedChunk.runId }));
          }
          if (typeof parsedChunk.guide === 'string') {
            setState(prev => ({ ...prev, currentGuide: parsedChunk.guide || prev.currentGuide }));
          }
          
          setState(prev => {
            // Store the message directly without embedding execution progress
            const message = parsedChunk.status?.message || '';
            const timestamp = Date.now();
            const uniqueKey = `${message}_${timestamp}`;

            return {
              ...prev,
              executionProgress: parsedChunk.status?.executionState || prev.executionProgress,
              output: message ? prev.output + message + '\n' : prev.output,
              outputDetails: message ? {
                ...prev.outputDetails,
                [uniqueKey]: {
                  ...parsedChunk,
                  timestamp,
                  status: {
                    ...parsedChunk.status,
                    logLine: message
                  }
                }
              } : prev.outputDetails
            };
                });
              } else if (parsedChunk.text) {
          const lines = parsedChunk.text.split('\n').filter(line => line.trim());
          lines.forEach(line => {
            const chunkKey = line.trim();
            setState(prev => ({
              ...prev,
              output: prev.output + line + '\n',
              outputDetails: {
                ...prev.outputDetails,
                [chunkKey]: parsedChunk
              }
            }));

            if (logContainerRef.current && !userHasScrolled) {
              setTimeout(() => {
                if (logContainerRef.current) {
                  logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
                }
              }, 0);
            }
                });
              }
            }
          }
        } catch (streamError) {
          // Handle stream interruption
          dlog('Stream error occurred', streamError);

          // Check if we should attempt reconnection
          if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS && !hasError) {
            const backoffDelay = Math.min(
              RECONNECT_BASE_DELAY * Math.pow(2, reconnectAttemptsRef.current),
              RECONNECT_MAX_DELAY
            );

            dlog(`Attempting reconnection ${reconnectAttemptsRef.current + 1}/${MAX_RECONNECT_ATTEMPTS} after ${backoffDelay}ms`);
            setState(prev => ({
              ...prev,
              output: prev.output + `⚠️ Connection interrupted. Reconnecting in ${backoffDelay / 1000}s...\n`
            }));

            reconnectAttemptsRef.current += 1;
            await new Promise(resolve => setTimeout(resolve, backoffDelay));

            // TODO: Implement actual SSE reconnection with last event ID
            // For now, just mark as error to prevent infinite loops
            throw new Error('SSE reconnection not yet implemented - connection lost');
          } else {
            throw streamError;
          }
        }
      };

      await processStream();
      dlog('Stream processing completed');
      reconnectAttemptsRef.current = 0; // Reset reconnection attempts on success
    } catch (error) {
      hasError = true;
      dlog('handleDoSubmit caught error', (error as any)?.message || error);
      setState(prev => ({
        ...prev,
        error: (error as Error).message || 'An unexpected error occurred'
      }));
    } finally {
      dlog('handleDoSubmit finally');
      setState(prev => ({
        ...prev,
        isProcessing: false,
        isStreamingComplete: !hasError
      }));
      return finalCompletion;
    }
  }, [state.definitionOfDone]);

  /**
   * Append a user instruction to the pipeline log immediately
   */
  const appendInstructionToLog = useCallback((inst: { content: string; [key: string]: any }) => {
    setState(prev => {
      const prefix = `📝 Instruction: ${inst.content}`;
      return {
        ...prev,
        output: prev.output + prefix + '\n',
        outputDetails: {
          ...prev.outputDetails,
          [prefix]: inst
        }
      };
    });
  }, []);

  // Reset to initial state for a new execution
  const resetState = useCallback(() => {
    setState(initialExecutionState);
  }, []);

  return {
    ...state,
    setDefinitionOfDone,
    handleDoSubmit,
    appendInstructionToLog,
    resetState
  };
};
