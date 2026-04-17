/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capability list for organize imports tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_completeness", "test": "Does '{{content}}' cover all major features of the organize imports tool? Rate 0-1" },
 *   { "name": "import_sorting", "test": "Is import sorting capability clearly mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "unused_detection", "test": "Is unused import detection mentioned in '{{content}}'? Rate 0-1" },
 *   { "name": "optimization_features", "test": "Are optimization features like duplicate removal mentioned in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_ORGANIZEIMPORTS_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Import sorting, unused import detection, duplicate removal, formatting standardization, and dependency optimization' as PromptPart;