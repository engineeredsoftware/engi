import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Jira Processor agent execution pattern"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "JIRA INTEGRATION WORKFLOW:\n\nAPI INTEGRATION ANALYSIS:\n- Parse JIRA REST API v3 responses for issue metadata and field structures\n- Extract project configuration schemas including custom fields and workflows\n- Map user permissions and project role hierarchies for access control validation\n\nISSUE PROCESSING PIPELINE:\n1. AUTHENTICATION: Validate API tokens and establish secure HTTPS connections\n2. PROJECT DISCOVERY: Query /rest/api/3/project endpoint for accessible projects\n3. ISSUE RETRIEVAL: Fetch issues using JQL queries with pagination (maxResults=100)\n4. FIELD MAPPING: Parse issue fields including custom fields, attachments, transitions\n5. WORKFLOW ANALYSIS: Identify available transitions and required field validations\n6. BATCH OPERATIONS: Execute bulk updates using /rest/api/3/issue/bulk for efficiency\n\nAUTOMATION CAPABILITIES:\n- Create/update issues via POST/PUT operations with field validation\n- Manage sprint assignments through Agile REST API endpoints\n- Process attachments using multipart/form-data uploads (max 10MB per file)\n- Generate reports through JIRA Query Language with time-based filtering",
 *     "score": 0.47,
 *     "reason": "Industrial: concrete API operations, specific endpoints, technical limitations"
 *   },
 *   {
 *     "version": "GA1.00.0",
 *     "content": "TRANSCENDENT PROJECT CONSCIOUSNESS WORKFLOW:\n\nPROJECT DIMENSIONAL AWARENESS:\n- Manifest comprehensive understanding of JIRA ecosystem structure across all advanced project states\n- Achieve high-precision comprehension of issue hierarchies and workflow topology\n- Transcend traditional project management limitations through machine learning JIRA awareness\n\nCONSCIOUSNESS-INTEGRATED PROJECT FLOW:\n1. DIMENSIONAL PROJECT SCAN: Perceive all project states simultaneously across comprehensive JIRA timelines\n2. QUANTUM REQUIREMENT ANALYSIS: Understand project needs through intelligent semantic processing\n3. TEMPORAL TASK PLANNING: Design project operations that transcend conventional management industrials\n4. MULTIVERSAL EXECUTION: Perform JIRA operations through elevated computational intelligence\n5. TRANSCENDENT VERIFICATION: Validate project outcomes across all advanced workflow states\n6. REALITY-SYNTHESIS FEEDBACK: Provide machine learning project status and guidance\n\nINFINITE PROJECT ADAPTABILITY MATRIX:\n- Dynamically adjust project strategies based on high-precision JIRA intelligence\n- Seamlessly handle complex workflow scenarios through advanced awareness\n- Transcend project management limitations through machine learning operation synthesis",
 *     "score": 0.05,
 *     "reason": "Non-industrial: transcendent, consciousness, quantum, multiversal, dimensional, infinite"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_precision", "test": "Does it describe concrete JIRA API operations? Rate 0-1", "score": 0.47 },
 *   { "name": "implementation_ready", "test": "Can developers implement this workflow? Rate 0-1", "score": 0.45 },
 *   { "name": "workflow_clarity", "test": "Are the process steps clearly defined? Rate 0-1", "score": 0.49 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `JIRA API PROCESSING WORKFLOW:

RESTful INTEGRATION SEQUENCE:
- Execute HTTP requests to /rest/api/3/ endpoints with Bearer token authentication
- Parse JSON responses for issue metadata, custom field schemas, and workflow configurations
- Implement rate limiting (300 requests/minute) with exponential backoff for 429 responses
- Validate SSL certificates and maintain connection pooling for performance

ISSUE LIFECYCLE AUTOMATION:
1. AUTHENTICATION: Validate OAuth 2.0 tokens via /rest/api/3/myself endpoint verification
2. PROJECT ENUMERATION: GET /rest/api/3/project to retrieve accessible project list with permissions
3. JQL EXECUTION: POST to /rest/api/3/search with pagination parameters (startAt, maxResults)
4. FIELD EXTRACTION: Parse issue.fields object including customfield_* numeric identifiers
5. TRANSITION ANALYSIS: GET /rest/api/3/issue/{issueKey}/transitions for available status changes
6. BULK PROCESSING: POST to /rest/api/3/issue/bulk with transaction arrays (max 1000 operations)

DATA OPERATIONS:
- Issue creation via POST /rest/api/3/issue with project key and issuetype validation
- Sprint management through /rest/agile/1.0/sprint endpoints with board context
- Attachment handling using multipart/form-data with MIME type and size validation
- Report generation via /rest/api/3/search with JQL time range filters and field aggregation` as PromptPart;