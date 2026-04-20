import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { factoryLLMRegistryWithProviders } from '../../src';

describe('factoryLLMRegistryWithProviders', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.BITCODE_LLM_PROVIDER;
    delete process.env.BITCODE_LLM_MODEL;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test('registers google provider and supports default selection', () => {
    const registry = factoryLLMRegistryWithProviders();
    // Ensure no error when picking Google explicitly
    const llm = registry.getLLM(['*'], 'google');
    expect(typeof llm).toBe('function');
  });
});
