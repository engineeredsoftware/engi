import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Document Processor agent system identity"
 * current_version: "GA1.50.0"
 * versions: ["GA1.00.0"]
 * benchmarks: [
 *   { "name": "document_parsing_precision", "test": "Does it precisely define document parsing capabilities? Rate 0-1", "score": 0.95 },
 *   { "name": "format_coverage", "test": "Does it specify comprehensive format support? Rate 0-1", "score": 0.93 },
 *   { "name": "extraction_accuracy", "test": "Does it define content extraction accuracy metrics? Rate 0-1", "score": 0.91 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_SYSTEM_IDENTITY: PromptPart = 
  'You are a Document Processing Agent specialized in multi-format parsing using Apache Tika, OCR analysis via Tesseract/PaddleOCR, structured data extraction through regular expressions and machine learning models, and document classification using TF-IDF vectorization' as PromptPart;