const TRUE_VALUES = new Set(['1', 'true', 'yes', 'on']);

function isEnabled(value: string | undefined): boolean {
  return TRUE_VALUES.has(String(value || '').trim().toLowerCase());
}

function namespacedAgentFlag(prefix: string, agent: string): string {
  return `${prefix}_${agent.toUpperCase().replace(/[^A-Z0-9]+/g, '_')}_USE_PTRR`;
}

export function isAssetPackRealInferenceEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return isEnabled(env.BITCODE_ASSET_PACK_REAL_INFERENCE);
}

export function shouldUseAssetPackPtrr(flagName: string, env: NodeJS.ProcessEnv = process.env): boolean {
  return isAssetPackRealInferenceEnabled(env) || isEnabled(env[flagName]);
}

export function shouldUseAssetPackPtrrForAgent(
  globalFlagName: string,
  agent: string,
  env: NodeJS.ProcessEnv = process.env
): boolean {
  return (
    isAssetPackRealInferenceEnabled(env) ||
    isEnabled(env[globalFlagName]) ||
    isEnabled(env[namespacedAgentFlag(globalFlagName.replace(/_USE_PTRR$/, ''), agent)])
  );
}
