import { PROMPTPART_SPECIFIC_LSP_LOCATION_OUTPUT_SENTENCE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_lsp_location_output_sentence';
/**
 * @doc-comment-developing-promptdevelopment
 * domain: tool
 * intent: "Bitcode LSP location-output composition for replayable path and symbol evidence"
 * current_version: "0.50.0"
 * dependencies: { "PROMPTPART_SPECIFIC_LSP_LOCATION_OUTPUT_SENTENCE": "0.50.0" }
 * benchmarks: [
 *   { "name": "measurement_specificity", "test": "Names path/symbol evidence and replay", "score": 0.82 },
 *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.66 }
 * ]
 */
/**
 * LSP LOCATION OUTPUT COMPOSITION
 * Composes atomic prompt parts for LSP location evidence output documentation.
 * 
 * Location output becomes Bitcode measurement evidence when it can be replayed
 * into Read and AssetPack decisions.
 */



/**
 * Compose LSP location output description
 * 
 * Pattern: ARRAY OF LOCATION OBJECTS WITH [FEATURES] FOR [READ/ASSETPACK EVIDENCE PURPOSE]
 */
export function composeLspLocationOutput(): string {
  return PROMPTPART_SPECIFIC_LSP_LOCATION_OUTPUT_SENTENCE;
}

export const PROMPTPART_COMPOSED_LSP_LOCATION_OUTPUT = composeLspLocationOutput();
