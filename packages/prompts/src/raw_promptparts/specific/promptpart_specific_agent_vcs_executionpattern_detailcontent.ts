import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define VCS agent execution pattern"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0", "GA1.46.0"]
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VCS_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `VCS_API_WORKFLOW - Execute version control operations via provider REST APIs:
1. Repository state verification using API status endpoints and commit history calls
2. Operation execution with merge conflict detection via provider merge APIs
3. API operation execution through authenticated REST endpoints
4. Quality validation using API-based diff analysis, validation endpoints, and webhook triggers
5. Workflow automation via API webhooks, CI/CD integrations, and branch protection policies
6. Repository maintenance using API cleanup endpoints, optimization calls, and housekeeping operations` as PromptPart;