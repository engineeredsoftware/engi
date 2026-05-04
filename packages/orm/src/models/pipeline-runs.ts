/**
 * Pipeline Runs Model - Meta model kept for historical/reference data; canonical user-visible records are pipeline executions
 * 
 * Captures all generic pipeline execution data from pipelines-generics.
 * Specific pipeline types (asset-pack, measure, etc.) extend this.
 */

import { BaseModel } from './base';
import { Tables, Insertable, Updatable, Database } from '../types/database';
import { SupabaseClient } from '@supabase/supabase-js';

export type PipelineRun = Tables<'pipeline_runs'>;
export type PipelineRunInsert = Insertable<'pipeline_runs'>;
export type PipelineRunUpdate = Updatable<'pipeline_runs'>;

export interface PipelineExecutionData {
  // Core pipeline identification
  pipelineType: 'asset-pack' | 'measure' | 'patch';
  pipelineName: string;
  pipelineVersion: string;
  
  // Execution tracking
  executionId: string;
  correlationId: string;
  parentExecutionId?: string;
  
  // Timing
  startedAt: string;
  completedAt?: string;
  duration?: number;
  
  // Status tracking
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  currentPhase?: 'setup' | 'discovery' | 'implementation' | 'validation' | 'finish';
  currentAgent?: string;
  iterationCount?: number;
  maxIterations?: number;
  
  // Input/Output
  input: Record<string, any>;
  output?: Record<string, any>;
  
  // Metrics
  metrics: {
    totalTokensUsed: number;
    totalBtdUsed: number;
    totalDuration: number;
    phases: Record<string, {
      duration: number;
      tokensUsed: number;
      btdUsed: number;
      success: boolean;
      agentsInvoked: string[];
    }>;
    agents: Record<string, {
      invocationCount: number;
      totalTokens: number;
      totalDuration: number;
      averageConfidence: number;
    }>;
  };
  
  // Artifacts & Results
  artifacts: {
    filesCreated: string[];
    filesModified: string[];
    filesDeleted: string[];
    testsAdded: number;
    testsPassing: number;
    documentation: string[];
    coverage?: number;
  };
  
  // Validation
  validation: {
    testsPass: boolean;
    lintingPass?: boolean;
    typeCheckPass?: boolean;
    securityScanPass?: boolean;
    issues: Array<{
      type: 'error' | 'warning' | 'info';
      message: string;
      file?: string;
      line?: number;
    }>;
  };
  
  // Error tracking
  error?: {
    message: string;
    stack?: string;
    phase?: string;
    agent?: string;
  };
  
  // The full Execution state tree (namespaced storage)
  executionState: Record<string, Record<string, any>>;
}

export class PipelineRunsModel extends BaseModel<'pipeline_runs'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'pipeline_runs');
  }

  /**
  * Create new pipeline run (meta) record
   */
  async create(data: PipelineRunInsert): Promise<PipelineRun> {
    const { data: run, error } = await this.supabase
      .from(this.tableName)
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return run;
  }

  /**
   * Get run by execution ID
   */
  async getByExecutionId(executionId: string): Promise<PipelineRun | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('execution_id', executionId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /**
   * List runs by type
   */
  async listByType(pipelineType: string, options?: {
    userId?: string;
    limit?: number;
    offset?: number;
    status?: string;
  }): Promise<{ data: PipelineRun[]; count: number }> {
    let query = this.supabase
      .from(this.tableName)
      .select('*', { count: 'exact' })
      .eq('type', pipelineType)
      .order('created_at', { ascending: false });

    if (options?.userId) {
      query = query.eq('user_id', options.userId);
    }

    if (options?.status) {
      query = query.eq('status', options.status);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error, count } = await query;

    if (error) throw error;
    return { data: data || [], count: count || 0 };
  }

  /**
   * Update run with execution results
   */
  async updateWithResults(
    executionId: string, 
    results: {
      output?: Record<string, any>;
      metrics?: Partial<PipelineExecutionData['metrics']>;
      artifacts?: Partial<PipelineExecutionData['artifacts']>;
      validation?: Partial<PipelineExecutionData['validation']>;
      executionState?: Record<string, Record<string, any>>;
      status?: PipelineExecutionData['status'];
      completedAt?: string;
      duration?: number;
    }
  ): Promise<PipelineRun> {
    const updates: PipelineRunUpdate = {
      ...results,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(updates)
      .eq('execution_id', executionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Mark run as failed
   */
  async markFailed(executionId: string, error: {
    message: string;
    stack?: string;
    phase?: string;
    agent?: string;
  }): Promise<PipelineRun> {
    return this.updateWithResults(executionId, {
      status: 'failed',
      completedAt: new Date().toISOString()
    });
  }

  /**
   * Mark run as cancelled
   */
  async markCancelled(executionId: string, cancellation: {
    message: string;
    cancelledAt: string;
    userId: string;
  }): Promise<PipelineRun> {
    return this.updateWithResults(executionId, {
      status: 'cancelled',
      completedAt: cancellation.cancelledAt
    });
  }

  /**
   * Get active runs for user
   */
  async getActiveRuns(userId: string): Promise<PipelineRun[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .in('status', ['pending', 'running'])
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}
