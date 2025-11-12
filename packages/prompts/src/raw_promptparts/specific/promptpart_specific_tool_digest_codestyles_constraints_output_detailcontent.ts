import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output constraint for Digest Code Styles prompt"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "format_constraint", "test": "Does it require Markdown output limited to defined sections? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_CONSTRAINTS_OUTPUT_DETAILCONTENT: PromptPart =
  'Output valid Markdown only with the sections above.' as PromptPart;
