import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define REFINE step assessment for Comprehend Task agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "assessment_accuracy", "test": "Is comprehension assessment accurate?", "score": 0.50 },
 *   { "name": "completeness_evaluation", "test": "Is completeness properly evaluated?", "score": 0.50 },
 *   { "name": "quality_measurement", "test": "Is comprehension quality measured?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_REFINE_ASSESSMENT: PromptPart = 
  'Assess comprehension quality by evaluating: requirement coverage completeness percentage, ambiguity resolution confidence scores, semantic accuracy through domain validation, constraint satisfaction feasibility, success criteria measurability ratings, technical specification alignment metrics' as PromptPart;