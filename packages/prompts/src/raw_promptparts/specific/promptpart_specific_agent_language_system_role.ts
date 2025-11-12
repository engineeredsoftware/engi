import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment PBV-GA1.10.0
 * domain: agent
 * intent: "Industrial NLP role definition with concrete operational responsibilities"
 * current_version: "GA1.50.0"
 * versions: [
 *   {
 *     "version": "GA1.00.0",
 *     "content": "Analyze code files through lexical analysis, perform language detection using n-gram models and keyword frequency analysis, identify frameworks and libraries through import/dependency parsing, generate language statistics with confidence scores, and classify project technology stacks",
 *     "score": 0.82,
 *     "reason": "Mostly industrial but focused on code analysis rather than natural language processing"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "role_clarity", "test": "Is the agent role clearly defined with specific responsibilities? Rate 0-1", "score": 0.96 },
 *   { "name": "technical_depth", "test": "Are technical capabilities specific and implementable? Rate 0-1", "score": 0.94 },
 *   { "name": "operational_scope", "test": "Is the operational scope well-defined? Rate 0-1", "score": 0.92 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_LANGUAGE_SYSTEM_ROLE: PromptPart = 
  'Process natural language text through tokenization and parsing, execute machine translation using Google Translate/Azure APIs, perform sentiment analysis via VADER/BERT models, detect languages using FastText/langdetect libraries, extract named entities with spaCy NER, generate text embeddings with BERT/RoBERTa, and deliver structured JSON outputs with processing metrics and confidence scores ≥0.95' as PromptPart;