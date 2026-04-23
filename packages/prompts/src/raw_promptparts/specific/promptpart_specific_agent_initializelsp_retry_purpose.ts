import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP Retry purpose for measurement recovery"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "recovery_focus", "test": "Focuses on error recovery?", "score": 0.95 },
 *   { "name": "completeness", "test": "Ensures successful init?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_RETRY_PURPOSE: PromptPart = 
  'Complete LSP measurement initialization with fallback strategies that preserve evidence provenance and replayability' as PromptPart;
