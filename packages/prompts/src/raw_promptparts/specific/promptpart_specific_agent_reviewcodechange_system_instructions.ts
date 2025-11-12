import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Review Code Change agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_specificity", "test": "Does it specify agent instructions with precision?", "score": 0.50 },
 *   { "name": "instructions_clarity", "test": "Is the instructions crystal clear?", "score": 0.50 },
 *   { "name": "instructions_completeness", "test": "Is the instructions comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_REVIEWCODECHANGE_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Review pull request by: analyzing code changes line-by-line, checking logic correctness, identifying potential bugs, evaluating performance implications, assessing security vulnerabilities, reviewing test coverage, providing constructive feedback' as PromptPart;