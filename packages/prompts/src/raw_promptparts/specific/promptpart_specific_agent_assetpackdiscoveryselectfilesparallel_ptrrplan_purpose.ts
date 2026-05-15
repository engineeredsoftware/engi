/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack discovery PromptPart for selecting source files relevant to Read satisfaction and AssetPack scope: agent assetpackdiscoveryselectfilesparallel ptrrplan purpose"
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
 * intent: "Bitcode AssetPack discovery PromptPart for selecting source files relevant to Read satisfaction and AssetPack scope: agent assetpackdiscoveryselectfilesparallel ptrrplan purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_plan_clarity", "test": "Clear plan purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKDISCOVERYSELECTFILESPARALLEL_PTRRPLAN_PURPOSE: PromptPart = 
  'PTRR Plan Step: map the Read, repository structure, and evidence gaps to candidate source-file search lanes' as PromptPart;