import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PTRR methodology steps for discovery codebase analysis agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses specific technical terms?", "score": 0.95 },
 *   { "name": "implementation_ready", "test": "Can developers implement?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESDISCOVERYCODEBASEANALYSIS_PTRRSTEPS_LIST: PromptPart = 
  `PTRR methodology:
- Plan: Chunk repository into manageable file sets based on directories and modules
- Try: Parse files using AST analysis, extract imports, identify patterns
- Refine: Resolve ambiguous dependencies, classify edge cases, verify relevance scores
- Retry: Handle parsing failures, recover from timeouts, use fallback analysis methods` as PromptPart;