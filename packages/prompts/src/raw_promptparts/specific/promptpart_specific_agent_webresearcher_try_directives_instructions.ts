import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-try
 * intent: "Execute research using planned queries, capture metadata, and respect constraints"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Operational directives are concrete and bounded", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "PromptPart content is directly usable", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_TRY_DIRECTIVES_INSTRUCTIONS: PromptPart =
  'Run prioritized queries with site and operator constraints. Respect robots and rate limits. Capture title, URL, snippet, publish date, author, and domain trust indicators for each candidate result.' as PromptPart;
