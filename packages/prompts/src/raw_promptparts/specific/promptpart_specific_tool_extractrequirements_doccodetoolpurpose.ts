/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for requirements extraction tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "requirement_depth_articulation", "test": "Does '{{content}}' articulate deep requirement analysis beyond surface parsing? Rate 0-1" },
 *   { "name": "structural_extraction_clarity", "test": "Does '{{content}}' clearly state structured extraction and categorization? Rate 0-1" },
 *   { "name": "cognitive_analysis_emphasis", "test": "Does '{{content}}' emphasize this as cognitive foundation for requirement understanding? Rate 0-1" },
 *   { "name": "multi_dimensional_analysis", "test": "Does '{{content}}' indicate multi-dimensional requirement analysis capability? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTREQUIREMENTS_DOCCODETOOLPURPOSE: PromptPart = 
  'Systematic extraction and structural analysis of task requirements from multi-modal inputs, transforming implicit specifications into explicit, categorized, hierarchical requirement frameworks that enable precise task comprehension and downstream planning optimization' as PromptPart;