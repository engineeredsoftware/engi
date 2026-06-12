/**
 * Wait for Instruction Executor
 *
 * Pauses execution waiting for user instruction to be added to execution state.
 * Used after validation when selfInstruction confidence < threshold.
 */
import type { Executor } from '@bitcode/execution-generics';
export interface WaitForInstructionOptions {
    confidence: number;
    timeoutMs?: number;
    checkIntervalMs?: number;
}
/**
 * Calculate timeout based on confidence (soft exponential inverse)
 */
export declare function calculateInstructionTimeout(confidence: number): number;
/**
 * Executor that waits for instruction to be added to execution state
 *
 * Checks execution.get('instructions', 'pending') in a loop.
 * Returns when instruction found, skip signaled, or timeout.
 */
export declare function waitForInstruction(options: WaitForInstructionOptions): Executor<any, any>;
