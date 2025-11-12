import { PROMPTPART_SPECIFIC_LSP_POSITION_PARAMETERS_LIST } from '@engi/prompts/raw_promptparts/specific/promptpart_specific_lsp_position_parameters_list';
/**\n * @doc-comment-developing-promptdevelopment\n * domain: agent\n * intent: "(fill intent)"\n * current_version: "GA1.45.0"\n * dependencies: { }\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },\n *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }\n * ]\n */
/**
 * LSP POSITION PARAMETERS COMPOSITION
 * Composes atomic prompt parts for LSP position parameter documentation
 * 
 * Shows how even parameter lists can be composed from atomic parts
 */



/**
 * Compose LSP position parameters
 * 
 * Pattern: PARAM_NAME (DESCRIPTION), PARAM_NAME (DESCRIPTION), ...
 */
export function composeLspPositionParameters(): string {
  return PROMPTPART_SPECIFIC_LSP_POSITION_PARAMETERS_LIST;
}

export const PROMPTPART_COMPOSED_LSP_POSITION_PARAMETERS = composeLspPositionParameters();