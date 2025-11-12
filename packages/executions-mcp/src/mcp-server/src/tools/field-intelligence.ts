/**
 * MCP FIELD INTELLIGENCE TOOL
 * 
 * Production-grade MCP tool for querying field intelligence from the Engi network.
 * Enables AI assistants to understand how code performs in production.
 * 
 * @doc-code
 * type: mcp-tool
 * category: field-intelligence
 * capabilities: ["query", "analyze", "synthesize"]
 */

import { Tool, ToolMetadata } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { createAdminClient, AdminClient } from '@engi/orm';
import { logger } from '@engi/logger';
import { metrics } from '@engi/observability';
import { Cache } from '@engi/pipeline-recovery';

// ==================== SCHEMAS ====================

const FieldIntelligenceQuerySchema = z.object({
  code: z.string().describe('The code snippet to analyze'),
  context: z.string().describe('Context about what intelligence is needed'),
  options: z.object({
    includeMetrics: z.boolean().default(true).describe('Include performance metrics'),
    includePatterns: z.boolean().default(true).describe('Include similar patterns'),
    includeSynthesis: z.boolean().default(true).describe('Include AI synthesis'),
    limit: z.number().int().positive().max(50).default(10).describe('Max results')
  }).optional()
});

type FieldIntelligenceQueryInput = z.infer<typeof FieldIntelligenceQuerySchema> & { action: 'query' };
type FieldIntelligenceAnalyzeInput = z.infer<typeof FieldIntelligenceAnalyzeSchema> & { action: 'analyze' };
type FieldIntelligenceInput = FieldIntelligenceQueryInput | FieldIntelligenceAnalyzeInput;

const FieldIntelligenceAnalyzeSchema = z.object({
  filePath: z.string().describe('File path to analyze'),
  lineRange: z.object({
    start: z.number().int().positive(),
    end: z.number().int().positive()
  }).optional().describe('Specific line range to analyze'),
  depth: z.enum(['shallow', 'medium', 'deep']).default('medium').describe('Analysis depth')
});

// ==================== TYPE DEFINITIONS ====================

interface FieldIntelligenceResponse {
  summary?: string;
  relevance?: number;
  metrics?: {
    performance: FieldIntelligenceResult['performance'];
    usage: {
      deliverableCount: number;
      patternCount: number;
    };
  };
  patterns?: Array<{
    code: string;
    performance: number;
    context: string;
  }>;
  evolutionPatterns?: Array<{
    from: string;
    to: string;
    improvement: string;
  }>;
  insights?: string[];
  recommendations?: string[];
}

interface FieldIntelligenceAnalysis {
  patterns: string[];
  metrics: {
    complexity?: number;
  };
  insights: string[];
  fieldIntelligence?: {
    performance: FieldIntelligenceResult['performance'];
    similarImplementations: number;
    knownIssues: string[];
  };
  evolution?: {
    currentStage: string;
    suggestedUpgrades: string[];
    estimatedImpact: string;
  };
  predictions?: string[];
  optimizations?: string[];
}

interface AnalysisResult {
  filePath: string;
  analysis: FieldIntelligenceAnalysis;
  recommendations: string[];
  timestamp: string;
}

// ==================== TOOL IMPLEMENTATION ====================

export class FieldIntelligenceTool implements Tool {
  private adminClient: AdminClient;
  private cache: Cache<string, unknown>;
  
  constructor() {
    this.adminClient = createAdminClient();
    this.cache = new Cache({
      ttl: 300000, // 5 minutes
      maxSize: 1000
    });
  }

  get metadata(): ToolMetadata {
    return {
      name: 'field_intelligence',
      description: 'Query field intelligence from the Engi network to understand how code performs in production',
      version: '1.0.0',
      inputSchema: {
        oneOf: [
          {
            type: 'object',
            properties: {
              action: { const: 'query' },
              ...FieldIntelligenceQuerySchema.shape
            },
            required: ['action', 'code', 'context']
          },
          {
            type: 'object',
            properties: {
              action: { const: 'analyze' },
              ...FieldIntelligenceAnalyzeSchema.shape
            },
            required: ['action', 'filePath']
          }
        ]
      }
    };
  }

  async execute(input: FieldIntelligenceInput): Promise<unknown> {
    const startTime = Date.now();
    
    try {
      switch (input.action) {
        case 'query':
          return await this.queryFieldIntelligence(input);
        case 'analyze':
          return await this.analyzeFile(input);
        default:
          throw new Error(`Unknown action: ${input.action}`);
      }
    } catch (error) {
      logger.error('Field intelligence tool error', { error, input });
      throw error;
    } finally {
      const duration = Date.now() - startTime;
      metrics.recordToolExecution({
        tool: 'field_intelligence',
        action: input.action,
        duration
      });
    }
  }

  /**
   * Query field intelligence for a code snippet
   */
  private async queryFieldIntelligence(input: FieldIntelligenceQueryInput) {
    // Check cache first
    const cacheKey = `query:${this.hashInput(input)}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      metrics.increment('field_intelligence.cache_hit');
      return cached;
    }

    logger.info('Querying field intelligence', {
      codeLength: input.code.length,
      context: input.context.substring(0, 100)
    });

    // Query the network
    const result = await this.adminClient.fieldIntelligence.query({
      code: input.code,
      context: input.context,
      limit: input.options?.limit || 10
    });

    // Format response based on options
    const response = this.formatQueryResponse(result, input.options || {});

    // Cache the result
    this.cache.set(cacheKey, response);
    metrics.increment('field_intelligence.cache_miss');

    return response;
  }

  /**
   * Analyze a file for field intelligence
   */
  private async analyzeFile(input: FieldIntelligenceAnalyzeInput) {
    logger.info('Analyzing file for field intelligence', {
      filePath: input.filePath,
      depth: input.depth
    });

    // Read file content (in production, this would be from a secure file system)
    const fileContent = await this.readFileSecurely(input.filePath);
    
    // Extract relevant code sections
    const codeSection = input.lineRange 
      ? this.extractLineRange(fileContent, input.lineRange)
      : fileContent;

    // Perform deep analysis based on depth
    const analysis = await this.performDeepAnalysis(codeSection, input.depth);

    return {
      filePath: input.filePath,
      analysis,
      recommendations: this.generateRecommendations(analysis),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Format query response based on options
   */
  private formatQueryResponse(result: FieldIntelligenceResult, options: { includeMetrics?: boolean; includePatterns?: boolean; includeSynthesis?: boolean }): FieldIntelligenceResponse {
    const response: FieldIntelligenceResponse = {
      summary: result.synthesis,
      relevance: this.calculateRelevance(result)
    };

    if (options.includeMetrics !== false) {
      response.metrics = {
        performance: result.performance,
        usage: {
          deliverableCount: result.deliverables.length,
          patternCount: result.similarPatterns.length
        }
      };
    }

    if (options.includePatterns !== false) {
      response.patterns = result.similarPatterns.map((p) => ({
        code: p.codeSnippet.substring(0, 200) + '...',
        performance: p.performance,
        context: p.context
      }));
      
      response.evolutionPatterns = result.ai_documents.map((u) => ({
        from: u.from,
        to: u.to,
        improvement: `${u.improvement}%`
      }));
    }

    if (options.includeSynthesis !== false) {
      response.insights = this.extractKeyInsights(result);
      response.recommendations = this.generateContextualRecommendations(result);
    }

    return response;
  }

  /**
   * Perform deep analysis of code
   */
  private async performDeepAnalysis(code: string, depth: string): Promise<FieldIntelligenceAnalysis> {
    const analysis: FieldIntelligenceAnalysis = {
      patterns: [],
      metrics: {},
      insights: []
    };

    // Shallow analysis
    analysis.patterns = this.detectPatterns(code);
    analysis.metrics.complexity = this.calculateComplexity(code);

    if (depth === 'shallow') return analysis;

    // Medium analysis
    const fieldData = await this.adminClient.fieldIntelligence.query({
      code,
      context: 'Deep analysis for improvement opportunities'
    });
    
    analysis.fieldIntelligence = {
      performance: fieldData.performance,
      similarImplementations: fieldData.similarPatterns.length,
      knownIssues: fieldData.performance.errorPatterns
    };

    if (depth === 'medium') return analysis;

    // Deep analysis
    analysis.evolution = await this.analyzeEvolutionPath(code, fieldData);
    analysis.predictions = this.predictFutureIssues(fieldData);
    analysis.optimizations = await this.suggestOptimizations(code, fieldData);

    return analysis;
  }

  /**
   * Generate recommendations based on analysis
   */
  private generateRecommendations(analysis: FieldIntelligenceAnalysis): string[] {
    const recommendations: string[] = [];

    // Performance recommendations
    if (analysis.fieldIntelligence?.performance.successRate < 0.9) {
      recommendations.push(
        `Consider improving error handling - current success rate is ${(analysis.fieldIntelligence.performance.successRate * 100).toFixed(1)}%`
      );
    }

    // Pattern recommendations
    if (analysis.patterns.includes('callback-hell')) {
      recommendations.push('Refactor nested callbacks to use async/await pattern');
    }

    // Evolution recommendations
    if (analysis.evolution?.suggestedUpgrades) {
      recommendations.push(...analysis.evolution.suggestedUpgrades);
    }

    return recommendations;
  }

  /**
   * Calculate relevance score
   */
  private calculateRelevance(result: FieldIntelligenceResult): number {
    const factors = [
      result.deliverables.length > 0 ? 0.3 : 0,
      result.similarPatterns.length > 0 ? 0.3 : 0,
      result.performance.successRate * 0.2,
      result.ai_documents.length > 0 ? 0.2 : 0
    ];
    
    return factors.reduce((a, b) => a + b, 0);
  }

  /**
   * Extract key insights from field data
   */
  private extractKeyInsights(result: FieldIntelligenceResult): string[] {
    const insights: string[] = [];

    // Performance insights
    if (result.performance.successRate < 0.8) {
      insights.push('This pattern has reliability issues in production');
    }
    
    if (result.performance.avgExecutionTime > 5000) {
      insights.push('Performance bottleneck detected - consider optimization');
    }

    // Pattern insights
    if (result.similarPatterns.length > 10) {
      insights.push('Common pattern detected - consider extracting to shared utility');
    }

    // Evolution insights
    if (result.ai_documents.length > 0) {
      const avgImprovement = result.ai_documents.reduce((sum, u) => sum + u.improvement, 0) / result.ai_documents.length;
      insights.push(`Similar code has been upgraded with ${avgImprovement.toFixed(0)}% average improvement`);
    }

    return insights;
  }

  /**
   * Generate contextual recommendations
   */
  private generateContextualRecommendations(result: FieldIntelligenceResult): string[] {
    const recommendations: string[] = [];

    // Based on error patterns
    result.performance.errorPatterns.forEach((pattern: string) => {
      if (pattern.includes('timeout')) {
        recommendations.push('Add timeout handling and retry logic');
      }
      if (pattern.includes('null')) {
        recommendations.push('Add null checks and optional chaining');
      }
    });

    // Based on successful patterns
    const successfulPatterns = result.similarPatterns
      .filter((p) => p.performance > 0.95)
      .slice(0, 3);
    
    if (successfulPatterns.length > 0) {
      recommendations.push('Consider patterns from high-performing similar implementations');
    }

    return recommendations;
  }

  // ==================== UTILITY METHODS ====================

  private hashInput(input: unknown): string {
    const str = JSON.stringify(input);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }

  private async readFileSecurely(filePath: string): Promise<string> {
    // In production, implement secure file reading with proper validation
    throw new Error('File reading not implemented in this context');
  }

  private extractLineRange(content: string, range: { start: number; end: number }): string {
    const lines = content.split('\n');
    return lines.slice(range.start - 1, range.end).join('\n');
  }

  private detectPatterns(code: string): string[] {
    const patterns: string[] = [];
    
    // Simple pattern detection (in production, use AST analysis)
    if (code.includes('callback(') && code.includes('callback(') && code.includes('callback(')) {
      patterns.push('callback-hell');
    }
    if (code.includes('any>') || code.includes(': any' + '')) {
      patterns.push('any-type-usage');
    }
    if (code.match(/catch\s*\(\s*\w+\s*\)\s*{\s*}/)) {
      patterns.push('empty-catch-block');
    }
    
    return patterns;
  }

  private calculateComplexity(code: string): number {
    // Simple complexity calculation (in production, use proper metrics)
    const lines = code.split('\n').length;
    const conditions = (code.match(/if|else|switch|case/g) || []).length;
    const loops = (code.match(/for|while|do/g) || []).length;
    
    return Math.min(10, (lines / 10) + conditions + (loops * 2));
  }

  private async analyzeEvolutionPath(code: string, fieldData: FieldIntelligenceResult): Promise<NonNullable<FieldIntelligenceAnalysis['evolution']>> {
    return {
      currentStage: 'stable',
      suggestedUpgrades: fieldData.ai_documents.map((u) => 
        `AI Document pattern: ${u.from} → ${u.to} (${u.improvement}% improvement)`
      ),
      estimatedImpact: 'medium'
    };
  }

  private predictFutureIssues(fieldData: FieldIntelligenceResult): string[] {
    const predictions: string[] = [];
    
    if (fieldData.performance.successRate < 0.95 && fieldData.performance.errorPatterns.length > 2) {
      predictions.push('Error rate likely to increase without intervention');
    }
    
    if (fieldData.performance.avgExecutionTime > 3000) {
      predictions.push('Performance degradation expected as data scales');
    }
    
    return predictions;
  }

  private async suggestOptimizations(code: string, fieldData: FieldIntelligenceResult): Promise<string[]> {
    const optimizations: string[] = [];
    
    // Based on performance data
    if (fieldData.performance.avgExecutionTime > 1000) {
      optimizations.push('Consider implementing caching strategy');
      optimizations.push('Evaluate async operations for parallelization');
    }
    
    // Based on patterns
    fieldData.similarPatterns
      .filter((p) => p.performance > fieldData.performance.successRate * 1.1)
      .forEach((p) => {
        optimizations.push(`Study high-performing pattern from ${p.context}`);
      });
    
    return optimizations;
  }
}

// Export factory function
export function createFieldIntelligenceTool(): Tool {
  return new FieldIntelligenceTool();
}
