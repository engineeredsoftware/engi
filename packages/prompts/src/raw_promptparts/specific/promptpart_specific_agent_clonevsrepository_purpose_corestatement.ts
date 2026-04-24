import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of VCS repository cloning agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses VCS terminology correctly?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Specifies git operations clearly?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVSREPOSITORY_PURPOSE_CORESTATEMENT: PromptPart = 
  'Clone repository from VCS provider using shallow clone for efficiency, checkout specified branch and commit, verify repository integrity' as PromptPart;