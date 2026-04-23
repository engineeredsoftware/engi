import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Compatibility PromptPart for the former deliverables setup comprehend-task refine unification guidance; content is canonical comprehend-need semantics."
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained deliverable corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_REFINE_UNIFICATION_GUIDANCE: PromptPart =
  "Unify insights across modalities; ensure final fields include need_satisfaction_criteria, comprehended_multimodal_attachments, and written_asset_types, while also mirroring compatibility dod_analysis and deliverable_types for retained downstream callers." as PromptPart;
