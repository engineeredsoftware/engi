/**
 * Prompt Formatters - Transform registries into final PromptParts
 * 
 * Formatters are pure functions that transform a Prompt registry
 * into a final PromptPart string. Different formatters provide
 * different output structures.
 */

export { hierarchicalFormatter } from './hierarchical';

// Re-export types
export type { PromptFormatter } from '../prompt';