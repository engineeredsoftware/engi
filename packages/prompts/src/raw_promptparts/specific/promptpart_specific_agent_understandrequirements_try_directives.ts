import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Understand Requirements agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_effectiveness", "test": "Is try execution effective?", "score": 0.33 },
 *   { "name": "try_clarity", "test": "Is try execution clear?", "score": 0.32 },
 *   { "name": "try_completeness", "test": "Is try execution complete?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_UNDERSTANDREQUIREMENTS_TRY_DIRECTIVES: PromptPart = 
  'Execute understanding through: requirement parsing and extraction, categorization and classification, dependency mapping, conflict detection, gap analysis, criteria formulation, traceability establishment' as PromptPart;