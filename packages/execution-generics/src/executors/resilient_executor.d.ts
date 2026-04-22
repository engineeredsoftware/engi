/**
 * Resilient Executor
 *
 * Production-grade executor with automatic retry, exponential backoff,
 * circuit breaker pattern, and comprehensive error recovery for GA-1.
 *
 * @doc-code
 * type: executor
 * category: resilience
 * pattern: error-recovery
 */
import { Executor, Execution } from '../index';
/**
 * Retry configuration options
 */
export interface RetryOptions {
    /** Maximum number of retry attempts (default: 3) */
    maxAttempts?: number;
    /** Initial backoff delay in milliseconds (default: 1000) */
    initialDelay?: number;
    /** Maximum backoff delay in milliseconds (default: 30000) */
    maxDelay?: number;
    /** Backoff multiplier (default: 2 for exponential) */
    backoffMultiplier?: number;
    /** Function to determine if error is retryable */
    shouldRetry?: (error: Error, attempt: number) => boolean;
    /** Jitter to add randomness to delays (0-1, default: 0.1) */
    jitter?: number;
}
/**
 * Circuit breaker configuration
 */
export interface CircuitBreakerOptions {
    /** Failure threshold to open circuit (default: 5) */
    failureThreshold?: number;
    /** Time window for counting failures in ms (default: 60000) */
    failureWindow?: number;
    /** Recovery timeout before attempting half-open state in ms (default: 30000) */
    recoveryTimeout?: number;
    /** Success threshold to close circuit from half-open (default: 2) */
    successThreshold?: number;
}
/**
 * Resilient executor configuration
 */
export interface ResilientExecutorConfig {
    /** Retry configuration */
    retry?: RetryOptions;
    /** Circuit breaker configuration */
    circuitBreaker?: CircuitBreakerOptions;
    /** Timeout for each execution attempt in milliseconds */
    timeout?: number;
    /** Dead letter queue handler for failed executions */
    onDeadLetter?: (input: any, error: Error, execution: Execution) => Promise<void>;
}
/**
 * Circuit breaker states
 */
declare enum CircuitState {
    CLOSED = "closed",
    OPEN = "open",
    HALF_OPEN = "half_open"
}
/**
 * Creates a resilient executor with retry logic and circuit breaker
 */
export declare class ResilientExecutor<TInput = any, TOutput = any> {
    private readonly innerExecutor;
    private readonly config;
    private readonly circuitBreaker?;
    private readonly retryConfig;
    constructor(executor: Executor<TInput, TOutput>, config?: ResilientExecutorConfig);
    execute(input: TInput, execution: Execution): Promise<TOutput>;
    private executeWithResilience;
    /**
     * Get circuit breaker state if configured
     */
    getCircuitState(): CircuitState | undefined;
}
/**
 * Factory function for creating resilient executors
 */
export declare function withResilience<TInput = any, TOutput = any>(executor: Executor<TInput, TOutput>, config?: ResilientExecutorConfig): Executor<TInput, TOutput>;
/**
 * Retry-only wrapper (simpler than full resilience)
 */
export declare function withRetry<TInput = any, TOutput = any>(executor: Executor<TInput, TOutput>, options?: RetryOptions): Executor<TInput, TOutput>;
/**
 * Timeout-only wrapper
 */
export declare function withTimeout<TInput = any, TOutput = any>(executor: Executor<TInput, TOutput>, timeoutMs: number): Executor<TInput, TOutput>;
export {};
