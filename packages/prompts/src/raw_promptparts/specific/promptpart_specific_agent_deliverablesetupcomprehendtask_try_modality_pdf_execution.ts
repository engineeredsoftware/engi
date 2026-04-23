import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode retained comprehend-task compatibility PromptPart for canonical comprehend-need asset-pack synthesis: agent deliverablesetupcomprehendtask try modality pdf execution"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained deliverable corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_TRY_MODALITY_PDF_EXECUTION: PromptPart =
  "Execute: extract text where available; OCR scanned pages; identify headings, sections, tables, and code blocks; generate per-section comprehension and overall need-satisfaction summary." as PromptPart;
