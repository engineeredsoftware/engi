import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of LSP initialization agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Correctly describes LSP setup?", "score": 0.95 },
 *   { "name": "completeness", "test": "Covers all LSP aspects?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_PURPOSE_CORESTATEMENT: PromptPart = 
  'Initialize language server protocol for code intelligence, configure workspace capabilities, establish semantic analysis connections' as PromptPart;