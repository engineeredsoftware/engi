import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Base prompt for generating Code Styles guide in Markdown"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "markdown_structure", "test": "Specifies required sections", "score": 0.48 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_BASE_CORE: PromptPart = (
  'Generate a comprehensive "Code Styles" guide for the Bitcode monorepo in Markdown only, following the exact section structure and content requirements provided.'
) as PromptPart;
