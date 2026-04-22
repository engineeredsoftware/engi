import { SupabaseClient } from '@supabase/supabase-js';
import { BaseModel } from './base';
import type { Database, Tables, Insertable, Updatable, Json } from '../types/database';

export type PipelineExecution = Tables<'executions'>;
export type PipelineExecutionInsert = Insertable<'executions'>;
export type PipelineExecutionUpdate = Updatable<'executions'>;
export type PipelineExecutionCompatibility = PipelineExecution & {
  metadata?: Record<string, any> | null;
  result?: Json | null;
  error_message?: string | null;
  execution_time_ms?: number | null;
};

function asMetadata(value: Json | null | undefined): Record<string, any> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, any>)
    : null;
}

function normalizeExecution(row: PipelineExecution): PipelineExecutionCompatibility {
  const metadata = asMetadata(row.context) || asMetadata(row.config);
  const rawError = row.error;
  const errorMessage =
    typeof rawError === 'string'
      ? rawError
      : rawError && typeof rawError === 'object' && 'message' in rawError
        ? String((rawError as Record<string, unknown>).message)
        : null;

  return {
    ...row,
    metadata,
    result: row.output,
    error_message: errorMessage,
    execution_time_ms: row.duration_ms,
  };
}

export class PipelineExecutionsModel extends BaseModel<'executions'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'executions');
  }

  async getById(id: string): Promise<PipelineExecutionCompatibility | null> {
    const row = await super.getById(id);
    return row ? normalizeExecution(row) : null;
  }

  async findAll(options?: {
    limit?: number;
    offset?: number;
    orderBy?: keyof PipelineExecution;
    ascending?: boolean;
  }): Promise<PipelineExecutionCompatibility[]> {
    const rows = await super.findAll(options);
    return rows.map(normalizeExecution);
  }

  async getAll(options?: {
    limit?: number;
    offset?: number;
    orderBy?: keyof PipelineExecution;
    ascending?: boolean;
  }): Promise<PipelineExecutionCompatibility[]> {
    return this.findAll(options);
  }

  async create(
    data: (PipelineExecutionInsert & {
      metadata?: Record<string, any>;
      result?: Json | null;
      error_message?: string | null;
      execution_time_ms?: number | null;
    }) | any,
  ): Promise<PipelineExecutionCompatibility> {
    const created = await super.create({
      ...data,
      context: data.context ?? data.metadata ?? data.config ?? null,
      output: data.output ?? data.result ?? null,
      error: data.error ?? (data.error_message ? { message: data.error_message } : null),
      duration_ms: data.duration_ms ?? data.execution_time_ms ?? null,
    });
    return normalizeExecution(created);
  }

  async update(
    id: string,
    data: (PipelineExecutionUpdate & {
      metadata?: Record<string, any>;
      result?: Json | null;
      error_message?: string | null;
      execution_time_ms?: number | null;
    }) | any,
  ): Promise<PipelineExecutionCompatibility> {
    const updated = await super.update(id, {
      ...data,
      context: data.context ?? data.metadata ?? data.config,
      output: data.output ?? data.result,
      error: data.error ?? (data.error_message ? { message: data.error_message } : data.error),
      duration_ms: data.duration_ms ?? data.execution_time_ms,
    });
    return normalizeExecution(updated);
  }

  async getByDeliverableId(deliverableId: string): Promise<PipelineExecutionCompatibility[]> {
    const rows = await this.findBy('deliverable_id', deliverableId);
    return rows.map(normalizeExecution);
  }
}
