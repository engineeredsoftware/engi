/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack discovery PromptPart for converting attachments into Need and AssetPack evidence: agent assetpackdiscoverycomprehendattachments ptrrplan purpose"
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
 * intent: "Bitcode AssetPack discovery PromptPart for converting attachments into Need and AssetPack evidence: agent assetpackdiscoverycomprehendattachments ptrrplan purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_plan_clarity", "test": "Clear plan purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKDISCOVERYCOMPREHENDATTACHMENTS_PTRRPLAN_PURPOSE: PromptPart = 
  'PTRR Plan Step: map provided attachments to Need facts, ambiguity, constraints, acceptance criteria, and AssetPack evidence gaps' as PromptPart;