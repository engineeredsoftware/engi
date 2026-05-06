/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode PromptPart for asset-pack need LSP measurement: PTRR retry purpose"
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
 * intent: "Bitcode PromptPart for asset-pack need LSP measurement: PTRR retry purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_retry_clarity", "test": "Clear retry purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPINITIALIZELSP_PTRRRETRY_PURPOSE: PromptPart = 
  'PTRR Retry Step: recover LSP measurement setup with explicit fallback evidence and no false guarantee of complete AssetPack fit' as PromptPart;
