import { normalizeExternalRuntimePayload } from '@/app/application/application-external-runtime';

describe('application external runtime normalization', () => {
  it('returns null for unsupported payload shapes', () => {
    expect(normalizeExternalRuntimePayload(null)).toBeNull();
    expect(normalizeExternalRuntimePayload([])).toBeNull();
    expect(normalizeExternalRuntimePayload('bad-shape')).toBeNull();
  });

  it('normalizes active runtime payloads and counts runtime states correctly', () => {
    const snapshot = normalizeExternalRuntimePayload({
      activeRuntime: {
        configuredEnvironmentMode: 'development',
        actualityDisposition: 'mixed-external-realization',
        interfaceRuntimeStates: [
          {
            interfaceId: 'github-live-interface',
            runtimeState: 'live-configured',
            resultClass: 'configuration-live-ready',
            reconciliationState: 'configuration-ready-awaiting-observation',
            telemetryCoverageState: 'shape-complete-live-execution-pending',
            liveEnabled: true,
            missingBindingKeys: [],
            missingSecretEnvKeys: [],
            environmentIdentityRef: 'github-app://bitcode/development',
            environmentResourceRef: 'github-installation://bitcode/development',
          },
          {
            interfaceId: 'bitcoin-mainchain-execution',
            runtimeState: 'live-misconfigured',
            resultClass: 'configuration-invalid',
            reconciliationState: 'misconfigured-blocking',
            telemetryCoverageState: 'shape-complete-blocking',
            liveEnabled: true,
            missingBindingKeys: ['executorUrl'],
            missingSecretEnvKeys: ['ENGI_V24_BITCOIN_MAINCHAIN_RPC_PASSWORD'],
            environmentIdentityRef: 'btc-dev-account',
            environmentResourceRef: 'tb1qbitcode',
          },
          {
            interfaceId: 'storage-container-execution',
            runtimeState: 'stubbed-demonstration',
            resultClass: 'stubbed-external-demonstration',
            reconciliationState: 'draft-target-artifact-emission-only',
            telemetryCoverageState: 'shape-complete-implementation-pending',
            liveEnabled: false,
            missingBindingKeys: [],
            missingSecretEnvKeys: [],
          },
          {
            interfaceId: 'sidechain-execution',
            runtimeState: 'mock',
            resultClass: 'deterministic-mock-only',
            reconciliationState: 'mock-parity-only',
            telemetryCoverageState: 'shape-complete-implementation-pending',
            liveEnabled: false,
            missingBindingKeys: [],
            missingSecretEnvKeys: [],
          },
        ],
      },
    });

    expect(snapshot).not.toBeNull();
    expect(snapshot?.configuredEnvironmentMode).toBe('development');
    expect(snapshot?.actualityDisposition).toBe('mixed-external-realization');
    expect(snapshot?.counts).toEqual({
      total: 4,
      liveConfigured: 1,
      liveMisconfigured: 1,
      boundaryOnly: 1,
      mock: 1,
      blocking: 1,
    });
    expect(snapshot?.interfaces[0]?.label).toBe('GitHub');
    expect(snapshot?.interfaces[1]?.blocking).toBe(true);
    expect(snapshot?.interfaces[1]?.missingBindingKeys).toEqual(['executorUrl']);
  });

  it('accepts direct active-runtime-shaped payloads as well', () => {
    const snapshot = normalizeExternalRuntimePayload({
      configuredEnvironmentMode: 'mock',
      actualityDisposition: 'deterministic-mock-only',
      interfaceRuntimeStates: [
        {
          interfaceId: 'compute-container-execution',
          runtimeState: 'mock',
          resultClass: 'deterministic-emulated-container',
          reconciliationState: 'mock-parity-only',
          telemetryCoverageState: 'shape-complete-implementation-pending',
          liveEnabled: false,
          missingBindingKeys: ['executorUrl'],
          missingSecretEnvKeys: [],
        },
      ],
    });

    expect(snapshot?.counts.total).toBe(1);
    expect(snapshot?.interfaces[0]?.label).toBe('Compute');
    expect(snapshot?.counts.mock).toBe(1);
    expect(snapshot?.counts.blocking).toBe(0);
    expect(snapshot?.interfaces[0]?.blocking).toBe(false);
  });
});
