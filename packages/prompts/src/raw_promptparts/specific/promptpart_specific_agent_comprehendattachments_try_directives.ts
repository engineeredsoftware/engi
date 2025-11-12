import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define try execution for Comprehend Attachments agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "try_effectiveness", "test": "Is try execution effective?", "score": 0.33 },
 *   { "name": "try_clarity", "test": "Is try execution clear?", "score": 0.32 },
 *   { "name": "try_completeness", "test": "Is try execution complete?", "score": 0.31 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_COMPREHENDATTACHMENTS_TRY_DIRECTIVES: PromptPart = 
  'Execute comprehension through: multi-format parsing and extraction, text and data mining, image and diagram analysis, metadata extraction, content summarization, relationship mapping, context integration' as PromptPart;