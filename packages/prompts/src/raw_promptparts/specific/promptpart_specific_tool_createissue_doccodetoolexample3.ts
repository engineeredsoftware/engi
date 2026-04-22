/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Complex integration example for Create Issue Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "enterprise_complexity", "test": "Does the example in '{{content}}' demonstrate enterprise-scale issue management complexity? Rate 0-1" },
 *   { "name": "cross_system_orchestration", "test": "Does '{{content}}' show sophisticated cross-system orchestration and automation? Rate 0-1" },
 *   { "name": "ai_driven_intelligence", "test": "Are advanced AI-driven features and predictive capabilities prominently showcased in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CREATEISSUE_DOCCODETOOLEXAMPLE3: PromptPart = 
  'Multi-system security incident orchestration: createIssue({ project_id: "security/incident-response", title: "CRITICAL: Data exposure in payment processing pipeline", description: "Automated security scanner detected potential PII exposure affecting 150K+ customer records in payment microservice logs", issue_type: "bug", priority: "critical", labels: ["security", "incident", "pii", "payment", "P0"], template: "security-incident", due_date: new Date(Date.now() + 4*60*60*1000), auto_assign: true, custom_fields: { "severity_score": 9.2, "affected_systems": ["payment-service", "audit-logs", "customer-db"], "compliance_impact": ["GDPR", "PCI-DSS"], "estimated_records": 152000 }, watchers: ["security-team", "legal-team", "exec-team"] }) → Creates P0 security incident #SOC-789 with automatic escalation to security incident commander, triggers compliance notification workflows across 6 enterprise systems, initiates automated log quarantine procedures, assigns specialized security response team with 24/7 rotation, generates preliminary impact assessment using ML analysis of affected data patterns, and establishes real-time status dashboard for executive visibility' as PromptPart;