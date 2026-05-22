import { createHash } from 'crypto';
import { assertNonEmptyString } from './constants';
import {
  BTD_INTERFACE_INTEGRATION_REQUIRED_OBJECT_FAMILIES,
  BTD_INTERFACE_INTEGRATION_REQUIRED_SURFACES,
  type BtdInterfaceIntegrationObjectFamily,
  type BtdInterfaceIntegrationRecordInput,
  type BtdInterfaceIntegrationSurface,
} from './interface-integration-contract';
import type { BtdProtocolTelemetrySourceSafety } from './telemetry';

export {
  BTD_INTERFACE_INTEGRATION_REQUIRED_OBJECT_FAMILIES,
  BTD_INTERFACE_INTEGRATION_REQUIRED_SURFACES,
  type BtdInterfaceIntegrationObjectFamily,
  type BtdInterfaceIntegrationRecordInput,
  type BtdInterfaceIntegrationSurface,
} from './interface-integration-contract';

export interface BtdInterfaceIntegrationRecord {
  kind: 'btd.interface_integration_record';
  surface: BtdInterfaceIntegrationSurface;
  consumerId: string;
  packageExport: string;
  adapterPath: string;
  objectFamilies: BtdInterfaceIntegrationObjectFamily[];
  proofRoot: string;
  packageOwned: true;
  routeLocalReimplementation: false;
  sourceSafeLowDetailIntact: true;
  transactionCockpitRegression: false;
  notes: string[];
  sourceSafety: BtdProtocolTelemetrySourceSafety;
  recordRoot: string;
  issuedAt: string;
}

export interface BtdInterfaceIntegrationRegressionProofInput {
  proofId?: string;
  records: BtdInterfaceIntegrationRecordInput[];
  requiredSurfaces?: readonly BtdInterfaceIntegrationSurface[];
  requiredObjectFamilies?: readonly BtdInterfaceIntegrationObjectFamily[];
  lowDetailProofRoot: string;
  transactionCockpitProofRoot: string;
  issuedAt?: string;
}

export interface BtdInterfaceIntegrationCoverage<T extends string> {
  required: T[];
  observed: T[];
  missing: T[];
}

export interface BtdInterfaceIntegrationRegressionProof {
  kind: 'btd.interface_integration_regression_proof';
  proofId: string;
  records: BtdInterfaceIntegrationRecord[];
  coverage: {
    surfaces: BtdInterfaceIntegrationCoverage<BtdInterfaceIntegrationSurface>;
    objectFamilies: BtdInterfaceIntegrationCoverage<BtdInterfaceIntegrationObjectFamily>;
    recordCount: number;
  };
  packageOwned: true;
  routeLocalReimplementation: false;
  sourceSafeLowDetailIntact: true;
  transactionCockpitRegression: false;
  lowDetailProofRoot: string;
  transactionCockpitProofRoot: string;
  sourceSafety: BtdProtocolTelemetrySourceSafety;
  proofRoot: string;
  issuedAt: string;
}

const SOURCE_SAFETY: BtdProtocolTelemetrySourceSafety = {
  sourceSafe: true,
  protectedSourceVisible: false,
  containsProtectedSource: false,
  containsSecret: false,
};

const SECRET_OR_SOURCE_PATTERNS = [
  new RegExp(`sb_${'secret'}__`, 'iu'),
  /\bsk-(?:proj|live|test)?[-_A-Za-z0-9]{16,}\b/u,
  /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/u,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/u,
  /\bprotected\s+source\b/iu,
  /\bprivate\s+source\b/iu,
  /\braw\s+source\b/iu,
];

export function buildBtdInterfaceIntegrationRecord(
  input: BtdInterfaceIntegrationRecordInput,
): BtdInterfaceIntegrationRecord {
  const surface = assertInterfaceSurface(input.surface);
  const objectFamilies = assertObjectFamilies(input.objectFamilies);
  if (input.packageOwned !== true) {
    throw new Error('Interface integration records must consume package-owned objects.');
  }
  if (input.routeLocalReimplementation !== false) {
    throw new Error('Interface integration records must not admit route-local reimplementation.');
  }
  if (input.sourceSafeLowDetailIntact !== true) {
    throw new Error('Interface integration records must preserve source-safe low-detail UX.');
  }
  if (input.transactionCockpitRegression !== false) {
    throw new Error('Interface integration records must prove no transaction cockpit regression.');
  }

  const consumerId = assertSourceSafeString(input.consumerId, 'consumerId');
  const packageExport = assertSourceSafeString(input.packageExport, 'packageExport');
  const adapterPath = assertSourceSafeString(input.adapterPath, 'adapterPath');
  const proofRoot = assertSourceSafeString(input.proofRoot, 'proofRoot');
  const notes = (input.notes ?? []).map((note) => assertSourceSafeString(note, 'note'));
  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const recordRoot = stableInterfaceIntegrationRoot('btd-interface-integration-record', [
    surface,
    consumerId,
    packageExport,
    adapterPath,
    objectFamilies.join(','),
    proofRoot,
  ]);

  return {
    kind: 'btd.interface_integration_record',
    surface,
    consumerId,
    packageExport,
    adapterPath,
    objectFamilies,
    proofRoot,
    packageOwned: true,
    routeLocalReimplementation: false,
    sourceSafeLowDetailIntact: true,
    transactionCockpitRegression: false,
    notes,
    sourceSafety: { ...SOURCE_SAFETY },
    recordRoot,
    issuedAt,
  };
}

export function buildBtdInterfaceIntegrationRegressionProof(
  input: BtdInterfaceIntegrationRegressionProofInput,
): BtdInterfaceIntegrationRegressionProof {
  if (!input.records.length) {
    throw new Error('Interface integration regression proof requires at least one record.');
  }

  const issuedAt = input.issuedAt ?? new Date().toISOString();
  const records = input.records.map((record) =>
    buildBtdInterfaceIntegrationRecord({ ...record, issuedAt: record.issuedAt ?? issuedAt }),
  );
  const requiredSurfaces = [
    ...(input.requiredSurfaces ?? BTD_INTERFACE_INTEGRATION_REQUIRED_SURFACES),
  ];
  const requiredObjectFamilies = [
    ...(input.requiredObjectFamilies ?? BTD_INTERFACE_INTEGRATION_REQUIRED_OBJECT_FAMILIES),
  ];
  const surfaceCoverage = coverage(requiredSurfaces, records.map((record) => record.surface));
  const objectFamilyCoverage = coverage(
    requiredObjectFamilies,
    records.flatMap((record) => record.objectFamilies),
  );

  if (surfaceCoverage.missing.length) {
    throw new Error(
      `Interface integration regression proof is missing surfaces: ${surfaceCoverage.missing.join(', ')}.`,
    );
  }
  if (objectFamilyCoverage.missing.length) {
    throw new Error(
      `Interface integration regression proof is missing object families: ${objectFamilyCoverage.missing.join(', ')}.`,
    );
  }

  const lowDetailProofRoot = assertSourceSafeString(input.lowDetailProofRoot, 'lowDetailProofRoot');
  const transactionCockpitProofRoot = assertSourceSafeString(
    input.transactionCockpitProofRoot,
    'transactionCockpitProofRoot',
  );
  const proofRoot = stableInterfaceIntegrationRoot('btd-interface-integration-proof-root', [
    ...records.map((record) => record.recordRoot),
    lowDetailProofRoot,
    transactionCockpitProofRoot,
  ]);
  const proofId =
    input.proofId ??
    stableInterfaceIntegrationRoot('btd-interface-integration-proof', [proofRoot]);

  return {
    kind: 'btd.interface_integration_regression_proof',
    proofId,
    records,
    coverage: {
      surfaces: surfaceCoverage,
      objectFamilies: objectFamilyCoverage,
      recordCount: records.length,
    },
    packageOwned: true,
    routeLocalReimplementation: false,
    sourceSafeLowDetailIntact: true,
    transactionCockpitRegression: false,
    lowDetailProofRoot,
    transactionCockpitProofRoot,
    sourceSafety: { ...SOURCE_SAFETY },
    proofRoot,
    issuedAt,
  };
}

function coverage<T extends string>(required: readonly T[], observed: readonly T[]) {
  const observedUnique = Array.from(new Set(observed)).sort() as T[];
  const observedSet = new Set(observedUnique);
  return {
    required: [...required],
    observed: observedUnique,
    missing: required.filter((item) => !observedSet.has(item)),
  };
}

function assertInterfaceSurface(surface: string): BtdInterfaceIntegrationSurface {
  if (!BTD_INTERFACE_INTEGRATION_REQUIRED_SURFACES.includes(surface as BtdInterfaceIntegrationSurface)) {
    throw new Error(`Unsupported interface integration surface: ${surface}.`);
  }

  return surface as BtdInterfaceIntegrationSurface;
}

function assertObjectFamilies(
  objectFamilies: readonly BtdInterfaceIntegrationObjectFamily[],
): BtdInterfaceIntegrationObjectFamily[] {
  if (!Array.isArray(objectFamilies) || objectFamilies.length === 0) {
    throw new Error('Interface integration record requires at least one object family.');
  }

  const deduped = Array.from(new Set(objectFamilies));
  for (const family of deduped) {
    if (!BTD_INTERFACE_INTEGRATION_REQUIRED_OBJECT_FAMILIES.includes(family)) {
      throw new Error(`Unsupported interface integration object family: ${family}.`);
    }
  }

  return deduped.sort();
}

function assertSourceSafeString(value: unknown, label: string): string {
  const text = assertNonEmptyString(value, label);
  if (SECRET_OR_SOURCE_PATTERNS.some((pattern) => pattern.test(text))) {
    throw new Error(`${label} must not contain secrets or protected source.`);
  }

  return text;
}

function stableInterfaceIntegrationRoot(prefix: string, parts: string[]): string {
  const hash = createHash('sha256').update(parts.join('\u001f')).digest('hex').slice(0, 24);
  return `${prefix}:${hash}`;
}
