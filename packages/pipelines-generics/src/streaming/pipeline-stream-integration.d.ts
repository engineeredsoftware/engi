/**
 * PIPELINE STREAM INTEGRATION - Connect pipelines to streaming infrastructure
 *
 * Provides helpers to wire up pipeline executions with stream managers
 * for real-time event emission during pipeline executions.
 */
import { Execution } from '@bitcode/execution-generics/Execution';
import { Streamer } from '@bitcode/streams';
type SupabaseClient = any;
/**
 * Configuration for pipeline streaming
 */
export interface PipelineStreamConfig {
    runId: string;
    userId: string;
    supabase?: SupabaseClient;
    streamToDatabase?: boolean;
    streamToSSE?: boolean;
    structuredToDatabase?: boolean;
}
/**
 * Wire up a pipeline execution with streaming
 *
 * This registers a stream manager with the execution so that
 * all storage operations emit stream events automatically.
 */
export declare function enablePipelineStreaming(execution: Execution, config: PipelineStreamConfig): Streamer;
/**
 * Create a streaming-enabled pipeline execution
 *
 * Convenience function that creates an execution with streaming pre-configured.
 */
export declare function createStreamingExecution(config: PipelineStreamConfig & {
    parent?: Execution;
}): Execution;
/**
 * Helper to emit phase transitions
 */
export declare function emitPhaseTransition(execution: Execution, phase: string, transition: 'start' | 'complete', metadata?: any): Promise<void>;
/**
 * Helper to emit agent activity
 */
export declare function emitAgentActivity(execution: Execution, agent: string, activity: 'start' | 'complete' | 'error', metadata?: any): Promise<void>;
/**
 * Helper to emit tool usage
 */
export declare function emitToolUsage(execution: Execution, tool: string, input: any, output?: any, error?: any): Promise<void>;
export {};
