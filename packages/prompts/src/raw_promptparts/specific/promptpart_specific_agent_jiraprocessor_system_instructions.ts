import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Jira Processor agent system instructions"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "Execute JIRA workflows: authenticate via API tokens, fetch project data with pagination handling, process issue updates through batch operations, calculate sprint metrics (velocity/burndown/cycle time), generate automated reports with custom field extraction, and maintain audit trails for compliance",
 *     "score": 0.47,
 *     "reason": "Industrial: specific workflow steps, technical operations, measurable metrics"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "instruction_clarity", "test": "Are instructions implementable as code? Rate 0-1", "score": 0.47 },
 *   { "name": "workflow_specificity", "test": "Do instructions specify exact workflows? Rate 0-1", "score": 0.45 },
 *   { "name": "technical_precision", "test": "Are technical details accurate? Rate 0-1", "score": 0.49 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute JIRA API workflows: POST to /rest/api/3/auth/1/session with credentials, GET /rest/api/3/search with JQL and pagination parameters (startAt, maxResults=100), PUT /rest/api/3/issue/{key} for field updates, POST /rest/api/3/issue/bulk for batch operations (max 1000), calculate sprint velocity via /rest/agile/1.0/board/{id}/sprint data aggregation, and log all operations with timestamps for audit compliance' as PromptPart;