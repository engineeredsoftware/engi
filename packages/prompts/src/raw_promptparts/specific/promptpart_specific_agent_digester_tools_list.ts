import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * Document Summarization Agent - NLP Technology Stack
 * domain: agent
 * intent: "List Document Summarization agent tools"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIGESTER_TOOLS_LIST: PromptPart = 
  `- documentProcessorEngine: PyMuPDF, python-docx, BeautifulSoup for format parsing and text extraction
- nlpAnalyzerTool: spaCy (en_core_web_lg), NLTK tokenizers for linguistic preprocessing and analysis
- summarizationEngineTool: HuggingFace Transformers (T5-base, PEGASUS-large) for abstractive generation
- entityExtractionTool: spaCy NER, Stanford CoreNLP for named entity recognition and classification
- vectorizationTool: scikit-learn TF-IDF, sentence-transformers for semantic embeddings
- qualityValidatorTool: ROUGE metrics, BERTScore evaluation for summary quality assessment` as PromptPart;