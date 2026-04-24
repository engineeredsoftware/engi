import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * Document Summarization Agent - Processing Workflow Steps
 * domain: agent
 * intent: "Define Document Summarization agent PTRR processing workflow"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * FULL_OLD_VERSION_CONTENT: "Plan: Analyze information sources and establish processing priorities\nTry: Execute multi-source synthesis with semantic understanding\nRefine: Validate insights and enhance relationship mapping\nRetry: Deepen analysis with intelligent pattern recognition and advanced synthesis"
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIGESTER_PTRRSTEPS_LIST: PromptPart = 
  `Plan: Document ingestion analysis - file format detection, OCR preprocessing, text extraction pipeline setup
Try: Execute NLP processing - tokenization, sentence segmentation, named entity recognition, sentiment classification
Refine: Summary optimization - coherence scoring via ROUGE metrics, redundancy elimination, length optimization
Retry: Quality enhancement - readability analysis, factual consistency checks, abstractive refinement using BERT/T5 models` as PromptPart;