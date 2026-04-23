/**
 * prompts/src/prompt.ts - Prompt as Registry
 * 
 * Revolutionary design: Prompt IS a Registry.
 * This enables hierarchical prompt composition with typed paths.
 */

// Keep the prompt contract on the public registry package boundary rather than
// depending on repo-relative source reach-through.
import { RegistryImpl } from '@bitcode/registry';
import { PromptPart } from './parts/PromptPart';

/**
 * PromptFormatter - Function type for formatting prompts
 * Takes a Prompt registry and returns a formatted string
 */
export type PromptFormatter = (prompt: Prompt) => string;

/**
 * Prompt - A typed Registry for hierarchical prompt composition
 * 
 * Extends Registry to provide:
 * - Hierarchical prompt part storage (PromptPart = branded string)
 * - Required path validation
 * - Intelligent formatting with fallbacks
 * - Pattern-based requirements
 * - Bitcode prompt layering where generic base PromptParts and specific
 *   implementation PromptParts compose through explicit registry paths
 *
   *   TODO: is this.set not defined (consuming code is showing that linting error?)
 */
export class Prompt extends RegistryImpl<PromptPart> {
  private required = new Set<string>();
  private requiredPatterns = new Set<string>();
  private requiresHierarchy = false;

  /**
   * Require a specific path to be present
   */
  require(path: string): this {
    this.required.add(path);
    return this;
  }

  /**
   * Require paths matching a pattern (uses simple glob matching)
   */
  requirePattern(pattern: string): this {
    this.requiredPatterns.add(pattern);
    return this;
  }

  /**
   * Require hierarchy to be present (e.g., for pipeline:phase:agent)
   */
  requireHierarchy(): this {
    this.requiresHierarchy = true;
    return this;
  }

  /**
   * Format the prompt using the provided formatter or default
   */
  format(formatter?: PromptFormatter): string {
    // Validate requirements
    this.validateRequirements();

    // Use provided formatter or default
    const actualFormatter = formatter || defaultFormatter;
    return actualFormatter(this);
  }

  /**
   * Get all prompt parts in hierarchical order
   */
  getAllParts(): PromptPart[] {
    const parts: PromptPart[] = [];
    const paths = this.getPaths().sort(); // Alphabetical = hierarchical

    for (const path of paths) {
      const part = this.get(path);
      if (part) {
        parts.push(part);
      }
    }

    return parts;
  }

  /**
   * Get all paths in the registry
   */
  getAllPaths(): string[] {
    return this.getPaths();
  }

  /**
   * Get required paths and patterns
   */
  getRequired(): Set<string> {
    const allRequired = new Set<string>();
    this.required.forEach(req => allRequired.add(req));
    this.requiredPatterns.forEach(pattern => allRequired.add(`pattern:${pattern}`));
    return allRequired;
  }

  /**
   * Get prompt parts matching a pattern
   */
  getPattern(pattern: string): PromptPart[] {
    const parts: PromptPart[] = [];
    const regex = patternToRegex(pattern);
    const paths = this.getPaths();

    for (const path of paths) {
      if (regex.test(path)) {
        const part = this.get(path);
        if (part) {
          parts.push(part);
        }
      }
    }

    return parts;
  }

  /**
   * Clone this prompt
   */
  clone(): Prompt {
    const cloned = new Prompt();
    cloned.merge(this);

    // Copy requirements
    this.required.forEach(req => cloned.required.add(req));
    this.requiredPatterns.forEach(pattern => cloned.requiredPatterns.add(pattern));
    cloned.requiresHierarchy = this.requiresHierarchy;

    return cloned;
  }

  private validateRequirements(): void {
    // Check required paths
    for (const path of this.required) {
      if (!this.has(path)) {
        throw new Error(`Required prompt path missing: ${path}`);
      }
    }

    // Check required patterns
    for (const pattern of this.requiredPatterns) {
      const matches = this.getPattern(pattern);
      if (matches.length === 0) {
        throw new Error(`No prompt paths match required pattern: ${pattern}`);
      }
    }

    // Check hierarchy requirement
    if (this.requiresHierarchy) {
      const paths = this.getPaths();
      const hasHierarchy = paths.some(path => path.includes(':'));
      if (!hasHierarchy) {
        throw new Error('Prompt requires hierarchical structure but none found');
      }
    }
  }
}

/**
 * Default formatter - joins all parts with double newlines
 */
const defaultFormatter: PromptFormatter = (prompt: Prompt): string => {
  const parts = prompt.getAllParts();
  // PromptPart is a branded string, so we can just join them
  return parts.join('\n\n');
};

/**
 * Convert simple glob pattern to regex
 */
function patternToRegex(pattern: string): RegExp {
  // Escape special regex chars except * and ?
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  // Convert * to .* and ? to .
  const regexStr = escaped.replace(/\*/g, '.*').replace(/\?/g, '.');
  return new RegExp(`^${regexStr}$`);
}

/**
 * Factory function for creating prompts
 */
export function createPrompt(): Prompt {
  return new Prompt();
}
