import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step assessment for Ready to Iterate agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "assessment_accuracy", "test": "Is assessment accurate?", "score": 0.34 },
 *   { "name": "metric_reliability", "test": "Are metrics reliable?", "score": 0.33 },
 *   { "name": "gap_identification", "test": "Does it identify gaps?", "score": 0.32 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOITERATE_REFINE_ASSESSMENT: PromptPart = 
  'Assess validation quality by measuring: false positive blocking rates, prerequisite detection accuracy, resource prediction reliability, state validation completeness, dependency tracking precision, readiness decision correctness' as PromptPart;