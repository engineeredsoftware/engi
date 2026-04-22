/**
 * File Gates - Enforce meta-phase file editing restrictions
 *
 * Ensures that each meta-phase can only edit its designated files:
 * - Design: Only .ai/PRODUCT.md
 * - Develop: Codebase files (not .ai/, except PRODUCT.md updates)
 * - Digest: Only .ai/AGENTS.md and .ai/PRODUCT.md
 *
 * @package @bitcode/pipelines-generics
 */
import type { MetaPhase } from './types';
/**
 * Check if a file path is allowed in the current meta-phase
 */
export declare function isFileAllowed(filePath: string, metaPhase: MetaPhase): boolean;
/**
 * Filter file list to only allowed files
 */
export declare function filterAllowedFiles(filePaths: string[], metaPhase: MetaPhase): string[];
/**
 * Validate file operations for meta-phase compliance
 */
export declare function validateFileOperation(operation: 'read' | 'write' | 'delete', filePath: string, metaPhase: MetaPhase): {
    allowed: boolean;
    reason?: string;
};
/**
 * Get helpful message about what files can be edited
 */
export declare function getAllowedFilesMessage(metaPhase: MetaPhase): string;
/**
 * Tool wrapper that enforces file gates
 */
export declare function createGatedTool<TInput, TOutput>(originalTool: (input: TInput) => Promise<TOutput>, extractFilePath: (input: TInput) => string, operation: 'read' | 'write' | 'delete'): (input: TInput, metaPhase: MetaPhase) => Promise<TOutput>;
