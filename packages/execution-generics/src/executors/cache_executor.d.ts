/**
 * CACHE EXECUTOR - Memoize results in execution
 *
 * Pure functional caching using execution storage.
 * Perfect for expensive operations:
 * - LLM generations with same prompt
 * - File analysis results
 * - Complex computations
 *
 * Example:
 * cache(
 *   'analysis-cache',
 *   performAnalysis,
 *   (input) => `${input.file}:${input.version}`
 * )
 */
import { Executor, StorableValue } from '../types';
export declare const cache: <T, R extends StorableValue>(cacheId: string, executor: Executor<T, R>, keyGenerator: (input: T) => string) => Executor<T, R>;
