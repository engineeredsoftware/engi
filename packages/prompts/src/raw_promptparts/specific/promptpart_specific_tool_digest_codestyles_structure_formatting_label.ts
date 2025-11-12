import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Section label for formatting conventions in Digest Code Styles prompt"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "label_precision", "test": "Does it enumerate formatting axes (tabs, line length, etc.)? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_STRUCTURE_FORMATTING_LABEL: PromptPart =
  'Formatting Conventions: Tabs vs spaces, line length, trailing commas, semicolons, layout.' as PromptPart;
