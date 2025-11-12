import { callLLMAPI, BATCH_SUMMARY_MODEL } from '@/digest/llm';
import { CODE_STYLES_PROMPT } from '@/digest/prompts/code-styles-prompts';

/**
 * Generate the Code Styles guide for the Engi codebase.
 */
export async function generateCodeStyles(
  _digests: any[],
  { debug = false } = {},
): Promise<string> {
  const resp = await callLLMAPI(
    CODE_STYLES_PROMPT,
    2048,
    false,
    BATCH_SUMMARY_MODEL,
  );
  return String(resp).trim();
}
