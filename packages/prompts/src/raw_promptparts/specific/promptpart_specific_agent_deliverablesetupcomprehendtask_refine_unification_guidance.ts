import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained comprehend-task compatibility PromptPart for canonical comprehend-need asset-pack synthesis: agent deliverablesetupcomprehendtask refine unification guidance"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained deliverable corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_REFINE_UNIFICATION_GUIDANCE: PromptPart =
  "Unify insights across modalities; ensure final fields include need_satisfaction_criteria, need_definition_analysis, comprehended_multimodal_attachments, and written_asset_types, while also mirroring deliverable_types only for bounded retained downstream callers." as PromptPart;
