/**
 * REPEAT EXECUTOR - Loop until condition or count
 *
 * Foundation of iterative intelligence:
 * - DIV loop: repeat until validation passes
 * - Retry logic: repeat until success
 * - Refinement: repeat until quality threshold
 *
 * Options:
 * - times: Maximum iterations
 * - until: Stop when condition is true
 * - while: Continue while condition is true
 *
 * Example:
 * repeat(improveQuality, {
 *   until: (exec) => exec.get('quality', 'score') > 0.9,
 *   times: 10
 * })
 */
import { Execution } from '../Execution';
import { Executor } from '../types';
export declare const repeat: <T>(executor: Executor<T, T>, options?: {
    until?: (execution: Execution) => boolean;
    while?: (execution: Execution) => boolean;
    times?: number;
}) => Executor<T, T>;
