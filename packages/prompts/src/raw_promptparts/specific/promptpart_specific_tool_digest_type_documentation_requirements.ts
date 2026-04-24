import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Type-specific instructions for documentation files in digest summaries"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "doc_focus", "test": "Mentions technical purpose and actionable content", "score": 0.48 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_DOCUMENTATION_REQUIREMENTS: PromptPart = (
  'DOCUMENTATION REQUIREMENTS:\n' +
  '- Summarize the technical purpose and any actionable steps or contracts.\n' +
  '- Extract configurations, commands, or file paths referenced.'
) as PromptPart;
