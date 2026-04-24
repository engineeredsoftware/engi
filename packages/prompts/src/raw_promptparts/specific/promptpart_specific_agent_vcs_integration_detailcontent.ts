import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Describe VCS agent integration details"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VCS_INTEGRATION_DETAILCONTENT: PromptPart = 
  `Integrates with Git ecosystem via standard protocols and interfaces:
- Connects to Git repositories using HTTP/HTTPS, SSH, and file:// protocols
- Uses provider API calls and provider REST APIs for repository operations and merge resolution
- Implements git hooks for automated workflow triggers and validation
- Outputs structured git command results with commit logs and diff statistics
- Supports CI/CD integration via webhooks, API endpoints, and git-based triggers` as PromptPart;