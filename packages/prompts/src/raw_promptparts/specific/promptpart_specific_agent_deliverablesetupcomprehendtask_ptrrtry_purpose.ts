import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Compatibility PromptPart for the former deliverables setup comprehend-task PTRR try purpose; content is canonical comprehend-need semantics."
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained deliverable corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_PTRRTRY_PURPOSE: PromptPart =
  "PTRR Try Step: execute need comprehension by producing the need model, satisfaction criteria, attachment comprehension, and written-asset type candidates with compatibility mirrors." as PromptPart;
