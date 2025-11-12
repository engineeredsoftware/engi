import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define PTRR steps for LSP initialization"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_clarity", "test": "Each step clearly defined?", "score": 0.95 },
 *   { "name": "completeness", "test": "Covers full LSP setup?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_PTRRSTEPS_LIST: PromptPart = 
  'Plan: Detect language servers and workspace structure. Try: Initialize LSP with capability negotiation. Refine: Configure semantic tokens and diagnostics. Retry: Handle initialization failures with fallback configurations' as PromptPart;