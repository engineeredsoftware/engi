#!/usr/bin/env node

/**
 * BENCHMARK CLI
 * 
 * Command-line tool to run benchmarks on PromptParts and Prompts
 * 
 * Usage:
 *   npm run benchmark <file-path>
 *   npm run benchmark:all
 *   npm run benchmark:evolve <file-path>
 */

import { BenchmarkRunner, EvolutionHandler, LLMProvider } from './runner';
import { glob } from 'glob';
import * as fs from 'fs/promises';
import * as path from 'path';
import { parseArgs } from 'util';

// ==================== MOCK LLM PROVIDER ====================

class MockLLMProvider implements LLMProvider {
  name = 'mock';
  model = 'mock-gpt-4';
  
  async generate(prompt: string, options?: any): Promise<string> {
    // In production, this would call OpenAI/Anthropic/etc
    console.log(`[MOCK LLM] Generating response for prompt length: ${prompt.length}`);
    return "This is a mock response. In production, this would call a real LLM.";
  }
  
  async score(prompt: string, options?: any): Promise<number> {
    // Mock scoring - in production would use real LLM
    console.log(`[MOCK LLM] Scoring prompt...`);
    
    // Simulate different scores based on content
    if (prompt.includes('You are')) return 0.95;
    if (prompt.includes('semantic clarity')) return 0.88;
    if (prompt.includes('token efficiency')) return 0.92;
    if (prompt.includes('model stability')) return 0.90;
    
    return 0.75 + Math.random() * 0.20; // Random 0.75-0.95
  }
}

// ==================== REAL LLM PROVIDERS ====================

class OpenAIProvider implements LLMProvider {
  name = 'openai';
  model: string;
  
  constructor(
    private apiKey: string,
    model: string = 'gpt-4'
  ) {
    this.model = model;
  }
  
  async generate(prompt: string, options?: any): Promise<string> {
    // Implementation would use OpenAI SDK
    throw new Error('OpenAI provider not implemented - use mock for now');
  }
  
  async score(prompt: string, options?: any): Promise<number> {
    // Would parse numeric response from OpenAI
    throw new Error('OpenAI provider not implemented - use mock for now');
  }
}

// ==================== CLI IMPLEMENTATION ====================

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  // Initialize LLM provider
  const llmProvider = process.env.OPENAI_API_KEY 
    ? new OpenAIProvider(process.env.OPENAI_API_KEY)
    : new MockLLMProvider();
    
  const projectRoot = path.resolve(__dirname, '../../../../..');
  const runner = new BenchmarkRunner(llmProvider, projectRoot);
  const evolutionHandler = new EvolutionHandler(runner);
  
  switch (command) {
    case 'benchmark':
      await benchmarkFile(args[1], runner);
      break;
      
    case 'benchmark:all':
      await benchmarkAll(runner);
      break;
      
    case 'benchmark:evolve':
      await benchmarkAndEvolve(args[1], runner, evolutionHandler);
      break;
      
    case 'benchmark:report':
      await generateReport();
      break;
      
    default:
      console.log(`
Engi Prompt Benchmark CLI

Commands:
  benchmark <file>      Run benchmarks on a specific file
  benchmark:all         Run benchmarks on all prompt files
  benchmark:evolve      Run benchmarks and evolve if needed
  benchmark:report      Generate benchmark report

Environment:
  OPENAI_API_KEY       Set to use real OpenAI API (otherwise uses mock)

Examples:
  npm run benchmark src/raw_promptparts/generic/promptpart_generic_formatting_youare.ts
  npm run benchmark:all
  OPENAI_API_KEY=YOUR_OPENAI_API_KEY npm run benchmark:evolve src/raw_promptparts/specific/my_prompt.ts
`);
  }
}

async function benchmarkFile(filePath: string, runner: BenchmarkRunner) {
  if (!filePath) {
    console.error('Please provide a file path');
    process.exit(1);
  }
  
  const absolutePath = path.resolve(filePath);
  console.log(`Benchmarking ${absolutePath}...`);
  
  try {
    const content = await fs.readFile(absolutePath, 'utf-8');
    
    // Extract metadata from doc-comment
    const metadata = extractMetadata(content);
    if (!metadata) {
      console.error('No valid doc-comment found in file');
      process.exit(1);
    }
    
    // Determine if it's a PromptPart or Prompt
    const isPromptPart = content.includes('@doc-comment-developing-promptpartdevelopment');
    
    // Run benchmarks
    const results = isPromptPart
      ? await runner.benchmarkPromptPart(absolutePath, extractPromptPart(content), metadata as any)
      : await runner.benchmarkPrompt(absolutePath, await loadPrompt(absolutePath), metadata as any);
    
    // Display results
    console.log('\nBenchmark Results:');
    console.log(`  Intent Match: ${(results.intent.score * 100).toFixed(0)}%`);
    console.log(`  Semantic Clarity: ${(results.semantic_clarity.score * 100).toFixed(0)}%`);
    console.log(`  Token Efficiency: ${(results.token_efficiency.score * 100).toFixed(0)}%`);
    console.log(`  Model Stability: ${(results.model_stability.score * 100).toFixed(0)}%`);
    
    if (results.custom) {
      console.log('\nCustom Benchmarks:');
      for (const [name, score] of Object.entries(results.custom)) {
        console.log(`  ${name}: ${(score.score * 100).toFixed(0)}%`);
      }
    }
    
    // Update file with results
    await runner.updateFileWithBenchmarks(absolutePath, metadata as any, results);
    console.log('\n✅ File updated with benchmark results');
    
  } catch (error) {
    console.error('Error benchmarking file:', error);
    process.exit(1);
  }
}

async function benchmarkAll(runner: BenchmarkRunner) {
  console.log('Finding all prompt files...');
  
  const patterns = [
    'src/raw_promptparts/generic/promptpart_*.ts',
    'src/raw_promptparts/specific/promptpart_*.ts',
    'packages/*/src/**/*Prompt.ts'
  ];
  
  const files: string[] = [];
  for (const pattern of patterns) {
    const matches = await glob(pattern, { cwd: process.cwd() });
    files.push(...matches);
  }
  
  console.log(`Found ${files.length} files to benchmark\n`);
  
  for (const file of files) {
    await benchmarkFile(file, runner);
    console.log('---\n');
  }
  
  console.log(`✅ Benchmarked ${files.length} files`);
}

async function benchmarkAndEvolve(
  filePath: string, 
  runner: BenchmarkRunner,
  evolutionHandler: EvolutionHandler
) {
  if (!filePath) {
    console.error('Please provide a file path');
    process.exit(1);
  }
  
  // First run benchmarks
  await benchmarkFile(filePath, runner);
  
  // Check if evolution is needed
  const content = await fs.readFile(path.resolve(filePath), 'utf-8');
  const metadata = extractMetadata(content);
  const currentVersion = metadata?.versions?.find(v => v.current);
  
  if (currentVersion?.benchmarks && evolutionHandler.needsEvolution(currentVersion.benchmarks)) {
    console.log('\n⚠️  This prompt needs evolution (quality below threshold)');
    
    // Generate candidates
    const candidates = await evolutionHandler.generateCandidates(
      extractPromptPart(content),
      metadata as any,
      currentVersion.benchmarks
    );
    
    if (candidates.length > 0) {
      console.log(`\nGenerated ${candidates.length} evolution candidates:`);
      candidates.forEach((c, i) => console.log(`  ${i + 1}. ${c}`));
      
      // In production, would benchmark each candidate and pick the best
    }
  } else {
    console.log('\n✅ Prompt quality is above threshold - no evolution needed');
  }
}

async function generateReport() {
  console.log('Generating benchmark report...');
  
  // Find all files with benchmarks
  const files = await glob('src/raw_promptparts/**/*.ts', { cwd: process.cwd() });
  
  const report: any[] = [];
  
  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8');
    const metadata = extractMetadata(content);
    
    if (metadata?.versions) {
      const current = metadata.versions.find(v => v.current);
      if (current?.benchmarks) {
        const avgScore = calculateAverageScore(current.benchmarks);
        report.push({
          file,
          version: current.version,
          avgScore,
          benchmarks: current.benchmarks
        });
      }
    }
  }
  
  // Sort by score
  report.sort((a, b) => a.avgScore - b.avgScore);
  
  console.log('\n📊 Benchmark Report\n');
  console.log('Lowest Scoring Prompts:');
  report.slice(0, 10).forEach(r => {
    console.log(`  ${(r.avgScore * 100).toFixed(0)}% - ${r.file}`);
  });
  
  console.log('\nHighest Scoring Prompts:');
  report.slice(-10).reverse().forEach(r => {
    console.log(`  ${(r.avgScore * 100).toFixed(0)}% - ${r.file}`);
  });
  
  const overallAvg = report.reduce((sum, r) => sum + r.avgScore, 0) / report.length;
  console.log(`\nOverall Average: ${(overallAvg * 100).toFixed(0)}%`);
  console.log(`Total Benchmarked: ${report.length} files`);
}

// ==================== UTILITY FUNCTIONS ====================

function extractMetadata(content: string): any {
  // Simplified metadata extraction - in production would use proper parser
  const docCommentMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
  if (!docCommentMatch) return null;
  
  const docComment = docCommentMatch[1];
  
  // Extract fields
  const metadata: any = {};
  
  // Extract domain
  const domainMatch = docComment.match(/domain:\s*(\w+)/);
  if (domainMatch) metadata.domain = domainMatch[1];
  
  // Extract intent
  const intentMatch = docComment.match(/intent:\s*"([^"]+)"/);
  if (intentMatch) metadata.intent = intentMatch[1];
  
  // Extract current_version
  const versionMatch = docComment.match(/current_version:\s*"([^"]+)"/);
  if (versionMatch) metadata.current_version = versionMatch[1];
  
  // Extract versions array (simplified)
  const versionsMatch = docComment.match(/versions:\s*\[([\s\S]*?)\]/);
  if (versionsMatch) {
    try {
      metadata.versions = JSON.parse(`[${versionsMatch[1]}]`);
    } catch (e) {
      metadata.versions = [];
    }
  }
  
  return metadata;
}

function extractPromptPart(content: string): string {
  const match = content.match(/export const \w+ = ['"`](.+?)['"`]/s);
  return match ? match[1] : '';
}

async function loadPrompt(filePath: string): Promise<any> {
  // In production, would dynamically import and instantiate
  return { format: () => '[Mock Prompt Content]' };
}

function calculateAverageScore(benchmarks: any): number {
  const scores = [
    benchmarks.intent?.score || 0,
    benchmarks.semantic_clarity?.score || 0,
    benchmarks.token_efficiency?.score || 0,
    benchmarks.model_stability?.score || 0
  ];
  
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

// ==================== RUN CLI ====================

if (require.main === module) {
  main().catch(console.error);
}
