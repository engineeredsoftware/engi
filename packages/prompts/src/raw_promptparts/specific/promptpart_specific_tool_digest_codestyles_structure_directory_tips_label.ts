import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Section label for directory-specific tips in Digest Code Styles prompt"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "label_precision", "test": "Does it describe directory recommendations/exceptions? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_DIRECTORY_TIPS_LABEL: PromptPart =
  'Directory-Specific Style Tips: Recommendations by directory; exceptions to global rules.' as PromptPart;
