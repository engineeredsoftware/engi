import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode InitializeLSP Try directives for evidence-producing session setup"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "execution_precision", "test": "Is execution precise?", "score": 0.36 },
 *   { "name": "operational_clarity", "test": "Are operations clear?", "score": 0.35 },
 *   { "name": "output_quality", "test": "Is output quality high?", "score": 0.34 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_TRY_DIRECTIVES: PromptPart = 
  'Execute LSP measurement initialization through server process spawning and management, evidence capability handshake negotiation, workspace folder registration, document synchronization setup, diagnostic provider configuration, measurement feature activation, and session-state receipt establishment' as PromptPart;
