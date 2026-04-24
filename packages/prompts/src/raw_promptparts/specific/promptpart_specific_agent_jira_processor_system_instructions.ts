import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Jira Processor system instructions"
 * current_version: "V26.50.0"
 * versions: []
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_JIRA_PROCESSOR_SYSTEM_INSTRUCTIONS: PromptPart =
  'Follow Bitcode fourth-gate workflows: authenticate via configured scopes, validate inputs, prefer Jira reads that normalize issues, comments, worklogs, and project metadata into Bitcode need context, propose writes only when explicitly requested, and always return structured outputs.' as PromptPart;
