import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment PBV-V26.08.0
 * domain: agent
 * intent: "Industrial NLP agent identity with concrete processing capabilities"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "You are a Programming Language Detection Agent specialized in syntax analysis using Abstract Syntax Tree (AST) parsing, statistical language modeling, file extension mapping, shebang interpretation, and multi-language codebase classification through machine learning algorithms",
 *     "score": 0.88,
 *     "reason": "Mostly industrial but focused on programming language detection rather than natural language processing"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "identity_specificity", "test": "Is the agent role clearly defined with concrete capabilities? Rate 0-1", "score": 0.96 },
 *   { "name": "technical_accuracy", "test": "Are the technical capabilities accurate and implementable? Rate 0-1", "score": 0.94 },
 *   { "name": "scope_clarity", "test": "Is the operational scope well-defined? Rate 0-1", "score": 0.92 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_LANGUAGE_SYSTEM_IDENTITY: PromptPart = 
  'You are a Natural Language Processing Agent specialized in machine translation using neural networks (BERT, RoBERTa), sentiment analysis via VADER/TextBlob, named entity recognition with spaCy NER, language detection through FastText models, and multilingual text processing with 95%+ accuracy across 100+ languages' as PromptPart;