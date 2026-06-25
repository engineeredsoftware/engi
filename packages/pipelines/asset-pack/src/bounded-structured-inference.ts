import { extractJsonFromResponse, parseResponse } from '@bitcode/parsing';
import { factoryLLMRegistryWithProviders, resolveDefaultLLMConfig } from '@bitcode/generic-llms';
import type { LLM } from '@bitcode/llm-generics';
import { z } from 'zod';
import { isAssetPackRealInferenceEnabled } from './runtime-inference-policy';

type BoundedInferenceParams<T> = {
  agentName: string;
  phase: string;
  step?: string;
  systemPrompt: string;
  userPrompt: string;
  promptTemplate?: {
    system?: string;
    user?: string;
    templateId?: string;
  };
  schema: z.ZodType<T>;
  fallback: () => T;
  execution: any;
};

type ResolvedLLM = {
  llm: LLM;
  model?: string;
  provider?: string;
  source: string;
};

const stringListSchema = z.preprocess(
  (value) => {
    if (typeof value === 'string') return [value];
    return value;
  },
  z.array(z.string()).default([]),
);

const ReasoningSchema = z.object({
  analysis: z.string().default(''),
  steps: stringListSchema,
  conclusion: z.string().default(''),
  confidence: z.coerce.number().min(0).max(1).catch(0),
  useTools: z.array(z.any()).optional(),
});

const JudgmentSchema = z.object({
  quality: z.coerce.number().min(0).max(1).catch(0),
  issues: stringListSchema,
  suggestions: stringListSchema,
  approved: z.preprocess((value) => {
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      if (normalized === 'true') return true;
      if (normalized === 'false') return false;
    }
    return value;
  }, z.boolean().default(false)),
});

export async function runBoundedStructuredInference<T>({
  agentName,
  phase,
  step = 'bounded',
  systemPrompt,
  userPrompt,
  promptTemplate,
  schema,
  fallback,
  execution,
}: BoundedInferenceParams<T>): Promise<T> {
  const agentExecution = createAgentExecutionNode(execution, agentName);
  const messages = [
    { role: 'system' as const, content: systemPrompt },
    { role: 'user' as const, content: userPrompt },
  ];

  try {
    agentExecution?.store?.('phase', 'current', phase);
    agentExecution?.store?.('agent', 'name', agentName);
    agentExecution?.store?.('step', 'name', step);
    agentExecution?.store?.('bounded-inference', 'mode', 'thricified-generation');
    agentExecution?.store?.('bounded-inference', 'stack', {
      ptrrStep: step,
      failsafeSequence: ['prepare-concise-context', 'chunk-then-sum', 'stitch-until-complete'],
      thricifiedGenerationStages: ['reason', 'judge', 'structured_output'],
    });
    agentExecution?.store?.('llm', 'input', {
      messages,
      promptTemplate: promptTemplate || {
        system: systemPrompt,
        user: userPrompt,
      },
      interpolatedPrompt: {
        system: systemPrompt,
        user: userPrompt,
      },
      phase,
      agent: agentName,
      step,
      failsafeSequence: ['prepare-concise-context', 'chunk-then-sum', 'stitch-until-complete'],
      generation: 'thricified-generation',
      generationSequence: ['reason', 'judge', 'structured_output'],
    });
  } catch {}

  const realInferenceRequired = isAssetPackRealInferenceEnabled();
  const resolvedLLM = resolveConfiguredLLM(execution, agentExecution) ?? resolveEnvironmentLLM();

  if (!resolvedLLM) {
    if (realInferenceRequired) {
      const error = 'Real AssetPack inference is enabled, but no configured LLM could be resolved.';
      try {
        agentExecution?.store?.('bounded-inference', 'status', 'blocked-no-llm');
        agentExecution?.store?.('bounded-inference', 'error', error);
      } catch {}
      throw new Error(error);
    }

    const fallbackResult = fallback();
    try {
      agentExecution?.store?.('bounded-inference', 'status', 'fallback-no-llm');
      agentExecution?.store?.('llm', 'parsedOutput', {
        parsed: fallbackResult,
        parsedTypedOutput: fallbackResult,
        phase,
        agent: agentName,
        step,
        generation: 'structured_output',
      });
    } catch {}
    return fallbackResult;
  }

  try {
    try {
      agentExecution?.store?.('bounded-inference', 'provider', {
        source: resolvedLLM.source,
        provider: resolvedLLM.provider,
        model: resolvedLLM.model,
      });
    } catch {}

    const reasoningOutput = await resolvedLLM.llm({
      messages: [
        ...messages,
        {
          role: 'user' as const,
          content: [
            'ThricifiedGeneration stage 1/3: reason.',
            'Return only JSON with keys: analysis, steps, conclusion, confidence.',
          ].join('\n'),
        },
      ],
      config: {
        responseFormat: 'json',
        temperature: 0.2,
        maxTokens: 2048,
      },
    });
    const reasoning = ReasoningSchema.parse(JSON.parse(extractJsonFromResponse(reasoningOutput.content)));

    const judgmentOutput = await resolvedLLM.llm({
      messages: [
        ...messages,
        {
          role: 'user' as const,
          content: [
            'ThricifiedGeneration stage 2/3: judge the prior reasoning.',
            'Return only JSON with keys: quality, issues, suggestions, approved.',
            `Reasoning JSON: ${JSON.stringify(reasoning)}`,
          ].join('\n'),
        },
      ],
      config: {
        responseFormat: 'json',
        temperature: 0.2,
        maxTokens: 2048,
      },
    });
    const judgment = JudgmentSchema.parse(JSON.parse(extractJsonFromResponse(judgmentOutput.content)));

    const output = await resolvedLLM.llm({
      messages: [
        ...messages,
        {
          role: 'user' as const,
          content: [
            'ThricifiedGeneration stage 3/3: structured output.',
            'Use the original task, the reasoning, and the judgment to return only the requested typed JSON.',
            `Reasoning JSON: ${JSON.stringify(reasoning)}`,
            `Judgment JSON: ${JSON.stringify(judgment)}`,
          ].join('\n'),
        },
      ],
      config: {
        responseFormat: 'json',
        temperature: 0.2,
        maxTokens: 4096,
      },
    });
    try {
      agentExecution?.store?.('llm', 'reasoningOutput', {
        content: reasoningOutput.content,
        rawResponse: reasoningOutput.content,
        parsedTypedOutput: reasoning,
        phase,
        agent: agentName,
        step,
        generation: 'reason',
        provider: reasoningOutput.metadata?.provider ?? resolvedLLM.provider,
        model: reasoningOutput.metadata?.model ?? resolvedLLM.model,
      });
      agentExecution?.store?.('llm', 'judgmentOutput', {
        content: judgmentOutput.content,
        rawResponse: judgmentOutput.content,
        parsedTypedOutput: judgment,
        phase,
        agent: agentName,
        step,
        generation: 'judge',
        provider: judgmentOutput.metadata?.provider ?? resolvedLLM.provider,
        model: judgmentOutput.metadata?.model ?? resolvedLLM.model,
      });
      agentExecution?.store?.('llm', 'output', {
        content: output.content,
        rawResponse: output.content,
        phase,
        agent: agentName,
        step,
        generation: 'structured_output',
        reasoning,
        judgment,
        provider: output.metadata?.provider ?? resolvedLLM.provider,
        model: output.metadata?.model ?? resolvedLLM.model,
      });
      agentExecution?.store?.('llm', 'usage', mergeUsage(reasoningOutput.usage, judgmentOutput.usage, output.usage));
    } catch {}

    let parsed: T;
    if (realInferenceRequired) {
      try {
        parsed = schema.parse(JSON.parse(extractJsonFromResponse(output.content)));
      } catch (validationError) {
        // One corrective pass: feed the validation error back so the model can
        // fix the shape (e.g. a missing top-level key) instead of failing the run.
        const corrected = await resolvedLLM.llm({
          messages: [
            ...messages,
            {
              role: 'user' as const,
              content: [
                'ThricifiedGeneration stage 3/3 (correction): your previous JSON failed schema validation.',
                `Validation error: ${validationError instanceof Error ? validationError.message : String(validationError)}`,
                'Return ONLY corrected JSON that strictly matches the required shape, including every required top-level key. No markdown, no prose.',
                `Reasoning JSON: ${JSON.stringify(reasoning)}`,
                `Judgment JSON: ${JSON.stringify(judgment)}`,
              ].join('\n'),
            },
          ],
          config: { responseFormat: 'json', temperature: 0.1, maxTokens: 4096 },
        });
        try {
          agentExecution?.store?.('bounded-inference', 'status', 'corrected-retry');
        } catch {}
        parsed = schema.parse(JSON.parse(extractJsonFromResponse(corrected.content)));
      }
    } else {
      parsed = await parseResponse(output.content, schema, fallback, { maxRetries: 0 });
    }
    try {
      agentExecution?.store?.('llm', 'parsedOutput', {
        parsed,
        parsedTypedOutput: parsed,
        phase,
        agent: agentName,
        step,
        generation: 'structured_output',
        reasoning,
        judgment,
        provider: output.metadata?.provider ?? resolvedLLM.provider,
        model: output.metadata?.model ?? resolvedLLM.model,
      });
      agentExecution?.store?.('bounded-inference', 'status', 'success');
    } catch {}
    return parsed;
  } catch (error) {
    if (realInferenceRequired) {
      try {
        agentExecution?.store?.('bounded-inference', 'status', 'failed');
        agentExecution?.store?.('bounded-inference', 'error', error instanceof Error ? error.message : String(error));
      } catch {}
      throw error;
    }

    const fallbackResult = fallback();
    try {
      agentExecution?.store?.('bounded-inference', 'status', 'fallback-error');
      agentExecution?.store?.('bounded-inference', 'error', error instanceof Error ? error.message : String(error));
      agentExecution?.store?.('llm', 'parsedOutput', {
        parsed: fallbackResult,
        parsedTypedOutput: fallbackResult,
        phase,
        agent: agentName,
        step,
        generation: 'structured_output',
      });
    } catch {}
    return fallbackResult;
  }
}

function createAgentExecutionNode(execution: any, agentName: string): any {
  if (typeof execution?.child === 'function') {
    return execution.child(`agent:${agentName}:bounded`);
  }
  return execution;
}

function resolveConfiguredLLM(execution: any, agentExecution: any): ResolvedLLM | undefined {
  const candidates = [
    execution?.getRoot?.(),
    execution,
    agentExecution?.getRoot?.(),
    agentExecution,
  ];

  for (const candidate of candidates) {
    try {
      const llm = candidate?.llms?.getDefaultLLM?.();
      if (llm) {
        return {
          llm,
          source: 'execution-registry',
        };
      }
    } catch {}
  }

  return undefined;
}

function resolveEnvironmentLLM(): ResolvedLLM | undefined {
  const { provider, model } = resolveDefaultLLMConfig();
  if (!hasProviderCredential(provider)) return undefined;

  try {
    const registry = factoryLLMRegistryWithProviders();
    if (typeof (registry as any).setDefaultProvider === 'function') {
      (registry as any).setDefaultProvider(provider);
    }
    registry.configure('*', {
      model,
      responseFormat: 'json',
      temperature: 0.2,
      maxTokens: 4096,
    });

    return {
      llm: registry.getLLM(['*'], provider),
      provider,
      model,
      source: 'environment-registry',
    };
  } catch {
    return undefined;
  }
}

function hasProviderCredential(provider: string): boolean {
  switch (provider.toLowerCase()) {
    case 'openai':
      return Boolean(process.env.OPENAI_API_KEY);
    case 'anthropic':
      return Boolean(process.env.ANTHROPIC_API_KEY);
    case 'google':
      return Boolean(
        process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
        process.env.GEMINI_API_KEY ||
        process.env.GOOGLE_API_KEY
      );
    default:
      return true;
  }
}

function mergeUsage(...usages: Array<Record<string, number> | undefined>): Record<string, number> | undefined {
  const merged: Record<string, number> = {};
  for (const usage of usages) {
    if (!usage) continue;
    for (const [key, value] of Object.entries(usage)) {
      if (typeof value === 'number' && Number.isFinite(value)) {
        merged[key] = (merged[key] || 0) + value;
      }
    }
  }
  return Object.keys(merged).length ? merged : undefined;
}
