import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Section label for overview in Digest Code Styles prompt"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "label_precision", "test": "Does it describe overview content? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_OVERVIEW_LABEL: PromptPart =
  'Overview: Brief introduction to code style philosophy and conventions.' as PromptPart;
