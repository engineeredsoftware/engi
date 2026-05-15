import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode AssetPack tool PromptPart for read-first asset-pack setup and written-asset evidence: tool asset-pack pdfcomprehension doccodetool capabilities addendum"
 * current_version: "0.50.0"
 * versions: [
 *   { "version": "V26.20.0", "score": 0.50, "content": "Understands PDFs", "reason": "Insufficient detail on extraction methods" }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Describes OCR + text extraction?", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Useful at runtime for guidance?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_ASSET_PACK_PDFCOMPREHENSION_DOCCODETOOL_CAPABILITIES_ADDENDUM: PromptPart =
  'Focus: PDF/document comprehension; supports text extraction, OCR for scanned docs, section/heading detection, tables parsing, and task-relevance summarization' as PromptPart;
