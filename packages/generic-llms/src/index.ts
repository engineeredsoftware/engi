/**
 * Generic LLMs - Provider implementations for the LLM generics
 * 
 * This package provides concrete LLM implementations while llm-generics
 * defines the pure interfaces and types.
 */

// Provider exports
export { openAIProvider } from './providers/openai';
export { anthropicProvider } from './providers/anthropic';
export { googleProvider } from './providers/google';

// Factory for pre-configured registry
import { factoryLLMRegistry, LLMRegistry } from '@bitcode/llm-generics';

export function factoryLLMRegistryWithProviders(): LLMRegistry {
  const registry = factoryLLMRegistry();
  
  // Import providers dynamically to avoid circular deps
  const { openAIProvider } = require('./providers/openai');
  const { anthropicProvider } = require('./providers/anthropic');
  const { googleProvider } = require('./providers/google');
  
  // Register default providers
  registry.registerProvider(openAIProvider);
  registry.registerProvider(anthropicProvider);
  registry.registerProvider(googleProvider);
  
  return registry;
}
