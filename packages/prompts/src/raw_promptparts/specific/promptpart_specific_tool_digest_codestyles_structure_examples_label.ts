import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Section label for examples in Digest Code Styles prompt"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "label_precision", "test": "Does it request 2-3 code snippets with explanation? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_EXAMPLES_LABEL: PromptPart =
  'Examples: 2–3 code snippets with brief explanation.' as PromptPart;
