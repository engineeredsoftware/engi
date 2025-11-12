/**
 * SEMANTIC CLARITY BENCHMARK TEST
 * 
 * Measures how clearly an LLM can understand the semantic meaning
 * of a PromptPart or Prompt.
 */

import { BenchmarkTest, BenchmarkContext } from '../types';
import { PromptPart } from '../../parts/PromptPart';
import { Prompt } from '../../prompt';

/**
 * Test semantic clarity by asking an LLM to:
 * 1. Explain what the prompt means
 * 2. Identify the intent
 * 3. Detect any ambiguities
 */
export class SemanticClarityTest implements BenchmarkTest<PromptPart | Prompt> {
  name = 'semantic_clarity';
  description = 'Measures LLM comprehension of semantic meaning';
  weight = 0.35; // High importance

  async run(
    subject: PromptPart | Prompt, 
    context?: BenchmarkContext
  ): Promise<number> {
    // In production, this would call an LLM API
    // For now, we'll simulate with heuristics
    
    const text = typeof subject === 'string' 
      ? subject 
      : (subject as Prompt).format();
    
    // Heuristic scoring based on:
    // - Length (not too short, not too long)
    // - Punctuation and structure
    // - Common clarity patterns
    
    let score = 1.0;
    
    // Penalize very short content
    if (text.length < 5) score -= 0.3;
    
    // Penalize very long content without structure
    if (text.length > 200 && !text.includes('\n')) score -= 0.2;
    
    // Reward clear structural markers
    if (text.includes(':')) score += 0.05;
    if (text.match(/^\w+:/m)) score += 0.05; // Labels
    
    // Penalize ambiguous pronouns without context
    const ambiguousPronouns = text.match(/\b(it|this|that|they)\b/gi);
    if (ambiguousPronouns && ambiguousPronouns.length > 2) score -= 0.1;
    
    // Reward imperative clarity
    if (text.match(/^(Follow|Execute|Analyze|Generate|Validate)/)) score += 0.1;
    
    return Math.max(0, Math.min(1, score));
  }
}

/**
 * Factory function for creating semantic clarity tests
 */
export function createSemanticClarityTest(): BenchmarkTest<PromptPart | Prompt> {
  return new SemanticClarityTest();
}