import crypto from 'crypto';
import { MODEL_CONFIGS, BATCH_SUMMARY_MODEL, logInfo, logError, SupportedModel } from './models';
import { PIPELINE_CONSTANTS } from '@/lib/engine/constants';
import { callGemini } from '@/llm/geminiClient';
import { callAnthropic } from '@/llm/anthropicClient';
import { estimateTokens, deductGenerationCredits, GenerationTokens } from '@engi/credits';
import { createClient } from '@engi/supabase';
import { log } from '@engi/logger';

// Existing implementation was copied from uapi/lib/digest/digest.ts with only
// minimal path adjustments so behaviour remains identical.

export async function callLLMAPI(
  prompt: string,
  max_tokens: number,
  expectJson = true,
  model: SupportedModel = BATCH_SUMMARY_MODEL,
  retryCount = 0,
  batchInfo: any = null
): Promise<string> {
  const modelConfig = MODEL_CONFIGS[model];
  if (!modelConfig) {
    throw new Error(`Invalid model selection: ${model}`);
  }

  const endpoint = modelConfig.endpoint;

  // Dry run shortcut
  try {
    const { isDryRunEnabled, getDryRunConfig } = await import('@/lib/dryrun');
    const dryRun = isDryRunEnabled();
    const dryConfig = getDryRunConfig();
    if (dryRun && dryConfig.mockResponses) {
      const raw = PIPELINE_CONSTANTS?.DRY_RUN_LLM_RESPONSE_JSON;
      if (raw) {
        const defaultResp = JSON.parse(raw);
        log('DRY RUN: callLLMAPI returning default response', 'info', { purpose: model, dryRun: true });
        return defaultResp as unknown as string;
      }
    }
  } catch {}

  await logInfo(`Preparing to call LLM endpoint: ${endpoint}`);
  await logInfo(`Using model: ${model}, maxOutputTokens: ${max_tokens}`);

  let resultText: string;
  if (model.startsWith('gemini')) {
    resultText = await callGemini(endpoint, modelConfig.apiKey, prompt, max_tokens);
  } else if (model === 'claude-3-5-sonnet-latest') {
    resultText = await callAnthropic(endpoint, modelConfig.apiKey, prompt, max_tokens);
  } else {
    throw new Error(`Unsupported model: ${model}`);
  }

  // Deduct credits
  try {
    const inputTokens = estimateTokens(prompt);
    const outputTokens = estimateTokens(resultText);
    const tokens: GenerationTokens = { inputTokens, outputTokens };
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (user?.id) {
      await deductGenerationCredits(user.id, tokens);
      log(`Deducted credits for generation in digest`, 'info', { userId: user.id, ...tokens });
    }
  } catch (err) {
    log(`Failed to deduct credits in digest generation`, 'error', { error: err });
  }

  // For non-JSON usage, return early
  if (!expectJson) {
    return resultText.trim();
  }

  // ---------- JSON post-processing identical to legacy implementation ----------

  // Attempt to extract JSON array from the response
  let cleaned = resultText.trim();
  let jsonContent: string | null = null;

  // Prefer ```json blocks
  const jsonBlockMatch = cleaned.match(/```json\n([\s\S]*?)\n```/);
  if (jsonBlockMatch) {
    jsonContent = jsonBlockMatch[1].trim();
  } else {
    const codeBlockMatch = cleaned.match(/```\n([\s\S]*?)\n```/);
    if (codeBlockMatch) {
      jsonContent = codeBlockMatch[1].trim();
    }
  }

  if (!jsonContent) {
    // Try fallback patterns
    const patterns = [
      /Here is the JSON array:\s*(\[[\s\S]*?\])\s*$/i,
      /JSON response:\s*(\[[\s\S]*?\])\s*$/i,
      /(\[[\s\S]*?\])\s*$/  // Last resort: just find the last array in the text
    ];
    for (const pattern of patterns) {
      const match = cleaned.match(pattern as RegExp);
      if (match) {
        jsonContent = match[1].trim();
        break;
      }
    }
  }

  if (!jsonContent) {
    await logError('Could not find valid JSON array in response');
    return '';
  }

  cleaned = jsonContent;

  // Validate JSON is an array – we keep validation minimal here because the
  // legacy digest generator runs a deeper validation later.
  try {
    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed)) {
      throw new Error('JSON root is not an array');
    }
  } catch (err: any) {
    await logError(`JSON parse error inside callLLMAPI: ${err.message}`);
    return '';
  }

  return cleaned;
}
