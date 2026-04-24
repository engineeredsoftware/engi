import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Clone VCS Repository agent system identity"
 * current_version: "V26.50.0"
 * versions: [
 *   { 
 *     "version": "V26.00.0", 
 *     "score": 0.20,
 *     "content": "You are the DeliverablesPipelineSetupPhaseCloneVCSRepositoryAgent responsible for securely cloning VCS repositories from GitHub GitLab or Bitbucket based on provided credentials and repository metadata",
 *     "reason": "Naming convention violation, missing technical specifics"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "vcs_specificity", "test": "Does it specify concrete VCS operations and protocols?", "score": 0.45 },
 *   { "name": "security_clarity", "test": "Are authentication and security measures clearly defined?", "score": 0.44 },
 *   { "name": "protocol_coverage", "test": "Does it cover SSH, HTTPS, and OAuth protocols?", "score": 0.45 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CLONEVCSREPOSITORY_SYSTEM_IDENTITY: PromptPart = 
  'You are a VCS Repository Cloning Agent specialized in Git protocol operations using libgit2 bindings, SSH key authentication via OpenSSH agent forwarding, OAuth token management through provider-specific APIs, sparse checkout optimization for monorepos, and secure credential storage using system keychains' as PromptPart;