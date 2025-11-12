/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for success criteria generation tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "criteria_depth_articulation", "test": "Does '{{content}}' articulate deep success criteria generation beyond simple metrics? Rate 0-1" },
 *   { "name": "emergent_quality_clarity", "test": "Does '{{content}}' clearly state emergent quality measurement and validation? Rate 0-1" },
 *   { "name": "validation_foundation_emphasis", "test": "Does '{{content}}' emphasize this as validation foundation for success measurement? Rate 0-1" },
 *   { "name": "multi_dimensional_criteria_analysis", "test": "Does '{{content}}' indicate multi-dimensional success criteria analysis capability? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLPURPOSE: PromptPart = 
  'Dynamic generation of measurable, multi-dimensional success criteria that capture both explicit objectives and emergent quality indicators, creating comprehensive validation frameworks that enable precise task completion assessment, quality assurance, and continuous improvement through adaptive benchmarking and cognitive performance metrics' as PromptPart;