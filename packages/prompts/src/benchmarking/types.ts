/**
 * BENCHMARKING TYPES
 * 
 * Core types for the prompt benchmarking system.
 * These types define how we measure, track, and evolve prompt quality.
 */

import { PromptPart } from '../parts/PromptPart';
import { Prompt } from '../prompt';

// ==================== PERFORMANCE-BASED VERSIONING ====================

/**
 * Performance-Based Version format: <generation>.<quality_score>.<variant>
 * Examples: "1.85.0", "1.92.3", "2.78.0"
 */
export interface PBVersion {
  generation: number;    // Major evolution milestone (1, 2, 3...)
  quality_score: number; // Overall quality 0-100
  variant: number;       // Different implementations at same quality
}

export function formatPBVersion(version: PBVersion): string {
  return `${version.generation}.${version.quality_score}.${version.variant}`;
}

export function parsePBVersion(version: string): PBVersion {
  const parts = version.split('.');
  return {
    generation: parseInt(parts[0]),
    quality_score: parseInt(parts[1]),
    variant: parseInt(parts[2])
  };
}

// ==================== BENCHMARK METRICS ====================

/**
 * Core metrics for PromptPart benchmarking
 */
export interface PromptPartMetrics {
  semantic_clarity: number;   // LLM comprehension score (0-1)
  token_efficiency: number;   // Characters per semantic unit (0-1)
  model_stability: number;    // Performance variance across models (0-1)
}

/**
 * Extended metrics for full Prompt benchmarking
 */
export interface PromptMetrics extends PromptPartMetrics {
  task_success: number;       // Goal achievement rate (0-1)
  response_quality: number;   // Multi-dimensional quality (0-1)
  token_economy: number;      // Useful token ratio (0-1)
  latency_impact: number;     // Generation time influence (0-1)
}

// ==================== BENCHMARK TESTS ====================

/**
 * A single benchmark test case
 */
export interface BenchmarkTest<T = any> {
  name: string;
  description: string;
  weight: number;  // Importance in overall score (0-1)
  
  /**
   * Run the test and return a score 0-1
   */
  run(subject: T, context?: BenchmarkContext): Promise<number>;
}

/**
 * Context provided to benchmark tests
 */
export interface BenchmarkContext {
  models?: string[];           // LLM models to test against
  temperature?: number;        // LLM temperature setting
  max_tokens?: number;         // Token limit
  test_scenarios?: string[];   // Specific scenarios to test
}

// ==================== BENCHMARK SUITES ====================

/**
 * A collection of benchmark tests for a PromptPart
 */
export interface PromptPartBenchmarkSuite {
  id: string;
  promptPart: PromptPart;
  version: PBVersion;
  
  tests: {
    semantic_clarity: BenchmarkTest<PromptPart>;
    token_efficiency: BenchmarkTest<PromptPart>;
    model_stability: BenchmarkTest<PromptPart>;
  };
  
  /**
   * Run all tests and compute overall quality score
   */
  run(context?: BenchmarkContext): Promise<PromptPartBenchmarkResult>;
}

/**
 * A collection of benchmark tests for a full Prompt
 */
export interface PromptBenchmarkSuite {
  id: string;
  prompt: Prompt;
  version: PBVersion;
  
  tests: {
    semantic_clarity: BenchmarkTest<Prompt>;
    token_efficiency: BenchmarkTest<Prompt>;
    model_stability: BenchmarkTest<Prompt>;
    task_success: BenchmarkTest<Prompt>;
    response_quality: BenchmarkTest<Prompt>;
    token_economy: BenchmarkTest<Prompt>;
    latency_impact: BenchmarkTest<Prompt>;
  };
  
  /**
   * Track which PromptPart versions this depends on
   */
  dependencies: Map<string, string>; // promptPartId -> version
  
  /**
   * Run all tests and compute overall quality score
   */
  run(context?: BenchmarkContext): Promise<PromptBenchmarkResult>;
}

// ==================== BENCHMARK RESULTS ====================

export interface PromptPartBenchmarkResult {
  promptPartId: string;
  version: PBVersion;
  timestamp: Date;
  metrics: PromptPartMetrics;
  overall_score: number;  // Weighted average 0-100
  passed: boolean;        // Met quality gates
  details?: any;          // Test-specific details
}

export interface PromptBenchmarkResult {
  promptId: string;
  version: PBVersion;
  timestamp: Date;
  metrics: PromptMetrics;
  overall_score: number;  // Weighted average 0-100
  passed: boolean;        // Met quality gates
  dependencies: Map<string, string>;
  details?: any;          // Test-specific details
}

// ==================== QUALITY GATES ====================

export interface QualityGates {
  minimum_overall: number;     // Minimum overall score required
  minimum_per_metric: Partial<PromptMetrics>; // Minimum per metric
  evolution_trigger: number;   // Score below this triggers evolution
  improvement_threshold: number; // % improvement needed for new version
}

export const DEFAULT_QUALITY_GATES: QualityGates = {
  minimum_overall: 80,
  minimum_per_metric: {
    semantic_clarity: 0.85,
    token_efficiency: 0.80,
    model_stability: 0.85
  },
  evolution_trigger: 80,
  improvement_threshold: 5
};

// ==================== EVOLUTION ====================

export interface EvolutionCandidate {
  original: PromptPart | Prompt;
  variant: PromptPart | Prompt;
  reason: string;  // Why this variant was generated
  score?: number;  // Benchmark score if tested
}

export interface EvolutionResult {
  original_version: PBVersion;
  candidates: EvolutionCandidate[];
  winner?: EvolutionCandidate;
  new_version?: PBVersion;
}