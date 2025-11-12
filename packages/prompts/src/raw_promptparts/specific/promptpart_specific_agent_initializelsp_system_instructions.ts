import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Initialize LSP agent system instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "instruction_completeness", "test": "Do instructions cover all aspects?", "score": 0.39 },
 *   { "name": "technical_precision", "test": "Are technical instructions precise?", "score": 0.38 },
 *   { "name": "workflow_clarity", "test": "Is the workflow clear?", "score": 0.37 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_INITIALIZELSP_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Initialize LSP by: detecting project languages and frameworks, configuring language server executables and parameters, establishing protocol connections with proper capabilities, negotiating feature sets and client capabilities, setting up workspace folders and file watchers, enabling diagnostics and code intelligence features, maintaining session state and handling reconnections' as PromptPart;