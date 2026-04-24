import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Document Processor agent PTRR steps"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     version: "V26.00.0",
 *     score: 0.65,
 *     content: "Plan: Analyze document structure...Retry: Optimize processing with advanced intelligent pattern recognition",
 *     reason: "Contains vague terms like 'advanced intelligent pattern recognition'"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.91 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.90 },
 *   { "name": "ptrr_clarity", "test": "Does each phase have clear technical actions?", "score": 0.89 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_PTRRSTEPS_LIST: PromptPart = 
  `Plan: Detect file format via magic bytes, analyze document structure using DOM/PDF object trees
Try: Extract content with format-specific parsers (PDFBox, python-docx), apply OCR with Tesseract
Refine: Validate extraction accuracy against ground truth, enhance with NLP entity extraction (spaCy)
Retry: Apply ML-based layout analysis (LayoutLM), regex pattern matching for structured data extraction` as PromptPart;