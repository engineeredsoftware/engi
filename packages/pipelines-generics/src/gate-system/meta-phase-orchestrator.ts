/**
 * Meta-phase orchestrator
 *
 * Sequences Design → Develop → Digest meta-phases.
 * Each meta-phase runs the SDIVF reference family with appropriate file gates.
 *
 * @package @bitcode/pipelines-generics
*/

import type { Executor } from '@bitcode/execution-generics';
import type { Execution } from '@bitcode/execution-generics/Execution';
import type { MetaPhase, MetaPhaseState } from './types';
import {
  initializeMetaPhaseState,
  transitionMetaPhase,
  checkMetaPhaseTransition,
  META_PHASE_CONFIGS,
} from './types';

/**
 * Attempt a meta-phase transition based on execution state.
 * Returns true if a transition occurred.
 */
export function attemptMetaPhaseTransition(execution: Execution): boolean {
  const currentPhase = getCurrentMetaPhase(execution);
  const { ready, nextPhase } = checkMetaPhaseTransition(currentPhase, execution);

  if (!ready || !nextPhase) {
    execution.store('meta', 'pendingTransition', null);
    return false;
  }

  const currentState = getMetaPhaseState(execution);
  const newState = transitionMetaPhase(currentState, execution);
  storeMetaPhaseState(execution, newState);

  // Record pending transition for callers (e.g., UI) to act upon
  execution.store('meta', 'pendingTransition', nextPhase);
  execution.store('meta', 'lastTransitionCheck', {
    from: currentPhase,
    to: nextPhase,
    timestamp: new Date().toISOString(),
  });

  return true;
}

/**
 * Store meta-phase state in execution
 */
export function storeMetaPhaseState(execution: Execution, state: MetaPhaseState): void {
  execution.store('meta', 'phase', state.current);
  execution.store('meta', 'state', state as any);
  execution.store('meta', 'config', META_PHASE_CONFIGS[state.current] as any);
}

/**
 * Get meta-phase state from execution
 */
export function getMetaPhaseState(execution: Execution): MetaPhaseState {
  const state = execution.get<any>('meta', 'state') as MetaPhaseState | undefined;
  if (state) return state;

  // Initialize if not present
  const initialState = initializeMetaPhaseState('Design');
  storeMetaPhaseState(execution, initialState);
  return initialState;
}

/**
 * Get current meta-phase
 */
export function getCurrentMetaPhase(execution: Execution): MetaPhase {
  const state = getMetaPhaseState(execution);
  return state.current;
}

/**
 * Transition meta-phase (operator-triggered)
 * Called when user clicks "Ready to Develop" / "Ready to Digest" / "Finish"
 */
export function transitionToNextMetaPhase(
  execution: Execution,
  nextPhase: MetaPhase
): void {
  const currentState = getMetaPhaseState(execution);
  const now = new Date().toISOString();

  // Complete current phase
  const updatedHistory = [...currentState.history];
  const currentPhaseEntry = updatedHistory[updatedHistory.length - 1];
  if (currentPhaseEntry && !currentPhaseEntry.completedAt) {
    currentPhaseEntry.completedAt = now;
    currentPhaseEntry.transitionReason = `User transition to ${nextPhase}`;
  }

  // Start next phase
  updatedHistory.push({
    gate: nextPhase,
    startedAt: now,
  });

  const newState: MetaPhaseState = {
    current: nextPhase,
    history: updatedHistory,
    readyToTransition: false,
  };

  storeMetaPhaseState(execution, newState);

  // Emit transition event
  execution.store('meta', 'lastTransition', {
    from: currentState.current,
    to: nextPhase,
    timestamp: now,
    triggeredBy: 'user',
  });
}

/**
 * Create a meta-phase aware SDIVF reference pipeline
 *
 * This wraps an SDIVF reference pipeline to add meta-phase orchestration.
 */
export function createMetaPhasePipeline<TInput, TOutput>(
  sdivfPipeline: Executor<TInput, TOutput>
): Executor<TInput, TOutput> {
  return async (input: TInput, execution: Execution): Promise<TOutput> => {
    // Initialize meta-phase state
    const initialMetaPhase = (input as any).metaPhase || 'Design';
    const initialState = initializeMetaPhaseState(initialMetaPhase);
    storeMetaPhaseState(execution, initialState);

    let result: TOutput;
    let maxIterations = 3; // Design → Develop → Digest (with possible loops)
    let iteration = 0;

    while (iteration < maxIterations) {
      const currentMetaPhase = getCurrentMetaPhase(execution);

      console.log(`[Meta-Phase] Starting ${currentMetaPhase} phase (iteration ${iteration + 1})`);

      // Run SDIVF pipeline for current meta-phase
      result = await sdivfPipeline(input, execution);

      // Check if we should transition
      const transitioned = attemptMetaPhaseTransition(execution);

      if (!transitioned) {
        // No transition available, we're done
        console.log(`[Meta-Phase] Completed at ${currentMetaPhase} phase`);
        break;
      }

      const newMetaPhase = getCurrentMetaPhase(execution);
      console.log(`[Meta-Phase] Transitioned ${currentMetaPhase} → ${newMetaPhase}`);

      // Check if we're back to Design (another iteration loop)
      if (newMetaPhase === 'Design' && iteration > 0) {
        iteration++;
        continue;
      }

      // Check if we've completed all phases
      if (newMetaPhase === 'Digest') {
        // Run Digest phase
        result = await sdivfPipeline(input, execution);

        // Check if another iteration is needed
        const anotherIteration = attemptMetaPhaseTransition(execution);
        if (!anotherIteration) {
          break;
        }
      }

      iteration++;
    }

    return result!;
  };
}

/**
 * Meta-phase preprocess hook
 *
 * Sets up file gates and configuration for the current meta-phase.
 * Use this in your SDIVF pipeline's preprocess step.
 */
export function metaPhasePreprocess<TInput>(
  input: TInput,
  execution: Execution
): TInput {
  const currentMetaPhase = getCurrentMetaPhase(execution);
  const config = META_PHASE_CONFIGS[currentMetaPhase];

  // Store file gates
  execution.store('gates', 'allowedFilePatterns', config.allowedFilePatterns);
  execution.store('gates', 'collaborative', config.collaborative);

  // Store self-instruct configuration (for Develop phase)
  if (config.selfInstructThreshold !== undefined) {
    execution.store('config', 'selfInstructThreshold', config.selfInstructThreshold);
  }

  // Store primary document
  if (config.primaryDocument) {
    execution.store('meta', 'primaryDocument', config.primaryDocument);
  }

  return input;
}

/**
 * Check if current meta-phase is collaborative
 */
export function isCollaborativePhase(execution: Execution): boolean {
  const config = execution.get<any>('meta', 'config');
  return config?.collaborative || false;
}

/**
 * Get self-instruct threshold for current meta-phase
 */
export function getSelfInstructThreshold(execution: Execution): number | undefined {
  const config = execution.get<any>('meta', 'config');
  return config?.selfInstructThreshold;
}
