import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Plan step purpose for Digester agent"
 * current_version: "GA1.50.0"
 * versions: []
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIGESTER_PTRRPLAN_PURPOSE: PromptPart = (
  'Plan digest generation strategy: assess existing digest, repository structure, and define processing approach and tool usage.'
) as PromptPart;
