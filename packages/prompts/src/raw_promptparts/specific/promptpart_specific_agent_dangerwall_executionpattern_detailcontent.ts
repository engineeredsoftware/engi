import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission compatibility PromptPart for danger-wall execution pattern"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "ptrr_precision", "test": "Execution pattern maps PTRR to Bitcode admission decisions.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_EXECUTIONPATTERN_DETAILCONTENT: PromptPart =
  `BITCODE_RISK_ADMISSION_PTRR - Admit or block the next pipeline phase through bounded evidence:
1. Plan the need, written-asset, AssetPack, proof, and delivery-wrapper checks required for the current run
2. Try concrete risk evaluation against repository evidence, external evidence, attachments, execution state, and requested delivery mechanism
3. Refine false positives, unresolved ambiguity, proof gaps, and scope mismatches without claiming final proof
4. Retry only to produce an admit, block, or manual-review decision for downstream Bitcode owners` as PromptPart;
