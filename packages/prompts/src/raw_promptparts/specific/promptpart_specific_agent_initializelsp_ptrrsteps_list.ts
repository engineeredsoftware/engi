import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP PTRR steps for measurement session setup"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_clarity", "test": "Each step clearly defined?", "score": 0.95 },
 *   { "name": "completeness", "test": "Covers full LSP setup?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_PTRRSTEPS_LIST: PromptPart = 
  'Plan: detect language servers and workspace evidence structure. Try: initialize LSP with measurement capability negotiation. Refine: configure semantic tokens and diagnostic evidence. Retry: recover measurement setup with proofable fallback configurations' as PromptPart;
