/**
 * GATE EXECUTOR - One-time conditional execution
 *
 * Stores gate state in execution to avoid mutable closure.
 * Once opened/closed, stays that way for the execution.
 *
 * Use cases:
 * - Feature flags
 * - One-time setup
 * - Circuit breakers
 *
 * Example:
 * gate(
 *   'workspace-setup',
 *   async (input, exec) => !exec.get('env', 'CI'),
 *   setupWorkspace
 * )
 */
import { Execution } from '../Execution';
import { Executor } from '../types';
export declare const gate: <T>(gateId: string, shouldOpen: (input: T, execution: Execution) => boolean | Promise<boolean>, gatedExecutor: Executor<T, T>) => Executor<T, T>;
