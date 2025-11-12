import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Danger Wall agent execution pattern"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     version: "GA1.00.0",
 *     score: 0.75,
 *     content: "MULTI_LAYER_SECURITY - Implements comprehensive security validation through layered defense...Multi-advanced security policy enforcement...intelligent escalation",
 *     reason: "Mostly industrial but contains vague terms like 'Multi-advanced', 'intelligent' without specifics"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.94 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.92 },
 *   { "name": "tool_specificity", "test": "Does it reference specific security tools?", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `MULTI_LAYER_SECURITY - Implements defense-in-depth security validation:
1. Attack surface enumeration using automated scanners (Nmap/Masscan) and API discovery
2. Real-time anomaly detection via ML models (isolation forests, autoencoders) on network traffic
3. Risk scoring using CVSS 3.1 calculations with dynamic threshold adjustment based on asset criticality
4. Security policy enforcement through WAF rules, RBAC controls, and network segmentation
5. SIEM integration for incident response with automated playbook execution
6. Threat intelligence feed consumption (MISP/STIX/TAXII) for IOC matching` as PromptPart;