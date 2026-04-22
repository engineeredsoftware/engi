/**
 * EXECUTION GENERICS TYPE DEFINITIONS
 *
 * Core types for the execution primitive system
 */
import { Execution } from './Execution';
/**
 * The fundamental building block - just an async function
 */
export type Executor<TInput = any, TOutput = any> = (input: TInput, execution: Execution) => Promise<TOutput>;
/**
 * Base storage value constraint - all values must be serializable
 */
export type StorableValue = string | number | boolean | null | undefined | StorableObject | StorableArray;
export interface StorableObject {
    [key: string]: StorableValue;
}
export interface StorableArray extends Array<StorableValue> {
}
/**
 * Type-safe storage interface
 */
export interface TypedStore<T extends StorableValue = StorableValue> {
    set(key: string, value: T): void;
    get(key: string): T | undefined;
    has(key: string): boolean;
    delete(key: string): boolean;
    clear(): void;
    entries(): IterableIterator<[string, T]>;
}
/**
 * Namespace storage registry
 */
export interface NamespaceRegistry {
    getOrCreate<T extends StorableValue>(namespace: string): TypedStore<T>;
    has(namespace: string): boolean;
    delete(namespace: string): boolean;
    clear(): void;
}
/**
 * Typed namespace definitions for common patterns
 */
export interface ExecutionNamespaces {
    'pipeline:state': {
        current_phase: string;
        iteration_count: number;
        start_time: number;
    };
    'phase:discovery': {
        files_analyzed: number;
        patterns_found: string[];
    };
    'agent:results': {
        [agentName: string]: StorableValue;
    };
    'tool:outputs': {
        [toolName: string]: StorableValue;
    };
}
/**
 * Type helper for namespace keys
 */
export type KnownNamespace = keyof ExecutionNamespaces;
/**
 * Type helper for namespace values
 */
export type NamespaceValue<K extends KnownNamespace> = ExecutionNamespaces[K];
