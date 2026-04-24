import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Comprehend Attachments agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Is retry errorhandling effective?", "score": 0.29 },
 *   { "name": "retry_clarity", "test": "Is retry errorhandling clear?", "score": 0.28 },
 *   { "name": "retry_completeness", "test": "Is retry errorhandling complete?", "score": 0.27 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDATTACHMENTS_RETRY_ERRORHANDLING: PromptPart = 
  'Handle comprehension failures through: unsupported format handling, corruption recovery, extraction error mitigation, encoding resolution, size limitation management, timeout handling' as PromptPart;