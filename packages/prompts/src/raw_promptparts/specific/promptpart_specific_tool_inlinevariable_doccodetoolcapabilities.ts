/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capability list for inline variable tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_completeness", "test": "Does '{{content}}' cover all major features of the inline variable tool? Rate 0-1" },
 *   { "name": "usage_analysis", "test": "Is variable usage analysis capability clearly mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "safety_checks", "test": "Are safety features like scope validation mentioned in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_INLINEVARIABLE_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Variable usage analysis, definition extraction, scope validation, inline replacement, and semantic safety checks' as PromptPart;