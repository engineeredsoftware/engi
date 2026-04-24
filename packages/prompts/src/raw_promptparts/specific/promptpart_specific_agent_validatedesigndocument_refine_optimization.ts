import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define refine optimization for Validate Design Document agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "refine_effectiveness", "test": "Does refine optimization ensure production quality?", "score": 0.36 },
 *   { "name": "refine_reliability", "test": "Is refine optimization consistently reliable?", "score": 0.35 },
 *   { "name": "refine_completeness", "test": "Does refine optimization cover edge cases?", "score": 0.34 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATEDESIGNDOCUMENT_REFINE_OPTIMIZATION: PromptPart = 
  'Refine validation by: enhancing gap detection, improving clarity metrics, strengthening accuracy checks, deepening feasibility analysis, optimizing traceability verification, streamlining format checking' as PromptPart;