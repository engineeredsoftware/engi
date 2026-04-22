/**
 * File Diff Integration for PTRR Agents
 *
 * Automatically streams file diffs when tools execute during PTRR steps.
 * Integrates file change tracker with streaming system.
 *
 * @package @bitcode/agent-generics
 */
import type { Execution } from '@bitcode/execution-generics';
/**
 * Post-step hook for streaming file diffs
 *
 * Call this after each PTRR step (Plan/Try/Refine/Retry) completes.
 * Extracts file changes from usedTools and streams them.
 */
export declare function streamFileChangesAfterStep(execution: Execution, stepResult: any, context: {
    agent: string;
    step: 'Plan' | 'Try' | 'Refine' | 'Retry';
}): Promise<void>;
/**
 * Hook into agent step execution
 *
 * Wraps a step executor to automatically stream file diffs after execution.
 */
export declare function withFileDiffStreaming<TInput, TOutput>(stepExecutor: (input: TInput, execution: Execution) => Promise<TOutput>, stepName: 'Plan' | 'Try' | 'Refine' | 'Retry'): (input: TInput, execution: Execution) => Promise<TOutput>;
