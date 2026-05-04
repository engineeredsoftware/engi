/**
 * TestScenario - Complete test scenarios with context, data, and behavior
 * 
 * Represents a full testing scenario that can be used across different
 * testing systems (unit tests, integration tests, dryrun, Storybook).
 */

import type { TestComposition } from './TestComposition';

/**
 * Test context that defines the environment and conditions
 */
export interface TestContext {
  /**
   * The environment this scenario runs in
   */
  environment: 'test' | 'development' | 'staging' | 'production';
  
  /**
   * User context for the scenario
   */
  user?: {
    id: string;
    role: 'owner' | 'admin' | 'developer' | 'limited';
    btdBalance?: number;
    features?: string[];
  };
  
  /**
   * Repository context if applicable
   */
  repository?: {
    owner: string;
    name: string;
    branch?: string;
    isPrivate?: boolean;
  };
  
  /**
   * Additional context properties
   */
  [key: string]: any;
}

/**
 * Expected behavior for a test scenario
 */
export interface TestBehavior {
  /**
   * SDIVF phases this scenario covers
   */
  phases?: ('setup' | 'discovery' | 'implementation' | 'validation' | 'finish')[];
  
  /**
   * Expected duration in milliseconds
   */
  expectedDuration?: number;
  
  /**
   * Expected $BTD usage
   */
  expectedBtd?: number;
  
  /**
   * Expected outcomes
   */
  expectations?: {
    success?: boolean;
    errorType?: string;
    resultPattern?: any;
  };
  
  /**
   * Custom assertions
   */
  assertions?: Array<{
    name: string;
    check: (result: any) => boolean;
  }>;
}

/**
 * Complete test scenario
 */
export interface TestScenario {
  /**
   * Unique identifier
   */
  id: string;
  
  /**
   * Human-readable name
   */
  name: string;
  
  /**
   * Detailed description
   */
  description: string;
  
  /**
   * The context for this scenario
   */
  context: TestContext;
  
  /**
   * Test data compositions
   */
  data: TestComposition<any>[];
  
  /**
   * Expected behavior
   */
  behavior: TestBehavior;
  
  /**
   * Tags for categorization
   */
  tags?: string[];
  
  /**
   * Performance constraints
   */
  performance?: {
    timeout?: number;
    memoryLimit?: number;
    cpuLimit?: number;
  };
}

/**
 * Factory function for creating test scenarios
 */
export function createTestScenario(config: TestScenario): TestScenario {
  return config;
}

/**
 * Test scenario builder for fluent API
 */
export class TestScenarioBuilder {
  private config: Partial<TestScenario> = {};
  
  id(id: string): this {
    this.config.id = id;
    return this;
  }
  
  name(name: string): this {
    this.config.name = name;
    return this;
  }
  
  description(description: string): this {
    this.config.description = description;
    return this;
  }
  
  context(context: TestContext): this {
    this.config.context = context;
    return this;
  }
  
  addData(composition: TestComposition<any>): this {
    if (!this.config.data) {
      this.config.data = [];
    }
    this.config.data.push(composition);
    return this;
  }
  
  behavior(behavior: TestBehavior): this {
    this.config.behavior = behavior;
    return this;
  }
  
  tags(...tags: string[]): this {
    this.config.tags = tags;
    return this;
  }
  
  performance(performance: TestScenario['performance']): this {
    this.config.performance = performance;
    return this;
  }
  
  build(): TestScenario {
    if (!this.config.id || !this.config.name || !this.config.description || 
        !this.config.context || !this.config.data || !this.config.behavior) {
      throw new Error('TestScenario missing required fields');
    }
    
    return this.config as TestScenario;
  }
}
