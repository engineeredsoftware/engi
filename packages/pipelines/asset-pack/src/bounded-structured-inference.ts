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

export async function runBoundedStructuredInference<T>({
  agentName,
  phase,
  step = 'bounded',
  systemPrompt,
  userPrompt,
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
    agentExecution?.store?.('bounded-inference', 'mode', 'single-structured-generation');
    agentExecution?.store?.('llm', 'input', {
      messages,
      phase,
      agent: agentName,
      step,
      generation: 'structured_output',
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

    const output = await resolvedLLM.llm({
      messages,
      config: {
        responseFormat: 'json',
        temperature: 0.2,
        maxTokens: 4096,
      },
    });
    try {
      agentExecution?.store?.('llm', 'output', {
        content: output.content,
        phase,
        agent: agentName,
        step,
        generation: 'structured_output',
        provider: output.metadata?.provider ?? resolvedLLM.provider,
        model: output.metadata?.model ?? resolvedLLM.model,
      });
      agentExecution?.store?.('llm', 'usage', output.usage);
    } catch {}

    const parsed = realInferenceRequired
      ? schema.parse(JSON.parse(extractJsonFromResponse(output.content)))
      : await parseResponse(output.content, schema, fallback, { maxRetries: 0 });
    try {
      agentExecution?.store?.('llm', 'parsedOutput', {
        parsed,
        phase,
        agent: agentName,
        step,
        generation: 'structured_output',
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
