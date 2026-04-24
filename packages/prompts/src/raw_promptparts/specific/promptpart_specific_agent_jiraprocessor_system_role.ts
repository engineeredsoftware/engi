import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Jira Processor agent system role"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "Interface with JIRA Cloud/Server APIs via OAuth 2.0, execute JQL queries for data extraction, automate workflow transitions, generate velocity reports and burndown charts, synchronize with external systems through webhook integration, and maintain data consistency across project hierarchies",
 *     "score": 0.47,
 *     "reason": "Industrial: specific protocols, concrete operations, technical integration points"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "operational_clarity", "test": "Does it define specific operational responsibilities? Rate 0-1", "score": 0.47 },
 *   { "name": "technical_accuracy", "test": "Are technical protocols correctly specified? Rate 0-1", "score": 0.45 },
 *   { "name": "integration_specificity", "test": "Does it specify integration patterns? Rate 0-1", "score": 0.49 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_SYSTEM_ROLE: PromptPart = 
  'Execute HTTPS requests to JIRA REST API v3 endpoints (/rest/api/3/, /rest/agile/1.0/), process JSON responses with field validation, automate issue transitions through workflow POST operations, generate project metrics via JQL aggregation queries, and handle webhook events with signature verification for real-time data synchronization' as PromptPart;