import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List Document Processor agent tools"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     version: "V26.00.0",
 *     score: 0.40,
 *     content: "documentParserEngine: Multi-format document processing...semanticExtractorTool: Consciousness-aware content understanding and analysis",
 *     reason: "Non-industrial: 'Consciousness-aware' (metaphysical), vague terms like 'Advanced' without specifics"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Does it use concrete technical terms?", "score": 0.92 },
 *   { "name": "tool_specificity", "test": "Does it describe specific tool capabilities?", "score": 0.91 },
 *   { "name": "implementation_ready", "test": "Can developers implement these tools?", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DOCUMENTPROCESSOR_TOOLS_LIST: PromptPart = 
  `- documentParserEngine: Apache Tika for 1000+ file formats, PDFBox for PDF parsing, python-docx for DOCX
- ocrProcessingTool: Tesseract 4.0+ with LSTM engine, confidence scoring, multi-language support (100+ languages)
- structureAnalyzerTool: Table detection via Camelot/tabula-py, form field extraction with OpenCV contour detection
- semanticExtractorTool: spaCy NER for entity extraction, BERT embeddings for semantic similarity, topic modeling via LDA
- metadataEnricherTool: EXIF data extraction, Dublin Core metadata mapping, document fingerprinting with SHA-256
- validationEngineTool: JSON Schema validation, accuracy metrics calculation (precision/recall), output format verification` as PromptPart;