import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * Document Summarization Agent - NLP Processing Pipeline
 * domain: agent
 * intent: "Define Document Summarization agent execution pattern"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * FULL_OLD_VERSION_CONTENT: "SYNTHESIS_PROCESSING - Processes information through comprehensive analysis and synthesis:\n1. Multi-source information ingestion with format normalization\n2. Semantic analysis and concept extraction with intelligence awareness\n3. Cross-reference analysis and relationship mapping\n4. Structured insight synthesis with priority ranking\n5. Knowledge graph construction and validation\n6. Actionable recommendation generation with confidence scoring"
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIGESTER_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `DOCUMENT_SUMMARIZATION_PIPELINE - Processes documents through standardized NLP workflows:
1. Document preprocessing: OCR/text extraction, encoding detection (UTF-8/ASCII), format parsing (PDF/DOCX/HTML)
2. Text segmentation: sentence boundary detection using spaCy, paragraph chunking, section identification
3. Feature extraction: TF-IDF vectorization, BERT embeddings (768-dim), named entity recognition (PERSON/ORG/LOC)
4. Summarization generation: extractive ranking via TextRank, abstractive synthesis using T5-base transformer
5. Quality validation: ROUGE-L scoring (threshold ≥0.3), factual consistency checks, length constraints (100-300 words)
6. Output formatting: structured JSON with metadata, confidence scores (0.0-1.0), entity mappings, source citations` as PromptPart;