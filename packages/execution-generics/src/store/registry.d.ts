/**
 * Execution Store Registry — Canonical Namespaces and Typed Shapes
 *
 * Centralized constants and helper types for Execution.store/get keys.
 * Keep all namespaces stable and discoverable to prevent drift.
 *
 * Usage:
 *  - Import a namespace constant (e.g., NS_VALIDATION_RTS)
 *  - Prefer helper setters/getters where available for typed access
 *  - When storing complex agent outputs, reference the agent's Output type
 */
import type { Execution } from '../Execution';
import type { StorableValue } from '../types';
/**
 * Namespace for the Ready-To-Ship agent in the Validation phase
 * Stores the final readiness decision for header rendering and routing
 */
/**
 * Pipeline-specific RTS namespaces for maximal clarity.
 * Prefer these over any generic alias.
 */
export declare const NS_EXEC_DELIVERABLE_VALIDATION_RTS: "execution-deliverable-pipeline-phase-validation-ready-to-ship-agent";
export declare const NS_EXEC_MEASURE_VALIDATION_RTS: "execution-measure-pipeline-phase-validation-ready-to-ship-agent";
/**
 * Deprecated generic RTS namespace (pre‑GA1). Use pipeline-specific constants instead.
 */
export declare const NS_VALIDATION_RTS: "execution-deliverable-pipeline-phase-validation-ready-to-ship-agent";
/**
 * Generic shape for RTS decision. Prefer specializing via generics with
 * the agent's structured Output type where available.
 */
export type ValidationReadyToShip<TAssessment = unknown, TResult = unknown> = {
    approved: boolean;
    assessment?: TAssessment | null;
    confidence?: number | null;
    result?: TResult | null;
    timestamp?: string;
};
/**
 * Store the RTS decision (typed wrapper). Callers should pass the agent
 * Output-derived assessment/result types when possible.
 */
export declare function setValidationReadyToShip<TA extends StorableValue = StorableValue, TR extends StorableValue = StorableValue>(exec: Execution, value: ValidationReadyToShip<TA, TR>, pipeline?: 'deliverable' | 'measure'): void;
/**
 * Retrieve the RTS decision. Cast to specialized types at callsite when needed.
 */
export declare function getValidationReadyToShip<TA extends StorableValue = StorableValue, TR extends StorableValue = StorableValue>(exec: Execution, pipeline?: 'deliverable' | 'measure'): ValidationReadyToShip<TA, TR> | undefined;
/**
 * Canonical namespace index — guides discoverability of stored state.
 * Keep this list curated and in sync with pipelines.
 */
export declare const EXECUTION_NAMESPACES: {
    readonly execution: readonly ["correlationId", "id", "dataStream"];
    readonly pipeline: readonly ["input"];
    readonly source: readonly ["connectionId", "owner", "name", "branch", "commit"];
    readonly task: readonly ["description"];
    readonly config: readonly ["computeEnabled", "multiAgentEnabled", "iterationCount", "mcpConfig"];
    readonly attachments: readonly ["list"];
    readonly ai_documents: readonly ["list"];
    readonly 'route/preprocessed': readonly ["deliverables", "ai_documents"];
    readonly 'shipping/final_work_summary': readonly ["summary", "processingStats", "repoSnapshot", "deliverables"];
    readonly postprocessed: readonly ["result"];
    readonly "execution-deliverable-pipeline-phase-validation-ready-to-ship-agent": readonly ["approved", "confidence", "assessment", "result", "timestamp"];
    readonly "execution-measure-pipeline-phase-validation-ready-to-ship-agent": readonly ["approved", "confidence", "assessment", "result", "timestamp"];
};
/** Set execution identity fields */
export declare function setExecutionIdentity(exec: Execution, params: {
    id?: string;
    correlationId?: string;
}): void;
/** Get execution id (undefined if not set) */
export declare function getExecutionId(exec: Execution): string | undefined;
/** Get correlation id (undefined if not set) */
export declare function getCorrelationId(exec: Execution): string | undefined;
/**
 * Compute a canonical agent namespace for execution store keys.
 * Pattern: execution-<pipeline>-pipeline-phase-<phase>-<agent>
 *
 * Example:
 * nsAgent('deliverable','validation','ready-to-ship-agent')
 *   → execution-deliverable-pipeline-phase-validation-ready-to-ship-agent
 */
export declare function nsAgent(pipeline: 'deliverable' | 'measure', phase: string, agent: string): string;
