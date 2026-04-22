/**
 * Execution Debug Utilities
 *
 * Lightweight helpers to control verbose debug logging across
 * pipeline/phase/agent executor composition without polluting
 * execution-generics primitives.
 */
import type { PipelineExecution } from './PipelineExecution';
import type { Executor } from '@bitcode/execution-generics';
/**
 * Check whether debug logging is enabled for this execution.
 * Sources (in precedence order):
 * - execution.findUp('config','debug') === true
 * - process.env.BITCODE_EXECUTION_DEBUG === 'true'
 * - process.env.LOG_LEVEL === 'debug'
 */
export declare function isExecutionDebugEnabled(execution: PipelineExecution | {
    findUp?: Function;
}): boolean;
/**
 * Enable debug logging by storing a flag in execution config.
 */
export declare function enableExecutionDebug(execution: PipelineExecution & {
    store: Function;
}, enabled?: boolean): void;
/**
 * Wrap an Executor with step-level debug logging.
 * Provide phase and step name for structured trace output.
 */
export declare function debugWrapExecutorStep(phase: string, stepName: string, exec: Executor<any, any>): Executor<any, any>;
