import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Describe Danger Wall agent integration details"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     version: "GA1.00.0",
 *     score: 0.70,
 *     content: "Integrates with comprehensive security infrastructure...advanced behavioral analysis tools for intelligent threat detection",
 *     reason: "Contains vague terms like 'advanced', 'intelligent' without technical specifics"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.93 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.91 },
 *   { "name": "integration_clarity", "test": "Does it specify concrete integration points?", "score": 0.92 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_INTEGRATION_DETAILCONTENT: PromptPart = 
  `Integrates with security infrastructure via standard protocols:
- Consumes threat intelligence feeds via STIX/TAXII 2.1 protocols (AlienVault OTX, MISP)
- Processes behavioral analysis using Suricata IDS rules and Zeek network monitoring scripts
- Implements real-time alerting through SIEM APIs (Splunk, ElasticSearch, QRadar)
- Outputs JSON-formatted security reports with CVSS 3.1 scores and CWE classifications
- Integrates with SOAR platforms via REST APIs (Phantom, Demisto, TheHive)` as PromptPart;