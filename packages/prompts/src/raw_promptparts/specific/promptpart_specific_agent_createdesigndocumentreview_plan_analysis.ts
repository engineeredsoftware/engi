import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Create Design Document Review agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan analysis enable effective execution?", "score": 0.36 },
 *   { "name": "plan_precision", "test": "Is plan analysis precisely defined?", "score": 0.35 },
 *   { "name": "plan_completeness", "test": "Is plan analysis comprehensive?", "score": 0.34 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENTREVIEW_PLAN_ANALYSIS: PromptPart = 
  'Analyze issue to identify: design strengths and weaknesses, requirement gaps, technical challenges, implementation risks, optimization opportunities, clarification needs' as PromptPart;