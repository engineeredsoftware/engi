/**
 * FIELD INTELLIGENCE QUERY - Network Analysis for Field Doc
 * 
 * Queries the Bitcode network to understand how code is performing
 * in production across all deliverables, AI Document updates, and runs.
 * 
 * @doc-code
 * type: query
 * purpose: Extract field intelligence from network data
 */

import { SupabaseClient } from '@supabase/supabase-js';
import { Database, Tables } from '../types/database';
import { VectorQuery } from './vector';
import { RunsModel } from '../models/runs';
import { DeliverablesModel } from '../models/deliverables';

export interface FieldIntelligenceResult {
  /** Performance metrics from the field */
  performance: {
    avgExecutionTime: number;
    successRate: number;
    errorPatterns: string[];
  };
  /** Similar code patterns in the network */
  similarPatterns: Array<{
    codeSnippet: string;
    runId: string;
    performance: number;
    context: string;
  }>;
  /** Deliverables using this code */
  deliverables: Array<{
    id: string;
    name: string;
    lastRun: Date;
    effectiveness: number;
  }>;
  /** AI Document patterns */
  aiDocumentPatterns: Array<{
    from: string;
    to: string;
    improvement: number;
  }>;
  /** Synthesized intelligence */
  synthesis: string;
}

export class FieldIntelligenceQuery {
  constructor(
    private supabase: SupabaseClient<Database>,
    private models: {
      vectors: VectorQuery;
      runs: RunsModel;
      deliverables: DeliverablesModel;
    }
  ) {}

  /**
   * Query how code is working in the field
   */
  async query(params: {
    code: string;
    context: string;
    limit?: number;
  }): Promise<FieldIntelligenceResult> {
    // 1. Vector search for similar code patterns
    const similarCode = await this.models.vectors.searchSimilar({
      query: params.code,
      collection: 'code_snippets',
      limit: params.limit || 10
    });

    // 2. Find deliverables using similar patterns
    const deliverableIds = similarCode.map(s => s.metadata.deliverable_id);
    const { data: deliverables } = await this.supabase
      .from('deliverables')
      .select('*')
      .in('id', deliverableIds);

    // 3. Analyze performance across runs
    const { data: runs } = await this.supabase
      .from('runs')
      .select('*')
      .in('deliverable_id', deliverableIds)
      .order('created_at', { ascending: false })
      .limit(100);

    // 4. Calculate performance metrics
    const performance = this.calculatePerformance(runs || []);

    // 5. Find AI Document patterns
    const aiDocumentPatterns = await this.findAIDocumentPatterns(params.code);

    // 6. Synthesize intelligence
    const synthesis = await this.synthesizeIntelligence({
      code: params.code,
      context: params.context,
      performance,
      deliverables: deliverables || [],
      aiDocumentPatterns
    });

    return {
      performance,
      similarPatterns: similarCode.map(s => ({
        codeSnippet: s.content,
        runId: s.metadata.run_id,
        performance: s.metadata.performance_score || 0,
        context: s.metadata.context || ''
      })),
      deliverables: (deliverables || []).map(d => ({
        id: d.id,
        name: d.name,
        lastRun: new Date(d.last_run_at),
        effectiveness: d.effectiveness_score || 0
      })),
      aiDocumentPatterns,
      synthesis
    };
  }

  private calculatePerformance(runs: Tables<'runs'>[]): FieldIntelligenceResult['performance'] {
    if (runs.length === 0) {
      return {
        avgExecutionTime: 0,
        successRate: 0,
        errorPatterns: []
      };
    }

    const successfulRuns = runs.filter(r => r.status === 'completed');
    const executionTimes = successfulRuns.map(r => r.execution_time_ms || 0);
    const errors = runs
      .filter(r => r.error_message)
      .map(r => r.error_message);

    return {
      avgExecutionTime: executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length,
      successRate: successfulRuns.length / runs.length,
      errorPatterns: this.extractErrorPatterns(errors)
    };
  }

  private extractErrorPatterns(errors: string[]): string[] {
    // Group similar errors
    const patterns = new Map<string, number>();
    
    errors.forEach(error => {
      // Simple pattern extraction - in production this would be more sophisticated
      const pattern = error.replace(/\d+/g, 'N').substring(0, 50);
      patterns.set(pattern, (patterns.get(pattern) || 0) + 1);
    });

    return Array.from(patterns.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([pattern]) => pattern);
  }

  private async findAIDocumentPatterns(code: string): Promise<any[]> {
    // Query AI Document history for similar code transformations
    const { data } = await this.supabase
      .from('ai_document_transformations')
      .select('*')
      .textSearch('before_code', code)
      .limit(5);

    return (data || []).map(t => ({
      from: t.before_pattern,
      to: t.after_pattern,
      improvement: t.improvement_percentage || 0
    }));
  }

  private async synthesizeIntelligence(data: {
    code: string;
    context: string;
    performance: FieldIntelligenceResult['performance'];
    deliverables: Tables<'deliverables'>[];
    aiDocumentPatterns: Array<{ from: string; to: string; improvement: number }>;
  }): Promise<string> {
    // In production, this would use an LLM to synthesize insights
    // For now, return a structured summary
    return `Field Intelligence Summary:
- Success Rate: ${(data.performance.successRate * 100).toFixed(1)}%
- Avg Execution: ${data.performance.avgExecutionTime.toFixed(0)}ms
- Used in ${data.deliverables.length} deliverables
- ${data.aiDocumentPatterns.length} AI Document patterns identified
- Common error patterns: ${data.performance.errorPatterns.slice(0, 3).join(', ')}`;
  }
}
