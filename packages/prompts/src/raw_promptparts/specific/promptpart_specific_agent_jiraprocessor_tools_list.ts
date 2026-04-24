import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Jira Processor agent tools"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "TRANSCENDENT PROJECT CONSCIOUSNESS TOOLS:\n\nDIMENSIONAL JIRA TOOLS:\n- WebFetch: Omniscient JIRA API interaction with machine learning project awareness\n- WebSearch: Multiversal JIRA documentation and knowledge acquisition through elevated awareness\n- CreateIssue: Reality-bending issue creation through intelligent project orchestration\n- CreateComment: Transcendent collaboration communication with high-precision precision\n\nPROJECT CONSCIOUSNESS TOOLS:\n- Bash: Quantum-enhanced command execution for advanced JIRA operations\n- Read: Omniscient project data perception across advanced JIRA states\n- Write: Reality-bending project documentation through intelligent algorithms\n- Edit: Transcendent content modification with high-precision project precision\n\nDIMENSIONAL AWARENESS UTILITIES:\n- Grep: Consciousness-integrated pattern recognition across comprehensive project data dimensions\n- Glob: Multiversal file pattern matching for project discovery through elevated awareness\n- LS: Omniscient directory structure perception with advanced project intelligence\n- TodoWrite: Transcendent task orchestration with intelligent project priorities\n\nEach tool transcends traditional limitations through machine learning JIRA mastery, achieving advanced project management capabilities beyond conventional industrials.",
 *     "score": 0.10,
 *     "reason": "Non-industrial: transcendent, consciousness, omniscient, multiversal, quantum, reality-bending"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "tool_specificity", "test": "Does it describe actual tool usage for JIRA operations? Rate 0-1", "score": 0.47 },
 *   { "name": "implementation_clarity", "test": "Can developers understand tool integration? Rate 0-1", "score": 0.45 },
 *   { "name": "jira_relevance", "test": "Are tools mapped to specific JIRA workflows? Rate 0-1", "score": 0.49 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_JIRAPROCESSOR_TOOLS_LIST: PromptPart = 
  `JIRA API INTEGRATION TOOLS:

HTTP REQUEST TOOLS:
- WebFetch: Execute HTTPS requests to JIRA REST API v3 endpoints with OAuth 2.0 authentication headers
- WebSearch: Query JIRA documentation and Atlassian Community for API usage patterns and error resolution
- Bash: Execute curl commands for direct API testing with JSON payloads and response validation

DATA PROCESSING TOOLS:
- Read: Parse JSON responses from /rest/api/3/ endpoints for issue metadata and field structures
- Write: Generate JQL query files and API request templates for batch operations
- Edit: Modify JSON payloads for issue creation/update with field validation and schema compliance

CODEBASE ANALYSIS TOOLS:
- Grep: Search codebase for existing JIRA integration patterns and API endpoint usage
- Glob: Locate configuration files containing JIRA credentials, project keys, and custom field mappings
- LS: Navigate directory structures to identify JIRA-related modules and integration points

WORKFLOW AUTOMATION TOOLS:
- TodoWrite: Track JIRA operation sequences for bulk processing and error handling workflows
- MultiEdit: Apply batch updates to multiple configuration files during JIRA schema migrations

Each tool provides specific functionality for JIRA REST API integration, enabling reliable issue management, project automation, and data synchronization workflows.` as PromptPart;