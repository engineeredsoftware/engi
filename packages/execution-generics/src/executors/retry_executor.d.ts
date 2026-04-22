/**
 * RETRY EXECUTOR - Resilient execution with backoff
 *
 * Handle transient failures gracefully:
 * - API rate limits
 * - Network errors
 * - Temporary unavailability
 *
 * Options:
 * - times: Maximum retry attempts
 * - delay: Initial delay in ms
 * - backoff: Multiplier for exponential backoff
 * - shouldRetry: Custom retry logic
 *
 * Example:
 * retry(apiCall, {
 *   times: 3,
 *   delay: 1000,
 *   backoff: 2,  // 1s, 2s, 4s
 *   shouldRetry: (error) => error.code === 'RATE_LIMIT'
 * })
 */
import { Executor } from '../types';
export declare const retry: <T>(executor: Executor<T, T>, options?: {
    times?: number;
    delay?: number;
    backoff?: number;
    shouldRetry?: (error: Error, attempt: number) => boolean;
}) => Executor<T, T>;
