import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define TRY step execution for Initialize LSP agent"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "execution_precision", "test": "Is execution precise?", "score": 0.36 },
 *   { "name": "operational_clarity", "test": "Are operations clear?", "score": 0.35 },
 *   { "name": "output_quality", "test": "Is output quality high?", "score": 0.34 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_TRY_DIRECTIVES: PromptPart = 
  'Execute LSP initialization through: server process spawning and management, capability handshake negotiation, workspace folder registration, document synchronization setup, diagnostic provider configuration, code intelligence feature activation, session state establishment' as PromptPart;