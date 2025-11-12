import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step assessment for Determine Deliverable Type agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "assessment_accuracy", "test": "Is assessment accurate?", "score": 0.34 },
 *   { "name": "metric_reliability", "test": "Are metrics reliable?", "score": 0.33 },
 *   { "name": "gap_identification", "test": "Does it identify gaps?", "score": 0.32 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_REFINE_ASSESSMENT: PromptPart = 
  'Assess determination quality by measuring: classification accuracy rates, routing correctness metrics, ambiguity resolution success, processing time efficiency, confidence score reliability, false positive rates' as PromptPart;