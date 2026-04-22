/**
 * CONDITIONAL EXECUTOR - Branch based on condition
 *
 * Core Bitcode execution control:
 * - Skip steps when not needed
 * - Choose strategies based on context
 * - Handle errors gracefully
 *
 * Example:
 * conditional(
 *   (input, exec) => exec.get('validation', 'passed'),
 *   proceedToShipping,
 *   handleValidationFailure
 * )
 */
import { Execution } from '../Execution';
import { Executor } from '../types';
export declare const conditional: <T>(condition: (input: T, execution: Execution) => boolean | Promise<boolean>, thenExecutor: Executor<T, T>, elseExecutor?: Executor<T, T>) => Executor<T, T>;
