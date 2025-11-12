import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Capabilities list for Web Researcher agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Lists concrete capabilities", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Directly renderable in docs", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_CAPABILITIES_LIST: PromptPart =
  '- Advanced query operators and site scoping\n- Source authority assessment and deduplication\n- Citation capture and canonical URL resolution\n- Rate limiting and polite retrieval\n- Structured output generation with validation' as PromptPart;
