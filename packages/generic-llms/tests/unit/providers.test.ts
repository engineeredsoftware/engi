/**
 * GENERIC LLMS PROVIDERS UNIT TESTS
 * 
 * Tests for OpenAI and Anthropic provider implementations
 * 
 * @doc-test
 * version: 1.0.0
 * coverage: ["openai-provider", "anthropic-provider", "error-handling", "config-validation"]
 * philosophy: "Providers are bridges to intelligence"
 */

import { describe, test, expect, jest } from '@jest/globals';
import { openAIProvider } from '../../src/providers/openai';
import { anthropicProvider } from '../../src/providers/anthropic';
import { LLMInput, LLMConfig } from '@bitcode/llm-generics';

// Mock external APIs
jest.mock('openai');
jest.mock('@anthropic-ai/sdk');

describe('OpenAI Provider', () => {
  describe('provider interface', () => {
    test('should have correct provider name', () => {
      expect(openAIProvider.name).toBe('openai');
    });

    test('should create LLM function', () => {
      const llm = openAIProvider.createLLM({ model: 'gpt-4' });
      
      expect(llm).toBeDefined();
      expect(typeof llm).toBe('function');
    });
  });

  describe('config validation', () => {
    test('should validate config if validator provided', () => {
      if (openAIProvider.validateConfig) {
        const valid = openAIProvider.validateConfig({
          model: 'gpt-4',
          temperature: 0.7,
          maxTokens: 2000
        });
        
        expect(valid).toBe(true);
      }
    });

    test('should provide default config', () => {
      if (openAIProvider.getDefaultConfig) {
        const defaults = openAIProvider.getDefaultConfig();
        
        expect(defaults).toHaveProperty('model');
        expect(defaults.temperature).toBeGreaterThanOrEqual(0);
        expect(defaults.temperature).toBeLessThanOrEqual(2);
      }
    });
  });

  describe('LLM execution', () => {
    test('should transform input to API format', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        choices: [{
          message: { content: 'Test response' },
          finish_reason: 'stop'
        }],
        usage: {
          prompt_tokens: 10,
          completion_tokens: 5,
          total_tokens: 15
        }
      });

      // Mock OpenAI client
      const OpenAI = require('openai');
      OpenAI.mockImplementation(() => ({
        chat: { completions: { create: mockCreate } }
      }));

      const llm = openAIProvider.createLLM({ model: 'gpt-4' });
      
      const input: LLMInput = {
        messages: [
          { role: 'system', content: 'You are a helpful assistant' },
          { role: 'user', content: 'Hello' }
        ]
      };
      
      const result = await llm(input);
      
      expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
        model: 'gpt-4',
        messages: input.messages
      }));
      
      expect(result).toEqual({
        content: 'Test response',
        usage: {
          inputTokens: 10,
          outputTokens: 5,
          totalTokens: 15
        },
        metadata: expect.any(Object)
      });
    });

    test('should return structured mock when API unavailable in test mode', async () => {
      const mockCreate = jest.fn().mockRejectedValue(new Error('API Error'));

      const OpenAI = require('openai');
      OpenAI.mockImplementation(() => ({
        chat: { completions: { create: mockCreate } }
      }));

      const llm = openAIProvider.createLLM({ model: 'gpt-4' });
      
      const input: LLMInput = {
        messages: [{ role: 'user', content: 'Test' }]
      };
      
      const result = await llm(input);
      expect(result).toMatchObject({
        content: expect.stringContaining('OpenAI (mock) response'),
        metadata: { mocked: true, model: 'gpt-4' },
      });
    });
  });
});

describe('Anthropic Provider', () => {
  describe('provider interface', () => {
    test('should have correct provider name', () => {
      expect(anthropicProvider.name).toBe('anthropic');
    });

    test('should create LLM function', () => {
      const llm = anthropicProvider.createLLM({ model: 'claude-3-opus-20240229' });
      
      expect(llm).toBeDefined();
      expect(typeof llm).toBe('function');
    });
  });

  describe('message transformation', () => {
    test('should separate system message from user messages', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        content: [{ text: 'Claude response' }],
        usage: {
          input_tokens: 20,
          output_tokens: 10
        }
      });

      // Mock Anthropic client
      const Anthropic = require('@anthropic-ai/sdk');
      Anthropic.mockImplementation(() => ({
        messages: { create: mockCreate }
      }));

      const llm = anthropicProvider.createLLM({ model: 'claude-3-opus-20240229' });
      
      const input: LLMInput = {
        messages: [
          { role: 'system', content: 'You are Claude' },
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Hi there!' },
          { role: 'user', content: 'How are you?' }
        ]
      };
      
      await llm(input);
      
      expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
        model: 'claude-3-opus-20240229',
        system: 'You are Claude',
        messages: [
          { role: 'user', content: 'Hello\n\nHi there!\n\nHow are you?' }
        ],
      }));
    });
  });

  describe('response handling', () => {
    test('should handle text content blocks', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        content: [
          { type: 'text', text: 'Part 1' },
          { type: 'text', text: 'Part 2' }
        ],
        usage: {
          input_tokens: 30,
          output_tokens: 15
        }
      });

      const Anthropic = require('@anthropic-ai/sdk');
      Anthropic.mockImplementation(() => ({
        messages: { create: mockCreate }
      }));

      const llm = anthropicProvider.createLLM({ model: 'claude-3-opus-20240229' });
      
      const result = await llm({
        messages: [{ role: 'user', content: 'Test' }]
      });
      
      expect(result.content).toBe('Part 1');
      expect(result.usage).toEqual({
        inputTokens: 30,
        outputTokens: 15,
        totalTokens: 45
      });
    });
  });
});
