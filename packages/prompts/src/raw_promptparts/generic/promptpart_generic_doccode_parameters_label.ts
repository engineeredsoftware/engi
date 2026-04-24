import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Label for doc-code-tool parameters section"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_clarity", "test": "Does '{{content}}' clearly indicate the parameters/inputs section? Rate 0-1" },
 *   { "name": "terminology_consistency", "test": "Does '{{content}}' use 'parameters' (not args/inputs)? Rate 0-1" }
 * ]
 */
export const PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL: PromptPart = 
  '@doc-code-tool-parameters' as PromptPart;