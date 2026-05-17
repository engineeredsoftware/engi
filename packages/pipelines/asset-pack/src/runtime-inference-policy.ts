const TRUE_VALUES = new Set(['1', 'true', 'yes', 'on']);
const FULL_PROFILE_VALUES = new Set(['full', 'full-ptrr', 'heavyweight', 'exhaustive']);
const BOUNDED_PROFILE_VALUES = new Set(['bounded', 'critical', 'route', 'streaming']);

function isEnabled(value: string | undefined): boolean {
  return TRUE_VALUES.has(String(value || '').trim().toLowerCase());
}

function normalizedProfile(env: NodeJS.ProcessEnv): string {
  return String(env.BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE || '').trim().toLowerCase();
}

function namespacedAgentFlag(prefix: string, agent: string): string {
  return `${prefix}_${agent.toUpperCase().replace(/[^A-Z0-9]+/g, '_')}_USE_PTRR`;
}

export function isAssetPackRealInferenceEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return isEnabled(env.BITCODE_ASSET_PACK_REAL_INFERENCE);
}

export function isAssetPackBoundedRealInferenceProfile(env: NodeJS.ProcessEnv = process.env): boolean {
  return isAssetPackRealInferenceEnabled(env) && BOUNDED_PROFILE_VALUES.has(normalizedProfile(env));
}

export function isAssetPackFullPtrrInferenceProfile(env: NodeJS.ProcessEnv = process.env): boolean {
  return isAssetPackRealInferenceEnabled(env) && (
    !normalizedProfile(env) || FULL_PROFILE_VALUES.has(normalizedProfile(env))
  );
}

export function shouldUseAssetPackPtrr(flagName: string, env: NodeJS.ProcessEnv = process.env): boolean {
  return isAssetPackFullPtrrInferenceProfile(env) || isEnabled(env[flagName]);
}

export function shouldUseAssetPackPtrrForAgent(
  globalFlagName: string,
  agent: string,
  env: NodeJS.ProcessEnv = process.env
): boolean {
  return (
    isAssetPackFullPtrrInferenceProfile(env) ||
    isEnabled(env[globalFlagName]) ||
    isEnabled(env[namespacedAgentFlag(globalFlagName.replace(/_USE_PTRR$/, ''), agent)])
  );
}
