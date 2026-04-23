import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission compatibility PromptPart for danger-wall PTRR steps"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "step_clarity", "test": "PTRR steps map directly to Bitcode admission work.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_PTRRSTEPS_LIST: PromptPart =
  `Plan: Identify need, written-asset, AssetPack, proof, evidence, and delivery boundaries that require admission checks
Try: Evaluate those boundaries using traceable repository, external, attachment, and execution evidence
Refine: Remove false positives, isolate unresolved ambiguity, and classify proof gaps without claiming closure
Retry: Return admit, block, or manual-review decision for the next Bitcode phase` as PromptPart;
