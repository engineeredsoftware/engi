import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Understand Requirements agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Is plan analysis effective?", "score": 0.34 },
 *   { "name": "plan_clarity", "test": "Is plan analysis clear?", "score": 0.33 },
 *   { "name": "plan_completeness", "test": "Is plan analysis complete?", "score": 0.32 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_UNDERSTANDREQUIREMENTS_PLAN_ANALYSIS: PromptPart = 
  'Analyze documentation to identify: requirement sources, specification formats, stakeholder perspectives, domain terminology, acceptance criteria, constraint definitions' as PromptPart;