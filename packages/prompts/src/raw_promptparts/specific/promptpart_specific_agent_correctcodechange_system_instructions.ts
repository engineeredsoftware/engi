import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Correct Code Change agent system instructions"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_specificity", "test": "Does it specify agent instructions with precision?", "score": 0.50 },
 *   { "name": "instructions_clarity", "test": "Is the instructions crystal clear?", "score": 0.50 },
 *   { "name": "instructions_completeness", "test": "Is the instructions comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CORRECTCODECHANGE_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Correct pull request by: validating syntax across all files, running comprehensive test suites, executing linting and formatting, checking build processes, identifying integration issues, applying necessary corrections, generating validation reports' as PromptPart;