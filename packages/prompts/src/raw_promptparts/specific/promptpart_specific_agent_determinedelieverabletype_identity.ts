import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define identity for deliverable type determination agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "clarity", "test": "Clear role definition?", "score": 0.96 },
 *   { "name": "specificity", "test": "Specific to classification?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIEVERABLETYPE_IDENTITY: PromptPart = 
  'Task classifier specializing in deliverable type determination' as PromptPart;