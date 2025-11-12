/**
 * Test script to verify PBV system
 */

import { PromptPart } from '../parts/PromptPart';

// Example of PBV versioning in action
const calculatePBVVersion = (generation: number, benchmarkScores: number[]): string => {
  const averageScore = benchmarkScores.reduce((a, b) => a + b, 0) / benchmarkScores.length;
  const qualityScore = Math.round(averageScore * 100);
  return `${generation}.${qualityScore}.0`;
};

// Test data
const benchmarkResults = {
  intent: 0.85,
  semantic_clarity: 0.98,
  token_efficiency: 1.0,
  model_stability: 0.96
};

const scores = Object.values(benchmarkResults);
const pbvVersion = calculatePBVVersion(1, scores);

console.log('Benchmark Results:', benchmarkResults);
console.log('Average Score:', scores.reduce((a, b) => a + b, 0) / scores.length);
console.log('PBV Version:', pbvVersion);

// Show evolution example
const evolvedScores = [0.92, 0.99, 0.90, 0.98];
const evolvedVersion = calculatePBVVersion(1, evolvedScores);

console.log('\nEvolved Benchmark Results:');
console.log('Average Score:', evolvedScores.reduce((a, b) => a + b, 0) / evolvedScores.length);
console.log('PBV Version:', evolvedVersion);

// Show generation change
const newGenerationScores = [0.78, 0.85, 0.80, 0.82];
const newGenVersion = calculatePBVVersion(2, newGenerationScores);

console.log('\nNew Generation Results:');
console.log('Average Score:', newGenerationScores.reduce((a, b) => a + b, 0) / newGenerationScores.length);
console.log('PBV Version:', newGenVersion);

export { calculatePBVVersion };