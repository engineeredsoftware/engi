/**
 * DryRunAdapter - Adapts unified test data for use with Engi's DryRun system
 * 
 * This adapter bridges the Test Intelligence system with the existing
 * DryRun infrastructure, providing seamless integration without breaking changes.
 */

import type { TestScenario } from '../primitives/TestScenario';
import type { UnifiedTestDataGenerator, GeneratedTestData } from '../generators/UnifiedTestDataGenerator';
import type { z } from 'zod';

/**
 * DryRun configuration matching existing system
 */
export interface DryRunConfig {
  /**
   * Mock the plan phase
   */
  mockPlan?: () => any;
  
  /**
   * Mock the generate phase
   */
  mockGenerate?: () => any;
  
  /**
   * Mock the should continue check
   */
  mockShould?: () => boolean;
  
  /**
   * Tools that should still execute in dry run
   */
  allowedTools?: string[];
  
  /**
   * Metadata about the dry run
   */
  metadata?: {
    pipeline: string;
    phase?: string;
    agent?: string;
  };
}

/**
 * Enhanced DryRun configuration with Test Intelligence
 */
export interface EnhancedDryRunConfig extends DryRunConfig {
  /**
   * Test scenario to use for data generation
   */
  scenario?: TestScenario;
  
  /**
   * Schema for response generation
   */
  responseSchema?: z.ZodType;
  
  /**
   * Performance tracking
   */
  performance?: {
    trackMetrics: boolean;
    reportSlowGenerations: boolean;
  };
}

/**
 * Adapter for integrating Test Intelligence with DryRun
 */
export class DryRunAdapter {
  constructor(
    private generator: UnifiedTestDataGenerator,
    private config?: {
      defaultMode?: 'minimal' | 'realistic' | 'comprehensive';
      cacheEnabled?: boolean;
      performanceTracking?: boolean;
    }
  ) {}
  
  /**
   * Adapt a test scenario to DryRun configuration
   */
  adaptScenario(scenario: TestScenario): DryRunConfig {
    const data = this.generator.generateForScenario(scenario, this.config?.defaultMode);
    
    return {
      mockPlan: () => this.extractPlanData(data, scenario),
      mockGenerate: () => this.extractGenerateData(data, scenario),
      mockShould: () => this.extractShouldContinue(scenario),
      allowedTools: this.extractAllowedTools(scenario),
      metadata: {
        pipeline: this.extractPipeline(scenario),
        phase: this.extractPhase(scenario),
        agent: this.extractAgent(scenario)
      }
    };
  }
  
  /**
   * Create DryRun config for a specific pipeline
   */
  createForPipeline(pipeline: string, options?: {
    phase?: string;
    agent?: string;
    scenario?: string;
  }): DryRunConfig {
    // Find matching scenario
    const scenario = this.findScenarioForPipeline(pipeline, options);
    if (!scenario) {
      throw new Error(`No test scenario found for pipeline: ${pipeline}`);
    }
    
    return this.adaptScenario(scenario);
  }
  
  /**
   * Create DryRun config with schema-based generation
   */
  createWithSchema<T>(schema: z.ZodType<T>, options: {
    pipeline: string;
    phase?: string;
    scenario?: TestScenario;
  }): EnhancedDryRunConfig {
    const baseConfig = options.scenario 
      ? this.adaptScenario(options.scenario)
      : this.createForPipeline(options.pipeline, { phase: options.phase });
    
    return {
      ...baseConfig,
      responseSchema: schema,
      mockGenerate: () => {
        const data = this.generator.generateForDryRun({
          pipeline: options.pipeline,
          phase: options.phase,
          schema
        });
        return data.data;
      }
    };
  }
  
  /**
   * Create streaming DryRun config
   */
  createStreamingConfig(scenario: TestScenario): EnhancedDryRunConfig {
    const events = this.generateStreamingEvents(scenario);
    
    return {
      ...this.adaptScenario(scenario),
      mockGenerate: async function*() {
        for (const event of events) {
          await new Promise(resolve => setTimeout(resolve, event.delay || 100));
          yield event.data;
        }
      }
    };
  }
  
  /**
   * Extract data for plan phase
   */
  private extractPlanData(data: GeneratedTestData, scenario: TestScenario): any {
    const planData = (data.data as any)?.plan || {};
    
    // Enhance with scenario context
    return {
      ...planData,
      phases: scenario.behavior.phases || ['discovery', 'implementation', 'validation'],
      estimatedCredits: scenario.behavior.expectedCredits || 100,
      estimatedDuration: scenario.behavior.expectedDuration || 60000
    };
  }
  
  /**
   * Extract data for generate phase
   */
  private extractGenerateData(data: GeneratedTestData, scenario: TestScenario): any {
    const generateData = (data.data as any)?.result || data.data;
    
    // Apply any transformations based on scenario
    if (scenario.tags?.includes('error')) {
      throw new Error('Simulated error from test scenario');
    }
    
    return generateData;
  }
  
  /**
   * Determine if pipeline should continue
   */
  private extractShouldContinue(scenario: TestScenario): boolean {
    // Check scenario behavior
    if (scenario.behavior.expectations?.success === false) {
      return false;
    }
    
    // Check for early exit tags
    if (scenario.tags?.includes('early-exit')) {
      return false;
    }
    
    return true;
  }
  
  /**
   * Extract tools that should run in dry mode
   */
  private extractAllowedTools(scenario: TestScenario): string[] {
    const defaultAllowed = ['read-file', 'list-files', 'analyze-code'];
    
    // Add scenario-specific tools
    const scenarioTools = (scenario.context as any)?.allowedTools || [];
    
    return [...defaultAllowed, ...scenarioTools];
  }
  
  /**
   * Extract pipeline name from scenario
   */
  private extractPipeline(scenario: TestScenario): string {
    return (scenario.context as any)?.pipeline || 'unknown';
  }
  
  /**
   * Extract phase from scenario
   */
  private extractPhase(scenario: TestScenario): string | undefined {
    return (scenario.context as any)?.phase;
  }
  
  /**
   * Extract agent from scenario
   */
  private extractAgent(scenario: TestScenario): string | undefined {
    return (scenario.context as any)?.agent;
  }
  
  /**
   * Find scenario for pipeline
   */
  private findScenarioForPipeline(pipeline: string, options?: any): TestScenario | null {
    // This would be implemented to search registered scenarios
    // For now, return null
    return null;
  }
  
  /**
   * Generate streaming events for a scenario
   */
  private generateStreamingEvents(scenario: TestScenario): Array<{ delay: number; data: any }> {
    const events = [];
    const phases = scenario.behavior.phases || ['discovery', 'implementation', 'validation'];
    
    // Generate events for each phase
    for (const phase of phases) {
      events.push({
        delay: 100,
        data: {
          type: 'phase-start',
          phase,
          timestamp: new Date().toISOString()
        }
      });
      
      events.push({
        delay: 500,
        data: {
          type: 'progress',
          phase,
          progress: 0.5,
          message: `Processing ${phase}...`
        }
      });
      
      events.push({
        delay: 300,
        data: {
          type: 'phase-complete',
          phase,
          results: this.generator.generateForScenario(scenario).data
        }
      });
    }
    
    return events;
  }
  
  /**
   * Create a middleware function for easy integration
   */
  middleware() {
    return (next: Function) => async (context: any) => {
      // Check if dry run is enabled
      if (context.dryRun) {
        // Find scenario for current context
        const scenario = this.findScenarioForContext(context);
        if (scenario) {
          context.dryRunConfig = this.adaptScenario(scenario);
        }
      }
      
      return next(context);
    };
  }
  
  private findScenarioForContext(context: any): TestScenario | null {
    // Implementation would analyze context to find matching scenario
    return null;
  }
}