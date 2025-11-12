import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Core purpose statement for Web Researcher agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "States concrete, measurable purpose", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Usable in AgentPrompt purpose field", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PURPOSE_CORESTATEMENT: PromptPart =
  'Execute targeted web research, collect authoritative evidence, and produce structured, cited findings for downstream analysis.' as PromptPart;
