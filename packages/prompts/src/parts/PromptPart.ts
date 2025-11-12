/**
 * PROMPT PART - SEMANTIC UNIT OF INTELLIGENCE
 * 
 * PromptPart is the foundational type for all prompts in Engi.
 * It represents a semantic, composable unit of prompt intelligence.
 * 
 * CRITICAL: Every PromptPart is a PART of a specific Prompt class.
 * The file naming pattern MUST reflect this relationship:
 * 
 * promptpart_[generic|specific]_[domain]_[PROMPTCLASSNAME]_[semanticcontext]_[POSITION].ts
 * 
 * Key rules:
 * - PROMPTCLASSNAME: Drop "Prompt" suffix (EngiSystemPrompt → engisystem)
 * - semanticcontext: NO underscores (inherentknowledgeidentity)
 * - POSITION: opener/closer, header/footer, corestatement, detailcontent, list/listitem
 * 
 * @category Core Types
 * @priority Critical - Foundation of prompt system
 */

/**
 * PromptPart - A semantic unit of prompt content
 * 
 * This is a branded type that ensures type safety throughout the prompt system.
 * PromptParts are:
 * - Immutable strings of prompt content
 * - Type-safe (cannot accidentally use regular strings)
 * - Build-time optimized
 */
export type PromptPart = string & { readonly __brand: 'PromptPart' };

/**
 * Create a PromptPart from a string
 * This is the ONLY way to create a PromptPart
 */
export function createPromptPart(content: string): PromptPart {
  return content as PromptPart;
}

/**
 * Type guard for PromptPart
 */
export function isPromptPart(value: unknown): value is PromptPart {
  return typeof value === 'string';
}

/**
 * Empty PromptPart constant
 */
export const EMPTY_PROMPT_PART: PromptPart = createPromptPart('');

/**
 * PromptPart metadata for build-time intelligence
 */
export interface PromptPartMetadata {
  /** Unique identifier */
  id: string;

  /** Category (generic/specific) */
  category: 'generic' | 'specific';

  /** Semantic type */
  semanticType: 'identity' | 'objective' | 'methodology' | 'behavior' | 'constraint' | 'tool_doc';

  /** Version */
  version: string;

  /** Dependencies on other PromptParts */
  dependencies?: string[];

  /** Build-time optimizations */
  optimizations?: {
    cacheable?: boolean;
    precompile?: boolean;
    inline?: boolean;
  };
}

/**
 * @doc-field Why branded types for PromptPart?
 * Branded types prevent accidental string usage:
 * - Can't pass raw string where PromptPart expected
 * - Forces conscious creation through createPromptPart()
 * - Enables build-time validation and optimization
 * - Makes prompt flow trackable through type system
 * 
 * @doc-field How does this enable build-time magic?
 * The metadata and branding enable:
 * - Static analysis of prompt dependencies
 * - Build-time composition optimization
 * - Dead prompt elimination
 * - Prompt bundling and splitting
 * - Type-safe prompt imports in comments
 */
