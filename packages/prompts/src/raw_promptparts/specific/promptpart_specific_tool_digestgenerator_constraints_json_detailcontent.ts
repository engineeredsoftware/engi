import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "JSON constraint for DigestGenerator doc-code prompt"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "json_constraint", "test": "Does it enforce raw JSON array output? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGESTGENERATOR_CONSTRAINTS_JSON_DETAILCONTENT: PromptPart =
  'Output ONLY raw JSON arrays as specified in base prompt.' as PromptPart;
