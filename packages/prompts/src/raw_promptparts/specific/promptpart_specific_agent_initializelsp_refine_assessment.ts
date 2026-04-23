import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP Refine assessment for evidence completeness"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "assessment_accuracy", "test": "Is assessment accurate?", "score": 0.34 },
 *   { "name": "metric_reliability", "test": "Are metrics reliable?", "score": 0.33 },
 *   { "name": "gap_identification", "test": "Does it identify gaps?", "score": 0.32 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_REFINE_ASSESSMENT: PromptPart = 
  'Assess measurement initialization by evaluating connection stability, evidence-capability coverage, response-time bounds, diagnostic fact accuracy, resource utilization, and error patterns that affect proof replay' as PromptPart;
