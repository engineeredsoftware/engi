/**
 * Generations Model
 *
 * Tracks LLM API calls with token usage and costs.
 * Formerly called "llm_calls" - renamed to "generations" in V26.
 *
 * @package @bitcode/orm
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.generated';

export type Generation = Database['public']['Tables']['generations']['Row'];
export type GenerationInsert = Database['public']['Tables']['generations']['Insert'];
export type GenerationUpdate = Database['public']['Tables']['generations']['Update'];

export interface GenerationMetadata {
  phase?: string;
  agent?: string;
  step?: string;
  metaStep?: string;
  subStep?: string;
  temperature?: number;
  maxTokens?: number;
  stopSequences?: string[];
  stream?: boolean;
  cached?: boolean;
}

/**
 * Generation model for tracking LLM calls
 */
export class GenerationModel {
  constructor(private supabase: ReturnType<typeof createClient<Database>>) {}

  /**
   * Record a new generation
   */
  async create(generation: GenerationInsert): Promise<Generation> {
    const { data, error } = await this.supabase
      .from('generations')
      .insert(generation)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * List generations for an execution
   */
  async listByExecution(executionId: string): Promise<Generation[]> {
    const { data, error } = await this.supabase
      .from('generations')
      .select('*')
      .eq('execution_id', executionId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  /**
   * Get generation statistics for an execution
   */
  async getStats(executionId: string): Promise<{
    totalCalls: number;
    totalPromptTokens: number;
    totalCompletionTokens: number;
    totalTokens: number;
    totalCostUsd: number;
    byModel: Record<string, {
      calls: number;
      tokens: number;
      costUsd: number;
    }>;
  }> {
    const generations = await this.listByExecution(executionId);

    const stats = {
      totalCalls: generations.length,
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalTokens: 0,
      totalCostUsd: 0,
      byModel: {} as Record<string, any>,
    };

    for (const gen of generations) {
      stats.totalPromptTokens += gen.prompt_tokens || 0;
      stats.totalCompletionTokens += gen.completion_tokens || 0;
      stats.totalTokens += gen.total_tokens || 0;
      stats.totalCostUsd += parseFloat(String(gen.cost_usd || 0));

      const modelKey = `${gen.provider}/${gen.model}`;
      if (!stats.byModel[modelKey]) {
        stats.byModel[modelKey] = {
          calls: 0,
          tokens: 0,
          costUsd: 0,
        };
      }

      stats.byModel[modelKey].calls++;
      stats.byModel[modelKey].tokens += gen.total_tokens || 0;
      stats.byModel[modelKey].costUsd += parseFloat(String(gen.cost_usd || 0));
    }

    return stats;
  }

  /**
   * Get recent generations by model
   */
  async listByModel(
    provider: string,
    model: string,
    limit: number = 100
  ): Promise<Generation[]> {
    const { data, error } = await this.supabase
      .from('generations')
      .select('*')
      .eq('provider', provider)
      .eq('model', model)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get generations by phase/agent/step
   */
  async listByContext(
    executionId: string,
    context: {
      phase?: string;
      agent?: string;
      step?: string;
    }
  ): Promise<Generation[]> {
    const { data, error } = await this.supabase
      .from('generations')
      .select('*')
      .eq('execution_id', executionId)
      .contains('metadata', context as any)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  /**
   * Calculate total cost for user (all time)
   */
  async getTotalCostByUser(userId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('generations')
      .select('cost_usd')
      .in('execution_id',
        this.supabase
          .from('executions')
          .select('id')
          .eq('user_id', userId)
      );

    if (error) throw error;

    return (data || []).reduce((sum, g) => sum + parseFloat(String(g.cost_usd || 0)), 0);
  }

  /**
   * Delete generations for an execution
   */
  async deleteByExecution(executionId: string): Promise<void> {
    const { error } = await this.supabase
      .from('generations')
      .delete()
      .eq('execution_id', executionId);

    if (error) throw error;
  }
}

/**
 * Singleton instance
 */
let instance: GenerationModel | null = null;

export function getGenerationModel(supabase: ReturnType<typeof createClient<Database>>): GenerationModel {
  if (!instance) {
    instance = new GenerationModel(supabase);
  }
  return instance;
}
