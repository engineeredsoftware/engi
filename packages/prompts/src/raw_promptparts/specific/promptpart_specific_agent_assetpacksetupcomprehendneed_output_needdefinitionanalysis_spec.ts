import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode canonical comprehend-need PromptPart for need-first written-asset / asset-pack synthesis: agent assetpacksetupcomprehendneed output needdefinitionanalysis spec"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "support_ready", "test": "AssetPack setup corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_ASSETPACKSETUPCOMPREHENDNEED_OUTPUT_NEEDDEFINITIONANALYSIS_SPEC: PromptPart =
  "need_definition_analysis: concise analysis of the expressed need covering intent, scope boundaries, implicit requirements, acceptance criteria, and key success conditions; also emit need_satisfaction_criteria for downstream validation." as PromptPart;
