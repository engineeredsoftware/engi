/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack validation PromptPart for deciding whether written assets are ready to enter Finish: agent assetpackvalidationreadytofinish ptrrplan purpose"
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
 * intent: "Bitcode AssetPack validation PromptPart for deciding whether written assets are ready to enter Finish: agent assetpackvalidationreadytofinish ptrrplan purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_plan_clarity", "test": "Clear plan purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKVALIDATIONREADYTOFINISH_PTRRPLAN_PURPOSE: PromptPart =
  'PTRR Plan Step: analyze validation context and plan the final readiness decision before Finish, including short-circuit and refund evidence when the AssetPack is not ready' as PromptPart;
