/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for task comprehension validation tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "validation_depth_articulation", "test": "Does '{{content}}' articulate deep comprehension validation beyond simple verification? Rate 0-1" },
 *   { "name": "meta_cognitive_clarity", "test": "Does '{{content}}' clearly state meta-cognitive comprehension assessment and verification? Rate 0-1" },
 *   { "name": "holistic_foundation_emphasis", "test": "Does '{{content}}' emphasize this as holistic foundation for comprehension assurance? Rate 0-1" },
 *   { "name": "multi_dimensional_validation_analysis", "test": "Does '{{content}}' indicate multi-dimensional comprehension validation capability? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLPURPOSE: PromptPart = 
  'Holistic validation and verification of task comprehension completeness across all cognitive dimensions, ensuring accurate understanding integration, requirement-constraint alignment, success criteria coherence, and meta-cognitive awareness to guarantee comprehensive task readiness before implementation planning and execution' as PromptPart;