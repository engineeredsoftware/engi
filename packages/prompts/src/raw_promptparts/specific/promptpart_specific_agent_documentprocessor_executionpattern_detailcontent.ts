import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Document Processor agent execution pattern"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     version: "GA1.00.0",
 *     score: 0.80,
 *     content: "DOCUMENT_PIPELINE - Processes documents through comprehensive analysis...Semantic analysis with intelligent understanding",
 *     reason: "Mostly industrial but contains vague term 'intelligent understanding'"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.93 },
 *   { "name": "implementation_ready", "test": "Can developers implement this directly?", "score": 0.91 },
 *   { "name": "pipeline_clarity", "test": "Does it define clear processing stages?", "score": 0.92 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `DOCUMENT_PIPELINE - Processes documents through multi-stage extraction pipeline:
1. Format detection using file magic numbers and MIME type validation
2. Content extraction via Apache Tika, OCR with Tesseract (>95% accuracy threshold)
3. Table/form detection using layout analysis (OpenCV) and tabula-py for PDF tables
4. NLP processing with spaCy/NLTK for entity extraction, topic modeling (LDA/BERT)
5. Metadata enrichment using EXIF data, document properties, and Dublin Core standards
6. Output validation against JSON Schema with quality scoring metrics` as PromptPart;