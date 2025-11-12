import { PIPELINE_CONSTANTS } from '@/lib/engine/constants';
import { callGemini } from '@/llm/geminiClient';
import { callAnthropic } from '@/llm/anthropicClient';
import { estimateTokens, deductGenerationCredits, GenerationTokens } from '@engi/credits';
import { createClient } from '@engi/supabase';
import { log } from '@engi/logger';

// Model configuration
export const MODEL_CONFIGS = {
  'gemini-1.5-flash': {
    apiKey: process.env.GEMINI_API_KEY,
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    maxContextTokens: 2000000,
    maxOutputTokens: 8192,
    headers: { 'Content-Type': 'application/json' }
  },
  'gemini-1.5-pro': {
    apiKey: process.env.GEMINI_API_KEY,
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
    maxContextTokens: 2000000,
    maxOutputTokens: 8192,
    headers: { 'Content-Type': 'application/json' }
  },
  'claude-3-5-sonnet-latest': {
    apiKey: process.env.ANTHROPIC_API_KEY,
    endpoint: 'https://api.anthropic.com/v1/messages',
    maxContextTokens: 200000,
    maxOutputTokens: 8192,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'context-500k-2024-09-04,max-tokens-3-5-sonnet-2024-07-15'
    }
  }
} as const;

export type SupportedModel = keyof typeof MODEL_CONFIGS;

// Default model for batch summaries (file digests)
export const BATCH_SUMMARY_MODEL: SupportedModel = 'gemini-1.5-flash';

// Helper wrapper around log to enforce typing
type LogData = Record<string, any>;
export async function logInfo(msg: string, data?: LogData) {
  await log(msg, 'info', data);
}

export async function logError(msg: string, data?: LogData) {
  await log(msg, 'error', data);
}
