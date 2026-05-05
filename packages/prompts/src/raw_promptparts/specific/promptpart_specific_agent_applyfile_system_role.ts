import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Apply File agent system role"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_specificity", "test": "Does it specify agent role with precision?", "score": 0.50 },
 *   { "name": "role_clarity", "test": "Is the role crystal clear?", "score": 0.50 },
 *   { "name": "role_completeness", "test": "Is the role comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_APPLYFILE_SYSTEM_ROLE: PromptPart = 
  'Your role is to execute targeted file operations with surgical precision, maintaining code integrity, preserving semantics, and ensuring syntactic correctness' as PromptPart;