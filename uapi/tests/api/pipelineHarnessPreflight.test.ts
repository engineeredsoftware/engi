/**
 * @jest-environment node
 */

import {
  assertRealInferenceEnvironment,
  isPipelineHarnessRealInferenceRequired,
  normalizeModelEnvironment,
  summarizeHarnessPreflight,
} from '@/app/api/pipeline-harness/asset-pack/preflight';

describe('pipeline harness preflight', () => {
  const body = {
    repositoryFullName: 'engineeredsoftware/ENGI',
    sourceBranch: 'main',
    sourceCommit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
    readId: 'read-1',
    depositId: 'deposit-1',
  };

  it('does not require route real-inference strictness for ordinary local development', () => {
    const env = {
      NODE_ENV: 'development',
      SUPABASE_URL: 'https://staging.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'service-role-key-with-length',
    } as NodeJS.ProcessEnv;

    expect(isPipelineHarnessRealInferenceRequired(env)).toBe(false);
    expect(() => assertRealInferenceEnvironment(env as Record<string, string>)).not.toThrow();
    expect(summarizeHarnessPreflight(body, env)).toMatchObject({
      realInferenceRequired: false,
      realInferenceEnabled: false,
      fullProfileRequiresAsyncCompletion: false,
    });
  });

  it('lets local application deployments opt into the same real bounded inference gate', () => {
    const env = {
      NODE_ENV: 'development',
      BITCODE_PIPELINE_HARNESS_REQUIRE_REAL_INFERENCE: '1',
      BITCODE_ASSET_PACK_REAL_INFERENCE: '1',
      BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE: 'bounded',
      BITCODE_PIPELINE_HARNESS_MAX_RUNTIME_MS: '600000',
      OPENAI_API_KEY: 'openai-key-with-safe-length',
      SUPABASE_URL: 'https://staging.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'service-role-key-with-length',
    } as NodeJS.ProcessEnv;

    expect(isPipelineHarnessRealInferenceRequired(env)).toBe(true);
    expect(() => assertRealInferenceEnvironment(env as Record<string, string>)).not.toThrow();
    expect(summarizeHarnessPreflight(body, env)).toMatchObject({
      deployedRuntime: false,
      realInferenceRequired: true,
      realInferenceEnabled: true,
      realInferenceProfile: 'bounded',
      runtimeBudgetMs: 600000,
    });
  });

  it('fails local strict runs that would otherwise fall back to deterministic branches', () => {
    const env = {
      NODE_ENV: 'development',
      BITCODE_PIPELINE_HARNESS_REQUIRE_REAL_INFERENCE: '1',
      OPENAI_API_KEY: 'openai-key-with-safe-length',
    } as NodeJS.ProcessEnv;

    expect(() => assertRealInferenceEnvironment(env as Record<string, string>)).toThrow(
      'BITCODE_ASSET_PACK_REAL_INFERENCE=1'
    );
  });

  it('keeps full profile behind the async completion gate for local strict runs', () => {
    const env = {
      NODE_ENV: 'development',
      BITCODE_PIPELINE_HARNESS_REQUIRE_REAL_INFERENCE: '1',
      BITCODE_ASSET_PACK_REAL_INFERENCE: '1',
      BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE: 'full',
      BITCODE_PIPELINE_HARNESS_MAX_RUNTIME_MS: '600000',
      OPENAI_API_KEY: 'openai-key-with-safe-length',
      SUPABASE_URL: 'https://staging.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'service-role-key-with-length',
    } as NodeJS.ProcessEnv;

    expect(summarizeHarnessPreflight(body, env)).toMatchObject({
      realInferenceRequired: true,
      fullProfileRequiresAsyncCompletion: true,
      realInferenceProfile: 'full',
    });
    expect(() => assertRealInferenceEnvironment(env as Record<string, string>)).toThrow(
      'BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE=bounded'
    );
  });

  it('normalizes stale model provider pins before strict route execution', () => {
    const env = {
      BITCODE_LLM_PROVIDER: 'anthropic',
      BITCODE_LLM_MODEL: 'claude-stale',
      OPENAI_API_KEY: 'openai-key-with-safe-length',
    } as Record<string, string>;

    normalizeModelEnvironment(env);

    expect(env.BITCODE_LLM_PROVIDER).toBe('openai');
    expect(env.BITCODE_LLM_MODEL).toBeUndefined();
  });
});
