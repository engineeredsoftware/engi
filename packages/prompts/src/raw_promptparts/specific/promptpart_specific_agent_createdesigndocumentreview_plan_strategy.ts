import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Create Design Document Review agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan strategy enable effective execution?", "score": 0.37 },
 *   { "name": "plan_precision", "test": "Is plan strategy precisely defined?", "score": 0.36 },
 *   { "name": "plan_completeness", "test": "Is plan strategy comprehensive?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENTREVIEW_PLAN_STRATEGY: PromptPart = 
  'Plan comment strategy by determining: feedback structure format, priority issue identification, suggestion categorization, question formulation approach, tone calibration, collaboration emphasis' as PromptPart;