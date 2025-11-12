/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: output
 * intent: "Output specification for task comprehension validation tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "output_structure_comprehensiveness", "test": "Does '{{content}}' define comprehensive validation output structure? Rate 0-1" },
 *   { "name": "meta_cognitive_organization_clarity", "test": "Does '{{content}}' clearly organize meta-cognitive analysis results? Rate 0-1" },
 *   { "name": "downstream_planning_readiness", "test": "Does '{{content}}' format output for downstream planning integration? Rate 0-1" },
 *   { "name": "validation_depth_demonstration", "test": "Does '{{content}}' demonstrate comprehension validation depth in output specification? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_VALIDATETASKCOMPREHENSION_DOCCODETOOLOUTPUT: PromptPart = 
  'Structured ValidationReport containing: comprehensionCompleteness with cognitive coverage assessment, coherenceAnalysis with alignment verification results, integrationValidation with cross-dimensional consistency checks, gapIdentification with cognitive deficiency mapping, metaCognitiveAssessment with awareness depth evaluation, holisticSynthesis with unified understanding confirmation, readinessIndicators with implementation preparation status, and transcendentValidationMetrics with comprehension quality indicators for task planning readiness' as PromptPart;