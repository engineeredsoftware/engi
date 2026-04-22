/**
 * EXECUTION - The Accumulating Process
 *
 * A pure state container that accumulates data with namespaced storage.
 * Knows nothing about domains - just stores and retrieves data.
 *
 * This is where all intelligence discovered and generated during pipeline executions
 * is accumulated. Every agent, tool, phase, and step stores its findings here,
 * building a complete tree of execution history.
 *
 * @category Core
 * @priority Critical
 */
import { ExecutionStorageOptions, ExecutionStorageResult } from './storage/StorageDestination';
import { StorableValue } from './types';
/**
 * EXECUTION - Pure state accumulation
 *
 * Stores data in namespaced maps with optional persistence control.
 * No domain knowledge. No special handling. Just state.
 * No registries - those belong at higher layers (PromptExecution, PipelineExecution).
 *
 * See also: store registry for canonical namespaces and typed helpers
 * `@bitcode/execution-generics/src/store/registry.ts`.
 *
 * Used by:
 * - Agents: Store plans, results, refinements
 * - Tools: Store outputs, metrics, errors
 * - Phases: Store progress, validation results
 * - Pipelines: Store overall state, iteration counts
 */
export declare class Execution {
    readonly id: string;
    readonly parent?: Execution;
    readonly children: Map<string, Execution>;
    private stores;
    private storageMetadata;
    constructor(id: string, parent?: Execution);
    /**
     * Store a value in a namespace
     *
     * Default: Ephemeral (memory only) - just pass namespace, key, value
     * With options: Control destination (memory, persistent, or both)
     *
     * Examples:
     * - execution.store('agent', 'plan', planData)  // Memory only
     * - await execution.store('patches', 'file.ts', patch, {  // S3 only
     *     destinations: [ExecutionStorageDestination.PERSISTENT]
     *   })
     */
    store<T extends StorableValue = StorableValue>(namespace: string, key: string, value: T): void;
    store<T extends StorableValue = StorableValue>(namespace: string, key: string, value: T, options: ExecutionStorageOptions): Promise<ExecutionStorageResult>;
    /**
     * Store with destinations control (internal)
     *
     * Routes storage based on destinations array:
     * - EPHEMERAL: Store in memory map
     * - PERSISTENT: Store via artifacts package to S3/blob
     * - Both: Store in both locations
     */
    private storeWithDestinations;
    /**
     * Build storage key for persistent backend
     *
     * Creates clean S3-compatible keys from execution context.
     * Removes special characters to ensure valid object keys.
     */
    private buildStorageKey;
    /**
     * Get a value from a namespace
     *
     * Note: Only retrieves from ephemeral storage.
     * Persistent storage is write-only for execution tracking.
     * This is intentional - artifacts are for archival, not retrieval.
     */
    get<T extends StorableValue = StorableValue>(namespace: string, key: string): T | undefined;
    /**
     * Get storage metadata
     */
    getStorageMetadata(namespace: string, key: string): ExecutionStorageResult | undefined;
    /**
     * Get all values in a namespace
     */
    getAll<T extends StorableValue = StorableValue>(namespace: string): Map<string, T> | undefined;
    /**
     * Check if a namespace exists
     */
    hasNamespace(namespace: string): boolean;
    /**
     * Get all namespace names
     */
    getNamespaces(): string[];
    /**
     * Create a child execution
     *
     * Used by combinators to create execution subtrees:
     * - sequential: child('seq-0'), child('seq-1'), ...
     * - parallel: child('par-0'), child('par-1'), ...
     * - repeat: child('iter-0'), child('iter-1'), ...
     */
    child(id: string): Execution;
    /**
     * Get root execution
     */
    getRoot(): Execution;
    /**
     * Find data up the execution tree
     */
    findUp<T extends StorableValue>(namespace: string, key: string): T | undefined;
    /**
     * Get execution path from root
     */
    getPath(): string[];
    /**
     * Get a summary of stored data
     */
    summary(): {
        namespaces: string[];
        childCount: number;
        depth: number;
    };
}
/**
 * Create a root execution
 *
 * Starting point for any pipeline, agent, or tool execution.
 * The id becomes the root of the execution tree.
 */
export declare function createExecution(id: string): Execution;
