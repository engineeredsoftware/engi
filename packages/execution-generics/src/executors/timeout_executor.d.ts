/**
 * TIMEOUT EXECUTOR - Time-bounded execution
 *
 * Protect against long-running operations:
 * - LLM calls with time limits
 * - External API timeouts
 * - Bounded computations
 *
 * Example:
 * timeout(
 *   llmGeneration,
 *   30000,  // 30 seconds
 *   async (input, exec) => {
 *     exec.store('timeout', 'occurred', true);
 *     return { ...input, timedOut: true };
 *   }
 * )
 */
import { Execution } from '../Execution';
import { Executor } from '../types';
export declare const timeout: <T>(executor: Executor<T, T>, timeoutMs: number, onTimeout?: (input: T, execution: Execution) => T | Promise<T>) => Executor<T, T>;
