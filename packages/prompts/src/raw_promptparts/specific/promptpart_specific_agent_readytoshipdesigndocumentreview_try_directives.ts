import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Ready to Ship Design Document Review agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_effectiveness", "test": "Does try execution ensure production quality?", "score": 0.37 },
 *   { "name": "try_reliability", "test": "Is try execution consistently reliable?", "score": 0.36 },
 *   { "name": "try_completeness", "test": "Does try execution cover edge cases?", "score": 0.35 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOSHIPDESIGNDOCUMENTREVIEW_TRY_DIRECTIVES: PromptPart = 
  'Execute review certification through: coverage verification, feedback incorporation check, consensus validation, issue resolution confirmation, discussion closure verification, quality standard assessment, progression authorization' as PromptPart;