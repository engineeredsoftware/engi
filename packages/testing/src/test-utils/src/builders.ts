/**
 * TEST BUILDERS MODULE
 * 
 * Fluent builders for creating test data with sensible defaults
 * and type-safe construction patterns.
 */

import { PTRRStep, FailsafeGenerationStep, GenerationGenerationStep } from '@engi/agent-generics';

/**
 * Base builder class
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
 * Repository builder
 */
export class RepositoryBuilder extends TestBuilder<any> {
  constructor() {
    super();
    this.data = {
      owner: 'test-org',
      name: 'test-repo',
      branch: 'main',
      connectionId: 12345,
      private: false,
      url: 'https://github.com/test-org/test-repo'
    };
  }

  build() {
    return { ...this.data };
  }
}

/**
 * Agent context builder
 */
export class AgentContextBuilder extends TestBuilder<any> {
  constructor() {
    super();
    this.data = {
      correlationId: `test-${Date.now()}`,
      timestamp: new Date().toISOString(),
      environment: 'test',
      dryRun: false
    };
  }

  withCorrelationId(id: string): this {
    return this.with('correlationId', id);
  }

  withDryRun(dryRun: boolean): this {
    return this.with('dryRun', dryRun);
  }

  build() {
    return { ...this.data };
  }
}

/**
 * File content builder
 */
export class FileContentBuilder extends TestBuilder<any> {
  constructor() {
    super();
    this.data = {
      path: 'test.ts',
      content: '',
      encoding: 'utf-8',
      size: 0
    };
  }

  withPath(path: string): this {
    return this.with('path', path);
  }

  withContent(content: string): this {
    this.data.content = content;
    this.data.size = Buffer.byteLength(content);
    return this;
  }

  withTypeScript(code: string): this {
    return this.withPath('test.ts').withContent(code);
  }

  withJSON(obj: any): this {
    return this.withPath('test.json').withContent(JSON.stringify(obj, null, 2));
  }

  build() {
    return { ...this.data };
  }
}

/**
 * Error builder
 */
export class ErrorBuilder extends TestBuilder<any> {
  constructor() {
    super();
    this.data = {
      code: 'UNKNOWN_ERROR',
      message: 'An error occurred',
      stack: new Error().stack,
      timestamp: new Date().toISOString()
    };
  }

  withCode(code: string): this {
    return this.with('code', code);
  }

  withMessage(message: string): this {
    return this.with('message', message);
  }

  withDetails(details: any): this {
    return this.with('details', details);
  }

  build() {
    return { ...this.data };
  }
}

/**
 * PTRR flow builder
 */
export class PTRRFlowBuilder extends TestBuilder<any> {
  constructor() {
    super();
    this.data = {
      steps: {},
      context: {},
      results: []
    };
  }

  withPlanStep(data: any): this {
    this.data.steps[PTRRStep.PLAN] = data;
    return this;
  }

  withTryStep(data: any): this {
    this.data.steps[PTRRStep.TRY] = data;
    return this;
  }

  withRefineStep(data: any): this {
    this.data.steps[PTRRStep.REFINE] = data;
    return this;
  }

  withRetryStep(data: any): this {
    this.data.steps[PTRRStep.RETRY] = data;
    return this;
  }

  withContext(context: any): this {
    return this.with('context', context);
  }

  build() {
    return { ...this.data };
  }
}

/**
 * Tool result builder
 */
export class ToolResultBuilder extends TestBuilder<any> {
  constructor() {
    super();
    this.data = {
      success: true,
      data: {},
      metadata: {
        toolName: 'test-tool',
        duration: 100,
        timestamp: new Date().toISOString()
      }
    };
  }

  withSuccess(success: boolean): this {
    return this.with('success', success);
  }

  withData(data: any): this {
    return this.with('data', data);
  }

  withError(error: string | Error): this {
    this.data.success = false;
    this.data.error = error instanceof Error ? error.message : error;
    return this;
  }

  withDuration(ms: number): this {
    this.data.metadata.duration = ms;
    return this;
  }

  build() {
    return { ...this.data };
  }
}