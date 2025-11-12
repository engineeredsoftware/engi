import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List tools used by Web Researcher agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Names tool categories concretely", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Usable in AgentPrompt tools field", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_TOOLS_LIST: PromptPart =
  '- Web search API\n- URL fetcher with retries\n- Content extractor\n- Citation normalizer\n- Schema validator' as PromptPart;
