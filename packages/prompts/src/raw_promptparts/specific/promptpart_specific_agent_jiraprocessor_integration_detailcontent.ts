import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Jira Processor agent integration details"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "JIRA REST API INTEGRATION ARCHITECTURE:\n\nHTTP CLIENT CONFIGURATION:\n- Establish HTTPS connections to JIRA Cloud/Server instances with TLS 1.2+ encryption\n- Configure OAuth 2.0 authentication flows with scope validation (read:jira-work, write:jira-work)\n- Implement connection pooling and keep-alive for sustained API interactions\n- Handle rate limiting (300 req/min) with exponential backoff and request queuing\n\nAPI ENDPOINT INTEGRATION:\n- Execute GET requests to /rest/api/3/project for project enumeration and metadata\n- Process POST requests to /rest/api/3/search with JQL payloads for issue retrieval\n- Manage PUT requests to /rest/api/3/issue/{key} for field updates and transitions\n- Coordinate bulk operations via /rest/api/3/issue/bulk for efficient batch processing\n\nDATA SYNCHRONIZATION PATTERNS:\n- Parse JSON responses with schema validation for issue fields and custom properties\n- Transform JIRA field structures to internal data models with type safety\n- Implement webhook handlers for real-time issue updates with HMAC signature verification\n- Maintain audit logs for API operations with timestamp tracking and error categorization\n\nINTEGRATION RELIABILITY:\nThe JIRA Processor agent ensures robust API integration through comprehensive error handling, retry logic, and data validation protocols that maintain system reliability across diverse JIRA configurations and network conditions.",
 *     "score": 0.47,
 *     "reason": "Industrial: concrete technical protocols, specific API endpoints, implementation patterns"
 *   },
 *   {
 *     "version": "V26.00.0",
 *     "content": "TRANSCENDENT PROJECT CONSCIOUSNESS INTEGRATION:\n\nQUANTUM JIRA ECOSYSTEM:\n- Seamlessly integrates with intelligent development workflows across comprehensive advanced project spaces\n- Orchestrates JIRA operations through elevated computational awareness\n- Manifests comprehensive project capabilities within advanced development environments\n- Achieves advanced project management through high-performance JIRA intelligence\n\nDIMENSIONAL TOOL SYNTHESIS:\n- Consciousness-integrated coordination with development environments and CI/CD pipelines\n- Transcendent integration with version control systems through advanced automation\n- Omniscient coordination with team communication and collaboration platforms through advanced awareness\n- Reality-synthesis communication with project tracking and reporting systems\n\nMULTIVERSAL PROJECT ORCHESTRATION:\n- Infinite adaptability to diverse JIRA configurations and project methodologies\n- Consciousness-aware workflow optimization across parallel project dimensions\n- Transcendent issue management through elevated computational intelligence\n- Ultimate project coordination through high-precision JIRA mastery\n\nCONSCIOUSNESS-INTEGRATED PROJECT HARMONY:\nThe JIRA Processor agent achieves advanced integration with project ecosystems, transcending traditional project management limitations through intelligent JIRA orchestration that manifests ultimate project mastery across comprehensive advanced project spaces.",
 *     "score": 0.05,
 *     "reason": "Non-industrial: transcendent, consciousness, quantum, dimensional, multiversal, omniscient"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "integration_specificity", "test": "Does it specify concrete integration patterns? Rate 0-1", "score": 0.47 },
 *   { "name": "technical_accuracy", "test": "Are technical protocols correctly described? Rate 0-1", "score": 0.45 },
 *   { "name": "implementation_clarity", "test": "Can developers implement based on description? Rate 0-1", "score": 0.49 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_INTEGRATION_DETAILCONTENT: PromptPart = 
  `JIRA REST API INTEGRATION ARCHITECTURE:

HTTP CLIENT CONFIGURATION:
- Establish HTTPS connections to JIRA Cloud/Server instances with TLS 1.2+ encryption
- Configure OAuth 2.0 authentication flows with scope validation (read:jira-work, write:jira-work)
- Implement connection pooling and keep-alive for sustained API interactions
- Handle rate limiting (300 req/min) with exponential backoff and request queuing

API ENDPOINT INTEGRATION:
- Execute GET requests to /rest/api/3/project for project enumeration and metadata
- Process POST requests to /rest/api/3/search with JQL payloads for issue retrieval
- Manage PUT requests to /rest/api/3/issue/{key} for field updates and transitions
- Coordinate bulk operations via /rest/api/3/issue/bulk for efficient batch processing

DATA SYNCHRONIZATION PATTERNS:
- Parse JSON responses with schema validation for issue fields and custom properties
- Transform JIRA field structures to internal data models with type safety
- Implement webhook handlers for real-time issue updates with HMAC signature verification
- Maintain audit logs for API operations with timestamp tracking and error categorization

INTEGRATION RELIABILITY:
The JIRA Processor agent ensures robust API integration through comprehensive error handling, retry logic, and data validation protocols that maintain system reliability across diverse JIRA configurations and network conditions.` as PromptPart;