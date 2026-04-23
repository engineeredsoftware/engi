import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP core purpose for Need and AssetPack measurement"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Correctly describes LSP setup?", "score": 0.95 },
 *   { "name": "completeness", "test": "Covers all LSP aspects?", "score": 0.93 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_PURPOSE_CORESTATEMENT: PromptPart = 
  'Initialize Language Server Protocol for Bitcode static Need measurement, configure workspace evidence capabilities, and establish semantic proof-replay connections' as PromptPart;
