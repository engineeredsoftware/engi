/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for analyze task semantics tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "tool_identification_precision", "test": "Given the tool name '{{content}}', can an LLM immediately understand this is for task semantic analysis? Rate 0-1", "score": 0.50 },
 *   { "name": "naming_convention_compliance", "test": "Does '{{content}}' follow the established tool naming pattern? Rate 0-1", "score": 0.50 },
 *   { "name": "semantic_clarity", "test": "Does '{{content}}' clearly indicate semantic analysis capabilities? Rate 0-1", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLNAME: PromptPart = 
  'Analyze Task Semantics Tool' as PromptPart;