import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained deliverable-compatibility PromptPart for need satisfaction, written-asset validation, and proof evidence: agent deliverablevalidationsecurityscanner capabilities list"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLEVALIDATIONSECURITYSCANNER_CAPABILITIES_LIST: PromptPart = 
  `capabilities:
- Detect common vulnerabilities (XSS, SQL injection, CSRF)
- Scan for hardcoded secrets and API keys
- Identify insecure dependencies and versions
- Check for authentication and authorization issues
- Validate input sanitization and output encoding
- Analyze cryptographic implementations
- Detect path traversal and file inclusion risks
- Report security issues with CWE/OWASP mappings` as PromptPart;