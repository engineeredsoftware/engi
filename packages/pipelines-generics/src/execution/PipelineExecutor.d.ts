/**
 * PipelineExecutor - Orchestrates pipeline execution with short-circuit support
 *
 * Provides phase sequencing, agent execution, and automatic short-circuit
 * detection with refund handling.
 */
import { PipelineExecution } from './PipelineExecution';
import { ShortCircuitSignal } from '@bitcode/execution-generics';
import { Executor } from '@bitcode/execution-generics';
export interface PhaseConfig {
    phaseName: string;
    sequence: AgentStep[];
    allowShortCircuit?: boolean;
    shortCircuitHandler?: (signal: ShortCircuitSignal) => Promise<void>;
}
export interface AgentStep {
    agent: string;
    parallel?: AgentStep[];
    input?: any;
}
export interface PhaseResult {
    success: boolean;
    shortCircuited?: boolean;
    shortCircuitReason?: string;
    metrics: {
        duration: number;
        agentsExecuted: number;
    };
}
/**
 * Pipeline executor that handles phase sequencing and short-circuits
 */
export declare class PipelineExecutor {
    private execution;
    constructor(execution: PipelineExecution);
    /**
     * Execute a single agent with short-circuit detection
     */
    executeAgent(agentName: string, input: any): Promise<any>;
    /**
     * Execute an agent step (single or parallel)
     */
    executeStep(step: AgentStep): Promise<any>;
    /**
     * Execute a complete phase with its sequence
     */
    executePhase(config: PhaseConfig): Promise<PhaseResult>;
}
/**
 * Create a phase runner function
 */
export declare function createPhaseRunner(config: PhaseConfig): Executor<any, PhaseResult>;
