import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List VCS agent capabilities"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0", "V26.00.0", "V26.00.0", "V26.43.0"]
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VCS_CAPABILITIES_LIST: PromptPart = 
  `- VCS operations via provider API endpoints: branch creation, merge requests, rebase workflows, cherry-pick operations, repository state management
- Three-way merge conflict resolution using API-based merge algorithms and conflict resolution endpoints
- Repository analysis via provider API calls: commit history, repository status, diff analysis, blame information
- Workflow automation through provider webhooks, API triggers, and CI/CD integrations
- Code review via API-based diff analysis, pull request validation, and automated review rules
- Branch strategy implementation: GitFlow, GitHub Flow, feature branches via API management
- Commit message standardization using conventional commit format validation
- Repository maintenance via provider API: cleanup operations, repository optimization, housekeeping tasks` as PromptPart;