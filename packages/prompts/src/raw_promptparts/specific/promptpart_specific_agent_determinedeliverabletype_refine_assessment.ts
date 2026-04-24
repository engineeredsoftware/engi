import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode compatibility PromptPart for assessing delivery-mechanism template selection"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "assessment_accuracy", "test": "Is assessment accurate?", "score": 0.34 },
 *   { "name": "metric_reliability", "test": "Are metrics reliable?", "score": 0.33 },
 *   { "name": "gap_identification", "test": "Does it identify gaps?", "score": 0.32 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_REFINE_ASSESSMENT: PromptPart = 
  'Assess delivery-mechanism selection quality by checking Need fit, Shippable suitability, destination compatibility, AssetPack evidence availability, receipt completeness, ambiguity resolution, and whether implementation/validation stayed independent from the delivery template' as PromptPart;
