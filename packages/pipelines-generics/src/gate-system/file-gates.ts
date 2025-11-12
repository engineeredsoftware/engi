/**
 * File Gates - Enforce meta-phase file editing restrictions
 *
 * Ensures that each meta-phase can only edit its designated files:
 * - Design: Only .ai/PRODUCT.md
 * - Develop: Codebase files (not .ai/, except PRODUCT.md updates)
 * - Digest: Only .ai/AGENTS.md and .ai/PRODUCT.md
 *
 * @package @engi/pipelines-generics
 */

import { minimatch } from 'minimatch';
import type { MetaPhase, MetaPhaseConfig } from './types';
import { META_PHASE_CONFIGS } from './types';

/**
 * Check if a file path is allowed in the current meta-phase
 */
export function isFileAllowed(filePath: string, metaPhase: MetaPhase): boolean {
  const config = META_PHASE_CONFIGS[metaPhase];
  const patterns = config.allowedFilePatterns;

  // Check each pattern
  for (const pattern of patterns) {
    // Negation pattern (exclusion)
    if (pattern.startsWith('!')) {
      const negativePattern = pattern.slice(1);
      if (minimatch(filePath, negativePattern)) {
        return false;
      }
    }
    // Positive pattern (inclusion)
    else {
      if (minimatch(filePath, pattern)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Filter file list to only allowed files
 */
export function filterAllowedFiles(filePaths: string[], metaPhase: MetaPhase): string[] {
  return filePaths.filter((path) => isFileAllowed(path, metaPhase));
}

/**
 * Validate file operations for meta-phase compliance
 */
export function validateFileOperation(
  operation: 'read' | 'write' | 'delete',
  filePath: string,
  metaPhase: MetaPhase
): { allowed: boolean; reason?: string } {
  const config = META_PHASE_CONFIGS[metaPhase];

  // Read operations are always allowed
  if (operation === 'read') {
    return { allowed: true };
  }

  // Write/delete operations must respect file gates
  const allowed = isFileAllowed(filePath, metaPhase);

  if (!allowed) {
    const primaryDoc = config.primaryDocument || 'designated files';
    return {
      allowed: false,
      reason: `${metaPhase} phase can only ${operation} ${primaryDoc}. Attempted: ${filePath}`,
    };
  }

  return { allowed: true };
}

/**
 * Get helpful message about what files can be edited
 */
export function getAllowedFilesMessage(metaPhase: MetaPhase): string {
  const config = META_PHASE_CONFIGS[metaPhase];

  switch (metaPhase) {
    case 'Design':
      return 'In Design phase, you can only edit .ai/PRODUCT.md to specify what should be built.';

    case 'Develop':
      return 'In Develop phase, you can edit codebase files to implement the design. PRODUCT.md can be updated with refinements.';

    case 'Digest':
      return 'In Digest phase, update .ai/AGENTS.md with learnings and finalize .ai/PRODUCT.md.';

    default:
      return `Allowed files: ${config.allowedFilePatterns.join(', ')}`;
  }
}

/**
 * Tool wrapper that enforces file gates
 */
export function createGatedTool<TInput, TOutput>(
  originalTool: (input: TInput) => Promise<TOutput>,
  extractFilePath: (input: TInput) => string,
  operation: 'read' | 'write' | 'delete'
) {
  return async (input: TInput, metaPhase: MetaPhase): Promise<TOutput> => {
    const filePath = extractFilePath(input);
    const validation = validateFileOperation(operation, filePath, metaPhase);

    if (!validation.allowed) {
      throw new Error(
        `File operation blocked: ${validation.reason}\n\n${getAllowedFilesMessage(metaPhase)}`
      );
    }

    return originalTool(input);
  };
}
