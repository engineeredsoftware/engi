import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Label for doc-code-tool output section"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_indication", "test": "Does '{{content}}' clearly indicate the output/results section? Rate 0-1" },
 *   { "name": "terminology_preference", "test": "Does '{{content}}' use 'output' (not result/response)? Rate 0-1" }
 * ]
 */
export const PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL: PromptPart = 
  '@doc-code-tool-output' as PromptPart;