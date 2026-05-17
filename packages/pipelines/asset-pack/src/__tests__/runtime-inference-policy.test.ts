import {
  isAssetPackRealInferenceEnabled,
  shouldUseAssetPackPtrr,
  shouldUseAssetPackPtrrForAgent,
} from '../runtime-inference-policy';

describe('AssetPack runtime inference policy', () => {
  it('keeps deterministic branches disabled by default', () => {
    const env = {} as NodeJS.ProcessEnv;

    expect(isAssetPackRealInferenceEnabled(env)).toBe(false);
    expect(shouldUseAssetPackPtrr('BITCODE_ASSET_PACK_SYNTHESIS_USE_PTRR', env)).toBe(false);
    expect(shouldUseAssetPackPtrrForAgent('BITCODE_ASSET_PACK_DISCOVERY_USE_PTRR', 'plan-implementation', env)).toBe(false);
  });

  it('enables all PTRR-capable branches through the commercial real-inference flag', () => {
    const env = { BITCODE_ASSET_PACK_REAL_INFERENCE: '1' } as NodeJS.ProcessEnv;

    expect(isAssetPackRealInferenceEnabled(env)).toBe(true);
    expect(shouldUseAssetPackPtrr('BITCODE_ASSET_PACK_SYNTHESIS_USE_PTRR', env)).toBe(true);
    expect(shouldUseAssetPackPtrrForAgent('BITCODE_ASSET_PACK_DISCOVERY_USE_PTRR', 'plan-implementation', env)).toBe(true);
  });

  it('keeps existing phase and per-agent PTRR flags for targeted diagnosis', () => {
    expect(
      shouldUseAssetPackPtrr('BITCODE_ASSET_PACK_READY_TO_INSTRUCT_USE_PTRR', {
        BITCODE_ASSET_PACK_READY_TO_INSTRUCT_USE_PTRR: 'true',
      } as NodeJS.ProcessEnv)
    ).toBe(true);
    expect(
      shouldUseAssetPackPtrrForAgent('BITCODE_ASSET_PACK_VALIDATION_USE_PTRR', 'last', {
        BITCODE_ASSET_PACK_VALIDATION_LAST_USE_PTRR: 'yes',
      } as NodeJS.ProcessEnv)
    ).toBe(true);
  });
});
