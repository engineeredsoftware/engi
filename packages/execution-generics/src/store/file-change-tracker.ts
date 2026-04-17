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

const FILE_CHANGES_NAMESPACE = 'file-changes';

/**
 * Record a file change in execution state
 */
export function recordFileChange(
  execution: Execution,
  change: FileChangeInput
): void {
  const changes = execution.get<FileChange[]>(FILE_CHANGES_NAMESPACE, 'all') || [];

  const fileChange: FileChange = {
    ...change,
    timestamp: new Date().toISOString(),
  };

  changes.push(fileChange);
  execution.store(FILE_CHANGES_NAMESPACE, 'all', changes);

  // Also store by path for quick lookups
  execution.store(FILE_CHANGES_NAMESPACE, change.path, fileChange);

  // Update statistics
  updateFileChangeStats(execution);
}

/**
 * Get all file changes for execution
 */
export function getFileChanges(execution: Execution): FileChange[] {
  return execution.get<FileChange[]>(FILE_CHANGES_NAMESPACE, 'all') || [];
}

/**
 * Get file change statistics
 */
export function getFileChangeStats(execution: Execution): FileChangeStats {
  return execution.get<FileChangeStats>(FILE_CHANGES_NAMESPACE, 'stats') || {
    totalFilesCreated: 0,
    totalFilesModified: 0,
    totalFilesDeleted: 0,
    totalLinesAdded: 0,
    totalLinesRemoved: 0,
    files: [],
  };
}

/**
 * Update statistics (internal)
 */
function updateFileChangeStats(execution: Execution): void {
  const files = getFileChanges(execution);

  const stats: FileChangeStats = {
    totalFilesCreated: 0,
    totalFilesModified: 0,
    totalFilesDeleted: 0,
    totalLinesAdded: 0,
    totalLinesRemoved: 0,
    files,
  };

  for (const file of files) {
    if (file.action === 'created') stats.totalFilesCreated++;
    if (file.action === 'modified') stats.totalFilesModified++;
    if (file.action === 'deleted') stats.totalFilesDeleted++;
    stats.totalLinesAdded += file.linesAdded || 0;
    stats.totalLinesRemoved += file.linesRemoved || 0;
  }

  execution.store(FILE_CHANGES_NAMESPACE, 'stats', stats);
}

/**
 * Extract file changes from tool results
 *
 * Parse usedTools array and record file changes automatically.
 * Call this after each PTRR step completes.
 */
export function extractFileChangesFromToolResults(
  execution: Execution,
  toolResults: Array<{
    name: string;
    input: any;
    output?: any;
    metadata?: any;
  }>,
  context?: {
    agent?: string;
    step?: string;
  }
): void {
  for (const result of toolResults) {
    if (result.name === 'Write' || result.name === 'write' || result.name === 'text-editor-write') {
      const filePath = result.input?.file_path || result.input?.path;
      const content = result.input?.content || result.input?.data;

      if (filePath && content) {
        recordFileChange(execution, {
          path: filePath,
          action: 'created',
          newContent: content,
          linesAdded: content.split('\n').length,
          linesRemoved: 0,
          tool: result.name,
          agent: context?.agent,
          step: context?.step,
        });
      }
    }

    if (result.name === 'Edit' || result.name === 'edit' || result.name === 'text-editor-edit') {
      const filePath = result.input?.file_path || result.input?.path;
      const oldContent = result.metadata?.before || result.metadata?.old;
      const newContent = result.metadata?.after || result.metadata?.new;

      if (filePath) {
        const oldLines = oldContent?.split('\n').length || 0;
        const newLines = newContent?.split('\n').length || 0;

        recordFileChange(execution, {
          path: filePath,
          action: 'modified',
          oldContent,
          newContent,
          linesAdded: Math.max(0, newLines - oldLines),
          linesRemoved: Math.max(0, oldLines - newLines),
          tool: result.name,
          agent: context?.agent,
          step: context?.step,
        });
      }
    }

    if (result.name === 'Delete' || result.name === 'delete' || result.name === 'text-editor-delete') {
      const filePath = result.input?.file_path || result.input?.path;
      const oldContent = result.metadata?.content;

      if (filePath) {
        recordFileChange(execution, {
          path: filePath,
          action: 'deleted',
          oldContent,
          linesRemoved: oldContent?.split('\n').length || 0,
          tool: result.name,
          agent: context?.agent,
          step: context?.step,
        });
      }
    }

    // Handle Bash tool git operations (rm, mv)
    if (result.name === 'Bash' || result.name === 'bash') {
      const command = result.input?.command || '';

      // Simple pattern matching for file deletions
      const rmMatch = command.match(/rm\s+([^\s&|;]+)/);
      if (rmMatch) {
        recordFileChange(execution, {
          path: rmMatch[1],
          action: 'deleted',
          linesRemoved: 0,
          tool: 'Bash',
          agent: context?.agent,
          step: context?.step,
        });
      }
    }
  }
}

/**
 * Clear file changes (for new iteration)
 */
export function clearFileChanges(execution: Execution): void {
  execution.store(FILE_CHANGES_NAMESPACE, 'all', []);
  execution.store(FILE_CHANGES_NAMESPACE, 'stats', {
    totalFilesCreated: 0,
    totalFilesModified: 0,
    totalFilesDeleted: 0,
    totalLinesAdded: 0,
    totalLinesRemoved: 0,
    files: [],
  });
}
