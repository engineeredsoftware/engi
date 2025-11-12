import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Create Design Document Review agent system role"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_specificity", "test": "Does it specify agent role with precision?", "score": 0.39 },
 *   { "name": "role_clarity", "test": "Is the role crystal clear?", "score": 0.38 },
 *   { "name": "role_completeness", "test": "Is the role comprehensive?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENTREVIEW_SYSTEM_ROLE: PromptPart = 
  'Your role is to provide comprehensive design feedback, analyze specifications, suggest improvements, identify gaps, and facilitate collaborative refinement' as PromptPart;