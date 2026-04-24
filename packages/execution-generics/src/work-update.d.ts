/**
 * Work Update Contracts
 *
 * Work updates provide real-time visibility into what an execution is doing.
 * They are emitted during execution (agent steps, DIV iterations) and streamed
 * to the UI via the ExecutionStreamAdapter when stored under the
 * `work-update` namespace.
 */
import type { Execution } from './Execution';
import type { StorableObject, StorableValue } from './types';
import { type FileChange } from './store/file-change-tracker';
/**
 * Shared tool usage summary.
 */
export interface ToolUsageUpdate extends StorableObject {
    name: string;
    description?: string;
    successful?: boolean;
    metadata?: Record<string, StorableValue>;
}
/**
 * Base shape for all work updates.
 */
export interface WorkUpdate extends StorableObject {
    id: string;
    timestamp: string;
    prose: string;
    files: FileChange[];
    tools: ToolUsageUpdate[];
    meta?: Record<string, StorableValue>;
}
/**
 * Work update emitted after an agent step completes (Plan/Try/Refine/Retry).
 */
export interface AgentStepWorkUpdate extends WorkUpdate {
    phase?: string;
    agent: string;
    step: 'Plan' | 'Try' | 'Refine' | 'Retry';
}
/**
 * Work update emitted after a SDIVF DIV iteration completes (Validation ready-to-instruct).
 * The prose is the self-instruction text for the next iteration.
 */
export interface SDIVFPipelineUpdate extends WorkUpdate {
    iteration: number;
    selfInstruction: string;
    confidence: number;
    suggestions: string[];
}
export type SDIVSPipelineUpdate = SDIVFPipelineUpdate;
interface IterationAggregateState {
    files: FileChange[];
    tools: ToolUsageUpdate[];
}
/**
 * Store the latest agent step work update on the root execution.
 * Existing file-change snapshots on the step execution are cleared to avoid
 * bleeding state into future updates.
 */
export declare function storeAgentStepWorkUpdate(execution: Execution, update: AgentStepWorkUpdate): void;
/**
 * Append (or overwrite) the work update for a specific DIV iteration.
 * Also store the latest iteration update for quick access.
 */
export declare function storeIterationWorkUpdate(execution: Execution, update: SDIVFPipelineUpdate): void;
/**
 * Helper to build an AgentStepWorkUpdate using the data captured on the step
 * execution. This clears step-level file change buffers after extraction.
 */
export declare function buildAgentStepWorkUpdate(params: {
    execution: Execution;
    agent: string;
    phase?: string;
    step: 'Plan' | 'Try' | 'Refine' | 'Retry';
    prose: string;
    tools: ToolUsageUpdate[];
    meta?: Record<string, StorableValue>;
}): AgentStepWorkUpdate;
/**
 * Helper to build a SDIVF iteration update.
 */
export declare function buildSDIVFPipelineUpdate(params: {
    execution: Execution;
    iteration: number;
    prose: string;
    selfInstruction: string;
    confidence: number;
    suggestions: string[];
    tools: ToolUsageUpdate[];
    meta?: Record<string, StorableValue>;
}): SDIVFPipelineUpdate;
export declare const buildSDIVSPipelineUpdate: typeof buildSDIVFPipelineUpdate;
export declare function accumulateIterationWorkContext(execution: Execution, files: FileChange[], tools: ToolUsageUpdate[]): void;
export declare function consumeIterationWorkContext(execution: Execution): IterationAggregateState;
export {};
