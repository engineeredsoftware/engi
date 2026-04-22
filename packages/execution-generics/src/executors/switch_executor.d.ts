/**
 * SWITCH EXECUTOR - Pattern matching for execution
 *
 * Structured branching for multiple paths:
 * - Route by agent type
 * - Handle different file types
 * - Process by category
 *
 * Example:
 * switchExecutor(
 *   (input) => input.toolType,
 *   {
 *     'filesystem': fileSystemTool,
 *     'git': gitTool,
 *     'llm': llmTool
 *   },
 *   defaultTool
 * )
 */
import { Execution } from '../Execution';
import { Executor } from '../types';
export declare const switchExecutor: <T, R>(selector: (input: T, execution: Execution) => string | Promise<string>, cases: Record<string, Executor<T, R>>, defaultCase?: Executor<T, R>) => Executor<T, R>;
