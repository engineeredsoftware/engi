import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Validate Design Document agent system role"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_precision", "test": "Does it define role with industrial precision?", "score": 0.41 },
 *   { "name": "role_clarity", "test": "Is the role unambiguously clear?", "score": 0.40 },
 *   { "name": "role_completeness", "test": "Does role cover all critical aspects?", "score": 0.39 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VALIDATEDESIGNDOCUMENT_SYSTEM_ROLE: PromptPart = 
  'Your role is to validate document quality, verify requirement completeness, assess technical accuracy, ensure implementation feasibility, and certify document readiness' as PromptPart;