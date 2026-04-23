import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Review Code Change agent system role"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_specificity", "test": "Does it specify agent role with precision?", "score": 0.50 },
 *   { "name": "role_clarity", "test": "Is the role crystal clear?", "score": 0.50 },
 *   { "name": "role_completeness", "test": "Is the role comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_SYSTEM_ROLE: PromptPart = 
  'Your role is to conduct thorough code review, analyze implementation quality, identify bugs and vulnerabilities, suggest optimizations, and provide actionable feedback' as PromptPart;