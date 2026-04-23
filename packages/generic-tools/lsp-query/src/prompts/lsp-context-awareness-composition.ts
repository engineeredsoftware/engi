import { PROMPTPART_SPECIFIC_TOOL_CONTEXT_AWARENESS_LSP_HEADER } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_context_awareness_lsp_header';
import { PROMPTPART_SPECIFIC_TOOL_CONTEXT_AWARENESS_FEATURES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_context_awareness_features';
import { PROMPTPART_SPECIFIC_TOOL_CONTEXT_AWARENESS_LSP_FOOTER } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_context_awareness_lsp_footer';
/**
 * @doc-comment-developing-promptdevelopment
 * domain: tool
 * intent: "Bitcode LSP context-awareness composition for replayable Need and AssetPack measurement"
 * current_version: "0.50.0"
 * dependencies: {
 *   "PROMPTPART_SPECIFIC_TOOL_CONTEXT_AWARENESS_LSP_HEADER": "0.50.0",
 *   "PROMPTPART_SPECIFIC_TOOL_CONTEXT_AWARENESS_FEATURES": "0.50.0",
 *   "PROMPTPART_SPECIFIC_TOOL_CONTEXT_AWARENESS_LSP_FOOTER": "0.50.0"
 * }
 * benchmarks: [
 *   { "name": "measurement_specificity", "test": "Names evidence and replay purpose", "score": 0.82 },
 *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.66 }
 * ]
 */
/**
 * LSP CONTEXT AWARENESS COMPOSITION
 * 
 * BITCODE EXCELLENCE: Atomic prompt composition for LSP context awareness
 * - Every word is an atomic, reusable PromptPart
 * - Maximum measurability and tunability
 * - Clear header/body/footer pattern
 * - Zero duplication, infinite reusability
 */

// Context awareness phrases (GA-1 semantic units)




/**
 * Compose LSP context awareness description
 * 
 * PATTERN: [ACTION] [TECHNOLOGY] [INFINITIVE] [VERB] [CAPABILITY_LIST] [PURPOSE]
 * EXAMPLE: "Measures repository context with LSP evidence across symbols, paths, config keys, and code patterns for Need measurement, AssetPack fit, and proof replay"
 */
export function composeLspContextAwareness(): string {
  return [
    PROMPTPART_SPECIFIC_TOOL_CONTEXT_AWARENESS_LSP_HEADER,
    PROMPTPART_SPECIFIC_TOOL_CONTEXT_AWARENESS_FEATURES,
    PROMPTPART_SPECIFIC_TOOL_CONTEXT_AWARENESS_LSP_FOOTER
  ].join(' ');
}

// Export with COMPOSED in the name for clarity
export const PROMPTPART_COMPOSED_LSP_CONTEXT_AWARENESS = composeLspContextAwareness();
