import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define VCS agent system context"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VCS_SYSTEM_CONTEXT: PromptPart = 
  'Operating within DevOps environments, interfacing with GitHub/GitLab/Bitbucket APIs, Jenkins/GitHub Actions pipelines, code review systems (Gerrit/Crucible), maintaining repository synchronization with distributed teams and enforcing branch protection rules' as PromptPart;