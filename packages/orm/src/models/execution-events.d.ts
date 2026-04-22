import { SupabaseClient } from '@supabase/supabase-js';
import { BaseModel } from './base';
import type { Database, Tables, Insertable } from '../types/database';
export type ExecutionEvent = Tables<'execution_events'>;
export type ExecutionEventInsert = Insertable<'execution_events'>;
export declare class ExecutionEventsModel extends BaseModel<'execution_events'> {
    constructor(supabase: SupabaseClient<Database>);
    /**
     * Retrieve events for a run ordered by creation time.
     */
    getByRunId(runId: string, options?: {
        since?: string;
        limit?: number;
    }): Promise<{
        agent_name: string | null;
        created_at: string | null;
        event_data: import("../types/database").Json | null;
        event_type: string;
        id: string;
        phase: string | null;
        run_id: string;
    }[]>;
}
