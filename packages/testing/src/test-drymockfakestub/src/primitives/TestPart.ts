/**
 * TestPart - The atomic unit of test intelligence
 * 
 * Following the same pattern as PromptPart, TestPart is a branded type
 * that represents a single piece of test data with compile-time type safety.
 */

/**
 * Branded type for test parts to ensure type safety
 */
export type TestPart<T = unknown> = T & { readonly __brand: 'TestPart' };

/**
 * Creates a TestPart with type safety
 */
export function createTestPart<T>(data: T): TestPart<T> {
  if (typeof data === 'object' && data !== null) {
    Object.defineProperty(data, '__brand', {
      value: 'TestPart',
      enumerable: false,
      writable: false,
      configurable: false,
    });
    return data as TestPart<T>;
  }

  const wrapper = {
    value: data,
    __brand: 'TestPart' as const,
  };
  return wrapper.value as TestPart<T>;
}

/**
 * Type guard to check if a value is a TestPart
 */
export function isTestPart<T>(value: unknown): value is TestPart<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    '__brand' in value &&
    (value as any).__brand === 'TestPart'
  );
}

/**
 * Metadata that can be attached to test parts via doc-test comments
 */
export interface TestPartMetadata {
  id: string;
  scenario?: string;
  description?: string;
  tags?: string[];
  version?: string;
  dependencies?: string[];
  performance?: {
    expectedDuration?: number;
    memoryLimit?: number;
  };
}
