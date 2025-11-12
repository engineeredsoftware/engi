import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine assessment for Ready to Ship agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Does refine assessment ensure production quality?", "score": 0.35 },
 *   { "name": "refine_reliability", "test": "Is refine assessment consistently reliable?", "score": 0.34 },
 *   { "name": "refine_completeness", "test": "Does refine assessment cover edge cases?", "score": 0.33 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIP_REFINE_ASSESSMENT: PromptPart = 
  'Assess orchestration quality by evaluating: aggregation accuracy, risk assessment precision, readiness prediction validity, operational coverage, rollback reliability, decision confidence levels' as PromptPart;