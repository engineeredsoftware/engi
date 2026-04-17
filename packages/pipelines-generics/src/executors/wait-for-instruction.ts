/**
 * Wait for Instruction Executor
 *
 * Pauses execution waiting for user instruction to be added to execution state.
 * Used after validation when selfInstruction confidence < threshold.
 */

import { Execution, Executor } from '@bitcode/execution-generics';

export interface WaitForInstructionOptions {
  confidence: number;
  timeoutMs?: number;
  checkIntervalMs?: number;
}

/**
 * Calculate timeout based on confidence (soft exponential inverse)
 */
export function calculateInstructionTimeout(confidence: number): number {
  if (confidence === 0) return Infinity;  // Must interact, no timeout

  const baseTime = 200;  // seconds at confidence ~0
  const minTime = 20;    // seconds at confidence 1
  const k = 3;           // Decay rate

  const seconds = minTime + (baseTime - minTime) * Math.exp(-k * confidence);
  return seconds * 1000;  // Convert to ms
}

/**
 * Executor that waits for instruction to be added to execution state
 *
 * Checks execution.get('instructions', 'pending') in a loop.
 * Returns when instruction found, skip signaled, or timeout.
 */
export function waitForInstruction(
  options: WaitForInstructionOptions
): Executor<any, any> {
  return async (input, execution: Execution) => {
    const timeout = options.timeoutMs ?? calculateInstructionTimeout(options.confidence);
    const interval = options.checkIntervalMs ?? 100;  // Check execution state every 100ms
    const startTime = Date.now();

    // Store waiting state
    execution.store('pipeline', 'awaitingInstruction', true);
    execution.store('pipeline', 'instructionWaitStart', startTime);

    while (true) {
      // Check for new instruction in execution STATE
      const newInstruction = execution.get('instructions', 'pending');

      if (newInstruction) {
        // Found - move to current and clear pending
        execution.store('instructions', 'current', newInstruction);
        execution.store('instructions', 'pending', null);
        execution.store('pipeline', 'awaitingInstruction', false);

        return {
          ...input,
          instruction: newInstruction  // Add to next iteration input
        };
      }

      // Check for skip signal ("No Notes" clicked)
      const skipSignal = execution.get('instructions', 'skip');
      if (skipSignal) {
        execution.store('instructions', 'skip', null);  // Clear
        execution.store('pipeline', 'awaitingInstruction', false);

        return input;  // Proceed without instruction
      }

      // Check timeout
      if (timeout !== Infinity && Date.now() - startTime > timeout) {
        execution.store('pipeline', 'awaitingInstruction', false);
        execution.store('pipeline', 'instructionTimeout', true);

        return input;  // Timer expired, proceed without instruction
      }

      // Wait before next check
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  };
}
