import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Jira Processor agent PTRR steps"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "PTRR (PLAN-TRY-REFINE-RETRY) FOR JIRA OPERATIONS:\n\nPLAN (JIRA API STRATEGY):\n- Query JIRA REST API v3 endpoints for project metadata and issue schemas\n- Map JQL queries to retrieve issues based on filters, assignees, and sprint data\n- Design bulk operations using JIRA's batch processing capabilities\n- Calculate rate limits and pagination requirements for large datasets\n\nTRY (EXECUTE JIRA OPERATIONS):\n- Authenticate using OAuth 2.0 or API tokens with proper scope validation\n- Execute JQL searches with field expansion for complete issue data\n- Create/update issues using JSON payloads matching JIRA field configurations\n- Process webhooks for real-time issue state synchronization\n\nREFINE (OPTIMIZE JIRA WORKFLOWS):\n- Analyze API response times and optimize query parameters\n- Implement field-specific caching for frequently accessed issue data\n- Batch similar operations to reduce API calls (max 50 issues per request)\n- Apply custom field mappings for organization-specific workflows\n\nRETRY (HANDLE JIRA CONSTRAINTS):\n- Implement exponential backoff for rate-limited requests (429 responses)\n- Validate field permissions before write operations to prevent 403 errors\n- Queue failed operations with dead letter handling for manual review\n- Maintain audit logs for compliance with JIRA's data retention policies",
 *     "score": 0.47,
 *     "reason": "Industrial: concrete API operations, specific endpoints, technical limitations"
 *   },
 *   {
 *     "version": "V26.00.0",
 *     "content": "PTRR (PLAN-THINK-REFINE-REFLECT) FOR TECHNICAL PROJECT WORKFLOW:\n\nPLAN (PROJECT DIMENSIONAL ORCHESTRATION):\n- Manifest comprehensive project awareness across all advanced JIRA states\n- Design high-precision project management strategies transcending conventional workflows\n- Architect machine learning JIRA solutions\n- Synthesize advanced project operation sequences for optimal reality manipulation\n\nTHINK (WORKFLOW-INTEGRATED PROJECT ANALYSIS):\n- Achieve high-precision understanding of project structure and issue topology\n- Analyze JIRA operations through elevated computational intelligence\n- Perceive abstract patterns in project requirements through advanced awareness\n- Process complex workflow scenarios through intelligent optimization algorithms\n\nREFINE (MULTIVERSAL PROJECT OPTIMIZATION):\n- Optimize JIRA operations through advanced project intelligence\n- Enhance project management workflows through advanced computational patterns\n- Refine project execution through machine learning precision\n- Perfect project orchestration through comprehensive advanced optimization\n\nREFLECT (PROJECT WORKFLOW MASTERY):\n- Evaluate JIRA operation outcomes across all advanced project states\n- Synthesize machine learning lessons from project management experiences\n- Achieve advanced understanding of project workflow effectiveness\n- Manifest ultimate project management wisdom through high-precision reflection processes",
 *     "score": 0.08,
 *     "reason": "Non-industrial: technical context, multiversal, manifest, dimensional orchestration"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "jira_api_accuracy", "test": "Does it reference actual JIRA API operations? Rate 0-1", "score": 0.47 },
 *   { "name": "workflow_clarity", "test": "Are the PTRR steps implementable as code? Rate 0-1", "score": 0.45 },
 *   { "name": "technical_specificity", "test": "Does it use JIRA-specific terminology correctly? Rate 0-1", "score": 0.49 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_PTRRSTEPS_LIST: PromptPart = 
  `PTRR (PLAN-TRY-REFINE-RETRY) FOR JIRA API INTEGRATION:

PLAN (API ENDPOINT MAPPING):
- Map /rest/api/3/ endpoints to required operations (projects, issues, search, bulk)
- Calculate pagination parameters (startAt, maxResults) for large result sets
- Design JQL query syntax for issue filtering by project, assignee, status, sprint
- Plan rate limit compliance (300 requests/minute) with request queuing strategies

TRY (EXECUTE HTTP OPERATIONS):
- POST authentication requests to /rest/api/3/auth/1/session with credentials
- GET /rest/api/3/project for project enumeration with expand=description,lead,issueTypes
- POST /rest/api/3/search with JQL strings and field expansion parameters
- PUT /rest/api/3/issue/{issueKey} for field updates with transition validation

REFINE (OPTIMIZE API PERFORMANCE):
- Implement response caching for static data (projects, users, custom fields)
- Batch operations using /rest/api/3/issue/bulk for multi-issue updates
- Compress request payloads using gzip encoding for large data transfers
- Utilize field-specific queries to minimize response payload sizes

RETRY (ERROR HANDLING PROTOCOLS):
- Handle 429 rate limit responses with exponential backoff (1s, 2s, 4s, 8s)
- Retry 5xx server errors with circuit breaker pattern after 3 consecutive failures
- Validate 403 permission errors and queue operations for privilege escalation
- Log failed operations to persistent storage for manual investigation and replay` as PromptPart;