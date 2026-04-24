/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode stitching substep for coherent asset-pack result and execution-history reread: assetpackvalidationreadytofinish try substep stitch until complete"
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
 * intent: "Bitcode stitching substep for coherent asset-pack result and execution-history reread: assetpackvalidationreadytofinish try substep stitch until complete"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "agent_specific", "test": "Agent-specific guidance?", "score": 0.96 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKVALIDATIONREADYTOFINISH_TRY_SUBSTEP_STITCH_UNTIL_COMPLETE: PromptPart = 
  'assetpackvalidationreadytofinish try substep stitch until complete: combine partial findings, diffs, validations, and delivery-mechanism details into one coherent asset-pack result that can be reread from execution history.' as PromptPart;