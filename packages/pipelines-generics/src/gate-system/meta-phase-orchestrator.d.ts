/**
 * Retained meta-phase orchestrator
 *
 * Sequences Design → Develop → Digest meta-phases.
 * Each meta-phase runs the retained SDIVS reference family with appropriate file gates.
 *
 * @package @bitcode/pipelines-generics
*/
import { Executor } from '@bitcode/execution-generics';
import { Execution } from '@bitcode/execution-generics/Execution';
import type { MetaPhase, MetaPhaseState } from './types';
/**
 * Attempt a meta-phase transition based on execution state.
 * Returns true if a transition occurred.
 */
export declare function attemptMetaPhaseTransition(execution: Execution): boolean;
/**
 * Store meta-phase state in execution
 */
export declare function storeMetaPhaseState(execution: Execution, state: MetaPhaseState): void;
/**
 * Get meta-phase state from execution
 */
export declare function getMetaPhaseState(execution: Execution): MetaPhaseState;
/**
 * Get current meta-phase
 */
export declare function getCurrentMetaPhase(execution: Execution): MetaPhase;
/**
 * Transition meta-phase (USER-TRIGGERED in GA-1)
 * Called when user clicks "Ready to Develop" / "Ready to Digest" / "Ship"
 */
export declare function transitionToNextMetaPhase(execution: Execution, nextPhase: MetaPhase): void;
/**
 * Create meta-phase aware retained SDIVS reference pipeline
 *
 * This wraps a retained SDIVS reference pipeline to add meta-phase orchestration.
 */
export declare function createMetaPhasePipeline<TInput, TOutput>(sdivsPipeline: Executor<TInput, TOutput>): Executor<TInput, TOutput>;
/**
 * Meta-phase preprocess hook
 *
 * Sets up file gates and configuration for the current meta-phase.
 * Use this in your SDIVS pipeline's preprocess step.
 */
export declare function metaPhasePreprocess<TInput>(input: TInput, execution: Execution): TInput;
/**
 * Check if current meta-phase is collaborative
 */
export declare function isCollaborativePhase(execution: Execution): boolean;
/**
 * Get self-instruct threshold for current meta-phase
 */
export declare function getSelfInstructThreshold(execution: Execution): number | undefined;
