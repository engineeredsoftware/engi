/**
 * File system operations with Bitcode's atomic file management engine, transaction support, content validation, and production-grade reliability for comprehensive file system intelligence and atomic operation guarantees
 * 
 * @purpose File system operations with Bitcode's atomic file management engine, transaction support, content validation, and production-grade reliability for comprehensive file system intelligence and atomic operation guarantees
 * @capabilities Complete file system management with atomic operations, transaction support, rollback capability, content validation, directory management, and comprehensive file integrity for reliable development workflows
 * @specificity Generic
 */

import { Tool, attachDocCodeToolPrompt, factoryTool } from '@bitcode/tools-generics';
import { z } from 'zod';
import { TEXT_EDITOR_DOC_CODE_TOOL_PROMPT } from './prompts/TextEditorDocCodeToolPrompt';
import { REPLACE_FILE_DOC_CODE_TOOL_PROMPT } from './prompts/ReplaceFileDocCodeToolPrompt';
import { CREATE_FILE_DOC_CODE_TOOL_PROMPT } from './prompts/CreateFileDocCodeToolPrompt';
import { DELETE_FILE_DOC_CODE_TOOL_PROMPT } from './prompts/DeleteFileDocCodeToolPrompt';

import {
  editCommandSchema,
  runEditCommand,
  EditCommandParams,
  TransactionalFileEditor,
  EditError,
} from '@bitcode/editing';

// Gate-aware file operations
import type { Execution } from '@bitcode/execution-generics';

// Global execution context for gate checking (simple Map-based for Next.js compatibility)
class ExecutionContextStore {
  private contexts = new Map<string, Execution>();
  private currentKey: string | null = null;

  run<R>(execution: Execution, fn: () => R | Promise<R>): R | Promise<R> {
    const key = `exec_${Date.now()}_${Math.random()}`;
    this.contexts.set(key, execution);
    const previousKey = this.currentKey;
    this.currentKey = key;

    try {
      const result = fn();
      if (result instanceof Promise) {
        return result.finally(() => {
          this.contexts.delete(key);
          this.currentKey = previousKey;
        }) as R;
      }
      this.contexts.delete(key);
      this.currentKey = previousKey;
      return result;
    } catch (error) {
      this.contexts.delete(key);
      this.currentKey = previousKey;
      throw error;
    }
  }

  getStore(): Execution | undefined {
    return this.currentKey ? this.contexts.get(this.currentKey) : undefined;
  }
}

export const executionContext = new ExecutionContextStore();

/**
 * Gate-aware wrapper for runEditCommand
 * Checks file gates if execution context is available
 */
async function runEditCommandWithGates(params: EditCommandParams): Promise<string> {
  const execution = executionContext.getStore();

  if (execution) {
    const allowedPatterns = execution.get('gates', 'allowedFilePatterns');
    const currentGate = execution.get('gate', 'current');

    if (allowedPatterns && params.command !== 'view') {
      // Import gate checking logic
      const { isFileAllowed } = await import('@bitcode/pipelines-generics');
      const allowed = isFileAllowed(params.path, (currentGate as any) || 'Develop');

      if (!allowed) {
        const primaryDoc = execution.get('gates', 'primaryDocument');
        throw new EditError(
          `File operation blocked by gate: ${currentGate} phase can only modify ${primaryDoc || 'designated files'}. Attempted: ${params.path}`,
          'GATE_VIOLATION',
          params.path,
          params.command
        );
      }
    }
  }

  return runEditCommand(params);
}

import { BEGIN_TRANSACTION_TOOL_PROMPT } from './prompts/tool-prompt-transaction-begin';

/**
 * Atomic file editing with comprehensive operation intelligence
 *
 * @doc-code-tool
 * @prompt TEXT_EDITOR_DOC_CODE_TOOL_PROMPT
 */
class TextEditorTool extends Tool<typeof runEditCommandWithGates> {
  use = runEditCommandWithGates;
}

export const textEditorTool = new TextEditorTool();

/**
 * Atomic file deletion with comprehensive safety intelligence
 *
 * @doc-code-tool
 * @prompt DELETE_FILE_DOC_CODE_TOOL_PROMPT
 * @name DeleteFileTool
 * @purpose Atomic file deletion with Bitcode's comprehensive file system safety engine
 * @capabilities Safe file deletion with atomic operations, backup creation, rollback capability, dependency validation, and comprehensive file system safety for reliable file management
 * @parameters EditCommandParams - file path to delete
 * @returns Success status, backup location, transaction ID
 * @category file-system
 * @stability stable
 * @version 1.0.0
 */
class DeleteFileTool extends Tool<typeof runEditCommandWithGates> {
  use = runEditCommandWithGates;
}

export const deleteFileTool = new DeleteFileTool();

/**
 * Atomic file creation with comprehensive validation intelligence
 *
 * @doc-code-tool
 * @prompt CREATE_FILE_DOC_CODE_TOOL_PROMPT
 * @name CreateFileTool
 * @purpose Atomic file creation with Bitcode's comprehensive file system validation engine
 * @capabilities Complete file creation with atomic operations, directory management, content validation, conflict detection, and comprehensive file system integrity for reliable development workflows
 * @parameters EditCommandParams - file path, initial content, permissions
 * @returns Success status, created path, transaction ID
 * @category file-system
 * @stability stable
 * @version 1.0.0
 */
class CreateFileTool extends Tool<typeof runEditCommandWithGates> {
  use = runEditCommandWithGates;
}

export const createFileTool = new CreateFileTool();

/**
 * Atomic file replacement with comprehensive content intelligence
 *
 * @doc-code-tool
 * @prompt REPLACE_FILE_DOC_CODE_TOOL_PROMPT
 */
class ReplaceFileTool extends Tool<typeof runEditCommandWithGates> {
  use = runEditCommandWithGates;
}

export const replaceFileTool = new ReplaceFileTool();

// Transaction management tools for multi-file operations
const transactionSchema = z.object({
  transactionId: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export const beginTransactionTool = factoryTool(
  'beginTransactionTool',
  async (params: z.infer<typeof transactionSchema>) => {
    try {
      const editor = new TransactionalFileEditor();
      const transactionId = await editor.beginTransaction(params.metadata);
      
      return {
        success: true,
        transactionId,
        message: `Transaction started: ${transactionId}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        message: `Failed to start transaction: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  },
  {
    description: BEGIN_TRANSACTION_TOOL_PROMPT.format(),
    parameters: transactionSchema
  }
);

attachDocCodeToolPrompt(beginTransactionTool, BEGIN_TRANSACTION_TOOL_PROMPT);

const commitTransactionSchema = z.object({
  transactionId: z.string().min(1),
  metadata: z.record(z.any()).optional(),
});

export const commitTransactionTool = factoryTool(
  'commitTransactionTool',
  async (params: z.infer<typeof commitTransactionSchema>) => {
    try {
      const editor = new TransactionalFileEditor(params.transactionId);
      await editor.commitTransaction();

      return {
        success: true,
        transactionId: params.transactionId,
        message: `Transaction committed: ${params.transactionId}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        transactionId: params.transactionId,
        message: `Failed to commit transaction: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  },
  {
    description: 'Commit a multi-file transaction, making all changes permanent.',
    parameters: commitTransactionSchema
  }
);

const rollbackTransactionSchema = z.object({
  transactionId: z.string().min(1),
  metadata: z.record(z.any()).optional(),
});

export const rollbackTransactionTool = factoryTool(
  'rollbackTransactionTool',
  async (params: z.infer<typeof rollbackTransactionSchema>) => {
    try {
      const editor = new TransactionalFileEditor(params.transactionId);
      await editor.rollbackTransaction();

      return {
        success: true,
        transactionId: params.transactionId,
        message: `Transaction rolled back: ${params.transactionId}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        transactionId: params.transactionId,
        message: `Failed to rollback transaction: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  },
  {
    description: 'Rollback a multi-file transaction, undoing all changes.',
    parameters: rollbackTransactionSchema
  }
);

// Backwards compatibility aliases
export const renameFileTool = textEditorTool as typeof textEditorTool;
export const directoryTool = textEditorTool as typeof textEditorTool;

// ---------------------------------------------------------------------------
// Type aliases (using the shared Tool brand from @bitcode/tools-generics).
// ---------------------------------------------------------------------------

export type TextEditorToolFn = typeof textEditorTool;
export type DeleteFileToolFn = typeof deleteFileTool;
export type CreateFileToolFn = typeof createFileTool;
export type ReplaceFileToolFn = typeof replaceFileTool;
export type RenameFileToolFn = typeof renameFileTool;
export type DirectoryToolFn = typeof directoryTool;
export type BeginTransactionToolFn = typeof beginTransactionTool;
export type CommitTransactionToolFn = typeof commitTransactionTool;
export type RollbackTransactionToolFn = typeof rollbackTransactionTool;
