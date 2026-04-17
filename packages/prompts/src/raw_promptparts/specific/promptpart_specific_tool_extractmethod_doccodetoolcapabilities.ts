/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capability list for extract method tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_completeness", "test": "Does '{{content}}' cover all major features of the extract method tool? Rate 0-1" },
 *   { "name": "scope_analysis", "test": "Is variable scope analysis capability clearly mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "safety_features", "test": "Are safety features like validation and preview mentioned in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Code selection analysis, variable scope detection, parameter inference, return type determination, method name generation, refactoring preview, semantic validation, dependency analysis, multi-language support, and rollback functionality' as PromptPart;