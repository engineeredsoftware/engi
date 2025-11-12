import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: formatting
 * intent: "Label for doc-code-tool capabilities section"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "section_recognition", "test": "Does '{{content}}' clearly identify the capabilities documentation section? Rate 0-1" },
 *   { "name": "term_precision", "test": "Does '{{content}}' use 'capabilities' (not features/functions)? Rate 0-1" }
 * ]
 */
export const PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL: PromptPart = 
  '@doc-code-tool-capabilities' as PromptPart;