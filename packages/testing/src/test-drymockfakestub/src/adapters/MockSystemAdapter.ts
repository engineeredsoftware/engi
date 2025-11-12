/**
 * MockSystemAdapter - Adapts unified test data for use with Engi's Mock System
 * 
 * This adapter bridges the Test Intelligence system with the existing
 * MockOrchestrator, providing seamless integration while maintaining
 * backward compatibility.
 */

import type { TestScenario } from '../primitives/TestScenario';
import type { UnifiedTestDataGenerator, GeneratedTestData } from '../generators/UnifiedTestDataGenerator';

/**
 * Mock scenario configuration matching existing system
 */
export interface MockScenarioConfig {
  name: string;
  description?: string;
  scaling: 'demo' | 'testing' | 'enterprise' | 'chaos' | 'onboarding' | 'empty' | 'error';
  features: MockableFeature[];
  data?: Record<string, any>;
  performance?: {
    targetLatency?: number;
    errorRate?: number;
  };
}

/**
 * Mockable features from existing system
 */
export type MockableFeature = 
  | 'DELIVERABLES'
  | 'GITHUB_ACCOUNTS'
  | 'GITHUB_REPOS'
  | 'GITHUB_ISSUES'
  | 'GITHUB_BRANCHES'
  | 'GITHUB_COMMITS'
  | 'GITHUB_FILES'
  | 'USER_PROFILE'
  | 'CREDITS'
  | 'PIPELINES'
  | string; // Allow extension

/**
 * Mock data container matching existing system
 */
export interface MockDataContainer<T = any> {
  data: T;
  metadata: {
    generatedAt: string;
    scenario: string;
    feature: string;
    metrics: {
      generationTime: number;
      sizeBytes: number;
      itemCount?: number;
    };
    validation: {
      isValid: boolean;
      errors?: string[];
    };
  };
}

/**
 * Adapter for integrating Test Intelligence with Mock System
 */
export class MockSystemAdapter {
  private featureScenarioMap = new Map<MockableFeature, TestScenario[]>();
  
  constructor(
    private generator: UnifiedTestDataGenerator,
    private config?: {
      defaultScaling?: MockScenarioConfig['scaling'];
      performanceTracking?: boolean;
      validationEnabled?: boolean;
    }
  ) {}
  
  /**
   * Register a test scenario for specific mockable features
   */
  registerScenarioForFeatures(scenario: TestScenario, features: MockableFeature[]): void {
    for (const feature of features) {
      const scenarios = this.featureScenarioMap.get(feature) || [];
      scenarios.push(scenario);
      this.featureScenarioMap.set(feature, scenarios);
    }
  }
  
  /**
   * Adapt a test scenario to mock scenario configuration
   */
  adaptToMockScenario(scenario: TestScenario): MockScenarioConfig {
    return {
      name: scenario.name,
      description: scenario.description,
      scaling: this.determineScaling(scenario),
      features: this.extractFeatures(scenario),
      data: this.generator.generateForScenario(scenario).data as Record<string, any>,
      performance: {
        targetLatency: scenario.performance?.timeout,
        errorRate: this.calculateErrorRate(scenario)
      }
    };
  }
  
  /**
   * Get mock data for a specific feature
   */
  async getMockData<T = any>(feature: MockableFeature, scaling?: MockScenarioConfig['scaling']): Promise<MockDataContainer<T>> {
    const startTime = performance.now();
    
    // Find matching scenario
    const scenario = this.findScenarioForFeature(feature, scaling);
    if (!scenario) {
      throw new Error(`No test scenario found for feature: ${feature}`);
    }
    
    // Generate data
    const generatedData = this.generator.generateForScenario<T>(scenario);
    
    // Validate if enabled
    const validation = this.config?.validationEnabled 
      ? await this.validateData(generatedData.data, feature)
      : { isValid: true };
    
    // Create container matching existing format
    return {
      data: generatedData.data,
      metadata: {
        generatedAt: generatedData.metadata.generatedAt.toISOString(),
        scenario: scenario.id,
        feature,
        metrics: {
          generationTime: performance.now() - startTime,
          sizeBytes: generatedData.metadata.size,
          itemCount: Array.isArray(generatedData.data) ? generatedData.data.length : undefined
        },
        validation
      }
    };
  }
  
  /**
   * Create mock orchestrator configuration
   */
  createOrchestratorConfig(scenarios: TestScenario[]): {
    scenarios: Record<string, MockScenarioConfig>;
    features: Record<MockableFeature, string>;
  } {
    const scenarioConfigs: Record<string, MockScenarioConfig> = {};
    const featureMappings: Record<MockableFeature, string> = {} as any;
    
    for (const scenario of scenarios) {
      // Create mock scenario config
      scenarioConfigs[scenario.id] = this.adaptToMockScenario(scenario);
      
      // Map features to scenarios
      const features = this.extractFeatures(scenario);
      for (const feature of features) {
        featureMappings[feature] = scenario.id;
      }
    }
    
    return {
      scenarios: scenarioConfigs,
      features: featureMappings
    };
  }
  
  /**
   * Create streaming mock data
   */
  async* streamMockData<T = any>(
    feature: MockableFeature,
    options?: {
      eventCount?: number;
      eventDelay?: number;
      scaling?: MockScenarioConfig['scaling'];
    }
  ): AsyncGenerator<T> {
    const scenario = this.findScenarioForFeature(feature, options?.scaling);
    if (!scenario) {
      throw new Error(`No test scenario found for feature: ${feature}`);
    }
    
    const eventCount = options?.eventCount || 10;
    const eventDelay = options?.eventDelay || 100;
    
    for (let i = 0; i < eventCount; i++) {
      // Generate event data
      const eventData = this.generateStreamingEvent(scenario, i, eventCount);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, eventDelay));
      
      yield eventData as T;
    }
  }
  
  /**
   * Middleware for integrating with existing mock system
   */
  createMiddleware() {
    return {
      beforeMock: async (feature: MockableFeature, context: any) => {
        // Find test scenario for feature
        const scenario = this.findScenarioForFeature(feature);
        if (scenario) {
          // Inject scenario data into context
          context.testScenario = scenario;
          context.testData = await this.getMockData(feature);
        }
      },
      
      afterMock: async (feature: MockableFeature, result: any, context: any) => {
        // Track performance if enabled
        if (this.config?.performanceTracking && context.testScenario) {
          this.trackPerformance(feature, context.testScenario, result);
        }
      }
    };
  }
  
  /**
   * Private helper methods
   */
  
  private determineScaling(scenario: TestScenario): MockScenarioConfig['scaling'] {
    // Map scenario tags to scaling
    if (scenario.tags?.includes('demo')) return 'demo';
    if (scenario.tags?.includes('enterprise')) return 'enterprise';
    if (scenario.tags?.includes('chaos')) return 'chaos';
    if (scenario.tags?.includes('empty')) return 'empty';
    if (scenario.tags?.includes('error')) return 'error';
    if (scenario.tags?.includes('onboarding')) return 'onboarding';
    
    // Check context
    if (scenario.context.environment === 'production') return 'enterprise';
    if (scenario.context.environment === 'test') return 'testing';
    
    return this.config?.defaultScaling || 'testing';
  }
  
  private extractFeatures(scenario: TestScenario): MockableFeature[] {
    const features: MockableFeature[] = [];
    
    // Extract from tags
    const featureTags = scenario.tags?.filter(tag => tag.startsWith('feature:')) || [];
    features.push(...featureTags.map(tag => tag.replace('feature:', '') as MockableFeature));
    
    // Extract from context
    const contextFeatures = (scenario.context as any)?.features || [];
    features.push(...contextFeatures);
    
    // Infer from data compositions
    for (const composition of scenario.data) {
      const inferredFeatures = this.inferFeaturesFromComposition(composition);
      features.push(...inferredFeatures);
    }
    
    return [...new Set(features)]; // Remove duplicates
  }
  
  private inferFeaturesFromComposition(composition: any): MockableFeature[] {
    const features: MockableFeature[] = [];
    const name = composition.name.toLowerCase();
    
    if (name.includes('deliverable')) features.push('DELIVERABLES');
    if (name.includes('github') || name.includes('repo')) features.push('GITHUB_REPOS');
    if (name.includes('user') || name.includes('profile')) features.push('USER_PROFILE');
    if (name.includes('credit')) features.push('CREDITS');
    if (name.includes('pipeline')) features.push('PIPELINES');
    
    return features;
  }
  
  private calculateErrorRate(scenario: TestScenario): number {
    if (scenario.behavior.expectations?.success === false) return 1.0;
    if (scenario.tags?.includes('error')) return 0.5;
    if (scenario.tags?.includes('chaos')) return 0.2;
    return 0;
  }
  
  private findScenarioForFeature(feature: MockableFeature, scaling?: MockScenarioConfig['scaling']): TestScenario | null {
    const scenarios = this.featureScenarioMap.get(feature) || [];
    
    if (scaling) {
      // Find scenario matching scaling
      const matched = scenarios.find(s => this.determineScaling(s) === scaling);
      if (matched) return matched;
    }
    
    // Return first available
    return scenarios[0] || null;
  }
  
  private async validateData(data: any, feature: MockableFeature): Promise<{ isValid: boolean; errors?: string[] }> {
    const errors: string[] = [];
    
    // Basic validation
    if (data === null || data === undefined) {
      errors.push('Data is null or undefined');
    }
    
    // Feature-specific validation
    switch (feature) {
      case 'USER_PROFILE':
        if (!data.id) errors.push('User profile missing id');
        if (!data.email) errors.push('User profile missing email');
        break;
      
      case 'GITHUB_REPOS':
        if (!Array.isArray(data)) {
          errors.push('GitHub repos should be an array');
        } else {
          data.forEach((repo: any, i: number) => {
            if (!repo.name) errors.push(`Repo ${i} missing name`);
            if (!repo.owner) errors.push(`Repo ${i} missing owner`);
          });
        }
        break;
      
      // Add more feature-specific validations
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined
    };
  }
  
  private generateStreamingEvent(scenario: TestScenario, index: number, total: number): any {
    const progress = (index + 1) / total;
    
    return {
      type: 'progress',
      scenario: scenario.id,
      progress,
      phase: scenario.behavior.phases?.[Math.floor(progress * scenario.behavior.phases.length)],
      message: `Processing ${scenario.name}...`,
      data: this.generator.generateForScenario(scenario).data
    };
  }
  
  private trackPerformance(feature: MockableFeature, scenario: TestScenario, result: any): void {
    // Implementation would track performance metrics
    console.log(`Performance tracked for ${feature} using scenario ${scenario.id}`);
  }
}