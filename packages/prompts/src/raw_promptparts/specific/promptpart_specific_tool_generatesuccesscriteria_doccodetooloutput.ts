/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output specification for success criteria generation tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure_comprehensiveness", "test": "Does '{{content}}' define comprehensive success criteria output structure? Rate 0-1" },
 *   { "name": "emergent_organization_clarity", "test": "Does '{{content}}' clearly organize emergent analysis results? Rate 0-1" },
 *   { "name": "downstream_validation_readiness", "test": "Does '{{content}}' format output for downstream validation integration? Rate 0-1" },
 *   { "name": "criteria_depth_demonstration", "test": "Does '{{content}}' demonstrate success criteria analysis depth in output specification? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_GENERATESUCCESSCRITERIA_DOCCODETOOLOUTPUT: PromptPart = 
  'Structured SuccessFramework containing: quantitativeMetrics with measurable thresholds, qualitativeIndicators with assessment criteria, emergentBehaviors with adaptive validation patterns, cognitivePerformance with intelligence benchmarks, validationProtocols with testing procedures, adaptiveBenchmarks with dynamic adjustment mechanisms, continuousImprovement with iterative enhancement strategies, and transcendentQualityMetrics with emergent success pattern indicators for comprehensive task validation' as PromptPart;