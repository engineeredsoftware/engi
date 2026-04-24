/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack Finish PromptPart for delivery-evidence finalization over validated Need-satisfaction AssetPack written assets: agent assetpackfinishfinalizedeliveryevidence ptrrretry purpose"
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
 * intent: "Bitcode AssetPack Finish PromptPart for delivery-evidence finalization over validated Need-satisfaction AssetPack written assets: agent assetpackfinishfinalizedeliveryevidence ptrrretry purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_retry_clarity", "test": "Clear retry purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKFINISHFINALIZEDELIVERYEVIDENCE_PTRRRETRY_PURPOSE: PromptPart =
  'PTRR Retry Step: ensure completion for finalizing Finish delivery evidence for validated Need-satisfaction AssetPack written assets with metrics and confirmation' as PromptPart;
