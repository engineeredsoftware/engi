/**
 * TEST UTILITIES - MODERN V1.0 EXCELLENCE
 * 
 * Shared test utilities for the engi codebase providing builders, factories,
 * helpers, and patterns for comprehensive test coverage with v1.0 abstractions.
 * 
 * @doc-test-utils
 * version: 1.0.0
 * patterns: ["builders", "factories", "helpers", "matchers"]
 * coverage: ["unit", "integration", "e2e", "performance"]
 */

import { vi, expect } from 'vitest';
import { PTRRStep, FailsafeGenerationStep, GenerationGenerationStep } from '@bitcode/agent-generics';
import { Execution } from '@bitcode/execution-generics';
import { Tool } from '@bitcode/tools-generics';

// ==================== TEST BUILDERS ====================

/**
 * Base builder class with common functionality
 */
export abstract class TestBuilder<T> {
  protected data: Partial<T> = {};

  with<K extends keyof T>(key: K, value: T[K]): this {
    this.data[key] = value;
    return this;
  }

  merge(partial: Partial<T>): this {
    this.data = { ...this.data, ...partial };
    return this;
  }

  abstract build(): T;
}

/**
 * Builder for PTRR contexts
 */
export class PTRRContextBuilder extends TestBuilder<any> {
  constructor() {
    super();
    this.data = {
      repository: {
        owner: 'test-org',
        name: 'test-repo',
        branch: 'main',
        connectionId: 12345
      },
      agent: 'test-agent',
      step: PTRRStep.PLAN,
      timestamp: new Date().toISOString()
    };
  }

  withRepository(repo: any): this {
    return this.with('repository', { ...this.data.repository, ...repo });
  }

  withAgent(agent: string): this {
    return this.with('agent', agent);
  }

  withStep(step: PTRRStep): this {
    return this.with('step', step);
  }

  build(): any {
    return { ...this.data };
  }
}

/**
 * Builder for agent step results
 */
export class StepResultBuilder extends TestBuilder<any> {
  constructor() {
    super();
    this.data = {
      success: true,
      data: {},
      metadata: {
        duration: 100,
        retries: 0
      }
    };
  }

  withSuccess(success: boolean): this {
    return this.with('success', success);
  }

  withData(data: any): this {
    return this.with('data', data);
  }

  withError(error: string): this {
    this.data.success = false;
    this.data.error = error;
    return this;
  }

  withMetadata(metadata: any): this {
    return this.with('metadata', { ...this.data.metadata, ...metadata });
  }

  build(): any {
    return { ...this.data };
  }
}

/**
 * Builder for tool responses
 */
export class ToolResponseBuilder extends TestBuilder<any> {
  constructor() {
    super();
    this.data = {
      success: true,
      result: {},
      timing: {
        start: Date.now(),
        end: Date.now() + 100,
        duration: 100
      }
    };
  }

  withResult(result: any): this {
    return this.with('result', result);
  }

  withError(error: any): this {
    this.data.success = false;
    this.data.error = error;
    return this;
  }

  withTiming(timing: any): this {
    return this.with('timing', { ...this.data.timing, ...timing });
  }

  build(): any {
    return { ...this.data };
  }
}

// ==================== MOCK FACTORIES ====================

/**
 * Factory for creating mock tools
 */
export class MockToolFactory {
  /**
   * Create a generic mock tool
   */
  static factoryTool<T = any>(name: string, defaultResponse?: T): Tool<any> {
    const mockFn = vi.fn().mockResolvedValue(defaultResponse || { success: true });
    
    class MockTool extends Tool<typeof mockFn> {
      use = mockFn;
      static metadata = { name, version: '1.0.0' };
    }
    
    return new MockTool();
  }

  /**
   * Create a mock tool that fails after N attempts
   */
  static factoryRetryTool(name: string, failCount: number): Tool<any> {
    let attempts = 0;
    const mockFn = vi.fn().mockImplementation(async () => {
      attempts++;
      if (attempts <= failCount) {
        throw new Error(`Attempt ${attempts} failed`);
      }
      return { success: true, attempts };
    });

    class RetryMockTool extends Tool<typeof mockFn> {
      use = mockFn;
      static metadata = { name, version: '1.0.0' };
    }

    return new RetryMockTool();
  }

  /**
   * Create a mock tool with custom behavior
   */
  static factoryCustomTool<T = any>(
    name: string, 
    implementation: (...args: any[]) => Promise<T>
  ): Tool<any> {
    const mockFn = vi.fn().mockImplementation(implementation);
    
    class CustomMockTool extends Tool<typeof mockFn> {
      use = mockFn;
      static metadata = { name, version: '1.0.0' };
    }
    
    return new CustomMockTool();
  }
}

/**
 * Factory for creating mock agents
 */
export class MockAgentFactory {
  static factoryAgent(config: {
    id: string;
    steps?: Partial<Record<PTRRStep, any>>;
    failsafeSteps?: Partial<Record<FailsafeGenerationStep, any>>;
    generationSteps?: Partial<Record<GenerationGenerationStep, any>>;
  }) {
    return {
      id: config.id,
      name: `Mock ${config.id}`,
      version: '1.0.0',
      steps: {
        [PTRRStep.PLAN]: config.steps?.[PTRRStep.PLAN] || vi.fn(),
        [PTRRStep.TRY]: config.steps?.[PTRRStep.TRY] || vi.fn(),
        [PTRRStep.REFINE]: config.steps?.[PTRRStep.REFINE] || vi.fn(),
        [PTRRStep.RETRY]: config.steps?.[PTRRStep.RETRY] || vi.fn()
      },
      failsafeSteps: config.failsafeSteps || {},
      generationSteps: config.generationSteps || {}
    };
  }
}

// ==================== ASYNC HELPERS ====================

/**
 * Helper for testing async operations with timeouts
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutError = 'Operation timed out'
): Promise<T> {
  const timeout = new Promise<never>((_, reject) => 
    setTimeout(() => reject(new Error(timeoutError)), timeoutMs)
  );
  
  return Promise.race([promise, timeout]);
}

/**
 * Helper for testing retry logic
 */
export async function testRetryBehavior(
  fn: () => Promise<any>,
  expectedAttempts: number,
  maxRetries: number
) {
  let attempts = 0;
  const spy = vi.fn().mockImplementation(async () => {
    attempts++;
    if (attempts < expectedAttempts) {
      throw new Error(`Attempt ${attempts} failed`);
    }
    return { success: true, attempts };
  });

  const result = await retryAsync(spy, maxRetries);
  
  expect(spy).toHaveBeenCalledTimes(expectedAttempts);
  expect(result.attempts).toBe(expectedAttempts);
  
  return result;
}

/**
 * Retry helper for async functions
 */
async function retryAsync<T>(
  fn: () => Promise<T>,
  maxRetries: number,
  delay = 10
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

// ==================== CUSTOM MATCHERS ====================

/**
 * Custom matcher for PTRR results
 */
export function expectPTRRResult(result: any) {
  return {
    toBeSuccessful() {
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    },
    
    toHaveError(errorPattern?: string | RegExp) {
      expect(result).toBeDefined();
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      if (errorPattern) {
        expect(result.error).toMatch(errorPattern);
      }
    },
    
    toHaveMetadata(metadata: any) {
      expect(result.metadata).toBeDefined();
      Object.entries(metadata).forEach(([key, value]) => {
        expect(result.metadata[key]).toEqual(value);
      });
    },
    
    toCompleteWithinMs(ms: number) {
      expect(result.metadata?.duration).toBeDefined();
      expect(result.metadata.duration).toBeLessThan(ms);
    }
  };
}

// ==================== TEST DATA GENERATORS ====================

/**
 * Generate random test data
 */
export class TestDataGenerator {
  static randomString(length = 10): string {
    return Math.random().toString(36).substring(2, 2 + length);
  }

  static randomEmail(): string {
    return `test-${this.randomString()}@example.com`;
  }

  static randomRepository(): any {
    return {
      owner: `org-${this.randomString(5)}`,
      name: `repo-${this.randomString(8)}`,
      branch: 'main',
      private: Math.random() > 0.5
    };
  }

  static randomFile(extension = 'ts'): string {
    return `${this.randomString(8)}.${extension}`;
  }

  static randomFiles(count: number, extension = 'ts'): string[] {
    return Array.from({ length: count }, () => this.randomFile(extension));
  }
}

// ==================== PERFORMANCE TESTING ====================

/**
 * Helper for performance testing
 */
export class PerformanceTester {
  private measurements: Map<string, number[]> = new Map();

  async measure<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const duration = performance.now() - start;
    
    const measurements = this.measurements.get(name) || [];
    measurements.push(duration);
    this.measurements.set(name, measurements);
    
    return result;
  }

  getStats(name: string) {
    const measurements = this.measurements.get(name) || [];
    if (measurements.length === 0) {
      return null;
    }

    const sorted = [...measurements].sort((a, b) => a - b);
    const sum = sorted.reduce((a, b) => a + b, 0);
    
    return {
      count: sorted.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      avg: sum / sorted.length,
      median: sorted[Math.floor(sorted.length / 2)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)]
    };
  }

  expectPerformance(name: string) {
    const stats = this.getStats(name);
    return {
      toBeFasterThan(ms: number) {
        expect(stats).not.toBeNull();
        expect(stats!.avg).toBeLessThan(ms);
      },
      
      toHaveP95Under(ms: number) {
        expect(stats).not.toBeNull();
        expect(stats!.p95).toBeLessThan(ms);
      }
    };
  }
}

// ==================== SNAPSHOT TESTING ====================

/**
 * Helper for structured snapshot testing
 */
export function createSnapshot(data: any, options?: {
  excludeKeys?: string[];
  maskValues?: Record<string, any>;
  sortKeys?: boolean;
}) {
  let processed = { ...data };
  
  // Exclude specified keys
  if (options?.excludeKeys) {
    processed = Object.keys(processed).reduce((acc, key) => {
      if (!options.excludeKeys!.includes(key)) {
        acc[key] = processed[key];
      }
      return acc;
    }, {} as any);
  }
  
  // Mask sensitive values
  if (options?.maskValues) {
    Object.entries(options.maskValues).forEach(([key, mask]) => {
      if (key in processed) {
        processed[key] = mask;
      }
    });
  }
  
  // Sort keys for consistent snapshots
  if (options?.sortKeys) {
    processed = Object.keys(processed)
      .sort()
      .reduce((acc, key) => {
        acc[key] = processed[key];
        return acc;
      }, {} as any);
  }
  
  return processed;
}

// ==================== INTEGRATION TEST HELPERS ====================

/**
 * Helper for setting up integration test environment
 */
export class IntegrationTestEnvironment {
  private execution: Execution;
  private cleanup: (() => void)[] = [];

  constructor() {
    this.execution = new Execution(`test-${Date.now()}`);
  }

  async setup() {
    // Setup test database, files, etc.
    return this;
  }

  async teardown() {
    for (const cleanupFn of this.cleanup.reverse()) {
      cleanupFn();
    }
  }

  addCleanup(fn: () => void) {
    this.cleanup.push(fn);
  }

  getExecution() {
    return this.execution;
  }
  
  // Backwards compatibility alias
  getContextManager() {
    return this.execution;
  }
}

// ==================== EXPORT ALL UTILITIES ====================

export * from './builders';
export * from './factories';
export * from './helpers';
export * from './matchers';
export * from './generators';
export * from './performance';
export * from './integration';

/**
 * USAGE EXAMPLES:
 * 
 * ```typescript
 * import { 
 *   PTRRContextBuilder, 
 *   MockToolFactory, 
 *   expectPTRRResult,
 *   PerformanceTester 
 * } from '@bitcode/test-utils';
 * 
 * // Build test context
 * const context = new PTRRContextBuilder()
 *   .withRepository({ name: 'my-repo' })
 *   .withStep(PTRRStep.PLAN)
 *   .build();
 * 
 * // Create mock tool
 * const tool = MockToolFactory.factoryTool('my-tool', { result: 'success' });
 * 
 * // Test with custom matcher
 * expectPTRRResult(result).toBeSuccessful();
 * 
 * // Performance testing
 * const perf = new PerformanceTester();
 * await perf.measure('operation', async () => {
 *   // ... operation code
 * });
 * perf.expectPerformance('operation').toBeFasterThan(100);
 * ```
 */