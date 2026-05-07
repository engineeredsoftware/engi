'use client';

type ExternalRuntimeRecord = Record<string, unknown>;

export type TerminalExternalRuntimeInterface = {
  interfaceId: string;
  label: string;
  runtimeState: string;
  resultClass: string;
  reconciliationState: string;
  telemetryCoverageState: string;
  liveEnabled: boolean;
  missingBindingKeys: string[];
  missingSecretEnvKeys: string[];
  environmentIdentityRef: string | null;
  environmentResourceRef: string | null;
  blocking: boolean;
};

export type TerminalExternalRuntimeSnapshot = {
  configuredEnvironmentMode: string;
  actualityDisposition: string;
  interfaces: TerminalExternalRuntimeInterface[];
  counts: {
    total: number;
    liveConfigured: number;
    liveMisconfigured: number;
    boundaryOnly: number;
    mock: number;
    blocking: number;
  };
};

const INTERFACE_LABELS: Record<string, string> = {
  'bitcoin-mainchain-execution': 'Bitcoin mainchain',
  'repeated-read-payment-execution': 'Repeated-read payment',
  'sidechain-execution': 'Sidechain',
  'compute-container-execution': 'Compute',
  'storage-container-execution': 'Storage',
  'github-live-interface': 'GitHub',
};

function asRecord(value: unknown): ExternalRuntimeRecord | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as ExternalRuntimeRecord;
}

function readString(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function readBoolean(value: unknown) {
  return value === true;
}

function readStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((entry) => readString(entry)).filter(Boolean);
}

export function labelForExternalInterface(interfaceId: string) {
  return INTERFACE_LABELS[interfaceId] || interfaceId;
}

export function normalizeExternalRuntimePayload(payload: unknown): TerminalExternalRuntimeSnapshot | null {
  const root = asRecord(payload);
  if (!root) return null;

  const runtime = asRecord(root.activeRuntime) || root;
  const rawStates = Array.isArray(runtime.interfaceRuntimeStates) ? runtime.interfaceRuntimeStates : [];

  const interfaces = rawStates
    .map((entry) => {
      const state = asRecord(entry);
      if (!state) return null;

      const interfaceId = readString(state.interfaceId);
      if (!interfaceId) return null;

      const runtimeState = readString(state.runtimeState, 'unknown');
      const liveEnabled = readBoolean(state.liveEnabled);
      const missingBindingKeys = readStringArray(state.missingBindingKeys);
      const missingSecretEnvKeys = readStringArray(state.missingSecretEnvKeys);

      return {
        interfaceId,
        label: labelForExternalInterface(interfaceId),
        runtimeState,
        resultClass: readString(state.resultClass, 'unclassified'),
        reconciliationState: readString(state.reconciliationState, 'unspecified'),
        telemetryCoverageState: readString(state.telemetryCoverageState, 'unspecified'),
        liveEnabled,
        missingBindingKeys,
        missingSecretEnvKeys,
        environmentIdentityRef: readString(state.environmentIdentityRef) || null,
        environmentResourceRef: readString(state.environmentResourceRef) || null,
        blocking:
          runtimeState === 'live-misconfigured'
          || (liveEnabled && (missingBindingKeys.length > 0 || missingSecretEnvKeys.length > 0)),
      } satisfies TerminalExternalRuntimeInterface;
    })
    .filter((entry): entry is TerminalExternalRuntimeInterface => Boolean(entry));

  const liveConfigured = interfaces.filter((entry) => entry.runtimeState === 'live-configured').length;
  const liveMisconfigured = interfaces.filter((entry) => entry.runtimeState === 'live-misconfigured').length;
  const boundaryOnly = interfaces.filter((entry) =>
    ['stubbed-demonstration', 'nonexecuting-preview'].includes(entry.runtimeState),
  ).length;
  const mock = interfaces.filter((entry) => entry.runtimeState === 'mock').length;
  const blocking = interfaces.filter((entry) => entry.blocking).length;

  return {
    configuredEnvironmentMode: readString(runtime.configuredEnvironmentMode, 'mock'),
    actualityDisposition: readString(runtime.actualityDisposition, 'deterministic-mock-only'),
    interfaces,
    counts: {
      total: interfaces.length,
      liveConfigured,
      liveMisconfigured,
      boundaryOnly,
      mock,
      blocking,
    },
  };
}
