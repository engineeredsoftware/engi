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
export declare class PipelineExecutionsModel extends BaseModel<'executions'> {
    constructor(supabase: SupabaseClient<Database>);
    getById(id: string): Promise<PipelineExecutionCompatibility | null>;
    findAll(options?: {
        limit?: number;
        offset?: number;
        orderBy?: keyof PipelineExecution;
        ascending?: boolean;
    }): Promise<PipelineExecutionCompatibility[]>;
    getAll(options?: {
        limit?: number;
        offset?: number;
        orderBy?: keyof PipelineExecution;
        ascending?: boolean;
    }): Promise<PipelineExecutionCompatibility[]>;
    create(data: (PipelineExecutionInsert & {
        metadata?: Record<string, any>;
        result?: Json | null;
        error_message?: string | null;
        execution_time_ms?: number | null;
    }) | any): Promise<PipelineExecutionCompatibility>;
    update(id: string, data: (PipelineExecutionUpdate & {
        metadata?: Record<string, any>;
        result?: Json | null;
        error_message?: string | null;
        execution_time_ms?: number | null;
    }) | any): Promise<PipelineExecutionCompatibility>;
    getByDeliverableId(deliverableId: string): Promise<PipelineExecutionCompatibility[]>;
}
