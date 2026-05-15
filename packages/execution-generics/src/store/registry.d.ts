/**
 * Execution Store Registry — Canonical Namespaces and Typed Shapes
 *
 * Centralized constants and helper types for Execution.store/get keys.
 * Keep all namespaces stable and discoverable to prevent drift.
 *
 * Usage:
 *  - Import a namespace constant (e.g., NS_VALIDATION_READY_TO_FINISH)
 *  - Prefer helper setters/getters where available for typed access
 *  - When storing complex agent outputs, reference the agent's Output type
 */
import type { Execution } from '../Execution';
import type { StorableValue } from '../types';
/**
 * Namespace for the ReadyToFinish agent in the Validation phase
 * Stores the final readiness decision for header rendering and routing
 */
/**
 * Pipeline-specific ReadyToFinish namespaces for maximal clarity.
 * Prefer these over any generic alias.
 */
export declare const NS_EXEC_ASSET_PACK_VALIDATION_READY_TO_FINISH: "execution-asset-pack-pipeline-phase-validation-ready-to-finish-agent";
export declare const NS_EXEC_MEASURE_VALIDATION_READY_TO_FINISH: "execution-measure-pipeline-phase-validation-ready-to-finish-agent";
/**
 * Generic ReadyToFinish namespace. Use pipeline-specific constants instead.
 */
export declare const NS_VALIDATION_READY_TO_FINISH: "execution-asset-pack-pipeline-phase-validation-ready-to-finish-agent";
/**
 * Generic shape for ReadyToFinish decision. Prefer specializing via generics with
 * the agent's structured Output type where available.
 */
export type ValidationReadyToFinish<TAssessment = unknown, TResult = unknown> = {
    approved: boolean;
    assessment?: TAssessment | null;
    confidence?: number | null;
    result?: TResult | null;
    timestamp?: string;
};
/**
 * Store the ReadyToFinish decision (typed wrapper). Callers should pass the agent
 * Output-derived assessment/result types when possible.
 */
export declare function setValidationReadyToFinish<TA extends StorableValue = StorableValue, TR extends StorableValue = StorableValue>(exec: Execution, value: ValidationReadyToFinish<TA, TR>, pipeline?: 'asset-pack' | 'measure'): void;
/**
 * Retrieve the ReadyToFinish decision. Cast to specialized types at callsite when needed.
 */
export declare function getValidationReadyToFinish<TA extends StorableValue = StorableValue, TR extends StorableValue = StorableValue>(exec: Execution, pipeline?: 'asset-pack' | 'measure'): ValidationReadyToFinish<TA, TR> | undefined;
/**
 * Canonical namespace index — guides discoverability of stored state.
 * Keep this list curated and in sync with pipelines.
 */
export declare const EXECUTION_NAMESPACES: {
    readonly execution: readonly ["correlationId", "id", "dataStream"];
    readonly pipeline: readonly ["input"];
    readonly source: readonly ["connectionId", "owner", "name", "branch", "commit"];
    readonly task: readonly ["description"];
    readonly config: readonly ["computerUseReadMeasurementEnabled", "iterationCount", "mcpConfig"];
    readonly attachments: readonly ["list"];
    readonly evidence_documents: readonly ["list"];
    readonly 'route/preprocessed': readonly ["assetPackWrittenAsset", "evidence_documents"];
    readonly 'finish/asset_pack_completion': readonly ["summary", "processingStats", "repoSnapshot", "writtenAssets", "read", "writtenAssetType"];
    readonly postprocessed: readonly ["result"];
    readonly "execution-asset-pack-pipeline-phase-validation-ready-to-finish-agent": readonly ["approved", "confidence", "assessment", "result", "timestamp"];
    readonly "execution-measure-pipeline-phase-validation-ready-to-finish-agent": readonly ["approved", "confidence", "assessment", "result", "timestamp"];
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
 * nsAgent('asset-pack','validation','ready-to-finish-agent')
 *   -> execution-asset-pack-pipeline-phase-validation-ready-to-finish-agent
 */
export declare function nsAgent(pipeline: 'asset-pack' | 'measure', phase: string, agent: string): string;
