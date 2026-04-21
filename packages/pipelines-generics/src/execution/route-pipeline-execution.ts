/**
 * Guided Pipeline Execution
 *
 * The gate guidance layer that manages DDD (Design → Develop → Digest) sequencing.
 * Guides pipeline execution through gates, enforcing restrictions and transitions.
 * "Guiding" is what "gating" gives experientially.
 *
 * @package @bitcode/pipelines-generics
 */

import { Execution, Executor, switchExecutor } from '@bitcode/execution-generics';
import type { Gate, GateState, GateConfig } from '../gate-system/types';
import { GATE_CONFIGS, initializeGateState } from '../gate-system/types';

/**
 * Gate-aware execution context
 */
export interface GateExecutionContext {
  gate: Gate;
  config: GateConfig;
  allowedFiles: string[];
  collaborative: boolean;
  primaryDocument?: string;
}

/**
 * Store gate state in execution
 */
export function storeGateState(execution: Execution, state: GateState): void {
  execution.store('gate', 'current', state.current);
  execution.store('gate', 'state', state as any);
  execution.store('gate', 'config', GATE_CONFIGS[state.current] as any);
  execution.store('gate', 'history', state.history as any);

  // Store file gates for enforcement
  const config = GATE_CONFIGS[state.current];
  execution.store('gates', 'allowedFilePatterns', config.allowedFilePatterns);
  execution.store('gates', 'collaborative', config.collaborative);

  if (config.primaryDocument) {
    execution.store('gates', 'primaryDocument', config.primaryDocument);
  }

  if (config.selfInstructThreshold !== undefined) {
    execution.store('config', 'selfInstructThreshold', config.selfInstructThreshold);
  }
}

/**
 * Get current gate from execution
 */
export function getCurrentGate(execution: Execution): Gate {
  return execution.get('gate', 'current') || 'Develop';
}

/**
 * Get gate state from execution
 */
export function getGateState(execution: Execution): GateState {
  const state = execution.get<any>('gate', 'state') as GateState | undefined;
  if (state) return state;

  // Initialize if not present
  const initialState = initializeGateState('Develop');
  storeGateState(execution, initialState);
  return initialState;
}

/**
 * Transition to next gate (USER-TRIGGERED in GA-1)
 * Called when user clicks "Ready to Develop" / "Ready to Digest" / "Ship"
 */
export function transitionToNextGate(
  execution: Execution,
  nextGate: Gate
): void {
  const currentState = getGateState(execution);
  const now = new Date().toISOString();

  // Complete current gate
  const updatedHistory = [...currentState.history];
  const currentGateEntry = updatedHistory[updatedHistory.length - 1];
  if (currentGateEntry && !currentGateEntry.completedAt) {
    currentGateEntry.completedAt = now;
    currentGateEntry.transitionReason = `User transition to ${nextGate}`;
  }

  // Start next gate
  updatedHistory.push({
    gate: nextGate,
    startedAt: now,
  });

  const newState: GateState = {
    current: nextGate,
    history: updatedHistory,
    readyToTransition: false,
  };

  storeGateState(execution, newState);

  // Emit transition event
  execution.store('gate', 'lastTransition', {
    from: currentState.current,
    to: nextGate,
    timestamp: now,
    triggeredBy: 'user',
  });
}

/**
 * Create Guided Pipeline Execution
 *
 * Creates a guided execution that:
 * 1. Determines current gate from execution state or input
 * 2. Routes to gate-specific pipeline
 * 3. Manages gate transitions
 * 4. Enforces gate restrictions
 *
 * @param gatePipelines - Map of gate-specific pipelines
 */
export function createGuidedPipelineExecution<TInput, TOutput>(
  gatePipelines: {
    Design?: Executor<TInput, TOutput>;
    Develop: Executor<TInput, TOutput>;
    Digest?: Executor<TInput, TOutput>;
  }
): Executor<TInput, TOutput> {
  return async (input: TInput, execution: Execution): Promise<TOutput> => {
    // Initialize gate from input or default to Develop
    const initialGate = (input as any).gate ||
                       (input as any).metaPhase || // Legacy support
                       execution.get('gate', 'current') ||
                       'Develop';

    // Initialize gate state if not present
    if (!execution.get('gate', 'state')) {
      const initialState = initializeGateState(initialGate);
      storeGateState(execution, initialState);
    }

    // Log gate initialization
    console.log(`[Guided] Starting execution in ${initialGate} gate`);

    // Use switchExecutor to route to gate-specific pipeline
    const gateRouter = switchExecutor<TInput, TOutput>(
      (_input, exec) => getCurrentGate(exec),
      {
        'Design': gatePipelines.Design || gatePipelines.Develop,
        'Develop': gatePipelines.Develop,
        'Digest': gatePipelines.Digest || gatePipelines.Develop,
      }
    );

    // Execute gate-specific pipeline
    const result = await gateRouter(input, execution);

    // Check if user triggered a gate transition
    const pendingTransition = execution.get('gate', 'pendingTransition');
    if (pendingTransition) {
      console.log(`[Guided] Gate transition pending: ${getCurrentGate(execution)} → ${pendingTransition}`);
      execution.store('gate', 'requiresNewExecution', true);
      execution.store('gate', 'nextGate', pendingTransition);
    }

    return result;
  };
}

/**
 * Gate preprocess - Apply gate-specific configuration to input
 * Use this in iteration preprocess to enforce gate restrictions
 */
export function gatePreprocess<TInput>(
  input: TInput,
  execution: Execution
): TInput {
  const currentGate = getCurrentGate(execution);
  const config = GATE_CONFIGS[currentGate];

  // Store gate configuration for agents to access
  execution.store('gates', 'current', currentGate);
  execution.store('gates', 'allowedFilePatterns', config.allowedFilePatterns);
  execution.store('gates', 'collaborative', config.collaborative);

  // Add gate context to input
  (input as any).gateContext = {
    gate: currentGate,
    collaborative: config.collaborative,
    primaryDocument: config.primaryDocument,
    allowedFiles: config.allowedFilePatterns,
    selfInstructThreshold: config.selfInstructThreshold,
  };

  return input;
}

/**
 * Check if current gate is collaborative
 */
export function isCollaborativeGate(execution: Execution): boolean {
  const config = execution.get<any>('gate', 'config') as GateConfig | undefined;
  return config?.collaborative || false;
}

/**
 * Get self-instruct threshold for current gate
 */
export function getSelfInstructThreshold(execution: Execution): number | undefined {
  const config = execution.get<any>('gate', 'config') as GateConfig | undefined;
  return config?.selfInstructThreshold;
}

// Re-export gate types for convenience
export type { Gate, GateState, GateConfig } from '../gate-system/types';
export { GATE_CONFIGS, GATE_TRANSITIONS, initializeGateState } from '../gate-system/types';
