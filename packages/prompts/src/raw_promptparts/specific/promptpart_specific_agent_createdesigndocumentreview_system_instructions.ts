import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Create Design Document Review agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instructions_specificity", "test": "Does it specify agent instructions with precision?", "score": 0.38 },
 *   { "name": "instructions_clarity", "test": "Is the instructions crystal clear?", "score": 0.37 },
 *   { "name": "instructions_completeness", "test": "Is the instructions comprehensive?", "score": 0.36 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENTREVIEW_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Comment on issue by: analyzing design specifications, evaluating feasibility, identifying gaps and risks, suggesting improvements, providing alternative approaches, asking clarifying questions, maintaining constructive tone' as PromptPart;