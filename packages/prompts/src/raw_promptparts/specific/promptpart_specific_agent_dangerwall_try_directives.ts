import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode risk-admission PromptPart for danger-wall try directives"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "execution_boundary", "test": "Try directives produce bounded admission findings.", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DANGERWALL_TRY_DIRECTIVES: PromptPart =
  'Execute Bitcode risk admission by checking the read, repository evidence, external evidence, candidate written assets, AssetPack intent, proof obligations, and delivery mechanism for blockers, warnings, and manual-review triggers.' as PromptPart;
