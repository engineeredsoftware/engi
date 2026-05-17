import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import {
  factoryLLMRegistryWithProviders,
} from '../../src';
import {
  resolveDefaultLLMConfig,
} from '../../src/defaults';

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

  test('selects OpenAI defaults when only an OpenAI key is configured', () => {
    const defaults = resolveDefaultLLMConfig({
      OPENAI_API_KEY: 'sk-test',
    });

    expect(defaults).toEqual({
      provider: 'openai',
      model: 'gpt-4.1-mini',
    });
  });

  test('preserves explicit provider and model overrides', () => {
    const defaults = resolveDefaultLLMConfig({
      OPENAI_API_KEY: 'sk-test',
      BITCODE_LLM_PROVIDER: 'google',
      BITCODE_LLM_MODEL: 'gemini-2.5-flash',
    });

    expect(defaults).toEqual({
      provider: 'google',
      model: 'gemini-2.5-flash',
    });
  });
});
