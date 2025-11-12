import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define RETRY step error handling for Comprehend Task agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "error_categorization", "test": "Are comprehension errors categorized?", "score": 0.50 },
 *   { "name": "diagnostic_quality", "test": "Are error diagnostics helpful?", "score": 0.50 },
 *   { "name": "recovery_guidance", "test": "Does it provide recovery guidance?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDTASK_RETRY_ERRORHANDLING: PromptPart = 
  'Handle comprehension failures through: ambiguity isolation with specific clarification needs, contradiction resolution through priority rules, missing context identification with information requests, domain mismatch detection with expertise requirements, complexity overload mitigation through task decomposition, language barrier handling with terminology mapping' as PromptPart;