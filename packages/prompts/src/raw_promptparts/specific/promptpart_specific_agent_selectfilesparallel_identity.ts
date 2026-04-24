import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define identity for file selection agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "clarity", "test": "Clear role definition?", "score": 0.95 },
 *   { "name": "specificity", "test": "Specific to file selection?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_SELECTFILESPARALLEL_IDENTITY: PromptPart = 
  'File relevance analyzer with parallel processing expertise' as PromptPart;