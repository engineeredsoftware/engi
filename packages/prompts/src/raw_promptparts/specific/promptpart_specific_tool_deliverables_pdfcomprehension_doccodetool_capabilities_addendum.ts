import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Deliverables-specific capabilities addendum describing PDF/document comprehension focus"
 * current_version: "0.50.0"
 * versions: [
 *   { "version": "GA1.20.0", "score": 0.50, "content": "Understands PDFs", "reason": "Insufficient detail on extraction methods" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Describes OCR + text extraction?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Useful at runtime for guidance?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DELIVERABLES_PDFCOMPREHENSION_DOCCODETOOL_CAPABILITIES_ADDENDUM: PromptPart =
  'Focus: PDF/document comprehension; supports text extraction, OCR for scanned docs, section/heading detection, tables parsing, and task-relevance summarization' as PromptPart;
