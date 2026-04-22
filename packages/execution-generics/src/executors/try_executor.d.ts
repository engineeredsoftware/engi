/**
 * TRY EXECUTOR - Execute with error handling
 *
 * Catch and handle errors without breaking the flow:
 * - Log errors to execution
 * - Provide fallback values
 * - Transform errors to results
 *
 * Example:
 * tryExecutor(
 *   riskyOperation,
 *   async (error, input, exec) => {
 *     exec.store('errors', 'lastError', error.message);
 *     return fallbackOperation(input, exec);
 *   }
 * )
 */
import { Execution } from '../Execution';
import { Executor } from '../types';
export declare const tryExecutor: <T>(executor: Executor<T, T>, errorHandler: (error: Error, input: T, execution: Execution) => T | Promise<T>) => Executor<T, T>;
