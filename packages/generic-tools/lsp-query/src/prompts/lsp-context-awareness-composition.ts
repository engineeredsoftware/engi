import { PROMPTPART_SPECIFIC_TOOL_CONTEXT_AWARENESS_LSP_HEADER } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_context_awareness_lsp_header';
import { PROMPTPART_SPECIFIC_TOOL_CONTEXT_AWARENESS_FEATURES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_context_awareness_features';
import { PROMPTPART_SPECIFIC_TOOL_CONTEXT_AWARENESS_LSP_FOOTER } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_context_awareness_lsp_footer';
/**\n * @doc-comment-developing-promptdevelopment\n * domain: agent\n * intent: "(fill intent)"\n * current_version: "GA1.45.0"\n * dependencies: { }\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },\n *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }\n * ]\n */
/**
 * LSP CONTEXT AWARENESS COMPOSITION
 * 
 * ENGI EXCELLENCE: Atomic prompt composition for LSP context awareness
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
 * EXAMPLE: "Leverages LSP to understand project architecture, type hierarchies, dependency graphs, and code patterns for intelligent code operations"
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