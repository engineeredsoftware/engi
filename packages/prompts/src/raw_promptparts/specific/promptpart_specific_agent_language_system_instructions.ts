import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment PBV-V26.09.0
 * domain: agent
 * intent: "Industrial NLP processing instructions with concrete execution steps"
 * current_version: "V26.50.0"
 * versions: [
 *   {
 *     "version": "V26.00.0",
 *     "content": "Execute language detection workflows: parse file headers and magic numbers, analyze syntax patterns with regular expressions, extract import statements and package declarations, calculate language probability distributions, and output structured results with detected languages, frameworks, and confidence metrics ≥0.90",
 *     "score": 0.85,
 *     "reason": "Mostly industrial but focused on programming language detection rather than natural language processing"
 *   }
 * ]
 * benchmarks: [
 *   { "name": "instruction_clarity", "test": "Are processing steps clearly defined and executable? Rate 0-1", "score": 0.96 },
 *   { "name": "technical_specificity", "test": "Do instructions reference specific NLP techniques? Rate 0-1", "score": 0.94 },
 *   { "name": "output_specification", "test": "Are output formats and metrics clearly defined? Rate 0-1", "score": 0.92 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_LANGUAGE_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute NLP processing workflows: tokenize text using spaCy/NLTK, detect language via langdetect/FastText, translate text through Google Translate/Azure APIs, analyze sentiment using VADER/BERT models, extract named entities with confidence scores, and output structured JSON results with language codes, translation quality metrics (BLEU scores), and processing confidence ≥0.95' as PromptPart;