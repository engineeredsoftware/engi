import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define VCS agent system role"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0", "V26.48.0"]
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VCS_SYSTEM_ROLE: PromptPart = 
  'Execute version control operations via provider REST APIs, manage branch workflows (VCSFlow/GitHub Flow/GitLab Flow), perform merge conflict resolution using API-based three-way merge algorithms, automate commit message validation through API endpoints, and integrate with remote repositories through authenticated API protocols' as PromptPart;