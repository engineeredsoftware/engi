/**
 * TestComposition - Composed test parts that form complete test data
 * 
 * Following the same hierarchical pattern as PromptComposition,
 * TestComposition allows combining multiple TestParts into cohesive test data.
 */

import type { TestPart } from './TestPart';

/**
 * Interface for composing test parts into complete test data
 */
export interface TestComposition<T = unknown> {
  /**
   * Unique identifier for this composition
   */
  id: string;
  
  /**
   * Human-readable name
   */
  name: string;
  
  /**
   * The test parts that make up this composition
   */
  parts: TestPart<any>[];
  
  /**
   * Compose the parts into the final test data structure
   */
  compose(): T;
  
  /**
   * Optional metadata for the composition
   */
  metadata?: TestCompositionMetadata;
}

/**
 * Metadata for test compositions
 */
export interface TestCompositionMetadata {
  description?: string;
  scenarios?: string[];
  tags?: string[];
  performance?: {
    compositionTime?: number;
    expectedSize?: number;
  };
}

/**
 * Base class for test compositions
 */
export abstract class BaseTestComposition<T> implements TestComposition<T> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly parts: TestPart<any>[],
    public readonly metadata?: TestCompositionMetadata
  ) {}
  
  abstract compose(): T;
}

/**
 * Factory function for creating test compositions
 */
export function createTestComposition<T>(
  config: {
    id: string;
    name: string;
    parts: TestPart<any>[];
    compose: () => T;
    metadata?: TestCompositionMetadata;
  }
): TestComposition<T> {
  return {
    id: config.id,
    name: config.name,
    parts: config.parts,
    compose: config.compose,
    metadata: config.metadata
  };
}