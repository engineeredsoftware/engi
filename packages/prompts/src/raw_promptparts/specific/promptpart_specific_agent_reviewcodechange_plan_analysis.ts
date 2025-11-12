import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan analysis for Review Code Change agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan analysis enable effective execution?", "score": 0.50 },
 *   { "name": "plan_precision", "test": "Is plan analysis precisely defined?", "score": 0.50 },
 *   { "name": "plan_completeness", "test": "Is plan analysis comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_PLAN_ANALYSIS: PromptPart = 
  'Analyze PR context to identify: change scope and impact, affected components, review history patterns, author expertise level, project standards, compliance requirements' as PromptPart;