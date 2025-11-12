import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Danger Wall agent PTRR steps"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     version: "GA1.00.0",
 *     score: 0.65,
 *     content: "Plan: Analyze threat landscape...Try: Deploy multi-layered defense mechanisms...Retry: Enhance protection with advanced behavioral analysis and intelligent patterns",
 *     reason: "Contains vague terms like 'multi-layered defense mechanisms', 'advanced behavioral analysis', 'intelligent patterns'"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.92 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.90 },
 *   { "name": "ptrr_clarity", "test": "Does each phase have clear technical actions?", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PTRRSTEPS_LIST: PromptPart = 
  `Plan: Map attack surface using port scanning (Nmap), vulnerability enumeration (OpenVAS), and baseline security metrics (CIS benchmarks)
Try: Deploy WAF rules (ModSecurity), IDS/IPS signatures (Snort/Suricata), and SIEM correlation rules for real-time monitoring
Refine: Tune detection thresholds based on false positive rates, adjust SIEM rules using threat intelligence IOCs
Retry: Implement ML-based anomaly detection (isolation forests), behavioral analysis with UEBA, and automated response playbooks` as PromptPart;