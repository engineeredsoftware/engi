import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define plan strategy for Conquer File agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "plan_effectiveness", "test": "Does plan strategy enable effective execution?", "score": 0.50 },
 *   { "name": "plan_precision", "test": "Is plan strategy precisely defined?", "score": 0.50 },
 *   { "name": "plan_completeness", "test": "Is plan strategy comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CONQUERFILE_PLAN_STRATEGY: PromptPart = 
  'Plan conquest strategy by determining: modification approach selection, insertion point identification, deletion scope boundaries, refactoring requirements, style preservation tactics, test impact analysis' as PromptPart;