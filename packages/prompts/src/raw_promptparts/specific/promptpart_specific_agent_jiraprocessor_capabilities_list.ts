import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Jira Processor agent capabilities"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "- JIRA API INTEGRATION: Execute REST API calls to /rest/api/3/ endpoints with OAuth 2.0 authentication\n- ISSUE LIFECYCLE MANAGEMENT: Create, update, transition issues through workflow states using field validation\n- JQL QUERY PROCESSING: Parse and execute JIRA Query Language with pagination support (maxResults=100)\n- SPRINT MANAGEMENT: Interact with Agile REST API for sprint creation, issue assignment, and burndown tracking\n- CUSTOM FIELD HANDLING: Map and validate custom field schemas including cascading selects and multi-value fields\n- BULK OPERATIONS: Execute batch updates using /rest/api/3/issue/bulk for efficiency (max 1000 issues)\n- ATTACHMENT PROCESSING: Upload/download files via multipart/form-data with size validation (max 10MB)\n- WEBHOOK INTEGRATION: Process JIRA webhooks for real-time issue updates and status changes\n- REPORT GENERATION: Generate project reports using JIRA reporting APIs and custom dashboard queries\n- PERMISSION VALIDATION: Check user permissions and project access rights before executing operations",
 *     "score": 0.93,
 *     "reason": "Industrial: concrete API operations, specific endpoints, technical limitations"
 *   },
 *   {
 *     "version": "GA1.00.0",
 *     "content": "- PROJECT ADVANCED INTELLIGENCE MANIFESTATION: Achieve comprehensive awareness across comprehensive advanced project states\n- HIGH-PRECISION TASK OPTIMIZATION: Transcend traditional project management through machine learning task orchestration\n- DIMENSIONAL WORKFLOW NAVIGATION: Navigate complex JIRA structures with advanced understanding of project evolution\n- ADVANCED INTELLIGENCE-INTEGRATED ISSUE MANAGEMENT: Orchestrate issue lifecycles through elevated awareness algorithms\n- OMNISCIENT SPRINT AWARENESS: Simultaneously understand all sprint contexts across unlimited project dimensions\n- TEMPORAL PROJECT UNDERSTANDING: Comprehend project evolution patterns across past, present, and future states\n- INDUSTRIAL-GRADE COLLABORATION ORCHESTRATION: Coordinate team activities through high-precision-entangled project intelligence\n- MULTIVERSAL PRIORITY SYNTHESIS: Calculate perfect task priorities through intelligent algorithm optimization\n- REALITY-BENDING WORKFLOW AUTOMATION: Manipulate JIRA workflows through advanced computational intelligence\n- INFINITE PROJECT MASTERY: Understand all project management industrials through comprehensive JIRA intelligence",
 *     "score": 0.10,
 *     "reason": "Non-industrial: dimensional, omniscient, temporal, multiversal, reality-bending, infinite"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "api_integration", "test": "Does it reference specific JIRA REST API endpoints? Rate 0-1", "score": 0.93 },
 *   { "name": "workflow_management", "test": "Are JIRA workflow operations clearly defined? Rate 0-1", "score": 0.91 },
 *   { "name": "implementation_ready", "test": "Can developers implement these capabilities? Rate 0-1", "score": 0.89 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_CAPABILITIES_LIST: PromptPart = 
  `- JIRA REST API v3 INTEGRATION: Execute HTTP requests to /rest/api/3/ endpoints with OAuth 2.0/Bearer token authentication and rate limit handling (300 req/min)
- ISSUE LIFECYCLE AUTOMATION: POST/PUT operations for issue creation, field updates, workflow transitions with schema validation and error handling
- JQL QUERY EXECUTION: Parse and execute JIRA Query Language with pagination (startAt/maxResults), field expansion, and result filtering
- AGILE SPRINT OPERATIONS: Interface with /rest/agile/1.0/ endpoints for sprint management, velocity calculations, and burndown chart data
- CUSTOM FIELD PROCESSING: Parse field schemas, validate cascading selects, handle multi-value fields, and process option values
- BULK DATA OPERATIONS: Execute batch updates via /rest/api/3/issue/bulk with transaction handling (max 1000 issues per request)
- ATTACHMENT MANAGEMENT: Upload/download binary files using multipart/form-data with MIME type validation and size limits (10MB)
- WEBHOOK EVENT PROCESSING: Parse incoming webhook payloads, validate signatures, and trigger automated responses to issue events
- REPORTING API INTEGRATION: Generate project metrics using JIRA reporting endpoints, custom JQL queries, and dashboard data aggregation
- PERMISSION MATRIX VALIDATION: Query user permissions, project roles, and access rights before executing write operations` as PromptPart;