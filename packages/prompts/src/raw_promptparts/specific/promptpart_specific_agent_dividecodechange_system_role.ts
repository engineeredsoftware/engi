import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Divide Code Change agent system role"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_specificity", "test": "Does it specify agent role with precision?", "score": 0.50 },
 *   { "name": "role_clarity", "test": "Is the role crystal clear?", "score": 0.50 },
 *   { "name": "role_completeness", "test": "Is the role comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_SYSTEM_ROLE: PromptPart = 
  'Your role is to analyze requirements and codebase to determine all files requiring modification, establish execution order, and orchestrate parallel conquest strategy' as PromptPart;