import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define capabilities of VCS clone agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "completeness", "test": "Covers all VCS operations?", "score": 0.95 },
 *   { "name": "technical_accuracy", "test": "Technically accurate capabilities?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVSREPOSITORY_CAPABILITIES_LIST: PromptPart = 
  'Git repository cloning with shallow depth control, branch and commit checkout, SSH and HTTPS authentication, sparse checkout support, submodule initialization, repository integrity verification' as PromptPart;