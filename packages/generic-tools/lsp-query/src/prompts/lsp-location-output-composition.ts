import { PROMPTPART_SPECIFIC_LSP_LOCATION_OUTPUT_SENTENCE } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_lsp_location_output_sentence';
/**\n * @doc-comment-developing-promptdevelopment\n * domain: agent\n * intent: "(fill intent)"\n * current_version: "GA1.45.0"\n * dependencies: { }\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },\n *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }\n * ]\n */
/**
 * LSP LOCATION OUTPUT COMPOSITION
 * Composes atomic prompt parts for LSP location output documentation
 * 
 * Demonstrates composition of output descriptions from atomic parts
 */



/**
 * Compose LSP location output description
 * 
 * Pattern: ARRAY OF LOCATION OBJECTS WITH [FEATURES] FOR [PURPOSE]
 */
export function composeLspLocationOutput(): string {
  return PROMPTPART_SPECIFIC_LSP_LOCATION_OUTPUT_SENTENCE;
}

export const PROMPTPART_COMPOSED_LSP_LOCATION_OUTPUT = composeLspLocationOutput();