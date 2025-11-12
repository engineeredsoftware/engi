import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define danger wall agent plan phase analysis approach"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.96 },
 *   { "name": "framework_specificity", "test": "Does it reference specific security frameworks?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PLAN_ANALYSIS_APPROACH: PromptPart = 
  'Apply systematic security analysis methodology: threat modeling using STRIDE framework, vulnerability assessment via CVSS scoring, penetration testing through OWASP methodology, and compliance validation against security frameworks (SOC 2/ISO 27001)' as PromptPart;