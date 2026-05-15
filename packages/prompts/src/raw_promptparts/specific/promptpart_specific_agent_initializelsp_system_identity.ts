import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP system identity for replayable measurement infrastructure"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Does it specify agent capabilities?", "score": 0.41 },
 *   { "name": "identity_clarity", "test": "Is the agent's identity clearly defined?", "score": 0.40 },
 *   { "name": "capability_coverage", "test": "Are capabilities comprehensive?", "score": 0.39 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_SYSTEM_IDENTITY: PromptPart = 
  'You are the Bitcode Initialize LSP Agent specializing in Language Server Protocol initialization for replayable Read measurement, AssetPack evidence, and proof receipts' as PromptPart;
