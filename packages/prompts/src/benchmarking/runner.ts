/**
 * BENCHMARK RUNNER INFRASTRUCTURE
 * 
 * This module handles:
 * 1. Running benchmarks against LLMs
 * 2. Updating doc-comments with results
 * 3. Managing version evolution
 */

import { PromptPart } from '../parts/PromptPart';
import { Prompt } from '../prompt';
import { 
  DevelopingVersionEntry, 
  DevelopingBenchmarkResults, 
  DevelopingBenchmarkScore,
  DevelopingBenchmarkDefinition,
  DevelopingPromptPartDocComment,
  DevelopingPromptDocComment
} from '../developing/doc-comment-developing-v2';
import * as fs from 'fs/promises';
import * as path from 'path';

// ==================== LLM INTERFACE ====================

export interface LLMProvider {
  name: string;
  model: string;
  
  /**
   * Send a prompt and get a response
   */
  generate(prompt: string, options?: {
    temperature?: number;
    max_tokens?: number;
    system?: string;
  }): Promise<string>;
  
  /**
   * Send a prompt expecting a numeric score
   */
  score(prompt: string, options?: {
    min?: number;
    max?: number;
    system?: string;
  }): Promise<number>;
}

// ==================== BENCHMARK RUNNER ====================

export class BenchmarkRunner {
  constructor(
    private llm: LLMProvider,
    private projectRoot: string
  ) {}
  
  /**
   * Run all benchmarks for a PromptPart
   */
  async benchmarkPromptPart(
    filePath: string,
    content: PromptPart,
    metadata: DevelopingPromptPartDocComment
  ): Promise<DevelopingBenchmarkResults> {
    console.log(`Benchmarking ${filePath}...`);
    
    const results: DevelopingBenchmarkResults = {
      intent: await this.runIntentBenchmark(content, metadata.intent),
      semantic_clarity: await this.runSemanticClarityBenchmark(content),
      token_efficiency: await this.runTokenEfficiencyBenchmark(content),
      model_stability: await this.runModelStabilityBenchmark(content)
    };
    
    // Run custom benchmarks if defined
    if (metadata.benchmarks) {
      results.custom = {};
      for (const benchmark of metadata.benchmarks) {
        results.custom[benchmark.name] = await this.runCustomBenchmark(content, benchmark);
      }
    }
    
    return results;
  }
  
  /**
   * Run all benchmarks for a Prompt
   */
  async benchmarkPrompt(
    filePath: string,
    prompt: Prompt,
    metadata: DevelopingPromptDocComment
  ): Promise<DevelopingBenchmarkResults> {
    const formatted = prompt.format();
    console.log(`Benchmarking Prompt ${filePath}...`);
    
    const results: DevelopingBenchmarkResults = {
      intent: await this.runIntentBenchmark(formatted, metadata.intent),
      semantic_clarity: await this.runSemanticClarityBenchmark(formatted),
      token_efficiency: await this.runTokenEfficiencyBenchmark(formatted),
      model_stability: await this.runModelStabilityBenchmark(formatted)
    };
    
    // Additional benchmarks for Prompts
    if (results.custom === undefined) results.custom = {};
    results.custom.task_success = await this.runTaskSuccessBenchmark(formatted, metadata.intent);
    results.custom.response_quality = await this.runResponseQualityBenchmark(formatted);
    
    // Run user-defined custom benchmarks
    if (metadata.benchmarks) {
      for (const benchmark of metadata.benchmarks) {
        results.custom[benchmark.name] = await this.runCustomBenchmark(formatted, benchmark);
      }
    }
    
    return results;
  }
  
  // ==================== STANDARD BENCHMARKS ====================
  
  private async runIntentBenchmark(content: string, intent: string): Promise<DevelopingBenchmarkScore> {
    const prompt = `
Given this prompt part: "${content}"
And this intended purpose: "${intent}"

Rate how well the prompt part achieves its intended purpose on a scale of 0 to 1, where:
- 0 means it completely fails to match the intent
- 0.5 means it partially matches the intent
- 1 means it perfectly matches the intent

Respond with only a number between 0 and 1.`;

    const score = await this.llm.score(prompt, { min: 0, max: 1 });
    
    return {
      score,
      timestamp: new Date().toISOString(),
      model: this.llm.model
    };
  }
  
  private async runSemanticClarityBenchmark(content: string): Promise<DevelopingBenchmarkScore> {
    const prompt = `
Analyze the semantic clarity of this text: "${content}"

Consider:
1. Is the meaning unambiguous?
2. Are the words precise and well-chosen?
3. Is the structure clear?
4. Would an AI model understand this consistently?

Rate the semantic clarity from 0 to 1, where:
- 0 = Completely unclear or ambiguous
- 0.5 = Somewhat clear but has ambiguities
- 1 = Crystal clear and unambiguous

Respond with only a number between 0 and 1.`;

    const score = await this.llm.score(prompt, { min: 0, max: 1 });
    
    return {
      score,
      timestamp: new Date().toISOString(),
      model: this.llm.model
    };
  }
  
  private async runTokenEfficiencyBenchmark(content: string): Promise<DevelopingBenchmarkScore> {
    // Simple heuristic for token efficiency
    const tokens = content.split(/\s+/).length;
    const chars = content.length;
    const avgWordLength = chars / tokens;
    
    // Ideal average word length is around 4-6 characters
    let score = 1.0;
    if (avgWordLength < 3) score -= 0.2; // Too many short words
    if (avgWordLength > 8) score -= 0.3; // Words too complex
    if (tokens > 20) score -= 0.1; // Getting lengthy
    if (tokens > 50) score -= 0.2; // Too long
    
    return {
      score: Math.max(0, Math.min(1, score)),
      timestamp: new Date().toISOString(),
      model: 'heuristic',
      details: { tokens, chars, avgWordLength }
    };
  }
  
  private async runModelStabilityBenchmark(content: string): Promise<DevelopingBenchmarkScore> {
    // In production, this would test across multiple models
    // For now, we'll simulate with temperature variation
    const interpretations: string[] = [];
    
    for (let i = 0; i < 3; i++) {
      const prompt = `Explain what this means: "${content}"`;
      const response = await this.llm.generate(prompt, { 
        temperature: 0.1 + (i * 0.3),
        max_tokens: 100 
      });
      interpretations.push(response);
    }
    
    // Check consistency (simplified - just check if key words appear in all)
    const keywords = content.toLowerCase().split(/\s+/);
    let consistentKeywords = 0;
    
    for (const keyword of keywords) {
      if (keyword.length > 3 && interpretations.every(i => i.toLowerCase().includes(keyword))) {
        consistentKeywords++;
      }
    }
    
    const score = keywords.length > 0 ? consistentKeywords / keywords.length : 0.5;
    
    return {
      score: Math.min(1, score + 0.3), // Baseline bonus
      timestamp: new Date().toISOString(),
      model: this.llm.model,
      details: { interpretations }
    };
  }
  
  // ==================== PROMPT-SPECIFIC BENCHMARKS ====================
  
  private async runTaskSuccessBenchmark(content: string, intent: string): Promise<DevelopingBenchmarkScore> {
    const prompt = `
Given this complete prompt:
"${content}"

And its intended purpose: "${intent}"

Rate how likely this prompt is to successfully achieve its intended task (0-1):
- 0 = Will definitely fail
- 0.5 = Might work sometimes
- 1 = Will reliably succeed

Consider completeness, clarity, and actionability.
Respond with only a number between 0 and 1.`;

    const score = await this.llm.score(prompt, { min: 0, max: 1 });
    
    return {
      score,
      timestamp: new Date().toISOString(),
      model: this.llm.model
    };
  }
  
  private async runResponseQualityBenchmark(content: string): Promise<DevelopingBenchmarkScore> {
    const prompt = `
If an AI receives this prompt:
"${content}"

Rate the expected quality of responses it would generate (0-1):
- 0 = Responses would be poor quality
- 0.5 = Responses would be adequate
- 1 = Responses would be excellent

Consider if the prompt provides clear direction, context, and constraints.
Respond with only a number between 0 and 1.`;

    const score = await this.llm.score(prompt, { min: 0, max: 1 });
    
    return {
      score,
      timestamp: new Date().toISOString(),
      model: this.llm.model
    };
  }
  
  // ==================== CUSTOM BENCHMARKS ====================
  
  private async runCustomBenchmark(
    content: string, 
    benchmark: DevelopingBenchmarkDefinition
  ): Promise<DevelopingBenchmarkScore> {
    const prompt = benchmark.test.replace('{{content}}', content);
    const score = await this.llm.score(prompt, { min: 0, max: 1 });
    
    return {
      score,
      timestamp: new Date().toISOString(),
      model: this.llm.model
    };
  }
  
  // ==================== FILE OPERATIONS ====================
  
  /**
   * Extract generation number from PBV version
   */
  private extractGeneration(version: string): number {
    const parts = version.split('.');
    return parseInt(parts[0]) || 1;
  }
  
  /**
   * Calculate PBV version from benchmark results
   */
  private calculatePBVVersion(
    generation: number,
    results: DevelopingBenchmarkResults,
    variant: number = 0
  ): string {
    const scores = [
      results.intent.score,
      results.semantic_clarity.score,
      results.token_efficiency.score,
      results.model_stability.score
    ];
    
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const qualityScore = Math.round(averageScore * 100);
    
    return `${generation}.${qualityScore}.${variant}`;
  }
  
  /**
   * Update a file's doc-comment with new benchmark results
   */
  async updateFileWithBenchmarks(
    filePath: string,
    metadata: DevelopingPromptPartDocComment | PromptDocComment,
    results: DevelopingBenchmarkResults
  ): Promise<void> {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Calculate PBV version from results
    const generation = this.extractGeneration(metadata.current_version);
    const pbvVersion = this.calculatePBVVersion(generation, results);
    
    // Create new version entry
    const newVersion: DevelopingVersionEntry = {
      version: pbvVersion,
      content: this.extractContentFromFile(fileContent),
      timestamp: new Date().toISOString(),
      benchmarks: results,
      current: true
    };
    
    // Mark all existing versions as not current
    const updatedVersions = metadata.versions.map(v => ({ ...v, current: false }));
    updatedVersions.push(newVersion);
    
    // Update the doc-comment
    const updatedContent = this.updateDocComment(fileContent, metadata, updatedVersions);
    
    // Write back to file
    await fs.writeFile(filePath, updatedContent, 'utf-8');
    console.log(`Updated ${filePath} with benchmark results`);
  }
  
  private extractContentFromFile(fileContent: string): string {
    // Extract the actual PromptPart/Prompt content after the doc-comment
    const match = fileContent.match(/export const \w+ = ['"`](.+?)['"`]/s);
    if (match) return match[1];
    
    // Try class-based Prompt
    const classMatch = fileContent.match(/export class \w+ extends Prompt/);
    if (classMatch) return '[Prompt Class]';
    
    return '[Unknown Content]';
  }
  
  private updateDocComment(
    fileContent: string,
    metadata: DevelopingPromptPartDocComment | PromptDocComment,
    versions: DevelopingVersionEntry[]
  ): string {
    // This is simplified - in production would use proper AST manipulation
    const docCommentEnd = fileContent.indexOf('*/');
    if (docCommentEnd === -1) return fileContent;
    
    // Build updated versions array string
    const versionsStr = JSON.stringify(versions, null, 2)
      .split('\n')
      .map((line, i) => i === 0 ? ` * versions: ${line}` : ` * ${line}`)
      .join('\n');
    
    // Replace versions in doc-comment
    const pattern = / \* versions: \[[\s\S]*?\]/;
    const beforeComment = fileContent.substring(0, docCommentEnd);
    const afterComment = fileContent.substring(docCommentEnd);
    
    const updatedBefore = beforeComment.replace(pattern, versionsStr);
    
    return updatedBefore + afterComment;
  }
}

// ==================== EVOLUTION HANDLER ====================

export class EvolutionHandler {
  constructor(
    private runner: BenchmarkRunner,
    private qualityThreshold: number = 0.8
  ) {}
  
  /**
   * Check if a prompt needs evolution based on benchmarks
   */
  needsEvolution(results: BenchmarkResults): boolean {
    const scores = [
      results.intent.score,
      results.semantic_clarity.score,
      results.token_efficiency.score,
      results.model_stability.score
    ];
    
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    return avgScore < this.qualityThreshold || scores.some(s => s < 0.7);
  }
  
  /**
   * Generate evolution candidates
   */
  async generateCandidates(
    content: string,
    metadata: DevelopingPromptPartDocComment | PromptDocComment,
    results: DevelopingBenchmarkResults
  ): Promise<string[]> {
    // This would use an LLM to generate improved versions
    console.log(`Generating evolution candidates for low-scoring prompt...`);
    
    const weakestMetric = this.findWeakestMetric(results);
    console.log(`Weakest metric: ${weakestMetric.name} (${weakestMetric.score})`);
    
    // In production, this would call LLM to generate variants
    return [];
  }
  
  private findWeakestMetric(results: BenchmarkResults): { name: string; score: number } {
    const metrics = [
      { name: 'intent', score: results.intent.score },
      { name: 'semantic_clarity', score: results.semantic_clarity.score },
      { name: 'token_efficiency', score: results.token_efficiency.score },
      { name: 'model_stability', score: results.model_stability.score }
    ];
    
    return metrics.reduce((min, curr) => curr.score < min.score ? curr : min);
  }
}