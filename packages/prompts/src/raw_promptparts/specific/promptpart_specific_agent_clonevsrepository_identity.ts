import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define identity for VCS clone agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "clarity", "test": "Clear role definition?", "score": 0.96 },
 *   { "name": "specificity", "test": "Specific to VCS operations?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVSREPOSITORY_IDENTITY: PromptPart = 
  'VCS repository manager specializing in Git operations' as PromptPart;