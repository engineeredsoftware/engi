/**
 * File Change Tracker
 *
 * Tracks all file edits during execution for diff visualization.
 * Accumulates changes from Write, Edit, and Delete tool executions.
 *
 * @package @bitcode/execution-generics
 */
import type { Execution } from '../Execution';
import type { StorableObject } from '../types';
type FileChangeShape = {
    path: string;
    action: 'created' | 'modified' | 'deleted';
    oldContent?: string;
    newContent?: string;
    linesAdded?: number;
    linesRemoved?: number;
    language?: string;
    timestamp: string;
    tool: string;
    agent?: string;
    step?: string;
};
export type FileChange = StorableObject & FileChangeShape;
type FileChangeInput = Omit<FileChangeShape, 'timestamp'>;
type FileChangeStatsShape = {
    totalFilesCreated: number;
    totalFilesModified: number;
    totalFilesDeleted: number;
    totalLinesAdded: number;
    totalLinesRemoved: number;
    files: FileChange[];
};
export type FileChangeStats = StorableObject & FileChangeStatsShape;
/**
 * Record a file change in execution state
 */
export declare function recordFileChange(execution: Execution, change: FileChangeInput): void;
/**
 * Get all file changes for execution
 */
export declare function getFileChanges(execution: Execution): FileChange[];
/**
 * Get file change statistics
 */
export declare function getFileChangeStats(execution: Execution): FileChangeStats;
/**
 * Extract file changes from tool results
 *
 * Parse usedTools array and record file changes automatically.
 * Call this after each PTRR step completes.
 */
export declare function extractFileChangesFromToolResults(execution: Execution, toolResults: Array<{
    name: string;
    input: any;
    output?: any;
    metadata?: any;
}>, context?: {
    agent?: string;
    step?: string;
}): void;
/**
 * Clear file changes (for new iteration)
 */
export declare function clearFileChanges(execution: Execution): void;
export {};
