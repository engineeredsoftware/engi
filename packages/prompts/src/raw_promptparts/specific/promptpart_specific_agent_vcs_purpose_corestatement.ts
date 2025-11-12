import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define VCS agent purpose"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     version: "GA1.00.0",
 *     score: 0.15,
 *     content: "Execute Git operations using libgit2 bindings, manage repository workflows via git commands",
 *     reason: "Non-industrial: used system commands instead of API operations"
 *   },
 *   {
 *     version: "GA1.47.0",
 *     score: 0.47,
 *     content: "Execute version control operations through provider APIs, manage repository workflows via GitHub/GitLab/Bitbucket REST interfaces, implement merge conflict resolution through API endpoints, and automate branch management using provider-specific authentication protocols",
 *     reason: "Industrial language with API-only operations"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete API operations?", "score": 0.47 },
 *   { "name": "implementation_ready", "test": "Can developers implement directly?", "score": 0.46 },
 *   { "name": "api_focus", "test": "Exclusively uses provider APIs?", "score": 0.48 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_VCS_PURPOSE_CORESTATEMENT: PromptPart = 
  'Execute version control operations through provider APIs, manage repository workflows via GitHub/GitLab/Bitbucket REST interfaces, implement merge conflict resolution through API endpoints, and automate branch management using provider-specific authentication protocols' as PromptPart;