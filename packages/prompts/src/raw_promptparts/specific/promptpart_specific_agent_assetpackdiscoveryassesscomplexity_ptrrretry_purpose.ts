/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: auto
 * intent: "Bitcode AssetPack discovery PromptPart for need discovery, proof evidence, and AssetPack planning: agent assetpackdiscoveryassesscomplexity ptrrretry purpose"
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
 * intent: "Bitcode AssetPack discovery PromptPart for need discovery, proof evidence, and AssetPack planning: agent assetpackdiscoveryassesscomplexity ptrrretry purpose"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_retry_clarity", "test": "Clear retry purpose?", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKDISCOVERYASSESSCOMPLEXITY_PTRRRETRY_PURPOSE: PromptPart = 
  'PTRR Retry Step: recover missing complexity inputs before AssetPack fitting or execution admission' as PromptPart;