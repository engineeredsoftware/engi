/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode PromptPart for asset-pack need LSP measurement: tools available"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode PromptPart for asset-pack need LSP measurement: tools available"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "tools_available_clarity", "test": "Clear tools available?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPINITIALIZELSP_TOOLS_AVAILABLE: PromptPart = 
  'Available tools: file system measurement inputs, LSP static measurement tools, repository context utilities, validation utilities, parallel execution framework, state management, and recovery with provenance' as PromptPart;
