import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Validate Design Document Review agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_effectiveness", "test": "Does try execution ensure quality?", "score": 0.36 },
 *   { "name": "try_reliability", "test": "Is try execution reliable?", "score": 0.35 },
 *   { "name": "try_completeness", "test": "Does try execution cover all cases?", "score": 0.34 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATEDESIGNDOCUMENTREVIEW_TRY_DIRECTIVES: PromptPart = 
  'Execute review validation through: stakeholder coverage analysis, feedback quality scoring, engagement level measurement, concern tracking verification, depth metric calculation, outcome actionability assessment, tone appropriateness checking' as PromptPart;