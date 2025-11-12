import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Type-specific instructions for code files in digest summaries"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "code_focus", "test": "Mentions exports, algorithms, error handling", "score": 0.48 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_CODE_REQUIREMENTS: PromptPart = (
  'CODE FILE REQUIREMENTS:\n' +
  '- Summarize exported functions/classes, key algorithms, and error handling.\n' +
  '- List internal/external dependencies and how they are used.\n' +
  '- Include performance or concurrency considerations if present.'
) as PromptPart;
