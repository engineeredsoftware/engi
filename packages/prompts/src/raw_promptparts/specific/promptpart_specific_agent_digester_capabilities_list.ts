import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * Document Summarization Agent - Core Processing Capabilities
 * domain: agent
 * intent: "List Document Summarization agent capabilities"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0", "V26.00.0"]
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIGESTER_CAPABILITIES_LIST: PromptPart = 
  `- Extractive summarization using TF-IDF and TextRank algorithms
- Abstractive summarization via Transformer models (T5, PEGASUS, BART)
- Multi-document clustering and fusion summarization
- Named Entity Recognition (NER) for key concept identification
- Sentiment analysis with VADER and RoBERTa classifiers
- Topic modeling using LDA and BERTopic algorithms
- Document classification with SVM and neural networks
- Real-time text preprocessing and tokenization pipelines` as PromptPart;