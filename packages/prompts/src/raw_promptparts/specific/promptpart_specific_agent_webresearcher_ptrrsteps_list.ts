import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List the PTRR steps for documentation"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Enumerates steps correctly", "score": 0.46 },
 *   { "name": "implementation_ready", "test": "Documentation-ready list format", "score": 0.46 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PTRRSTEPS_LIST: PromptPart =
  '- Plan\n- Try\n- Refine\n- Retry' as PromptPart;
