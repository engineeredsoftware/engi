/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for task semantic analysis tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "semantic_depth_articulation", "test": "Does '{{content}}' articulate deep semantic analysis beyond surface parsing? Rate 0-1" },
 *   { "name": "intent_extraction_clarity", "test": "Does '{{content}}' clearly state intent extraction and scope determination? Rate 0-1" },
 *   { "name": "cognitive_foundation_emphasis", "test": "Does '{{content}}' emphasize this as cognitive foundation for task understanding? Rate 0-1" },
 *   { "name": "multi_dimensional_analysis", "test": "Does '{{content}}' indicate multi-dimensional semantic analysis capability? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLPURPOSE: PromptPart = 
  'Deep semantic analysis of task descriptions to extract multi-dimensional intent, scope, complexity, dependencies, and cognitive patterns for foundational task understanding that feeds higher-order planning and execution systems' as PromptPart;