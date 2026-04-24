import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Type-specific instructions for notebook files in digest summaries"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "notebook_focus", "test": "Mentions major cells, libraries, runtime", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TYPE_NOTEBOOK_REQUIREMENTS: PromptPart = (
  'NOTEBOOK REQUIREMENTS:\n' +
  '- Summarize major cells: data loading, transformations, modeling, outputs.\n' +
  '- Note library versions and runtime assumptions.'
) as PromptPart;
