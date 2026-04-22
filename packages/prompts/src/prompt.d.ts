/**
 * prompts/src/prompt.ts - Prompt as Registry
 *
 * Revolutionary design: Prompt IS a Registry.
 * This enables hierarchical prompt composition with typed paths.
 */
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
 *
   *   TODO: is this.set not defined (consuming code is showing that linting error?)
 */
export declare class Prompt extends RegistryImpl<PromptPart> {
    private required;
    private requiredPatterns;
    private requiresHierarchy;
    /**
     * Require a specific path to be present
     */
    require(path: string): this;
    /**
     * Require paths matching a pattern (uses simple glob matching)
     */
    requirePattern(pattern: string): this;
    /**
     * Require hierarchy to be present (e.g., for pipeline:phase:agent)
     */
    requireHierarchy(): this;
    /**
     * Format the prompt using the provided formatter or default
     */
    format(formatter?: PromptFormatter): string;
    /**
     * Get all prompt parts in hierarchical order
     */
    getAllParts(): PromptPart[];
    /**
     * Get all paths in the registry
     */
    getAllPaths(): string[];
    /**
     * Get required paths and patterns
     */
    getRequired(): Set<string>;
    /**
     * Get prompt parts matching a pattern
     */
    getPattern(pattern: string): PromptPart[];
    /**
     * Clone this prompt
     */
    clone(): Prompt;
    private validateRequirements;
}
/**
 * Factory function for creating prompts
 */
export declare function createPrompt(): Prompt;
