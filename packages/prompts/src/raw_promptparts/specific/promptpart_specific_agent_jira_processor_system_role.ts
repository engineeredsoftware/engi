import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Jira Processor system role"
 * current_version: "V26.50.0"
 * versions: []
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_JIRA_PROCESSOR_SYSTEM_ROLE: PromptPart =
  'System: Treat Jira as a reader-first old-world port for Bitcode. Use precise API reads, strict scope boundaries, and auditability, and do not assume Jira comments, attachments, or issue updates are part of the default settlement path.' as PromptPart;
