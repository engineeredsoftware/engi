/**
 * UnifiedTestDataGenerator - Single source of truth for all test data generation
 * 
 * This generator unifies data generation across all testing systems:
 * - Fixtures
 * - Mocks
 * - DryRun
 * - Storybook
 */

import type { TestScenario, TestContext } from '../primitives/TestScenario';
import type { TestComposition } from '../primitives/TestComposition';
import type { TestPart } from '../primitives/TestPart';
import { z } from 'zod';

/**
 * Configuration for different generation modes
 */
export interface GenerationConfig {
  /**
   * The scenario to generate data for
   */
  scenario: TestScenario;
  
  /**
   * Generation mode affects data characteristics
   */
  mode: 'minimal' | 'realistic' | 'comprehensive' | 'chaos';
  
  /**
   * Seed for deterministic generation
   */
  seed?: number;
  
  /**
   * Performance constraints
   */
  performance?: {
    maxItems?: number;
    maxDepth?: number;
    timeout?: number;
  };
}

/**
 * Generated test data with metadata
 */
export interface GeneratedTestData<T = unknown> {
  data: T;
  metadata: {
    generatedAt: Date;
    generationTime: number;
    scenario: string;
    mode: GenerationConfig['mode'];
    size: number;
    checksum?: string;
  };
}

/**
 * Base generator interface
 */
export interface TestDataGenerator<T = unknown> {
  generate(config: GenerationConfig): GeneratedTestData<T>;
  generateFromSchema(schema: z.ZodType<T>, config: GenerationConfig): GeneratedTestData<T>;
}

/**
 * The unified test data generator
 */
export class UnifiedTestDataGenerator {
  private generators = new Map<string, TestDataGenerator>();
  private cache = new Map<string, GeneratedTestData>();
  
  /**
   * Register a generator for a specific data type
   */
  registerGenerator<T>(type: string, generator: TestDataGenerator<T>): void {
    this.generators.set(type, generator);
  }
  
  /**
   * Generate data for a test scenario
   */
  generateForScenario<T = unknown>(scenario: TestScenario, mode?: GenerationConfig['mode']): GeneratedTestData<T> {
    const startTime = performance.now();
    const config: GenerationConfig = {
      scenario,
      mode: mode || this.determineMode(scenario)
    };
    
    // Check cache
    const cacheKey = this.getCacheKey(config);
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached as GeneratedTestData<T>;
    }
    
    // Compose data from scenario parts
    const composedData = this.composeScenarioData(scenario);
    
    // Apply transformations based on mode
    const transformedData = this.applyTransformations(composedData, config);
    
    // Create result with metadata
    const result: GeneratedTestData<T> = {
      data: transformedData as T,
      metadata: {
        generatedAt: new Date(),
        generationTime: performance.now() - startTime,
        scenario: scenario.id,
        mode: config.mode,
        size: this.calculateSize(transformedData)
      }
    };
    
    // Cache result
    this.cache.set(cacheKey, result);
    
    return result;
  }
  
  /**
   * Generate data for DryRun configuration
   */
  generateForDryRun(config: {
    pipeline: string;
    phase?: string;
    tool?: string;
    schema?: z.ZodType;
  }): GeneratedTestData {
    // Find matching scenario
    const scenario = this.findScenarioForDryRun(config);
    if (!scenario) {
      throw new Error(`No scenario found for dryrun config: ${JSON.stringify(config)}`);
    }
    
    // If schema provided, generate from schema
    if (config.schema) {
      return this.generateFromSchema(config.schema, scenario);
    }
    
    // Otherwise use scenario data
    return this.generateForScenario(scenario);
  }
  
  /**
   * Generate data for Storybook story
   */
  generateForStorybook(storyConfig: {
    title: string;
    component: string;
    scenario?: string;
  }): GeneratedTestData {
    // Find matching scenario
    const scenario = this.findScenarioForStory(storyConfig);
    if (!scenario) {
      throw new Error(`No scenario found for story: ${storyConfig.title}`);
    }
    
    // Generate with realistic mode for visual testing
    return this.generateForScenario(scenario, 'realistic');
  }
  
  /**
   * Generate data for test fixtures
   */
  generateForFixture(fixtureConfig: {
    type: string;
    variant?: string;
    count?: number;
  }): GeneratedTestData {
    // Find matching scenario
    const scenario = this.findScenarioForFixture(fixtureConfig);
    if (!scenario) {
      throw new Error(`No scenario found for fixture: ${fixtureConfig.type}`);
    }
    
    // Generate based on fixture needs
    const data = this.generateForScenario(scenario);
    
    // Handle count for array fixtures
    if (fixtureConfig.count && fixtureConfig.count > 1) {
      const items = [];
      for (let i = 0; i < fixtureConfig.count; i++) {
        items.push(this.generateForScenario(scenario, 'realistic').data);
      }
      data.data = items;
    }
    
    return data;
  }
  
  /**
   * Generate from Zod schema
   */
  private generateFromSchema<T>(schema: z.ZodType<T>, scenario: TestScenario): GeneratedTestData<T> {
    const startTime = performance.now();
    
    // Use scenario context to inform generation
    const context = scenario.context;
    const mode = this.determineMode(scenario);
    
    // Generate based on schema type
    const data = this.generateFromZodSchema(schema, context, mode);
    
    return {
      data,
      metadata: {
        generatedAt: new Date(),
        generationTime: performance.now() - startTime,
        scenario: scenario.id,
        mode,
        size: this.calculateSize(data)
      }
    };
  }
  
  /**
   * Compose data from scenario test compositions
   */
  private composeScenarioData(scenario: TestScenario): unknown {
    const composed: Record<string, unknown> = {};
    
    for (const composition of scenario.data) {
      const data = composition.compose();
      Object.assign(composed, data);
    }
    
    return composed;
  }
  
  /**
   * Apply transformations based on generation mode
   */
  private applyTransformations(data: unknown, config: GenerationConfig): unknown {
    switch (config.mode) {
      case 'minimal':
        return this.minimalTransform(data);
      case 'realistic':
        return this.realisticTransform(data, config.scenario.context);
      case 'comprehensive':
        return this.comprehensiveTransform(data, config.scenario.context);
      case 'chaos':
        return this.chaosTransform(data);
      default:
        return data;
    }
  }
  
  /**
   * Transform data to minimal version
   */
  private minimalTransform(data: unknown): unknown {
    if (Array.isArray(data)) {
      return data.slice(0, 1);
    }
    if (typeof data === 'object' && data !== null) {
      const minimal: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data)) {
        if (this.isRequiredField(key)) {
          minimal[key] = value;
        }
      }
      return minimal;
    }
    return data;
  }
  
  /**
   * Transform data to realistic version
   */
  private realisticTransform(data: unknown, context: TestContext): unknown {
    // Apply context-aware transformations
    if (typeof data === 'object' && data !== null) {
      return this.applyContextToData(data, context);
    }
    return data;
  }
  
  /**
   * Transform data to comprehensive version
   */
  private comprehensiveTransform(data: unknown, context: TestContext): unknown {
    // Add all optional fields, edge cases, etc.
    if (Array.isArray(data)) {
      // Generate more items
      const moreItems = [];
      for (let i = 0; i < 10; i++) {
        moreItems.push(this.realisticTransform(data[0] || {}, context));
      }
      return moreItems;
    }
    return this.realisticTransform(data, context);
  }
  
  /**
   * Transform data for chaos testing
   */
  private chaosTransform(data: unknown): unknown {
    // Add invalid data, edge cases, nulls, etc.
    if (typeof data === 'object' && data !== null) {
      const chaos = { ...data as any };
      chaos.invalidField = '🔥CHAOS🔥';
      chaos.nullField = null;
      chaos.undefinedField = undefined;
      chaos.largeNumber = Number.MAX_SAFE_INTEGER;
      chaos.negativeNumber = -999999;
      return chaos;
    }
    return data;
  }
  
  /**
   * Helper methods
   */
  private determineMode(scenario: TestScenario): GenerationConfig['mode'] {
    if (scenario.tags?.includes('minimal')) return 'minimal';
    if (scenario.tags?.includes('chaos')) return 'chaos';
    if (scenario.tags?.includes('comprehensive')) return 'comprehensive';
    return 'realistic';
  }
  
  private getCacheKey(config: GenerationConfig): string {
    return `${config.scenario.id}-${config.mode}-${config.seed || 'default'}`;
  }
  
  private calculateSize(data: unknown): number {
    return JSON.stringify(data).length;
  }
  
  private isRequiredField(key: string): boolean {
    return ['id', 'name', 'type'].includes(key);
  }
  
  private applyContextToData(data: any, context: TestContext): any {
    const result = { ...data };
    
    // Apply user context
    if (context.user && 'userId' in result) {
      result.userId = context.user.id;
    }
    
    // Apply repository context
    if (context.repository && 'repository' in result) {
      result.repository = context.repository;
    }
    
    return result;
  }
  
  private findScenarioForDryRun(config: any): TestScenario | null {
    // Implementation would search registered scenarios
    return null;
  }
  
  private findScenarioForStory(config: any): TestScenario | null {
    // Implementation would search registered scenarios
    return null;
  }
  
  private findScenarioForFixture(config: any): TestScenario | null {
    // Implementation would search registered scenarios
    return null;
  }
  
  private generateFromZodSchema<T>(schema: z.ZodType<T>, context: TestContext, mode: GenerationConfig['mode']): T {
    // Implementation would use Zod's parsing capabilities
    // This is a simplified version
    return {} as T;
  }
}