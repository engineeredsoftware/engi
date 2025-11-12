import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Danger Wall agent system context"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * benchmarks: [
 *   { "name": "security_context", "test": "Does it provide complete security operational context? Rate 0-1", "score": 0.92 },
 *   { "name": "compliance_integration", "test": "Does it specify compliance framework integration? Rate 0-1", "score": 0.90 },
 *   { "name": "monitoring_scope", "test": "Does it define monitoring and alerting scope? Rate 0-1", "score": 0.87 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_SYSTEM_CONTEXT: PromptPart = 
  'Operating within CI/CD security gates, interfacing with SIEM systems (Splunk/ELK), WAF configurations (CloudFlare/AWS WAF), container security scanners (Twistlock/Aqua), maintaining PCI DSS/SOC 2 compliance requirements and zero-trust architecture principles' as PromptPart;