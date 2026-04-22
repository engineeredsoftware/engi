/**
 * BRANCH EXECUTOR - Multiple conditional paths
 *
 * Execute first matching branch:
 * - Multiple strategy selection
 * - Fallthrough conditionals
 * - Complex decision trees
 *
 * Example:
 * branch(
 *   { condition: isSimple, executor: simpleStrategy },
 *   { condition: isModerate, executor: moderateStrategy },
 *   { condition: isComplex, executor: complexStrategy }
 * )
 */
import { Execution } from '../Execution';
import { Executor } from '../types';
export declare const branch: <T, R>(...branches: Array<{
    condition: (input: T, execution: Execution) => boolean | Promise<boolean>;
    executor: Executor<T, R>;
}>) => Executor<T, R | undefined>;
