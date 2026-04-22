/**
 * File Diff Streaming Helpers
 *
 * Utilities for streaming file changes through the execution pipeline.
 * Integrates with the core streaming system to show code diffs in real-time.
 *
 * @package @bitcode/streams
 */
import type { FileDiff, FileTreeChange } from './streams';
/**
 * Write a single file diff to the stream
 *
 * Use this when a file is created, modified, or deleted during execution.
 * The UI will render an expandable diff viewer inline with the log.
 */
export declare function writeFileDiff(dataStream: any, fileDiff: FileDiff, options?: {
    phase?: string;
    agent?: string;
    step?: string;
    message?: string;
}): Promise<void>;
/**
 * Write complete file tree changes to the stream
 *
 * Use this at the end of implementation phase to show all file changes
 * in a single, comprehensive view with statistics.
 */
export declare function writeFileTreeChanges(dataStream: any, fileTree: FileTreeChange, options?: {
    phase?: string;
    agent?: string;
    step?: string;
    message?: string;
}): Promise<void>;
/**
 * Calculate file tree statistics from an array of file diffs
 */
export declare function calculateFileTreeStats(files: FileDiff[]): FileTreeChange;
/**
 * Extract file diffs from tool results
 *
 * Parse tool execution results (Write, Edit, Delete tools) and convert
 * to FileDiff objects for streaming.
 */
export declare function extractFileDiffsFromToolResults(toolResults: any[]): FileDiff[];
