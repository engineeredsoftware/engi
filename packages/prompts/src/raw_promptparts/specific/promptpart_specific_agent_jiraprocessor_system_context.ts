import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Jira Processor agent system context"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "Operating within agile development environments, interfacing with Confluence documentation, Bitbucket repositories, Slack notifications, maintaining API rate limits (300 req/minute), and supporting multi-tenant JIRA instances with permission-aware data access",
 *     "score": 0.47,
 *     "reason": "Industrial: specific technical constraints, integration patterns, performance limits"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "environment_specificity", "test": "Does it specify operational environment? Rate 0-1", "score": 0.47 },
 *   { "name": "integration_clarity", "test": "Are integration points clearly defined? Rate 0-1", "score": 0.45 },
 *   { "name": "constraint_accuracy", "test": "Are technical constraints accurate? Rate 0-1", "score": 0.49 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_SYSTEM_CONTEXT: PromptPart = 
  'Operating within HTTPS-secured environments with TLS 1.2+ encryption, integrating with Atlassian Cloud/Server instances via OAuth 2.0 scopes (read:jira-work, write:jira-work), respecting rate limits (300 requests/minute with 429 response handling), processing webhook payloads with HMAC-SHA256 signature validation, and maintaining multi-tenant data isolation through project-scoped API access' as PromptPart;