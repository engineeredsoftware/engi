/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: purpose
 * intent: "Purpose statement for implementation complexity analysis tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "complexity_depth_articulation", "test": "Does '{{content}}' articulate deep complexity analysis beyond simple assessment? Rate 0-1" },
 *   { "name": "strategic_intelligence_clarity", "test": "Does '{{content}}' clearly state strategic intelligence generation and optimization? Rate 0-1" },
 *   { "name": "implementation_foundation_emphasis", "test": "Does '{{content}}' emphasize this as implementation foundation for strategic planning? Rate 0-1" },
 *   { "name": "multi_dimensional_complexity_analysis", "test": "Does '{{content}}' indicate multi-dimensional complexity analysis capability? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZEIMPLEMENTATIONCOMPLEXITY_DOCCODETOOLPURPOSE: PromptPart = 
  'Strategic analysis of implementation complexity across all architectural dimensions, generating actionable intelligence for optimization strategies, risk mitigation approaches, resource allocation decisions, and timeline projections to enable intelligent task planning, execution pathway selection, and adaptive implementation management' as PromptPart;