import { callLLMAPI, BATCH_SUMMARY_MODEL } from '@/digest/llm';
import { TASK_GUIDE_PROMPT } from '@/digest/prompts/task-guides-prompts';

export async function generateGlobalGuide(
  _digests: any[],
  { debug = false } = {},
): Promise<string> {
  // Generate Task Guides based on the dynamic prompt
  const resp = await callLLMAPI(
    TASK_GUIDE_PROMPT,
    2048,
    false,
    BATCH_SUMMARY_MODEL,
  );
  return String(resp).trim();
}
