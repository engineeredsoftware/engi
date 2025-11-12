/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output specification for implementation complexity analysis tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure_comprehensiveness", "test": "Does '{{content}}' define comprehensive complexity output structure? Rate 0-1" },
 *   { "name": "strategic_organization_clarity", "test": "Does '{{content}}' clearly organize strategic analysis results? Rate 0-1" },
 *   { "name": "downstream_planning_readiness", "test": "Does '{{content}}' format output for downstream planning integration? Rate 0-1" },
 *   { "name": "complexity_depth_demonstration", "test": "Does '{{content}}' demonstrate complexity analysis depth in output specification? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZEIMPLEMENTATIONCOMPLEXITY_DOCCODETOOLOUTPUT: PromptPart = 
  'Structured ComplexityIntelligence containing: complexityStratification with multi-dimensional analysis layers, implementationPathways with strategic route optimization, resourceOptimization with intelligent allocation strategies, temporalProjections with timeline complexity modeling, riskComplexityMatrix with uncertainty correlation analysis, emergentComplexityPredictions with adaptive system behavior forecasting, strategicRecommendations with actionable optimization intelligence, and transcendentComplexityMetrics with strategic pattern indicators for intelligent task planning and execution management' as PromptPart;