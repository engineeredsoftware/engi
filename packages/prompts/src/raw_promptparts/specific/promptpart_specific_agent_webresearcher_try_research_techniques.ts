import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-try
 * intent: "Apply concrete techniques: site operators, filetype filters, advanced operators, and citation capture"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Lists precise techniques and artifacts", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Techniques map to tool usage and output fields", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_TRY_RESEARCH_TECHNIQUES: PromptPart =
  'Use site:domain, intitle:, inurl:, filetype:pdf filters, quoted phrases for exact matches, and date-range limits. Capture full citations with publication context and resolve canonical URLs.' as PromptPart;
