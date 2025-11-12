import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Fallback instructions for unknown file types in digest summaries"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "fallback_clarity", "test": "Gives actionable fallback guidance", "score": 0.47 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_UNKNOWN_REQUIREMENTS: PromptPart = (
  'UNKNOWN TYPE REQUIREMENTS:\n' +
  '- Provide best-effort summary of purpose and any detectable structure.\n' +
  '- List obvious dependencies and keywords.'
) as PromptPart;
