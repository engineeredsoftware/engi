/**
 * Gate Types
 *
 * Design → Develop → Digest (DDD) gate system.
 * Each gate runs the full SDIVS pipeline with different file access controls.
 *
 * NOTE: Gate type is defined in ./types/primitives.ts (SSOT)
 * Import from there or from package root.
 *
 * @package @bitcode/pipelines-generics
 */
import type { Gate, MetaPhase } from '../types/primitives';
import type { Execution } from '@bitcode/execution-generics';
export type { Gate, MetaPhase };
/**
 * Gate configuration
 */
export interface GateConfig {
    /**
     * Which files can be edited in this gate
     */
    allowedFilePatterns: string[];
    /**
     * Is this a collaborative gate (requires user approval)?
     */
    collaborative: boolean;
    /**
     * Self-instruct confidence threshold for autonomous operation
     * Only applies to Develop gate
     */
    selfInstructThreshold?: number;
    /**
     * Primary document being edited
     */
    primaryDocument?: string;
}
export type MetaPhaseConfig = GateConfig;
/**
 * Gate configurations
 */
export declare const GATE_CONFIGS: Record<Gate, GateConfig>;
export declare const META_PHASE_CONFIGS: Record<Gate, GateConfig>;
/**
 * Gate transitions are USER-GATED in GA-1
 * User clicks "Ready to Develop" / "Ready to Digest" / "Ship"
 * No automatic validation-based transitions
 */
export interface GateTransition {
    from: Gate;
    to: Gate;
    userAction: string;
    description: string;
}
export declare const GATE_TRANSITIONS: GateTransition[];
export declare const META_PHASE_USER_GATES: GateTransition[];
/**
 * Automated transitions are disabled for GA-1; transitions are gate/guide user actions.
 */
export interface MetaPhaseTransition {
    from: MetaPhase;
    to: MetaPhase;
    condition: (execution: Execution) => boolean;
    reason: string;
}
export declare const META_PHASE_TRANSITIONS: MetaPhaseTransition[];
/**
 * Gate state tracking
 */
export interface GateState {
    current: Gate;
    history: Array<{
        gate: Gate;
        startedAt: string;
        completedAt?: string;
        transitionReason?: string;
    }>;
    readyToTransition: boolean;
    nextGate?: Gate;
}
export type MetaPhaseState = GateState;
/**
 * Initialize gate state
 */
export declare function initializeGateState(startingGate?: Gate): GateState;
export declare const initializeMetaPhaseState: typeof initializeGateState;
/**
 * Transition to next meta-phase
 */
export declare function transitionMetaPhase(currentState: MetaPhaseState, execution: any): MetaPhaseState;
/**
 * Check if ready to transition
 */
export declare function checkMetaPhaseTransition(currentPhase: MetaPhase, execution: any): {
    ready: boolean;
    nextPhase?: MetaPhase;
    reason?: string;
};
