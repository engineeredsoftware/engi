import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Type-specific instructions for UI component files in digest summaries"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "ui_focus", "test": "Mentions props, state, hooks, styling", "score": 0.48 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_UI_COMPONENT_REQUIREMENTS: PromptPart = (
  'UI COMPONENT REQUIREMENTS:\n' +
  '- Identify component props, state, hooks, and context usage.\n' +
  '- Note performance considerations (memoization, effects) and styling approach.\n' +
  '- List imported components and shared utilities.'
) as PromptPart;
