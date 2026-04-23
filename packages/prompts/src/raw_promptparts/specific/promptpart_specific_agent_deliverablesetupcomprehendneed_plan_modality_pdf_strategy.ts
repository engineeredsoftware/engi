import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode canonical comprehend-need PromptPart for need-first written-asset / asset-pack synthesis: agent deliverablesetupcomprehendneed plan modality pdf strategy"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_semantics", "test": "Uses need-first asset-pack written-asset language", "score": 0.95 },
 *   { "name": "compatibility_ready", "test": "Retained deliverable corridor can consume it without semantic drift", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDNEED_PLAN_MODALITY_PDF_STRATEGY: PromptPart =
  "PDFs: extract text where available; apply OCR on scanned pages. Detect headings, sections, tables, and code blocks. Produce per-section summaries and a global relevance summary for need satisfaction and written-asset synthesis." as PromptPart;
