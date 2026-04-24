import { SupabaseClient } from '@supabase/supabase-js';
import { BaseModel } from './base';
import type { Database, Insertable, Tables, Updatable } from '../types/database';

export declare const BITCODE_EXECUTION_STORAGE_SCHEMA_PARITY: {
    readonly deliverable_run_phases: "phase_executions";
    readonly deliverable_vectors: "deliverable_vectors";
    readonly run_jobs: "run_jobs";
    readonly run_otf_instructions: "run_otf_instructions";
    readonly stream_logs: "stream_logs";
    readonly generated_assets: "generated_assets";
    readonly events: "events";
    readonly error_logs: "error_logs";
    readonly token_costs: "token_costs";
};
export type AssetPackVector = Tables<'deliverable_vectors'>;
export type AssetPackVectorInsert = Insertable<'deliverable_vectors'>;
export type AssetPackVectorUpdate = Updatable<'deliverable_vectors'>;
export type AssetPackPhaseExecution = Tables<'phase_executions'>;
export type AssetPackPhaseExecutionInsert = Insertable<'phase_executions'>;
export type AssetPackPhaseExecutionUpdate = Updatable<'phase_executions'>;
export type AssetPackRunJob = Tables<'run_jobs'>;
export type AssetPackRunJobInsert = Insertable<'run_jobs'>;
export type AssetPackRunJobUpdate = Updatable<'run_jobs'>;
export type AssetPackRunInstruction = Tables<'run_otf_instructions'>;
export type AssetPackRunInstructionInsert = Insertable<'run_otf_instructions'>;
export type AssetPackRunInstructionUpdate = Updatable<'run_otf_instructions'>;
export type AssetPackStreamLog = Tables<'stream_logs'>;
export type AssetPackStreamLogInsert = Insertable<'stream_logs'>;
export type AssetPackStreamLogUpdate = Updatable<'stream_logs'>;
export type AssetPackGeneratedAsset = Tables<'generated_assets'>;
export type AssetPackGeneratedAssetInsert = Insertable<'generated_assets'>;
export type AssetPackGeneratedAssetUpdate = Updatable<'generated_assets'>;
export type BitcodeActivityEvent = Tables<'events'>;
export type BitcodeActivityEventInsert = Insertable<'events'>;
export type BitcodeActivityEventUpdate = Updatable<'events'>;
export type BitcodeErrorLog = Tables<'error_logs'>;
export type BitcodeErrorLogInsert = Insertable<'error_logs'>;
export type BitcodeErrorLogUpdate = Updatable<'error_logs'>;
export type BitcodeTokenCost = Tables<'token_costs'>;
export type BitcodeTokenCostInsert = Insertable<'token_costs'>;
export type BitcodeTokenCostUpdate = Updatable<'token_costs'>;
export declare class AssetPackVectorsModel extends BaseModel<'deliverable_vectors'> {
    constructor(supabase: SupabaseClient<Database>);
    listByDeliverableId(deliverableId: string, options?: { limit?: number }): Promise<AssetPackVector[]>;
}
export declare class AssetPackPhaseExecutionsModel extends BaseModel<'phase_executions'> {
    constructor(supabase: SupabaseClient<Database>);
    listByRunId(runId: string, options?: { limit?: number }): Promise<AssetPackPhaseExecution[]>;
}
export declare class AssetPackRunJobsModel extends BaseModel<'run_jobs'> {
    constructor(supabase: SupabaseClient<Database>);
    listByStatus(status: string, options?: { limit?: number }): Promise<AssetPackRunJob[]>;
}
export declare class AssetPackRunInstructionsModel extends BaseModel<'run_otf_instructions'> {
    constructor(supabase: SupabaseClient<Database>);
    listByRunId(runId: string, options?: { limit?: number }): Promise<AssetPackRunInstruction[]>;
}
export declare class AssetPackStreamLogsModel extends BaseModel<'stream_logs'> {
    constructor(supabase: SupabaseClient<Database>);
    listByUserId(userId: string, options?: { limit?: number }): Promise<AssetPackStreamLog[]>;
    listByStreamId(streamId: string, options?: { limit?: number }): Promise<AssetPackStreamLog[]>;
}
export declare class AssetPackGeneratedAssetsModel extends BaseModel<'generated_assets'> {
    constructor(supabase: SupabaseClient<Database>);
    listByRunId(runId: string, options?: { limit?: number }): Promise<AssetPackGeneratedAsset[]>;
}
export declare class BitcodeActivityEventsModel extends BaseModel<'events'> {
    constructor(supabase: SupabaseClient<Database>);
    listByUserId(userId: string, options?: { limit?: number }): Promise<BitcodeActivityEvent[]>;
}
export declare class BitcodeErrorLogsModel extends BaseModel<'error_logs'> {
    constructor(supabase: SupabaseClient<Database>);
    listByUserId(userId: string, options?: { limit?: number }): Promise<BitcodeErrorLog[]>;
}
export declare class BitcodeTokenCostsModel extends BaseModel<'token_costs'> {
    constructor(supabase: SupabaseClient<Database>);
    listByRunId(runId: string, options?: { limit?: number }): Promise<BitcodeTokenCost[]>;
}
