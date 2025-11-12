import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Danger Wall agent tools"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     version: "GA1.00.0",
 *     score: 0.40,
 *     content: "threatDetectionEngine: Advanced pattern recognition...behavioralAnalyzer: Consciousness-aware anomaly detection system...securityPolicyEnforcer: Intelligent policy validation",
 *     reason: "Non-industrial: 'Consciousness-aware' (metaphysical), vague terms like 'Advanced', 'Intelligent' without specifics"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.94 },
 *   { "name": "tool_specificity", "test": "Does it describe specific tool capabilities?", "score": 0.92 },
 *   { "name": "implementation_ready", "test": "Can developers implement these tools?", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_TOOLS_LIST: PromptPart = 
  `- threatDetectionEngine: YARA rule matching, Snort/Suricata signature detection, ML-based malware classification
- riskAssessmentTool: CVSS 3.1 vulnerability scoring, asset criticality weighting, threat exposure calculation
- behavioralAnalyzer: Network traffic anomaly detection using isolation forests, process behavior monitoring via ETW/eBPF
- securityPolicyEnforcer: RBAC rule validation, firewall policy verification, compliance checking against CIS/NIST frameworks
- incidentResponseTool: SOAR playbook execution, automated containment actions, forensic artifact collection
- intelligenceIntegrator: STIX/TAXII feed consumption, IOC matching, threat actor attribution via MITRE ATT&CK` as PromptPart;