/**
 * Test Intelligence System - Unified testing infrastructure for Bitcode
 * 
 * This package provides a revolutionary approach to test data management,
 * unifying fixtures, mocks, dryrun, and Storybook through build-time
 * intelligence and zero-overhead runtime access.
 */

// =============================================================================
// PRIMITIVES
// =============================================================================

export {
  // TestPart
  type TestPart,
  type TestPartMetadata,
  createTestPart,
  isTestPart,
  
  // TestComposition
  type TestComposition,
  type TestCompositionMetadata,
  BaseTestComposition,
  createTestComposition,
  
  // TestScenario
  type TestScenario,
  type TestContext,
  type TestBehavior,
  createTestScenario,
  TestScenarioBuilder
} from './primitives';

// =============================================================================
// GENERATORS
// =============================================================================

export {
  type GenerationConfig,
  type GeneratedTestData,
  type TestDataGenerator,
  UnifiedTestDataGenerator
} from './generators/UnifiedTestDataGenerator';

// =============================================================================
// ADAPTERS
// =============================================================================

export {
  // DryRun Adapter
  type DryRunConfig,
  type EnhancedDryRunConfig,
  DryRunAdapter,
  
  // Mock System Adapter
  type MockScenarioConfig,
  type MockableFeature,
  type MockDataContainer,
  MockSystemAdapter,
  
  // Storybook Adapter
  type TestIntelligenceContext,
  type StorybookAdapterConfig,
  TestIntelligenceProvider,
  useTestIntelligence,
  StorybookAdapter,
  createStorybookAdapter
} from './adapters';

// =============================================================================
// DOC-TEST SYSTEM
// =============================================================================

export {
  type DocTestType,
  type ParsedDocTest,
  type DocTestPluginConfig,
  DocTestPlugin
} from './doc-test/DocTestPlugin';

// =============================================================================
// SCENARIOS
// =============================================================================

export * from './scenarios/specific/deliverable-scenarios';

// =============================================================================
// MAIN API
// =============================================================================

import { UnifiedTestDataGenerator } from './generators/UnifiedTestDataGenerator';
import { DryRunAdapter } from './adapters/DryRunAdapter';
import { MockSystemAdapter } from './adapters/MockSystemAdapter';
import { StorybookAdapter } from './adapters/StorybookAdapter';
import { DELIVERABLE_SCENARIOS } from './scenarios/specific/deliverable-scenarios';

/**
 * The main Test Intelligence instance
 */
export class TestIntelligence {
  private static instance: TestIntelligence;
  
  private generator: UnifiedTestDataGenerator;
  private dryRunAdapter: DryRunAdapter;
  private mockAdapter: MockSystemAdapter;
  private storybookAdapter: StorybookAdapter;
  
  private constructor() {
    this.generator = new UnifiedTestDataGenerator();
    this.dryRunAdapter = new DryRunAdapter(this.generator);
    this.mockAdapter = new MockSystemAdapter(this.generator);
    this.storybookAdapter = new StorybookAdapter(this.generator);
    
    // Register default scenarios
    this.registerDefaultScenarios();
  }
  
  static getInstance(): TestIntelligence {
    if (!TestIntelligence.instance) {
      TestIntelligence.instance = new TestIntelligence();
    }
    return TestIntelligence.instance;
  }
  
  /**
   * Get the unified generator
   */
  getGenerator(): UnifiedTestDataGenerator {
    return this.generator;
  }
  
  /**
   * Get adapter for DryRun integration
   */
  getDryRunAdapter(): DryRunAdapter {
    return this.dryRunAdapter;
  }
  
  /**
   * Get adapter for Mock System integration
   */
  getMockAdapter(): MockSystemAdapter {
    return this.mockAdapter;
  }
  
  /**
   * Get adapter for Storybook integration
   */
  getStorybookAdapter(): StorybookAdapter {
    return this.storybookAdapter;
  }
  
  /**
   * Generate test data for any scenario
   */
  generate(scenarioId: string, mode?: 'minimal' | 'realistic' | 'comprehensive' | 'chaos') {
    const scenario = this.findScenario(scenarioId);
    if (!scenario) {
      throw new Error(`Test scenario not found: ${scenarioId}`);
    }
    
    return this.generator.generateForScenario(scenario, mode);
  }
  
  /**
   * Register custom scenarios
   */
  registerScenarios(scenarios: TestScenario[]) {
    // Implementation would register scenarios
    for (const scenario of scenarios) {
      console.log(`Registered scenario: ${scenario.id}`);
    }
  }
  
  private registerDefaultScenarios() {
    // Register deliverable scenarios
    for (const scenario of DELIVERABLE_SCENARIOS) {
      // Register with adapters
      this.mockAdapter.registerScenarioForFeatures(scenario, ['DELIVERABLES']);
      this.storybookAdapter.registerScenario(`deliverables-${scenario.id}`, scenario);
    }
  }
  
  private findScenario(id: string): TestScenario | null {
    // Implementation would search all registered scenarios
    return DELIVERABLE_SCENARIOS.find(s => s.id === id) || null;
  }
}

// =============================================================================
// CONVENIENCE EXPORTS
// =============================================================================

/**
 * Get the singleton Test Intelligence instance
 */
export const testIntelligence = TestIntelligence.getInstance();

/**
 * Quick access to generators and adapters
 */
export const generator = testIntelligence.getGenerator();
export const dryRunAdapter = testIntelligence.getDryRunAdapter();
export const mockAdapter = testIntelligence.getMockAdapter();
export const storybookAdapter = testIntelligence.getStorybookAdapter();

/**
 * Webpack plugin for build-time processing
 */
export { DocTestPlugin as TestIntelligencePlugin } from './doc-test/DocTestPlugin';

// Re-export primitives from their barrel
export * from './primitives';
