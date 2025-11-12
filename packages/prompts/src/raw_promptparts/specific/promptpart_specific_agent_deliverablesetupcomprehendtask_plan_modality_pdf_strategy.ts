import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Plan step: strategy for PDF/document comprehension (text/OCR/tables/sections)"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "GA1.30.0", "score": 0.50, "content": "Read PDFs.", "reason": "Missing OCR and structure extraction details" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Includes OCR, headings, tables?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Stepwise and specific?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_PLAN_MODALITY_PDF_STRATEGY: PromptPart =
  'PDFs: Extract text where available; apply OCR on scanned pages. Detect headings/sections; extract tables and code blocks. Produce per-section summaries and a global relevance summary to the task/DoD.' as PromptPart;
