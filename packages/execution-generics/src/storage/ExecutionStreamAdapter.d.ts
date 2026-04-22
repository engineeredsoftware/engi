/**
 * EXECUTION STREAM ADAPTER - Bridge between execution storage and streaming
 *
 * Hooks into the execution storage flow to emit stream events
 * when executions store data. This enables real-time streaming
 * of pipeline execution progress.
 */
import { Streamer } from '@bitcode/streams';
import { ExecutionStorageDestination } from './StorageDestination';
/**
 * Stream event types emitted during execution
 */
export declare enum ExecutionStreamEventType {
    PHASE_START = "phase-start",
    PHASE_COMPLETE = "phase-complete",
    AGENT_START = "agent-start",
    AGENT_COMPLETE = "agent-complete",
    TOOL_USE = "tool-use",
    GENERATION = "generation",
    THINKING = "thinking",
    ERROR = "error",
    COMPLETION = "completion",
    STATUS = "status",
    WORK_UPDATE = "work-update"
}
/**
 * Stream adapter configuration
 */
export interface ExecutionStreamConfig {
    streamer?: Streamer;
    emitToDatabase?: boolean;
    runId?: string;
    userId?: string;
}
/**
 * Adapter for streaming execution events
 */
export declare class ExecutionStreamAdapter {
    private static streamers;
    /**
     * Register a streamer for an execution
     */
    static registerStreamer(executionId: string, streamer: Streamer): void;
    /**
     * Unregister a streamer
     */
    static unregisterStreamer(executionId: string): void;
    /**
     * Hook called when execution stores data
     * Emits appropriate stream events based on the storage namespace and key
     */
    static onStore(executionId: string, namespace: string, key: string, value: any, destinations: ExecutionStorageDestination[], nodeInfo?: {
        nodeId: string;
        rootId: string;
        path: string[];
    }): Promise<void>;
    /**
     * Infer stream event type from storage patterns
     */
    private static inferEventType;
    /**
     * Extract execution state from stored value
     */
    private static extractExecutionState;
    /**
     * Extract human-readable message from stored value
     */
    private static extractMessage;
    /**
     * Sanitize data for streaming (remove sensitive/large content)
     */
    private static sanitizeData;
    /**
     * Emit a custom event directly
     */
    static emitEvent(executionId: string, type: ExecutionStreamEventType, data: any): Promise<void>;
}
