import { describe, it, expect, jest, beforeEach } from '@jest/globals';

jest.mock('@/llm/geminiClient', () => ({
  callGemini: jest.fn(),
}));

jest.mock('@/llm/anthropicClient', () => ({
  callAnthropic: jest.fn(),
}));

jest.mock('@bitcode/btd', () => ({
  estimateTokens: jest.fn(() => 10),
  deductGenerationBtd: jest.fn(),
}));

jest.mock('@bitcode/supabase', () => ({
  createClient: jest.fn(async () => ({
    auth: {
      getUser: jest.fn(async () => ({ data: { user: { id: 'user-123' } } })),
    },
  })),
}));

jest.mock('@/lib/engine/constants', () => ({
  PIPELINE_CONSTANTS: {
    MAX_RETRIES: 3,
    DRY_RUN_LLM_RESPONSE_JSON: '{"default":true}',
  },
}));

jest.mock('@/lib/dryrun', () => ({
  isDryRunEnabled: jest.fn(() => false),
  getDryRunConfig: jest.fn(() => ({ mockResponses: false })),
}));

import { callGemini } from '@/llm/geminiClient';
import { callAnthropic } from '@/llm/anthropicClient';
import { deductGenerationBtd } from '@bitcode/btd';
import { callLLMAPI } from '../callLLMAPI';

const callGeminiMock = callGemini as jest.MockedFunction<typeof callGemini>;
const callAnthropicMock = callAnthropic as jest.MockedFunction<typeof callAnthropic>;
describe('callLLMAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('invokes Gemini client and returns JSON payload when expectJson true', async () => {
    callGeminiMock.mockResolvedValue(
      '```json\n[{"relativePath":"src/index.ts","summary":"Hello"}]\n```'
    );

    const response = await callLLMAPI('Summarise file', 1024, true, 'gemini-1.5-flash');
    expect(callGemini).toHaveBeenCalled();
    expect(response).toBe('[{"relativePath":"src/index.ts","summary":"Hello"}]');
    expect(deductGenerationBtd).toHaveBeenCalledWith('user-123', { inputTokens: 10, outputTokens: 10 });
  });

  it('invokes Anthropic client and returns trimmed text when expectJson false', async () => {
    callAnthropicMock.mockResolvedValue('Plain completion ');
    const response = await callLLMAPI('Summarise file', 1024, false, 'claude-3-5-sonnet-latest');
    expect(callAnthropic).toHaveBeenCalled();
    expect(response).toBe('Plain completion');
  });

  it('falls back to empty string when JSON extraction fails', async () => {
    callGeminiMock.mockResolvedValue('No JSON here');
    const response = await callLLMAPI('Summarise file', 1024, true, 'gemini-1.5-flash');
    expect(response).toBe('');
  });

  it('throws for unsupported model', async () => {
    await expect(
      callLLMAPI('Prompt', 1024, true, 'unsupported-model' as any)
    ).rejects.toThrow('Invalid model selection: unsupported-model');
  });
});
