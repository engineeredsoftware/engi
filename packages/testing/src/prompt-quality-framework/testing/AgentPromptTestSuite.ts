/**
 * Agent Prompt Test Suite
 * 
 * Comprehensive testing framework for individual agent prompt validation,
 * designed to scale across thousands of agent permutations with production-grade
 * quality assurance and automated regression detection.
 */

import { z } from 'zod';
import { PromptQualityEngine, PromptQualityResult, PromptAssessmentContext } from '../core/PromptQualityEngine';
import { ValidationPipeline, ValidationRule, PromptValidationResult } from '../core/ValidationSchemas';
import { QualityMetrics } from '../core/QualityMetrics';

/**
 * Agent Test Configuration Schema
 */
export const AgentTestConfigSchema = z.object({
  agentId: z.string(),
  pipelineId: z.string(),
  testSuiteId: z.string(),
  
  // Test execution configuration
  execution: z.object({
    parallel: z.boolean().default(true),
    maxConcurrency: z.number().default(4),
    timeoutMs: z.number().default(60000),
    retries: z.number().default(2),
  }),
  
  // Quality gates specific to this agent
  qualityGates: z.object({
    minimumOverallScore: z.number().min(0).max(1).default(0.8),
    mustPassRules: z.array(z.string()).default([]),
    criticalDimensions: z.array(z.string()).default(['relevance', 'completeness']),
  }),
  
  // Test scenarios configuration
  scenarios: z.object({
    includeEdgeCases: z.boolean().default(true),
    includeErrorScenarios: z.boolean().default(true),
    includePerformanceTests: z.boolean().default(true),
    customScenarios: z.array(z.string()).default([]),
  }),
  
  // Regression testing configuration
  regression: z.object({
    enableBaseline: z.boolean().default(true),
    baselineVersion: z.string().optional(),
    toleranceThreshold: z.number().default(0.05), // 5% degradation tolerance
    trendsAnalysis: z.boolean().default(true),
  }),
});

export type AgentTestConfig = z.infer<typeof AgentTestConfigSchema>;

/**
 * Test Case Definition
 */
export interface AgentTestCase {
  id: string;
  name: string;
  description: string;
  category: 'functional' | 'performance' | 'edge-case' | 'error-handling' | 'regression';
  
  // Test input
  promptTemplate: string;
  contextOverrides: Partial<PromptAssessmentContext>;
  parameters: Record<string, any>;
  
  // Expected outcomes
  expectedQuality: {
    minimumScore: number;
    requiredDimensions: Record<string, number>;
    mustPassRules: string[];
  };
  
  // Test metadata
  priority: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  estimatedDuration: number; // milliseconds
}

/**
 * Test Execution Result
 */
export interface AgentTestResult {
  testCase: AgentTestCase;
  executionMetadata: {
    startTime: Date;
    endTime: Date;
    duration: number;
    attempt: number;
    environment: string;
  };
  
  // Quality assessment results
  qualityResult: PromptQualityResult;
  
  // Test-specific results
  passed: boolean;
  score: number;
  failureReasons: string[];
  suggestions: string[];
  
  // Performance metrics
  performance: {
    promptGenerationTime: number;
    validationTime: number;
    totalExecutionTime: number;
    memoryUsage: number;
  };
  
  // Regression analysis
  regressionAnalysis?: {
    baselineComparison: ComparisonResult;
    trendAnalysis: TrendAnalysis;
    significantChanges: SignificantChange[];
  };
}

/**
 * Test Suite Execution Summary
 */
export interface AgentTestSummary {
  agentId: string;
  pipelineId: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  
  // Quality metrics aggregation
  overallQualityScore: number;
  dimensionScores: Record<string, number>;
  
  // Performance summary
  totalExecutionTime: number;
  averageTestDuration: number;
  performanceBaseline: number;
  
  // Critical findings
  criticalFailures: AgentTestResult[];
  performanceRegressions: AgentTestResult[];
  qualityDegradations: AgentTestResult[];
  
  // Recommendations
  recommendations: TestRecommendation[];
  
  // Trend analysis
  trends: {
    qualityTrend: 'improving' | 'stable' | 'declining';
    performanceTrend: 'improving' | 'stable' | 'declining';
    regressionCount: number;
  };
}

/**
 * Supporting interfaces
 */
interface ComparisonResult {
  baselineScore: number;
  currentScore: number;
  difference: number;
  percentageChange: number;
  significant: boolean;
}

interface TrendAnalysis {
  direction: 'up' | 'down' | 'stable';
  magnitude: number;
  confidence: number;
  dataPoints: number;
}

interface SignificantChange {
  dimension: string;
  oldValue: number;
  newValue: number;
  impact: 'positive' | 'negative' | 'neutral';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface TestRecommendation {
  category: 'quality' | 'performance' | 'reliability' | 'maintainability';
  priority: 'low' | 'medium' | 'high' | 'critical';
  issue: string;
  recommendation: string;
  estimatedEffort: 'low' | 'medium' | 'high';
  expectedBenefit: number;
}

/**
 * Agent Prompt Test Suite
 */
export class AgentPromptTestSuite {
  private config: AgentTestConfig;
  private qualityEngine: PromptQualityEngine;
  private validationPipeline: ValidationPipeline;
  private testCases: AgentTestCase[];

  constructor(
    config: AgentTestConfig,
    qualityEngine?: PromptQualityEngine,
    customRules?: ValidationRule[]
  ) {
    this.config = AgentTestConfigSchema.parse(config);
    this.qualityEngine = qualityEngine || new PromptQualityEngine();
    this.validationPipeline = new ValidationPipeline(customRules);
    this.testCases = [];
  }

  /**
   * Add test case to the suite
   */
  addTestCase(testCase: AgentTestCase): void {
    this.testCases.push(testCase);
  }

  /**
   * Add multiple test cases
   */
  addTestCases(testCases: AgentTestCase[]): void {
    this.testCases.push(...testCases);
  }

  /**
   * Generate standard test cases for an agent
   */
  generateStandardTestCases(
    agentPromptTemplate: string,
    baseContext: PromptAssessmentContext
  ): AgentTestCase[] {
    const standardCases: AgentTestCase[] = [];

    // Basic functionality test
    standardCases.push({
      id: `${this.config.agentId}-basic-functionality`,
      name: 'Basic Functionality Test',
      description: 'Validates basic agent prompt functionality and structure',
      category: 'functional',
      promptTemplate: agentPromptTemplate,
      contextOverrides: {},
      parameters: {},
      expectedQuality: {
        minimumScore: 0.75,
        requiredDimensions: {
          relevance: 0.8,
          completeness: 0.75,
          clarity: 0.7,
        },
        mustPassRules: ['pgri-compliance', 'context-completeness'],
      },
      priority: 'critical',
      tags: ['basic', 'functionality'],
      estimatedDuration: 5000,
    });

    // Performance test
    standardCases.push({
      id: `${this.config.agentId}-performance`,
      name: 'Performance Test',
      description: 'Validates agent prompt performance characteristics',
      category: 'performance',
      promptTemplate: agentPromptTemplate,
      contextOverrides: {},
      parameters: {},
      expectedQuality: {
        minimumScore: 0.7,
        requiredDimensions: {
          performance: 0.8,
          toolUtilization: 0.75,
        },
        mustPassRules: ['performance'],
      },
      priority: 'high',
      tags: ['performance', 'efficiency'],
      estimatedDuration: 3000,
    });

    // Edge case test - minimal context
    standardCases.push({
      id: `${this.config.agentId}-minimal-context`,
      name: 'Minimal Context Test',
      description: 'Tests agent behavior with minimal available context',
      category: 'edge-case',
      promptTemplate: agentPromptTemplate,
      contextOverrides: {
        contextData: {},
        availableTools: baseContext.availableTools?.slice(0, 2) || [],
      },
      parameters: {},
      expectedQuality: {
        minimumScore: 0.6,
        requiredDimensions: {
          relevance: 0.7,
          toolUtilization: 0.6,
        },
        mustPassRules: ['security'],
      },
      priority: 'medium',
      tags: ['edge-case', 'minimal-context'],
      estimatedDuration: 4000,
    });

    // Edge case test - maximum context
    standardCases.push({
      id: `${this.config.agentId}-maximum-context`,
      name: 'Maximum Context Test',
      description: 'Tests agent behavior with maximum available context',
      category: 'edge-case',
      promptTemplate: agentPromptTemplate,
      contextOverrides: {
        contextData: this.generateMaximalContext(),
        availableTools: this.generateExtensiveToolList(),
      },
      parameters: {},
      expectedQuality: {
        minimumScore: 0.8,
        requiredDimensions: {
          completeness: 0.9,
          performance: 0.7, // May be lower due to context size
        },
        mustPassRules: ['performance', 'tool-planning'],
      },
      priority: 'medium',
      tags: ['edge-case', 'maximum-context'],
      estimatedDuration: 8000,
    });

    // Error handling test
    standardCases.push({
      id: `${this.config.agentId}-error-handling`,
      name: 'Error Handling Test',
      description: 'Tests agent response to error conditions and invalid inputs',
      category: 'error-handling',
      promptTemplate: agentPromptTemplate,
      contextOverrides: {
        availableTools: ['invalid_tool', 'nonexistent_tool'],
      },
      parameters: { simulateErrors: true },
      expectedQuality: {
        minimumScore: 0.6,
        requiredDimensions: {
          relevance: 0.7,
          clarity: 0.8,
        },
        mustPassRules: ['security'],
      },
      priority: 'high',
      tags: ['error-handling', 'resilience'],
      estimatedDuration: 6000,
    });

    return standardCases;
  }

  /**
   * Execute all test cases in the suite
   */
  async executeTestSuite(
    agentPromptGenerator: (context: PromptAssessmentContext, params: Record<string, any>) => Promise<string>,
    baseContext: PromptAssessmentContext
  ): Promise<AgentTestSummary> {
    const startTime = Date.now();
    const results: AgentTestResult[] = [];

    // Execute tests based on configuration
    if (this.config.execution.parallel) {
      results.push(...await this.executeTestsInParallel(agentPromptGenerator, baseContext));
    } else {
      results.push(...await this.executeTestsSequentially(agentPromptGenerator, baseContext));
    }

    const endTime = Date.now();
    
    // Generate comprehensive summary
    const summary = this.generateTestSummary(results, endTime - startTime);
    
    return summary;
  }

  /**
   * Execute tests in parallel with concurrency control
   */
  private async executeTestsInParallel(
    agentPromptGenerator: (context: PromptAssessmentContext, params: Record<string, any>) => Promise<string>,
    baseContext: PromptAssessmentContext
  ): Promise<AgentTestResult[]> {
    const results: AgentTestResult[] = [];
    const maxConcurrency = this.config.execution.maxConcurrency;

    // Process test cases in batches
    for (let i = 0; i < this.testCases.length; i += maxConcurrency) {
      const batch = this.testCases.slice(i, i + maxConcurrency);
      
      const batchResults = await Promise.allSettled(
        batch.map(testCase => 
          this.executeTestCase(testCase, agentPromptGenerator, baseContext)
        )
      );

      // Process batch results
      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          // Create failure result for rejected promises
          results.push(this.createFailureResult(batch[index], result.reason));
        }
      });
    }

    return results;
  }

  /**
   * Execute tests sequentially
   */
  private async executeTestsSequentially(
    agentPromptGenerator: (context: PromptAssessmentContext, params: Record<string, any>) => Promise<string>,
    baseContext: PromptAssessmentContext
  ): Promise<AgentTestResult[]> {
    const results: AgentTestResult[] = [];

    for (const testCase of this.testCases) {
      try {
        const result = await this.executeTestCase(testCase, agentPromptGenerator, baseContext);
        results.push(result);
      } catch (error) {
        results.push(this.createFailureResult(testCase, error));
      }
    }

    return results;
  }

  /**
   * Execute a single test case
   */
  private async executeTestCase(
    testCase: AgentTestCase,
    agentPromptGenerator: (context: PromptAssessmentContext, params: Record<string, any>) => Promise<string>,
    baseContext: PromptAssessmentContext
  ): Promise<AgentTestResult> {
    const startTime = new Date();
    let attempt = 1;

    while (attempt <= this.config.execution.retries + 1) {
      try {
        // Prepare test context
        const testContext: PromptAssessmentContext = {
          ...baseContext,
          ...testCase.contextOverrides,
        };

        // Generate prompt
        const promptGenerationStart = Date.now();
        const generatedPrompt = await agentPromptGenerator(testContext, testCase.parameters);
        const promptGenerationTime = Date.now() - promptGenerationStart;

        // Execute quality assessment
        const validationStart = Date.now();
        const qualityResult = await this.qualityEngine.assessPromptQuality(
          generatedPrompt,
          testContext,
          { environment: 'test' }
        );
        const validationTime = Date.now() - validationStart;

        // Evaluate test case expectations
        const { passed, failureReasons, suggestions } = this.evaluateTestExpectations(
          testCase,
          qualityResult
        );

        const endTime = new Date();
        const totalExecutionTime = endTime.getTime() - startTime.getTime();

        return {
          testCase,
          executionMetadata: {
            startTime,
            endTime,
            duration: totalExecutionTime,
            attempt,
            environment: 'test',
          },
          qualityResult,
          passed,
          score: qualityResult.overallScore,
          failureReasons,
          suggestions,
          performance: {
            promptGenerationTime,
            validationTime,
            totalExecutionTime,
            memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024, // MB
          },
          // Regression analysis would be added here if baseline exists
        };

      } catch (error) {
        if (attempt > this.config.execution.retries) {
          throw error;
        }
        attempt++;
      }
    }

    throw new Error(`Test case ${testCase.id} failed after ${this.config.execution.retries + 1} attempts`);
  }

  /**
   * Evaluate test case expectations against quality results
   */
  private evaluateTestExpectations(
    testCase: AgentTestCase,
    qualityResult: PromptQualityResult
  ): { passed: boolean; failureReasons: string[]; suggestions: string[] } {
    const failureReasons: string[] = [];
    const suggestions: string[] = [];

    // Check minimum overall score
    if (qualityResult.overallScore < testCase.expectedQuality.minimumScore) {
      failureReasons.push(
        `Overall score ${qualityResult.overallScore.toFixed(2)} below expected ${testCase.expectedQuality.minimumScore}`
      );
      suggestions.push('Improve overall prompt quality to meet minimum threshold');
    }

    // Check required dimensions
    Object.entries(testCase.expectedQuality.requiredDimensions).forEach(([dimension, threshold]) => {
      const actualScore = (qualityResult.qualityMetrics as any)[dimension];
      if (actualScore < threshold) {
        failureReasons.push(
          `${dimension} score ${actualScore.toFixed(2)} below required ${threshold}`
        );
        suggestions.push(`Improve ${dimension} to meet required threshold`);
      }
    });

    // Check must-pass rules
    const failedRules = qualityResult.validationResults.filter(result => 
      testCase.expectedQuality.mustPassRules.includes(result.ruleName) && !result.passed
    );

    failedRules.forEach(rule => {
      failureReasons.push(`Critical rule failed: ${rule.ruleName} - ${rule.message}`);
      suggestions.push(...rule.suggestions);
    });

    // Check quality gates
    if (!qualityResult.gatesPassed && testCase.priority === 'critical') {
      failureReasons.push('Quality gates not passed for critical test case');
      suggestions.push('Address quality gate failures before proceeding');
    }

    const passed = failureReasons.length === 0;

    return { passed, failureReasons, suggestions };
  }

  /**
   * Create failure result for test execution errors
   */
  private createFailureResult(testCase: AgentTestCase, error: any): AgentTestResult {
    const endTime = new Date();
    return {
      testCase,
      executionMetadata: {
        startTime: new Date(),
        endTime,
        duration: 0,
        attempt: 1,
        environment: 'test',
      },
      qualityResult: {
        overallScore: 0,
        qualityMetrics: {} as QualityMetrics,
        validationResults: [],
        qualityAssessment: {
          overall: 'F',
          dimensions: {} as any,
          validationScore: 0,
          summary: 'Test execution failed',
        },
        recommendations: [],
        gatesPassed: false,
        performance: {
          tokenCount: 0,
          generationTimeMs: 0,
          toolPlanningEfficiency: 0,
          contextUtilization: 0,
          resourceUsage: { memory: 0, cpu: 0 },
        },
        metadata: {
          timestamp: new Date(),
          agentId: this.config.agentId,
          pipelineId: this.config.pipelineId,
          phaseId: 'unknown',
          testEnvironment: 'test',
          version: '1.0.0',
          configuration: {} as any,
        },
      },
      passed: false,
      score: 0,
      failureReasons: [`Test execution failed: ${error.message}`],
      suggestions: ['Fix test execution error and retry'],
      performance: {
        promptGenerationTime: 0,
        validationTime: 0,
        totalExecutionTime: 0,
        memoryUsage: 0,
      },
    };
  }

  /**
   * Generate comprehensive test summary
   */
  private generateTestSummary(results: AgentTestResult[], totalExecutionTime: number): AgentTestSummary {
    const passedTests = results.filter(r => r.passed);
    const failedTests = results.filter(r => !r.passed);
    const criticalFailures = results.filter(r => !r.passed && r.testCase.priority === 'critical');

    // Calculate aggregate quality scores
    const validResults = results.filter(r => r.qualityResult.overallScore > 0);
    const overallQualityScore = validResults.length > 0 
      ? validResults.reduce((sum, r) => sum + r.qualityResult.overallScore, 0) / validResults.length
      : 0;

    // Calculate dimension scores
    const dimensionScores: Record<string, number> = {};
    if (validResults.length > 0) {
      ['relevance', 'completeness', 'clarity', 'toolUtilization', 'consistency', 'performance'].forEach(dim => {
        dimensionScores[dim] = validResults.reduce((sum, r) => 
          sum + ((r.qualityResult.qualityMetrics as any)[dim] || 0), 0
        ) / validResults.length;
      });
    }

    // Generate recommendations
    const recommendations = this.generateTestRecommendations(results);

    return {
      agentId: this.config.agentId,
      pipelineId: this.config.pipelineId,
      totalTests: results.length,
      passedTests: passedTests.length,
      failedTests: failedTests.length,
      skippedTests: 0,
      overallQualityScore,
      dimensionScores,
      totalExecutionTime,
      averageTestDuration: results.length > 0 ? totalExecutionTime / results.length : 0,
      performanceBaseline: 5000, // 5 seconds baseline
      criticalFailures,
      performanceRegressions: [], // Would be populated with regression analysis
      qualityDegradations: [], // Would be populated with historical comparison
      recommendations,
      trends: {
        qualityTrend: 'stable', // Would be calculated from historical data
        performanceTrend: 'stable',
        regressionCount: 0,
      },
    };
  }

  /**
   * Generate test recommendations based on results
   */
  private generateTestRecommendations(results: AgentTestResult[]): TestRecommendation[] {
    const recommendations: TestRecommendation[] = [];
    const failedTests = results.filter(r => !r.passed);
    const lowScoreTests = results.filter(r => r.score < 0.7);

    // Quality recommendations
    if (failedTests.length > 0) {
      recommendations.push({
        category: 'quality',
        priority: 'high',
        issue: `${failedTests.length} test(s) failed quality validation`,
        recommendation: 'Review and improve failed test cases, focusing on critical failures first',
        estimatedEffort: failedTests.length > 5 ? 'high' : 'medium',
        expectedBenefit: 0.15,
      });
    }

    // Performance recommendations
    const slowTests = results.filter(r => r.performance.totalExecutionTime > 10000); // 10 seconds
    if (slowTests.length > 0) {
      recommendations.push({
        category: 'performance',
        priority: 'medium',
        issue: `${slowTests.length} test(s) exceeded performance thresholds`,
        recommendation: 'Optimize prompt generation and validation processes for better performance',
        estimatedEffort: 'medium',
        expectedBenefit: 0.10,
      });
    }

    // Reliability recommendations
    if (lowScoreTests.length > results.length * 0.3) {
      recommendations.push({
        category: 'reliability',
        priority: 'high',
        issue: 'High percentage of tests with low quality scores',
        recommendation: 'Systematic review of prompt templates and validation criteria readed',
        estimatedEffort: 'high',
        expectedBenefit: 0.20,
      });
    }

    return recommendations;
  }

  /**
   * Utility methods for test case generation
   */
  private generateMaximalContext(): any {
    return {
      largeDataSet: Array(1000).fill(0).map((_, i) => ({ id: i, data: `item_${i}` })),
      complexStructure: {
        level1: {
          level2: {
            level3: {
              data: 'deep nested data',
            },
          },
        },
      },
      metadata: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        tags: Array(50).fill(0).map((_, i) => `tag_${i}`),
      },
    };
  }

  private generateExtensiveToolList(): string[] {
    return [
      'read', 'write', 'edit', 'search', 'analyze', 'generate', 'validate', 'test',
      'deploy', 'monitor', 'debug', 'optimize', 'refactor', 'document', 'review',
      'compile', 'build', 'package', 'publish', 'backup', 'restore', 'migrate',
      'transform', 'aggregate', 'filter', 'sort', 'merge', 'split', 'compress',
    ];
  }
}