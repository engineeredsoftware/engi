import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Create Design Document Review agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_effectiveness", "test": "Does try execution enable effective execution?", "score": 0.35 },
 *   { "name": "try_precision", "test": "Is try execution precisely defined?", "score": 0.34 },
 *   { "name": "try_completeness", "test": "Is try execution comprehensive?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENTREVIEW_TRY_DIRECTIVES: PromptPart = 
  'Execute commenting through: comprehensive design analysis, constructive feedback generation, improvement suggestion formulation, risk identification documentation, alternative approach presentation, clarifying question composition, markdown formatting' as PromptPart;