/**
 * Guided Pipeline Execution
 *
 * The gate guidance layer that manages DDD (Design → Develop → Digest) sequencing.
 * Guides pipeline execution through gates, enforcing restrictions and transitions.
 * "Guiding" is what "gating" gives experientially.
 *
 * @package @bitcode/pipelines-generics
 */
import { Executor } from '@bitcode/execution-generics';
import { Execution } from '@bitcode/execution-generics/Execution';
import type { Gate, GateState, GateConfig } from '../gate-system/types';
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
export declare function storeGateState(execution: Execution, state: GateState): void;
/**
 * Get current gate from execution
 */
export declare function getCurrentGate(execution: Execution): Gate;
/**
 * Get gate state from execution
 */
export declare function getGateState(execution: Execution): GateState;
/**
 * Transition to next gate (operator-triggered)
 * Called when user clicks "Ready to Develop" / "Ready to Digest" / "Finish"
 */
export declare function transitionToNextGate(execution: Execution, nextGate: Gate): void;
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
export declare function createGuidedPipelineExecution<TInput, TOutput>(gatePipelines: {
    Design?: Executor<TInput, TOutput>;
    Develop: Executor<TInput, TOutput>;
    Digest?: Executor<TInput, TOutput>;
}): Executor<TInput, TOutput>;
/**
 * Gate preprocess - Apply gate-specific configuration to input
 * Use this in iteration preprocess to enforce gate restrictions
 */
export declare function gatePreprocess<TInput>(input: TInput, execution: Execution): TInput;
/**
 * Check if current gate is collaborative
 */
export declare function isCollaborativeGate(execution: Execution): boolean;
/**
 * Get self-instruct threshold for current gate
 */
export declare function getSelfInstructThreshold(execution: Execution): number | undefined;
export type { Gate, GateState, GateConfig } from '../gate-system/types';
export { GATE_CONFIGS, GATE_TRANSITIONS, initializeGateState } from '../gate-system/types';
