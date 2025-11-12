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

export const branch = <T, R>(
  ...branches: Array<{
    condition: (input: T, execution: Execution) => boolean | Promise<boolean>;
    executor: Executor<T, R>;
  }>
): Executor<T, R | undefined> =>
  async (input, execution) => {
    for (let i = 0; i < branches.length; i++) {
      const { condition, executor } = branches[i];
      if (await condition(input, execution)) {
        return executor(input, execution.child(`branch-${i}`));
      }
    }
    return undefined;
  };