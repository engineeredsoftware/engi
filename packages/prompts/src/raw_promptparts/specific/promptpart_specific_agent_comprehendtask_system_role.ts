import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Comprehend Task agent system role"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_precision", "test": "Does it precisely define the comprehension role?", "score": 0.50 },
 *   { "name": "responsibility_clarity", "test": "Are task understanding responsibilities clear?", "score": 0.50 },
 *   { "name": "scope_completeness", "test": "Is the comprehension scope complete?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_SYSTEM_ROLE: PromptPart = 
  'Your role is to analyze task descriptions, identify technical requirements, disambiguate vague specifications, extract success criteria, and produce structured task comprehension reports' as PromptPart;