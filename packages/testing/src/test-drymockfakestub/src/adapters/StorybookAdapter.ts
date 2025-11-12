/**
 * StorybookAdapter - Adapts unified test data for use with Storybook stories
 * 
 * This adapter provides decorators and utilities for seamlessly integrating
 * Test Intelligence data into Storybook stories, enabling consistent
 * visual testing with production-like data.
 */

import type { TestScenario } from '../primitives/TestScenario';
import type { UnifiedTestDataGenerator } from '../generators/UnifiedTestDataGenerator';
import type { StoryContext, StoryFn } from '@storybook/react';
import { createContext, useContext, type ReactNode } from 'react';

/**
 * Test Intelligence context for Storybook
 */
export interface TestIntelligenceContext {
  scenario: TestScenario;
  data: any;
  generator: UnifiedTestDataGenerator;
  mode: 'minimal' | 'realistic' | 'comprehensive' | 'chaos';
}

/**
 * React context for Test Intelligence
 */
const TestIntelligenceReactContext = createContext<TestIntelligenceContext | null>(null);

/**
 * Provider component for Test Intelligence
 */
export function TestIntelligenceProvider({ 
  children, 
  value 
}: { 
  children: ReactNode; 
  value: TestIntelligenceContext;
}) {
  return (
    <TestIntelligenceReactContext.Provider value={value}>
      {children}
    </TestIntelligenceReactContext.Provider>
  );
}

/**
 * Hook to access Test Intelligence data in components
 */
export function useTestIntelligence() {
  const context = useContext(TestIntelligenceReactContext);
  if (!context) {
    throw new Error('useTestIntelligence must be used within TestIntelligenceProvider');
  }
  return context;
}

/**
 * Storybook adapter configuration
 */
export interface StorybookAdapterConfig {
  /**
   * Default mode for data generation
   */
  defaultMode?: TestIntelligenceContext['mode'];
  
  /**
   * Whether to show Test Intelligence panel in Storybook
   */
  showPanel?: boolean;
  
  /**
   * Custom scenario resolver
   */
  scenarioResolver?: (context: StoryContext) => TestScenario | null;
}

/**
 * Adapter for integrating Test Intelligence with Storybook
 */
export class StorybookAdapter {
  private scenarioRegistry = new Map<string, TestScenario>();
  
  constructor(
    private generator: UnifiedTestDataGenerator,
    private config: StorybookAdapterConfig = {}
  ) {}
  
  /**
   * Register scenarios for stories
   */
  registerScenario(storyId: string, scenario: TestScenario): void {
    this.scenarioRegistry.set(storyId, scenario);
  }
  
  /**
   * Register multiple scenarios
   */
  registerScenarios(scenarios: Record<string, TestScenario>): void {
    Object.entries(scenarios).forEach(([id, scenario]) => {
      this.registerScenario(id, scenario);
    });
  }
  
  /**
   * Main decorator for Storybook stories
   */
  withTestIntelligence = (Story: StoryFn, context: StoryContext) => {
    // Find scenario for this story
    const scenario = this.findScenarioForStory(context);
    if (!scenario) {
      // No scenario, render story normally
      return <Story {...context.args} />;
    }
    
    // Determine generation mode
    const mode = this.determineMode(context, scenario);
    
    // Generate data
    const data = this.generator.generateForScenario(scenario, mode);
    
    // Merge generated data with story args
    const enhancedArgs = this.mergeDataWithArgs(data.data, context.args);
    
    // Create context value
    const contextValue: TestIntelligenceContext = {
      scenario,
      data: data.data,
      generator: this.generator,
      mode
    };
    
    return (
      <TestIntelligenceProvider value={contextValue}>
        <Story {...enhancedArgs} />
      </TestIntelligenceProvider>
    );
  };
  
  /**
   * Decorator for specific scenarios
   */
  withScenario(scenarioId: string) {
    return (Story: StoryFn, context: StoryContext) => {
      const scenario = this.scenarioRegistry.get(scenarioId);
      if (!scenario) {
        console.warn(`Test scenario not found: ${scenarioId}`);
        return <Story {...context.args} />;
      }
      
      // Override context to use specific scenario
      const enhancedContext = {
        ...context,
        parameters: {
          ...context.parameters,
          testScenario: scenarioId
        }
      };
      
      return this.withTestIntelligence(Story, enhancedContext);
    };
  }
  
  /**
   * Create story args from scenario
   */
  createArgsFromScenario(scenario: TestScenario, mode?: TestIntelligenceContext['mode']): any {
    const data = this.generator.generateForScenario(scenario, mode || this.config.defaultMode);
    return this.transformDataToArgs(data.data, scenario);
  }
  
  /**
   * Create multiple story variations from scenarios
   */
  createStoryVariations(baseStory: any, scenarios: TestScenario[]): Record<string, any> {
    const variations: Record<string, any> = {};
    
    for (const scenario of scenarios) {
      const storyName = this.scenarioToStoryName(scenario);
      variations[storyName] = {
        ...baseStory,
        args: this.createArgsFromScenario(scenario),
        parameters: {
          ...baseStory.parameters,
          testScenario: scenario.id
        }
      };
    }
    
    return variations;
  }
  
  /**
   * Global decorator setup for preview.js
   */
  globalDecorator() {
    return this.withTestIntelligence;
  }
  
  /**
   * Parameters for Storybook configuration
   */
  getParameters() {
    return {
      testIntelligence: {
        scenarios: Array.from(this.scenarioRegistry.entries()).map(([id, scenario]) => ({
          id,
          name: scenario.name,
          description: scenario.description,
          tags: scenario.tags
        })),
        modes: ['minimal', 'realistic', 'comprehensive', 'chaos'],
        defaultMode: this.config.defaultMode || 'realistic'
      }
    };
  }
  
  /**
   * Toolbar configuration for Storybook
   */
  getToolbar() {
    return {
      testIntelligence: {
        items: [
          { value: 'minimal', title: 'Minimal Data' },
          { value: 'realistic', title: 'Realistic Data' },
          { value: 'comprehensive', title: 'Comprehensive Data' },
          { value: 'chaos', title: 'Chaos Testing' }
        ],
        dynamicTitle: true
      }
    };
  }
  
  /**
   * Private helper methods
   */
  
  private findScenarioForStory(context: StoryContext): TestScenario | null {
    // Check for explicit scenario parameter
    const scenarioId = context.parameters?.testScenario;
    if (scenarioId) {
      return this.scenarioRegistry.get(scenarioId) || null;
    }
    
    // Use custom resolver if provided
    if (this.config.scenarioResolver) {
      return this.config.scenarioResolver(context);
    }
    
    // Try to match by story ID
    const storyId = context.id;
    return this.scenarioRegistry.get(storyId) || null;
  }
  
  private determineMode(context: StoryContext, scenario: TestScenario): TestIntelligenceContext['mode'] {
    // Check toolbar selection
    const toolbarMode = context.globals?.testIntelligence;
    if (toolbarMode) {
      return toolbarMode as TestIntelligenceContext['mode'];
    }
    
    // Check story parameters
    const paramMode = context.parameters?.testIntelligenceMode;
    if (paramMode) {
      return paramMode;
    }
    
    // Check scenario tags
    if (scenario.tags?.includes('minimal')) return 'minimal';
    if (scenario.tags?.includes('comprehensive')) return 'comprehensive';
    if (scenario.tags?.includes('chaos')) return 'chaos';
    
    // Use default
    return this.config.defaultMode || 'realistic';
  }
  
  private mergeDataWithArgs(data: any, args: any): any {
    // Deep merge generated data with story args
    // Story args take precedence to allow overrides
    return this.deepMerge(data, args);
  }
  
  private deepMerge(target: any, source: any): any {
    if (source === undefined) return target;
    if (target === undefined) return source;
    
    if (typeof target !== 'object' || typeof source !== 'object') {
      return source;
    }
    
    const result = { ...target };
    
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
          result[key] = this.deepMerge(target[key], source[key]);
        } else {
          result[key] = source[key];
        }
      }
    }
    
    return result;
  }
  
  private transformDataToArgs(data: any, scenario: TestScenario): any {
    // Transform generated data to match component prop structure
    const args: any = {};
    
    // Handle common patterns
    if (data.user) {
      args.user = data.user;
    }
    
    if (data.repositories) {
      args.repositories = data.repositories;
    }
    
    if (data.deliverables) {
      args.deliverables = data.deliverables;
    }
    
    // Apply scenario-specific transformations
    const transformFn = (scenario as any).argTransform;
    if (typeof transformFn === 'function') {
      return transformFn(data);
    }
    
    return args;
  }
  
  private scenarioToStoryName(scenario: TestScenario): string {
    // Convert scenario name to Storybook story name
    return scenario.name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}

/**
 * Convenience function to create a configured adapter
 */
export function createStorybookAdapter(
  generator: UnifiedTestDataGenerator,
  config?: StorybookAdapterConfig
): StorybookAdapter {
  return new StorybookAdapter(generator, config);
}