import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Label for doc-code-tool purpose section"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "section_specificity", "test": "Does '{{content}}' clearly indicate the purpose section of documentation? Rate 0-1" },
 *   { "name": "format_consistency", "test": "Does '{{content}}' follow the @doc-code-[type]-[section] pattern? Rate 0-1" }
 * ]
 */
export const PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL: PromptPart = 
  '@doc-code-tool-purpose' as PromptPart;