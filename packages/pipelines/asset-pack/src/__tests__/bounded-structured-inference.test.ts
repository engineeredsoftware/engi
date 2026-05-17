import { z } from 'zod';
import { runBoundedStructuredInference } from '../bounded-structured-inference';

const ResultSchema = z.object({
  summary: z.string(),
  accepted: z.boolean(),
});

function makeExecution(llm?: any) {
  const stores: Array<{ namespace: string; key: string; value: unknown }> = [];
  const execution: any = {
    id: 'root',
    store(namespace: string, key: string, value: unknown) {
      stores.push({ namespace, key, value });
    },
    getRoot() {
      return execution;
    },
    child(id: string) {
      return {
        ...execution,
        id,
        parent: execution,
      };
    },
  };

  if (llm) {
    execution.llms = {
      getDefaultLLM: jest.fn(() => llm),
    };
  }

  return { execution, stores };
}

function resetInferenceEnv() {
  delete process.env.BITCODE_ASSET_PACK_REAL_INFERENCE;
  delete process.env.BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE;
  delete process.env.OPENAI_API_KEY;
  delete process.env.BITCODE_LLM_PROVIDER;
  delete process.env.BITCODE_LLM_MODEL;
}

describe('runBoundedStructuredInference', () => {
  beforeEach(resetInferenceEnv);
  afterEach(resetInferenceEnv);

  it('keeps deterministic fallback available when real inference is not required', async () => {
    const { execution, stores } = makeExecution();

    const result = await runBoundedStructuredInference({
      agentName: 'test-agent',
      phase: 'setup',
      step: 'bounded',
      systemPrompt: 'Return JSON.',
      userPrompt: 'Return a result.',
      schema: ResultSchema,
      fallback: () => ({ summary: 'fallback', accepted: false }),
      execution,
    });

    expect(result).toEqual({ summary: 'fallback', accepted: false });
    expect(stores).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          namespace: 'bounded-inference',
          key: 'status',
          value: 'fallback-no-llm',
        }),
      ])
    );
  });

  it('blocks real inference when no LLM can be resolved', async () => {
    process.env.BITCODE_ASSET_PACK_REAL_INFERENCE = '1';
    process.env.BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE = 'bounded';
    const { execution, stores } = makeExecution();

    await expect(
      runBoundedStructuredInference({
        agentName: 'test-agent',
        phase: 'setup',
        step: 'bounded',
        systemPrompt: 'Return JSON.',
        userPrompt: 'Return a result.',
        schema: ResultSchema,
        fallback: () => ({ summary: 'fallback', accepted: false }),
        execution,
      })
    ).rejects.toThrow(/no configured LLM/i);

    expect(stores).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          namespace: 'bounded-inference',
          key: 'status',
          value: 'blocked-no-llm',
        }),
      ])
    );
  });

  it('uses the execution LLM for real bounded inference and stores parsed output telemetry', async () => {
    process.env.BITCODE_ASSET_PACK_REAL_INFERENCE = '1';
    process.env.BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE = 'bounded';
    const llm = jest.fn(async () => ({
      content: JSON.stringify({ summary: 'model result', accepted: true }),
      usage: { inputTokens: 12, outputTokens: 8, totalTokens: 20 },
      metadata: { provider: 'test-provider', model: 'test-model' },
    }));
    const { execution, stores } = makeExecution(llm);

    const result = await runBoundedStructuredInference({
      agentName: 'test-agent',
      phase: 'setup',
      step: 'bounded',
      systemPrompt: 'Return JSON.',
      userPrompt: 'Return a result.',
      schema: ResultSchema,
      fallback: () => ({ summary: 'fallback', accepted: false }),
      execution,
    });

    expect(result).toEqual({ summary: 'model result', accepted: true });
    expect(llm).toHaveBeenCalledWith(
      expect.objectContaining({
        config: expect.objectContaining({
          responseFormat: 'json',
        }),
      })
    );
    expect(stores).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          namespace: 'bounded-inference',
          key: 'status',
          value: 'success',
        }),
        expect.objectContaining({
          namespace: 'llm',
          key: 'parsedOutput',
        }),
      ])
    );
  });
});
