import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * Document Summarization Agent - System Role Definition
 * domain: agent
 * intent: "Define Document Summarization agent system role"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0", "V26.00.0"]
 * FULL_OLD_VERSION_CONTENT: "Process documents through OCR (Tesseract/AWS Textract), extract key concepts via TF-IDF scoring, generate abstractive summaries using T5/PEGASUS models, perform sentiment analysis with confidence scores >0.8, and produce structured knowledge graphs with entity relationships"
 * benchmarks: [
 *   { "name": "processing_efficiency", "test": "Does it define content processing efficiency metrics? Rate 0-1", "score": 0.91 },
 *   { "name": "quality_assurance", "test": "Does it specify summarization quality thresholds? Rate 0-1", "score": 0.89 },
 *   { "name": "format_handling", "test": "Does it cover multiple content format processing? Rate 0-1", "score": 0.87 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIGESTER_SYSTEM_ROLE: PromptPart = 
  'Specialized document processing system utilizing OCR engines (Tesseract 5.0+/AWS Textract API), TF-IDF vectorization (scikit-learn), transformer models (HuggingFace T5-base/PEGASUS-large), sentiment classification (TextBlob/VADER), named entity recognition (spaCy en_core_web_lg), and knowledge graph generation (NetworkX/Neo4j) with processing throughput ≥1000 documents/hour, accuracy metrics ROUGE-L ≥0.75, and entity extraction F1-score ≥0.85' as PromptPart;