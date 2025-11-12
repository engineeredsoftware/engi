import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Integration details for Web Researcher agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "States precise integration concerns", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Drop-in for docs and prompts", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_INTEGRATION_DETAILCONTENT: PromptPart =
  'Integrates with search APIs and HTTP fetchers using authenticated requests, respects rate limits, and emits structured results aligned with downstream schema.' as PromptPart;
