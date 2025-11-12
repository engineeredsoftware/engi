import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Try step: execution details for PDF/document comprehension"
 * current_version: "GA1.50.0"
 * versions: [
 *   { "version": "GA1.30.0", "score": 0.50, "content": "Parse PDF.", "reason": "Missing OCR fallback and structure extraction details" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Mentions OCR, sections, tables?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Actionable steps?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DELIVERABLESETUPCOMPREHENDTASK_TRY_MODALITY_PDF_EXECUTION: PromptPart =
  'Execute: extract text where available; OCR scanned pages; identify headings/sections; parse tables/code blocks; generate per-section comprehension and overall summary.' as PromptPart;
