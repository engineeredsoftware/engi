import type {
  BitcodeActivityRecord,
  BitcodeActivityScope,
} from '@/components/base/bitcode/activity/bitcode-activity-model';

export type PackActivityType =
  | 'deposit-option'
  | 'depository-assetpack'
  | 'read-need-fit-preview'
  | 'settled-assetpack'
  | 'settlement'
  | 'compensation'
  | 'delivery'
  | 'repair'
  | 'execution'
  | 'notification';

export type PackActivitySortKey =
  | 'timestamp'
  | 'title'
  | 'value'
  | 'settlementState'
  | 'compensationState'
  | 'deliveryState'
  | 'repairState';

export type PackActivitySortDirection = 'asc' | 'desc';

export interface PackActivityMeasurement {
  id: string;
  label: string;
  value: number | string;
  unit: string | null;
  root: string | null;
}

export interface PackActivityValue {
  id: string;
  label: string;
  amount: number | string;
  unit: string;
}

export interface PackActivityProofRoot {
  id: string;
  label: string;
  root: string;
}

export interface PackActivitySourceSafety {
  sourceSafeMetadataOnly: true;
  protectedSourceVisible: false;
  unpaidAssetPackSourceVisible: false;
  rawPromptVisible: false;
  interpolatedPromptVisible: false;
  rawProviderResponseVisible: false;
  sourceSnippetVisible: false;
}

export interface PackActivityRecord {
  id: string;
  type: PackActivityType;
  scope: BitcodeActivityScope;
  title: string;
  description: string;
  timestamp: string | null;
  state: string | null;
  repository: string | null;
  assetPackTitle: string | null;
  settlementState: string | null;
  compensationState: string | null;
  deliveryState: string | null;
  repairState: string | null;
  measurements: PackActivityMeasurement[];
  values: PackActivityValue[];
  proofRoots: PackActivityProofRoot[];
  sourceSafety: PackActivitySourceSafety;
  metadata: Record<string, unknown>;
}

export interface PackActivityFilters {
  type?: PackActivityType | 'all';
  scope?: BitcodeActivityScope | 'all';
  state?: string | 'all';
  settlementState?: string | 'all';
  compensationState?: string | 'all';
  deliveryState?: string | 'all';
  repairState?: string | 'all';
  repository?: string | 'all';
}

export interface PackActivityQuery {
  search?: string | null;
  filters?: PackActivityFilters;
  sort?: {
    key?: PackActivitySortKey;
    direction?: PackActivitySortDirection;
  };
}

export interface PackActivityDetailProjection {
  id: string;
  type: PackActivityType;
  title: string;
  description: string;
  timestamp: string | null;
  sourceSafety: PackActivitySourceSafety;
  overview: {
    state: string | null;
    scope: BitcodeActivityScope;
    repository: string | null;
    assetPackTitle: string | null;
  };
  measurements: PackActivityMeasurement[];
  values: PackActivityValue[];
  proofRoots: PackActivityProofRoot[];
  states: {
    settlement: string | null;
    compensation: string | null;
    delivery: string | null;
    repair: string | null;
  };
  telemetry: {
    sourceEventId: string;
    sourceKind: string | null;
    sourceChannel: string | null;
  };
  metadata: Record<string, unknown>;
}

export interface PackActivitySummary {
  total: number;
  types: Record<PackActivityType, number>;
  states: Record<string, number>;
  repositories: string[];
  settlementReady: number;
  compensationReady: number;
  deliveryReady: number;
  repairOpen: number;
}

const SOURCE_SAFETY: PackActivitySourceSafety = {
  sourceSafeMetadataOnly: true,
  protectedSourceVisible: false,
  unpaidAssetPackSourceVisible: false,
  rawPromptVisible: false,
  interpolatedPromptVisible: false,
  rawProviderResponseVisible: false,
  sourceSnippetVisible: false,
};

const PACK_ACTIVITY_TYPES: PackActivityType[] = [
  'deposit-option',
  'depository-assetpack',
  'read-need-fit-preview',
  'settled-assetpack',
  'settlement',
  'compensation',
  'delivery',
  'repair',
  'execution',
  'notification',
];

const SOURCE_BEARING_KEY_PATTERN =
  /(^|_|\b)(protectedsource|unpaidassetpacksource|sourcesnippet|sourcecode|sourcetext|sourcepayload|rawprompt|interpolatedprompt|rawresponse|providerresponse|rawproviderresponse|credential|secret|privatekey|walletprivate|filecontents|patch|diff|codebody)($|_|\b)/iu;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function readString(source: unknown, ...keys: string[]) {
  const record = asRecord(source);
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  }
  return null;
}

function findFirstString(source: unknown, keys: string[], depth = 0): string | null {
  if (depth > 7 || source === null || source === undefined) return null;
  if (Array.isArray(source)) {
    for (const item of source) {
      const found = findFirstString(item, keys, depth + 1);
      if (found) return found;
    }
    return null;
  }

  const record = asRecord(source);
  for (const key of keys) {
    const direct = readString(record, key);
    if (direct) return direct;
  }

  for (const value of Object.values(record)) {
    const found = findFirstString(value, keys, depth + 1);
    if (found) return found;
  }
  return null;
}

function findFirstNumber(source: unknown, keys: string[], depth = 0): number | null {
  if (depth > 7 || source === null || source === undefined) return null;
  if (Array.isArray(source)) {
    for (const item of source) {
      const found = findFirstNumber(item, keys, depth + 1);
      if (found !== null) return found;
    }
    return null;
  }

  const record = asRecord(source);
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim() && Number.isFinite(Number(value))) return Number(value);
  }

  for (const value of Object.values(record)) {
    const found = findFirstNumber(value, keys, depth + 1);
    if (found !== null) return found;
  }
  return null;
}

function normalizeLabel(value: string) {
  return value
    .replace(/([a-z])([A-Z])/gu, '$1 $2')
    .replace(/[-_]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()
    .replace(/^./u, (char) => char.toUpperCase());
}

function compareText(left: string | null | undefined, right: string | null | undefined) {
  const a = String(left || '');
  const b = String(right || '');
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function includesAny(text: string, tokens: string[]) {
  return tokens.some((token) => text.includes(token));
}

function inferPackActivityType(record: BitcodeActivityRecord): PackActivityType {
  const payload = asRecord(record.payload);
  const haystack = [
    record.kind,
    record.title,
    record.summary,
    record.state,
    readString(payload, 'type', 'status', 'kind', 'eventType'),
    findFirstString(payload, ['canonicalType', 'family', 'label', 'reviewStage']),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (includesAny(haystack, ['deposit option', 'deposit-option', 'option synthesis'])) return 'deposit-option';
  if (includesAny(haystack, ['depository assetpack', 'depository asset pack', 'deposit admission'])) return 'depository-assetpack';
  if (includesAny(haystack, ['finding fits', 'fits finding', 'read-fits', 'fit preview', 'assetpack preview'])) return 'read-need-fit-preview';
  if (includesAny(haystack, ['settled assetpack', 'settled asset pack', 'rights transfer'])) return 'settled-assetpack';
  if (includesAny(haystack, ['settlement', 'btc', 'finality'])) return 'settlement';
  if (includesAny(haystack, ['compensation', 'source-to-shares', 'shares allocation'])) return 'compensation';
  if (includesAny(haystack, ['delivery', 'pull request', 'pr delivery', 'repository delivery'])) return 'delivery';
  if (includesAny(haystack, ['repair', 'reconcile', 'reconciliation'])) return 'repair';
  return record.kind === 'notification' ? 'notification' : 'execution';
}

function inferRepository(record: BitcodeActivityRecord) {
  const payload = asRecord(record.payload);
  const snapshot = asRecord(payload.repo_snapshot ?? payload.repoSnapshot ?? payload.repositorySnapshot);
  const org = readString(snapshot, 'org', 'owner', 'organization');
  const repo = readString(snapshot, 'repo', 'name');
  if (org && repo) return `${org}/${repo}`;

  return (
    findFirstString(payload, [
      'repositoryFullName',
      'repositoryAnchor',
      'repository',
      'repoFullName',
      'repo',
    ]) || null
  );
}

function inferAssetPackTitle(record: BitcodeActivityRecord) {
  return (
    findFirstString(record.payload, [
      'assetPackTitle',
      'asset_pack_title',
      'packTitle',
      'title',
      'summary',
    ]) || (record.kind === 'notification' ? record.title : null)
  );
}

function buildMeasurements(record: BitcodeActivityRecord): PackActivityMeasurement[] {
  const payload = asRecord(record.payload);
  const measurements: PackActivityMeasurement[] = [];

  const candidates: Array<[string, string[], string | null]> = [
    ['measured-btd', ['measuredBtd', 'measured_btd', 'btdVolume', 'weightedRequestedVolume'], 'BTD'],
    ['token-total', ['total_tokens', 'tokenTotal', 'totalTokens'], 'tokens'],
    ['duration', ['duration_ms', 'durationMs', 'runtimeMs'], 'ms'],
    ['cost', ['total_cost', 'totalCost'], 'USD'],
    ['candidate-count', ['candidateCount', 'fitCandidateCount', 'targetKindCount'], 'count'],
    ['closure-criteria', ['closureCriteriaCount', 'closureCount'], 'count'],
  ];

  for (const [id, keys, unit] of candidates) {
    const value = findFirstNumber(payload, keys);
    if (value !== null) {
      measurements.push({ id, label: normalizeLabel(id), value, unit, root: null });
    }
  }

  const measurementRoot = findFirstString(payload, [
    'measurementRoot',
    'depositMeasurementRoot',
    'assetPackMeasurementRoot',
    'readNeedMeasurementRoot',
  ]);
  if (measurementRoot) {
    measurements.push({
      id: 'measurement-root',
      label: 'Measurement root',
      value: measurementRoot,
      unit: null,
      root: measurementRoot,
    });
  }

  return measurements;
}

function buildValues(record: BitcodeActivityRecord): PackActivityValue[] {
  const payload = asRecord(record.payload);
  const values: PackActivityValue[] = [];
  const candidates: Array<[string, string[], string]> = [
    ['btc-fee', ['btcFee', 'btc_fee', 'btcFeeSats', 'feeSats'], 'sats'],
    ['usd-equivalent', ['btcFeeUsdEquivalent', 'usdEquivalent', 'total_cost'], 'USD'],
    ['btd-potential', ['btdPotential', 'estimatedBtdPotential', 'measuredBtd'], 'BTD'],
    ['settlement-price', ['settlementPrice', 'quoteAmount', 'amountSats'], 'sats'],
  ];

  for (const [id, keys, unit] of candidates) {
    const value = findFirstNumber(payload, keys);
    if (value !== null) values.push({ id, label: normalizeLabel(id), amount: value, unit });
  }

  return values;
}

function collectProofRoots(source: unknown, roots = new Map<string, PackActivityProofRoot>(), depth = 0) {
  if (depth > 7 || source === null || source === undefined) return roots;

  if (Array.isArray(source)) {
    source.forEach((item) => collectProofRoots(item, roots, depth + 1));
    return roots;
  }

  const record = asRecord(source);
  for (const [key, value] of Object.entries(record)) {
    if (typeof value === 'string' && /(root|hash|receipt|witness|anchor)$/iu.test(key) && value.trim()) {
      const id = key.replace(/[^a-z0-9]+/giu, '-').toLowerCase();
      roots.set(`${id}:${value}`, {
        id,
        label: normalizeLabel(key),
        root: value.trim(),
      });
      continue;
    }

    if (value && typeof value === 'object') collectProofRoots(value, roots, depth + 1);
  }

  return roots;
}

function redactMetadata(source: unknown, depth = 0): unknown {
  if (depth > 5) return '[withheld:depth-limit]';
  if (source === null || source === undefined) return source;
  if (typeof source === 'string') return source.length > 500 ? `${source.slice(0, 500)}...` : source;
  if (typeof source === 'number' || typeof source === 'boolean') return source;
  if (Array.isArray(source)) return source.slice(0, 40).map((item) => redactMetadata(item, depth + 1));

  const record = asRecord(source);
  const redacted: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    const normalizedKey = key.replace(/[^a-z0-9]/giu, '').toLowerCase();
    if (SOURCE_BEARING_KEY_PATTERN.test(normalizedKey)) {
      redacted[key] = '[withheld:source-safe]';
      continue;
    }
    redacted[key] = redactMetadata(value, depth + 1);
  }
  return redacted;
}

function readState(record: BitcodeActivityRecord, keys: string[]) {
  return findFirstString(record.payload, keys);
}

export function normalizePackActivityRecord(record: BitcodeActivityRecord): PackActivityRecord {
  const type = inferPackActivityType(record);
  const metadata = redactMetadata(record.payload) as Record<string, unknown>;
  const settlementState = readState(record, ['settlementState', 'settlement_state', 'finalityState']);
  const compensationState = readState(record, ['compensationState', 'compensation_state', 'sourceToSharesState']);
  const deliveryState = readState(record, ['deliveryState', 'delivery_state', 'pullRequestState']);
  const repairState = readState(record, ['repairState', 'repair_state', 'reconciliationState']);

  return {
    id: record.id,
    type,
    scope: record.scope,
    title: record.title || normalizeLabel(type),
    description: record.summary || 'Pack activity',
    timestamp: record.timestamp,
    state: record.state,
    repository: inferRepository(record),
    assetPackTitle: inferAssetPackTitle(record),
    settlementState,
    compensationState,
    deliveryState,
    repairState,
    measurements: buildMeasurements(record),
    values: buildValues(record),
    proofRoots: [...collectProofRoots(record.payload).values()].slice(0, 24),
    sourceSafety: SOURCE_SAFETY,
    metadata,
  };
}

export function assertPackActivitySourceSafe(record: PackActivityRecord | PackActivityDetailProjection) {
  const serialized = JSON.stringify(record).toLowerCase();
  const unsafeNeedles = [
    'protected source body',
    'unpaid assetpack source',
    'raw prompt text',
    'interpolated prompt text',
    'raw provider response',
    'source snippet',
  ];

  return (
    record.sourceSafety.sourceSafeMetadataOnly === true &&
    record.sourceSafety.protectedSourceVisible === false &&
    record.sourceSafety.unpaidAssetPackSourceVisible === false &&
    record.sourceSafety.rawPromptVisible === false &&
    record.sourceSafety.interpolatedPromptVisible === false &&
    record.sourceSafety.rawProviderResponseVisible === false &&
    record.sourceSafety.sourceSnippetVisible === false &&
    unsafeNeedles.every((needle) => !serialized.includes(needle))
  );
}

function matchesFilter(value: string | null, filter: string | undefined) {
  return !filter || filter === 'all' || String(value || '') === filter;
}

function buildSearchText(record: PackActivityRecord) {
  return [
    record.id,
    record.type,
    record.title,
    record.description,
    record.state,
    record.repository,
    record.assetPackTitle,
    record.settlementState,
    record.compensationState,
    record.deliveryState,
    record.repairState,
    ...record.measurements.flatMap((measurement) => [
      measurement.id,
      measurement.label,
      String(measurement.value),
      measurement.unit,
      measurement.root,
    ]),
    ...record.values.flatMap((value) => [value.id, value.label, String(value.amount), value.unit]),
    ...record.proofRoots.flatMap((proofRoot) => [proofRoot.id, proofRoot.label, proofRoot.root]),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function filterPackActivityRecords(
  records: PackActivityRecord[],
  filters: PackActivityFilters = {},
  search?: string | null,
) {
  const normalizedSearch = String(search || '').trim().toLowerCase();
  return records.filter((record) => {
    if (filters.type && filters.type !== 'all' && record.type !== filters.type) return false;
    if (filters.scope && filters.scope !== 'all' && record.scope !== filters.scope) return false;
    if (!matchesFilter(record.state, filters.state)) return false;
    if (!matchesFilter(record.settlementState, filters.settlementState)) return false;
    if (!matchesFilter(record.compensationState, filters.compensationState)) return false;
    if (!matchesFilter(record.deliveryState, filters.deliveryState)) return false;
    if (!matchesFilter(record.repairState, filters.repairState)) return false;
    if (!matchesFilter(record.repository, filters.repository)) return false;
    if (normalizedSearch && !buildSearchText(record).includes(normalizedSearch)) return false;
    return true;
  });
}

export function sortPackActivityRecords(
  records: PackActivityRecord[],
  sort: PackActivityQuery['sort'] = {},
) {
  const key = sort?.key || 'timestamp';
  const direction = sort?.direction || 'desc';
  const multiplier = direction === 'asc' ? 1 : -1;

  return [...records].sort((left, right) => {
    if (key === 'value') {
      const leftValue = left.values[0]?.amount ?? left.measurements[0]?.value ?? 0;
      const rightValue = right.values[0]?.amount ?? right.measurements[0]?.value ?? 0;
      return (Number(leftValue) - Number(rightValue)) * multiplier;
    }

    const leftText =
      key === 'title'
        ? left.title
        : key === 'settlementState'
          ? left.settlementState
          : key === 'compensationState'
            ? left.compensationState
            : key === 'deliveryState'
              ? left.deliveryState
              : key === 'repairState'
                ? left.repairState
                : left.timestamp;
    const rightText =
      key === 'title'
        ? right.title
        : key === 'settlementState'
          ? right.settlementState
          : key === 'compensationState'
            ? right.compensationState
            : key === 'deliveryState'
              ? right.deliveryState
              : key === 'repairState'
                ? right.repairState
                : right.timestamp;
    return compareText(leftText, rightText) * multiplier || compareText(left.id, right.id);
  });
}

export function buildPackActivityDetailProjection(
  record: PackActivityRecord,
): PackActivityDetailProjection {
  return {
    id: record.id,
    type: record.type,
    title: record.title,
    description: record.description,
    timestamp: record.timestamp,
    sourceSafety: record.sourceSafety,
    overview: {
      state: record.state,
      scope: record.scope,
      repository: record.repository,
      assetPackTitle: record.assetPackTitle,
    },
    measurements: record.measurements,
    values: record.values,
    proofRoots: record.proofRoots,
    states: {
      settlement: record.settlementState,
      compensation: record.compensationState,
      delivery: record.deliveryState,
      repair: record.repairState,
    },
    telemetry: {
      sourceEventId: record.id,
      sourceKind: String(record.metadata.kind || record.metadata.type || '') || null,
      sourceChannel: String(record.metadata.channel || '') || null,
    },
    metadata: record.metadata,
  };
}

export function summarizePackActivityRecords(records: PackActivityRecord[]): PackActivitySummary {
  const types = Object.fromEntries(PACK_ACTIVITY_TYPES.map((type) => [type, 0])) as Record<
    PackActivityType,
    number
  >;
  const states: Record<string, number> = {};
  const repositories = new Set<string>();

  for (const record of records) {
    types[record.type] += 1;
    if (record.state) states[record.state] = (states[record.state] || 0) + 1;
    if (record.repository) repositories.add(record.repository);
  }

  return {
    total: records.length,
    types,
    states,
    repositories: [...repositories].sort(compareText),
    settlementReady: records.filter((record) => /ready|settled|final/i.test(record.settlementState || '')).length,
    compensationReady: records.filter((record) => /ready|allocated|paid/i.test(record.compensationState || '')).length,
    deliveryReady: records.filter((record) => /ready|delivered|pull/i.test(record.deliveryState || '')).length,
    repairOpen: records.filter((record) => /open|repair|reconcile|failed/i.test(record.repairState || '')).length,
  };
}

export function queryPackActivityRecords(records: PackActivityRecord[], query: PackActivityQuery = {}) {
  const filtered = filterPackActivityRecords(records, query.filters || {}, query.search);
  const sorted = sortPackActivityRecords(filtered, query.sort || {});
  return {
    records: sorted,
    summary: summarizePackActivityRecords(sorted),
    query: {
      search: query.search || '',
      filters: query.filters || {},
      sort: {
        key: query.sort?.key || 'timestamp',
        direction: query.sort?.direction || 'desc',
      },
    },
  };
}
