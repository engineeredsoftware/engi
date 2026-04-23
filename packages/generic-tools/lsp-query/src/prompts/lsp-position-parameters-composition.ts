import { PROMPTPART_SPECIFIC_LSP_POSITION_PARAMETERS_LIST } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_lsp_position_parameters_list';
/**
 * @doc-comment-developing-promptdevelopment
 * domain: tool
 * intent: "Bitcode LSP position-parameter composition for precise measurement replay"
 * current_version: "0.50.0"
 * dependencies: { "PROMPTPART_SPECIFIC_LSP_POSITION_PARAMETERS_LIST": "0.50.0" }
 * benchmarks: [
 *   { "name": "measurement_specificity", "test": "Names measurement replay coordinates", "score": 0.82 },
 *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.66 }
 * ]
 */
/**
 * LSP POSITION PARAMETERS COMPOSITION
 * Composes atomic prompt parts for replayable LSP position parameter documentation.
 * 
 * Coordinates are retained because they bind symbols and diagnostics to
 * specific repository evidence for Bitcode proof replay.
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
