/**
 * STREAMER - Clean event emission for pipeline streaming
 *
 * A minimal streamer focused on emitting events to subscribers
 * without legacy complexity or domain coupling.
 */
export type StreamEventHandler = (event: any) => void | Promise<void>;
export interface StreamerConfig {
    streamId: string;
    userId?: string;
}
/**
 * Clean streamer for pipeline event emission
 */
export declare class Streamer {
    private config;
    private subscribers;
    private isComplete;
    constructor(config: StreamerConfig);
    /**
     * Subscribe to stream events
     */
    subscribe(handler: StreamEventHandler): () => void;
    /**
     * Emit an event to all subscribers
     */
    emit(event: any): Promise<void>;
    /**
     * Compatibility entrypoint for retained callers that still write
     * serialized stream payloads directly.
     */
    writeData(data: string | Record<string, unknown>): Promise<void>;
    /**
     * Mark stream as complete
     */
    complete(): void;
    /**
     * Check if stream is complete
     */
    get completed(): boolean;
}
