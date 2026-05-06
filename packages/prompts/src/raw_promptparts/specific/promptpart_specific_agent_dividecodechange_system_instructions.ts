import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Divide Code Change agent system instructions"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_specificity", "test": "Does it specify agent instructions with precision?", "score": 0.50 },
 *   { "name": "instructions_clarity", "test": "Is the instructions crystal clear?", "score": 0.50 },
 *   { "name": "instructions_completeness", "test": "Is the instructions comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Divide pull request by: analyzing requirement scope and technical implications, identifying all affected files and modules, determining change types for each file, mapping inter-file dependencies and constraints, optimizing parallel execution paths, establishing application priority order, generating comprehensive file operation manifest' as PromptPart;