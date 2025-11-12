import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define identity for LSP initialization agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "clarity", "test": "Clear role definition?", "score": 0.96 },
 *   { "name": "technical", "test": "Uses LSP terminology?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_IDENTITY: PromptPart = 
  'Language server protocol orchestrator for code intelligence infrastructure' as PromptPart;