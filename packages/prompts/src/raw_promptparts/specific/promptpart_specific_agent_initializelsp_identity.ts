import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP identity for static Read measurement setup"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "clarity", "test": "Clear role definition?", "score": 0.96 },
 *   { "name": "technical", "test": "Uses LSP terminology?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_IDENTITY: PromptPart = 
  'Language Server Protocol orchestrator for Bitcode static Read measurement, AssetPack fit evidence, and proof replay receipts' as PromptPart;
