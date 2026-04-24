/**
 * Validation Schemas and Rules System
 * 
 * Comprehensive validation framework for prompt quality assessment with
 * production-grade schemas, rules, and validation logic designed for
 * global scale deployment with thousands of agent permutations.
 */

import { z } from 'zod';
import { PromptAssessmentContext } from './PromptQualityEngine';

/**
 * Validation Result Schema
 */
export const PromptValidationResultSchema = z.object({
  ruleName: z.string(),
  passed: z.boolean(),
  score: z.number().min(0).max(1),
  message: z.string(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  suggestions: z.array(z.string()),
  
  // Detailed validation metadata
  metadata: z.object({
    executionTimeMs: z.number(),
    confidence: z.number().min(0).max(1),
    detailsUrl: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()),
  }).optional(),
  
  // Specific validation data
  validationData: z.object({
    expectedPattern: z.string().optional(),
    actualPattern: z.string().optional(),
    missingElements: z.array(z.string()).optional(),
    extraElements: z.array(z.string()).optional(),
    complianceLevel: z.number().min(0).max(1).optional(),
  }).optional(),
});

export type PromptValidationResult = z.infer<typeof PromptValidationResultSchema>;

/**
 * Validation Rule Configuration Schema
 */
export const ValidationRuleConfigSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.enum([
    'structure',
    'content',
    'compliance',
    'performance',
    'security',
    'consistency',
    'completeness'
  ]),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  enabled: z.boolean().default(true),
  
  // Rule execution configuration
  execution: z.object({
    timeoutMs: z.number().default(10000),
    retries: z.number().default(1),
    cacheResults: z.boolean().default(true),
    parallelizable: z.boolean().default(true),
  }),
  
  // Rule applicability filters
  applicability: z.object({
    pipelines: z.array(z.string()).optional(),
    agents: z.array(z.string()).optional(),
    phases: z.array(z.string()).optional(),
    taskTypes: z.array(z.string()).optional(),
  }),
  
  // Rule-specific parameters
  parameters: z.record(z.any()).optional(),
});

export type ValidationRuleConfig = z.infer<typeof ValidationRuleConfigSchema>;

/**
 * Validation Rule Base Class
 */
export abstract class ValidationRule {
  protected config: ValidationRuleConfig;

  constructor(config: ValidationRuleConfig) {
    this.config = ValidationRuleConfigSchema.parse(config);
  }

  get name(): string {
    return this.config.name;
  }

  get category(): string {
    return this.config.category;
  }

  get severity(): string {
    return this.config.severity;
  }

  /**
   * Check if this rule applies to the given context
   */
  isApplicable(context: PromptAssessmentContext): boolean {
    const { applicability } = this.config;
    
    if (applicability.pipelines && !applicability.pipelines.includes(context.pipelineId)) {
      return false;
    }
    
    if (applicability.agents && !applicability.agents.includes(context.agentId)) {
      return false;
    }
    
    if (applicability.phases && !applicability.phases.includes(context.phaseId)) {
      return false;
    }
    
    if (applicability.taskTypes && !applicability.taskTypes.includes(context.taskType)) {
      return false;
    }
    
    return true;
  }

  /**
   * Execute validation rule
   */
  async validate(
    promptText: string,
    context: PromptAssessmentContext
  ): Promise<PromptValidationResult> {
    if (!this.isApplicable(context)) {
      return {
        ruleName: this.name,
        passed: true,
        score: 1,
        message: 'Rule not applicable to this context',
        severity: 'low',
        suggestions: [],
      };
    }

    const startTime = Date.now();
    
    try {
      const result = await Promise.race([
        this.executeValidation(promptText, context),
        this.createTimeoutPromise(),
      ]);
      
      const executionTime = Date.now() - startTime;
      
      return {
        ...result,
        metadata: {
          executionTimeMs: executionTime,
          confidence: result.metadata?.confidence || 0.9,
          category: this.config.category,
          tags: result.metadata?.tags || [],
        },
      };
      
    } catch (error) {
      return {
        ruleName: this.name,
        passed: false,
        score: 0,
        message: `Validation failed: ${error.message}`,
        severity: 'critical',
        suggestions: ['Fix validation error and retry'],
        metadata: {
          executionTimeMs: Date.now() - startTime,
          confidence: 0,
          category: this.config.category,
          tags: ['error'],
        },
      };
    }
  }

  /**
   * Abstract method for rule-specific validation logic
   */
  protected abstract executeValidation(
    promptText: string,
    context: PromptAssessmentContext
  ): Promise<PromptValidationResult>;

  /**
   * Create timeout promise for rule execution
   */
  private createTimeoutPromise(): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Validation rule ${this.name} timed out after ${this.config.execution.timeoutMs}ms`));
      }, this.config.execution.timeoutMs);
    });
  }
}

/**
 * PTRR Pattern Compliance Rule
 * Validates adherence to Plan-Try-Refine-Retry pattern
 */
export class PGRIPatternComplianceRule extends ValidationRule {
  constructor() {
    super({
      name: 'PTRR Pattern Compliance',
      description: 'Validates adherence to Plan-Try-Refine-Retry pattern structure',
      category: 'compliance',
      severity: 'high',
      parameters: {
        requireAllPhases: true,
        minimumPhaseContent: 50, // minimum characters per phase
        phaseTransitionMarkers: ['plan', 'generate', 'refine', 'intensify'],
      },
    });
  }

  protected async executeValidation(
    promptText: string,
    context: PromptAssessmentContext
  ): Promise<PromptValidationResult> {
    const phaseMarkers = this.config.parameters?.phaseTransitionMarkers || [];
    const foundPhases = this.extractPGRIPhases(promptText, phaseMarkers);
    const requiredPhases = ['plan', 'generate', 'refine', 'intensify'];
    
    const missingPhases = requiredPhases.filter(phase => !foundPhases.includes(phase));
    const complianceLevel = (requiredPhases.length - missingPhases.length) / requiredPhases.length;
    
    const passed = complianceLevel >= 0.75; // At least 3 out of 4 phases
    const score = complianceLevel;
    
    return {
      ruleName: this.name,
      passed,
      score,
      message: passed 
        ? `PTRR compliance: ${(complianceLevel * 100).toFixed(0)}%`
        : `Missing PTRR phases: ${missingPhases.join(', ')}`,
      severity: this.severity as any,
      suggestions: missingPhases.length > 0 
        ? [`Add missing PTRR phases: ${missingPhases.join(', ')}`]
        : [],
      validationData: {
        expectedPattern: 'Plan -> Generate -> Refine -> Intensify',
        actualPattern: foundPhases.join(' -> '),
        missingElements: missingPhases,
        complianceLevel,
      },
    };
  }

  private extractPGRIPhases(promptText: string, markers: string[]): string[] {
    const foundPhases: string[] = [];
    const text = promptText.toLowerCase();
    
    markers.forEach(marker => {
      if (text.includes(marker.toLowerCase())) {
        foundPhases.push(marker);
      }
    });
    
    return foundPhases;
  }
}

/**
 * Tool Planning Validation Rule
 * Validates effective tool planning and usage patterns
 */
export class ToolPlanningValidationRule extends ValidationRule {
  constructor() {
    super({
      name: 'Tool Planning Validation',
      description: 'Validates effective tool planning and usage patterns in prompts',
      category: 'performance',
      severity: 'medium',
      parameters: {
        minimumToolReferences: 2,
        requireToolSequencing: true,
        validateToolAvailability: true,
      },
    });
  }

  protected async executeValidation(
    promptText: string,
    context: PromptAssessmentContext
  ): Promise<PromptValidationResult> {
    const toolReferences = this.extractToolReferences(promptText);
    const availableTools = context.availableTools || [];
    
    // Check minimum tool references
    const hasMinimumTools = toolReferences.length >= (this.config.parameters?.minimumToolReferences || 2);
    
    // Check tool availability
    const unavailableTools = toolReferences.filter(tool => !availableTools.includes(tool));
    const toolAvailabilityScore = unavailableTools.length === 0 ? 1 : 
      Math.max(0, (toolReferences.length - unavailableTools.length) / toolReferences.length);
    
    // Check tool sequencing logic
    const hasToolSequencing = this.validateToolSequencing(promptText, toolReferences);
    
    const overallScore = (
      (hasMinimumTools ? 1 : toolReferences.length / (this.config.parameters?.minimumToolReferences || 2)) * 0.3 +
      toolAvailabilityScore * 0.4 +
      (hasToolSequencing ? 1 : 0.5) * 0.3
    );
    
    const passed = overallScore >= 0.7;
    
    return {
      ruleName: this.name,
      passed,
      score: overallScore,
      message: passed 
        ? `Tool planning score: ${(overallScore * 100).toFixed(0)}%`
        : `Tool planning issues detected`,
      severity: this.severity as any,
      suggestions: [
        ...(unavailableTools.length > 0 ? [`Remove references to unavailable tools: ${unavailableTools.join(', ')}`] : []),
        ...(!hasMinimumTools ? ['Add more tool references for comprehensive task completion'] : []),
        ...(!hasToolSequencing ? ['Improve tool sequencing and planning logic'] : []),
      ],
      validationData: {
        missingElements: unavailableTools,
        complianceLevel: overallScore,
      },
    };
  }

  private extractToolReferences(promptText: string): string[] {
    // Extract tool references using common patterns
    const toolPatterns = [
      /\b(read|write|edit|search|analyze|generate|validate|test|deploy|monitor)\b/gi,
      /tool\s*:\s*(\w+)/gi,
      /use\s+(\w+)\s+tool/gi,
      /execute\s+(\w+)/gi,
    ];
    
    const tools = new Set<string>();
    
    toolPatterns.forEach(pattern => {
      const matches = promptText.matchAll(pattern);
      for (const match of matches) {
        if (match[1]) {
          tools.add(match[1].toLowerCase());
        }
      }
    });
    
    return Array.from(tools);
  }

  private validateToolSequencing(promptText: string, tools: string[]): boolean {
    // Check for logical tool sequencing patterns
    const sequencePatterns = [
      /first.*then/i,
      /step\s+\d+/gi,
      /after.*before/i,
      /\d+\.\s+/g,
    ];
    
    return sequencePatterns.some(pattern => pattern.test(promptText));
  }
}

/**
 * Context Completeness Rule
 * Validates that all necessary context is included
 */
export class ContextCompletenessRule extends ValidationRule {
  constructor() {
    super({
      name: 'Context Completeness',
      description: 'Validates that all necessary context elements are included in the prompt',
      category: 'completeness',
      severity: 'high',
      parameters: {
        requiredContextElements: [
          'need_description',
          'success_criteria',
          'constraints',
          'available_tools',
        ],
        minimumContextCoverage: 0.8,
      },
    });
  }

  protected async executeValidation(
    promptText: string,
    context: PromptAssessmentContext
  ): Promise<PromptValidationResult> {
    const requiredElements = this.config.parameters?.requiredContextElements || [];
    const foundElements = this.extractContextElements(promptText, context);
    
    const missingElements = requiredElements.filter(element => !foundElements.includes(element));
    const completenessScore = foundElements.length / requiredElements.length;
    
    const passed = completenessScore >= (this.config.parameters?.minimumContextCoverage || 0.8);
    
    return {
      ruleName: this.name,
      passed,
      score: completenessScore,
      message: passed 
        ? `Context completeness: ${(completenessScore * 100).toFixed(0)}%`
        : `Missing context elements: ${missingElements.join(', ')}`,
      severity: this.severity as any,
      suggestions: missingElements.length > 0 
        ? [`Add missing context elements: ${missingElements.join(', ')}`]
        : [],
      validationData: {
        missingElements,
        complianceLevel: completenessScore,
      },
    };
  }

  private extractContextElements(promptText: string, context: PromptAssessmentContext): string[] {
    const foundElements: string[] = [];
    const text = promptText.toLowerCase();
    
    // Need description
    if (text.includes('need') || text.includes('objective') || text.includes('goal')) {
      foundElements.push('need_description');
    }
    
    // Success criteria
    if (text.includes('success') || text.includes('criteria') || text.includes('complete')) {
      foundElements.push('success_criteria');
    }
    
    // Constraints
    if (text.includes('constraint') || text.includes('limitation') || text.includes('requirement')) {
      foundElements.push('constraints');
    }
    
    // Available tools
    if (context.availableTools && context.availableTools.length > 0) {
      foundElements.push('available_tools');
    }
    
    return foundElements;
  }
}

/**
 * Security Validation Rule
 * Validates prompts for security best practices
 */
export class SecurityValidationRule extends ValidationRule {
  constructor() {
    super({
      name: 'Security Validation',
      description: 'Validates prompts for security best practices and potential risks',
      category: 'security',
      severity: 'critical',
      parameters: {
        prohibitedPatterns: [
          /execute\s+system/i,
          /rm\s+-rf/i,
          /sudo\s+/i,
          /password/i,
          /secret/i,
          /token/i,
        ],
        requiredSecurityMentions: ['validation', 'sanitization'],
      },
    });
  }

  protected async executeValidation(
    promptText: string,
    context: PromptAssessmentContext
  ): Promise<PromptValidationResult> {
    const prohibitedPatterns = this.config.parameters?.prohibitedPatterns || [];
    const securityViolations: string[] = [];
    
    // Check for prohibited patterns
    prohibitedPatterns.forEach((pattern: RegExp, index: number) => {
      if (pattern.test(promptText)) {
        securityViolations.push(`Prohibited pattern ${index + 1} detected`);
      }
    });
    
    // Check for security best practices
    const requiredMentions = this.config.parameters?.requiredSecurityMentions || [];
    const missingSecurityMentions = requiredMentions.filter((mention: string) => 
      !promptText.toLowerCase().includes(mention.toLowerCase())
    );
    
    const securityScore = Math.max(0, 1 - (securityViolations.length * 0.5) - (missingSecurityMentions.length * 0.1));
    const passed = securityScore >= 0.8 && securityViolations.length === 0;
    
    return {
      ruleName: this.name,
      passed,
      score: securityScore,
      message: passed 
        ? 'Security validation passed'
        : `Security issues detected: ${securityViolations.length} violations`,
      severity: this.severity as any,
      suggestions: [
        ...securityViolations.map(violation => `Address security violation: ${violation}`),
        ...missingSecurityMentions.map((mention: string) => `Consider adding security practice: ${mention}`),
      ],
      validationData: {
        missingElements: missingSecurityMentions,
        extraElements: securityViolations,
        complianceLevel: securityScore,
      },
    };
  }
}

/**
 * Performance Validation Rule
 * Validates prompts for performance characteristics
 */
export class PerformanceValidationRule extends ValidationRule {
  constructor() {
    super({
      name: 'Performance Validation',
      description: 'Validates prompts for performance characteristics and efficiency',
      category: 'performance',
      severity: 'medium',
      parameters: {
        maxTokenCount: 8000,
        minTokenCount: 100,
        maxComplexity: 0.8,
        targetReadability: 0.7,
      },
    });
  }

  protected async executeValidation(
    promptText: string,
    context: PromptAssessmentContext
  ): Promise<PromptValidationResult> {
    const tokenCount = this.estimateTokenCount(promptText);
    const complexity = this.calculateComplexity(promptText);
    const readability = this.calculateReadability(promptText);
    
    const maxTokens = this.config.parameters?.maxTokenCount || 8000;
    const minTokens = this.config.parameters?.minTokenCount || 100;
    const maxComplexityThreshold = this.config.parameters?.maxComplexity || 0.8;
    const targetReadabilityThreshold = this.config.parameters?.targetReadability || 0.7;
    
    // Performance scoring
    const tokenScore = tokenCount <= maxTokens && tokenCount >= minTokens ? 1 : 
      tokenCount > maxTokens ? Math.max(0, 1 - ((tokenCount - maxTokens) / maxTokens)) :
      tokenCount / minTokens;
    
    const complexityScore = complexity <= maxComplexityThreshold ? 1 : 
      Math.max(0, 1 - ((complexity - maxComplexityThreshold) / (1 - maxComplexityThreshold)));
    
    const readabilityScore = readability >= targetReadabilityThreshold ? 1 :
      readability / targetReadabilityThreshold;
    
    const overallScore = (tokenScore * 0.4) + (complexityScore * 0.3) + (readabilityScore * 0.3);
    const passed = overallScore >= 0.7;
    
    const issues: string[] = [];
    if (tokenCount > maxTokens) issues.push(`Token count (${tokenCount}) exceeds maximum (${maxTokens})`);
    if (tokenCount < minTokens) issues.push(`Token count (${tokenCount}) below minimum (${minTokens})`);
    if (complexity > maxComplexityThreshold) issues.push(`Complexity (${complexity.toFixed(2)}) too high`);
    if (readability < targetReadabilityThreshold) issues.push(`Readability (${readability.toFixed(2)}) too low`);
    
    return {
      ruleName: this.name,
      passed,
      score: overallScore,
      message: passed 
        ? `Performance validation passed (score: ${(overallScore * 100).toFixed(0)}%)`
        : `Performance issues: ${issues.join(', ')}`,
      severity: this.severity as any,
      suggestions: issues.map(issue => `Improve: ${issue}`),
      validationData: {
        complianceLevel: overallScore,
      },
    };
  }

  private estimateTokenCount(text: string): number {
    // Rough estimation: ~4 characters per token
    return Math.ceil(text.length / 4);
  }

  private calculateComplexity(text: string): number {
    // Simple complexity metric based on sentence length and nesting
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.reduce((sum, s) => sum + s.trim().split(/\s+/).length, 0) / sentences.length;
    const nestingLevel = (text.match(/\(/g) || []).length;
    
    return Math.min(1, (avgSentenceLength / 30) + (nestingLevel / 20));
  }

  private calculateReadability(text: string): number {
    // Simplified readability score (inverse of complexity)
    return 1 - this.calculateComplexity(text);
  }
}

/**
 * Validation Rule Factory
 * Creates and manages validation rules
 */
export class ValidationRuleFactory {
  private static rules: Map<string, () => ValidationRule> = new Map([
    ['pgri-compliance', () => new PGRIPatternComplianceRule()],
    ['tool-planning', () => new ToolPlanningValidationRule()],
    ['context-completeness', () => new ContextCompletenessRule()],
    ['security', () => new SecurityValidationRule()],
    ['performance', () => new PerformanceValidationRule()],
  ]);

  /**
   * Create all standard validation rules
   */
  static createStandardRules(): ValidationRule[] {
    return Array.from(this.rules.values()).map(factory => factory());
  }

  /**
   * Create specific validation rules
   */
  static createRules(ruleNames: string[]): ValidationRule[] {
    return ruleNames
      .map(name => this.rules.get(name))
      .filter(factory => factory !== undefined)
      .map(factory => factory!());
  }

  /**
   * Register custom validation rule
   */
  static registerRule(name: string, factory: () => ValidationRule): void {
    this.rules.set(name, factory);
  }

  /**
   * Get available rule names
   */
  static getAvailableRules(): string[] {
    return Array.from(this.rules.keys());
  }
}

/**
 * Validation Pipeline
 * Orchestrates validation rule execution
 */
export class ValidationPipeline {
  private rules: ValidationRule[];
  
  constructor(rules: ValidationRule[] = ValidationRuleFactory.createStandardRules()) {
    this.rules = rules;
  }

  /**
   * Execute all validation rules
   */
  async execute(
    promptText: string,
    context: PromptAssessmentContext
  ): Promise<PromptValidationResult[]> {
    // Execute rules in parallel for performance
    const results = await Promise.allSettled(
      this.rules.map(rule => rule.validate(promptText, context))
    );

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          ruleName: this.rules[index].name,
          passed: false,
          score: 0,
          message: `Rule execution failed: ${result.reason}`,
          severity: 'critical' as const,
          suggestions: ['Fix rule execution error'],
        };
      }
    });
  }

  /**
   * Add validation rule
   */
  addRule(rule: ValidationRule): void {
    this.rules.push(rule);
  }

  /**
   * Remove validation rule
   */
  removeRule(ruleName: string): void {
    this.rules = this.rules.filter(rule => rule.name !== ruleName);
  }

  /**
   * Get validation summary
   */
  getSummary(results: PromptValidationResult[]): ValidationSummary {
    const totalRules = results.length;
    const passedRules = results.filter(r => r.passed).length;
    const failedRules = totalRules - passedRules;
    
    const severityCount = results.reduce((count, result) => {
      count[result.severity] = (count[result.severity] || 0) + 1;
      return count;
    }, {} as Record<string, number>);

    const averageScore = totalRules > 0 ? 
      results.reduce((sum, r) => sum + r.score, 0) / totalRules : 0;

    return {
      totalRules,
      passedRules,
      failedRules,
      passRate: totalRules > 0 ? passedRules / totalRules : 0,
      averageScore,
      severityBreakdown: severityCount,
      overallGrade: this.calculateGrade(averageScore),
    };
  }

  private calculateGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 0.9) return 'A';
    if (score >= 0.8) return 'B';
    if (score >= 0.7) return 'C';
    if (score >= 0.6) return 'D';
    return 'F';
  }
}

/**
 * Validation Summary Interface
 */
export interface ValidationSummary {
  totalRules: number;
  passedRules: number;
  failedRules: number;
  passRate: number;
  averageScore: number;
  severityBreakdown: Record<string, number>;
  overallGrade: 'A' | 'B' | 'C' | 'D' | 'F';
}
