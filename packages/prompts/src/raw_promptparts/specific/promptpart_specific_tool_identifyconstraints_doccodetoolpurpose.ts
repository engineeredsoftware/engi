/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for constraint identification tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "constraint_depth_articulation", "test": "Does '{{content}}' articulate deep constraint analysis beyond surface detection? Rate 0-1" },
 *   { "name": "systemic_integration_clarity", "test": "Does '{{content}}' clearly state systemic constraint integration and interdependency analysis? Rate 0-1" },
 *   { "name": "architectural_foundation_emphasis", "test": "Does '{{content}}' emphasize this as architectural foundation for constraint understanding? Rate 0-1" },
 *   { "name": "multi_dimensional_constraint_analysis", "test": "Does '{{content}}' indicate multi-dimensional constraint analysis capability? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_IDENTIFYCONSTRAINTS_DOCCODETOOLPURPOSE: PromptPart = 
  'Comprehensive identification and systematic analysis of multi-dimensional constraints affecting task implementation, including technical limitations, resource boundaries, temporal restrictions, regulatory requirements, architectural dependencies, and emergent system behaviors to enable constraint-aware planning and risk mitigation strategies' as PromptPart;