/**
 * Streams Package - Real-time pipeline communication
 *
 * @doc-package
 * version: 1.0.0
 * philosophy: "Streams connect pipeline intelligence in real-time"
 */
export { type ExecutionPhase, type ExecutionStep, type FailsafeStep, type GenerationStep, type MetaPhase, type ExecutionState, type ToolUseMessage, type GenerationMessage, type StreamMessage, type FileDiff, type FileTreeChange, type DataStream, writeStreamMessage, writeStreamError, writeStreamWarning, writeStreamToolUse, writeStreamGeneration, writeStreamThinking } from './streams';
export { writeFileDiff, writeFileTreeChanges, calculateFileTreeStats, extractFileDiffsFromToolResults } from './file-diff-helpers';
export { type PipelineStreamConfig, type PipelineStreamMessage, StreamEventType, GenericStreamManager, StreamFactory, StreamTracked } from './generic-streaming';
export { type StreamEventHandler, type StreamerConfig, Streamer } from './streamer';
