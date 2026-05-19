import {
  BtdTokenId,
  assertNonEmptyString,
  assertNonNegativeSafeInteger,
} from './constants';

export type BtdAccessDecisionKind = 'owner_read' | 'licensed_read' | 'denied';

export type BtdAccessDecisionReason =
  | 'wallet_owns_policy_matching_range'
  | 'wallet_has_valid_policy_matching_license'
  | 'owner_read_disabled_by_policy'
  | 'licensed_read_disabled_by_policy'
  | 'license_not_yet_valid'
  | 'license_expired'
  | 'license_revoked'
  | 'policy_mismatch'
  | 'no_owner_or_valid_license';

export interface BtdAccessPolicy {
  accessPolicyId: string;
  accessPolicyHash: string;
  ownerRead: boolean;
  licensedRead: boolean;
  derivativeUse: boolean;
  redistributionAllowed: boolean;
  confidentiality: 'public_proof_private_source' | 'public' | 'private';
}

export type BtdAccessPolicyTemplateKind =
  | 'owner_read'
  | 'licensed_read'
  | 'derivative_use'
  | 'redistribution'
  | 'confidentiality'
  | 'dispute'
  | 'takedown';

export interface BtdAccessPolicyTemplate {
  kind: BtdAccessPolicyTemplateKind;
  label: string;
  policyPosture: string;
  requiredFields: string[];
  disclosure: string;
  prohibitedClaims: string[];
}

export interface BtdRegistryRangeProjection {
  assetPackId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  tokenCount: number;
  accessPolicyId: string;
  accessPolicyHash: string;
}

export interface BtdReadAccessRegistryProjection {
  assetPackId: string;
  range: BtdRegistryRangeProjection;
  accessPolicy: BtdAccessPolicy;
  ownershipClaims: BtdOwnershipClaim[];
  licenses: BtdReadLicense[];
}

export const BTD_ACCESS_POLICY_TEMPLATES: Record<
  BtdAccessPolicyTemplateKind,
  BtdAccessPolicyTemplate
> = {
  owner_read: {
    kind: 'owner_read',
    label: 'Owner read',
    policyPosture:
      'A wallet that owns the policy-matching AssetPack range can read private source under the committed policy hash.',
    requiredFields: ['accessPolicyId', 'accessPolicyHash', 'ownerRead', 'assetPackId', 'rangeStart', 'rangeEndExclusive'],
    disclosure:
      'Owner-read is a registry decision over range ownership and policy hash, not an aggregate balance threshold.',
    prohibitedClaims: [
      'price appreciation',
      'dividend',
      'copyright transfer',
      'marketplace royalty',
    ],
  },
  licensed_read: {
    kind: 'licensed_read',
    label: 'Licensed read',
    policyPosture:
      'A wallet with a valid, non-revoked read license for the policy-matching AssetPack can read private source.',
    requiredFields: ['licenseId', 'walletId', 'assetPackId', 'accessPolicyHash', 'validFrom'],
    disclosure:
      'Licensed-read is a registry decision over license state and policy hash, not a transferable ownership claim.',
    prohibitedClaims: [
      'price appreciation',
      'dividend',
      'copyright transfer',
      'marketplace royalty',
    ],
  },
  derivative_use: {
    kind: 'derivative_use',
    label: 'Derivative use',
    policyPosture:
      'Derivative use must be stated explicitly and remains bounded by the access policy attached to the AssetPack range.',
    requiredFields: ['accessPolicyId', 'derivativeUse'],
    disclosure:
      'Derivative rights are separate from read access and must not be implied by ownership or license visibility alone.',
    prohibitedClaims: ['copyright transfer', 'unbounded reuse'],
  },
  redistribution: {
    kind: 'redistribution',
    label: 'Redistribution',
    policyPosture:
      'Redistribution is disabled unless the committed policy explicitly allows it.',
    requiredFields: ['accessPolicyId', 'redistributionAllowed'],
    disclosure:
      'Redistribution posture is a policy field, not a default consequence of settlement.',
    prohibitedClaims: ['marketplace royalty', 'unbounded resale'],
  },
  confidentiality: {
    kind: 'confidentiality',
    label: 'Confidentiality',
    policyPosture:
      'Bounded-public proofs can be visible while private source remains hidden until owner-read or licensed-read passes.',
    requiredFields: ['accessPolicyId', 'confidentiality'],
    disclosure:
      'Public proof posture must not reveal licensed source by default.',
    prohibitedClaims: ['public source disclosure by implication'],
  },
  dispute: {
    kind: 'dispute',
    label: 'Dispute',
    policyPosture:
      'Dispute posture keeps settlement or read-license exceptions visible until repaired, approved, or resolved.',
    requiredFields: ['accessPolicyId', 'disputePosture'],
    disclosure:
      'Disputed facts block contradictory unlock or projection until the registry records a compatible repair or approval.',
    prohibitedClaims: ['automatic finality', 'silent override'],
  },
  takedown: {
    kind: 'takedown',
    label: 'Takedown',
    policyPosture:
      'Takedown posture records the conditions under which an AssetPack read path is paused, revoked, or escalated.',
    requiredFields: ['accessPolicyId', 'takedownPosture'],
    disclosure:
      'Takedown does not erase ledger history; it governs future read and delivery posture.',
    prohibitedClaims: ['history erasure', 'automatic copyright transfer'],
  },
};

export interface BtdOwnershipClaim {
  walletId: string;
  assetPackId: string;
  rangeStart: BtdTokenId;
  rangeEndExclusive: BtdTokenId;
  accessPolicyHash: string;
}

export interface BtdReadLicense {
  licenseId: string;
  walletId: string;
  assetPackId: string;
  accessPolicyHash: string;
  validFrom: string;
  expiresAt?: string;
  revokedAt?: string;
}

export interface BtdAccessDecision {
  decision: BtdAccessDecisionKind;
  accessPolicyHash: string;
  reason: BtdAccessDecisionReason;
}

export function listBtdAccessPolicyTemplates(): BtdAccessPolicyTemplate[] {
  return Object.values(BTD_ACCESS_POLICY_TEMPLATES);
}

export function assertBtdAccessPolicyTemplateCoverage(
  templates: BtdAccessPolicyTemplate[] = listBtdAccessPolicyTemplates(),
): BtdAccessPolicyTemplate[] {
  const observed = new Set(templates.map((template) => template.kind));
  const required: BtdAccessPolicyTemplateKind[] = [
    'owner_read',
    'licensed_read',
    'derivative_use',
    'redistribution',
    'confidentiality',
    'dispute',
    'takedown',
  ];

  for (const kind of required) {
    if (!observed.has(kind)) {
      throw new Error(`Missing BTD access policy template: ${kind}.`);
    }
  }

  return templates;
}

export function buildBtdReadAccessProjectionFromRegistryRows(input: {
  assetPackId: string;
  range: Record<string, unknown>;
  ownershipRows?: Record<string, unknown>[];
  licenseRows?: Record<string, unknown>[];
}): BtdReadAccessRegistryProjection {
  const assetPackId = assertNonEmptyString(input.assetPackId, 'assetPackId');
  const range = {
    assetPackId,
    rangeStart: readNumberField(input.range, 'range_start', 'rangeStart'),
    rangeEndExclusive: readNumberField(input.range, 'range_end_exclusive', 'rangeEndExclusive'),
    tokenCount: readNumberField(input.range, 'token_count', 'tokenCount'),
    accessPolicyId: readStringField(input.range, 'access_policy_id', 'accessPolicyId'),
    accessPolicyHash: readStringField(input.range, 'access_policy_hash', 'accessPolicyHash'),
  };

  if (range.rangeEndExclusive <= range.rangeStart) {
    throw new Error('registry range must be non-empty.');
  }

  if (range.tokenCount !== range.rangeEndExclusive - range.rangeStart) {
    throw new Error('registry range token count must match range boundaries.');
  }

  const accessPolicy = {
    accessPolicyId: range.accessPolicyId,
    accessPolicyHash: range.accessPolicyHash,
    ownerRead: readBooleanField(input.range, true, 'owner_read', 'ownerRead'),
    licensedRead: readBooleanField(input.range, true, 'licensed_read', 'licensedRead'),
    derivativeUse: readBooleanField(input.range, false, 'derivative_use', 'derivativeUse'),
    redistributionAllowed: readBooleanField(
      input.range,
      false,
      'redistribution_allowed',
      'redistributionAllowed',
    ),
    confidentiality: readConfidentialityField(input.range),
  } satisfies BtdAccessPolicy;

  return {
    assetPackId,
    range,
    accessPolicy,
    ownershipClaims: (input.ownershipRows ?? []).map((row) => ({
      walletId: readStringField(row, 'to_wallet_id', 'walletId'),
      assetPackId: readStringField(row, 'asset_pack_id', 'assetPackId'),
      rangeStart: readNumberField(row, 'range_start', 'rangeStart'),
      rangeEndExclusive: readNumberField(row, 'range_end_exclusive', 'rangeEndExclusive'),
      accessPolicyHash: readStringField(row, 'access_policy_hash', 'accessPolicyHash'),
    })),
    licenses: (input.licenseRows ?? []).map((row) => ({
      licenseId: readStringField(row, 'license_id', 'licenseId'),
      walletId: readStringField(row, 'wallet_id', 'walletId'),
      assetPackId: readStringField(row, 'asset_pack_id', 'assetPackId'),
      accessPolicyHash: readStringField(row, 'access_policy_hash', 'accessPolicyHash'),
      validFrom: readStringField(row, 'valid_from', 'validFrom'),
      expiresAt: readOptionalStringField(row, 'expires_at', 'expiresAt'),
      revokedAt: readOptionalStringField(row, 'revoked_at', 'revokedAt'),
    })),
  };
}

export function evaluateBtdReadAccess(input: {
  walletId: string;
  assetPackId: string;
  accessPolicy: BtdAccessPolicy;
  ownershipClaims?: BtdOwnershipClaim[];
  licenses?: BtdReadLicense[];
  at?: string;
}): BtdAccessDecision {
  const walletId = assertNonEmptyString(input.walletId, 'walletId');
  const assetPackId = assertNonEmptyString(input.assetPackId, 'assetPackId');
  const at = assertReceiptDate(input.at ?? new Date().toISOString(), 'at');
  assertPolicy(input.accessPolicy);
  const ownershipClaims = (input.ownershipClaims ?? []).map(assertOwnershipClaim);
  const licenses = (input.licenses ?? []).map(assertReadLicense);

  const ownerClaim = ownershipClaims.find(
    (claim) =>
      claim.walletId === walletId &&
      claim.assetPackId === assetPackId &&
      claim.accessPolicyHash === input.accessPolicy.accessPolicyHash,
  );

  if (ownerClaim) {
    if (!input.accessPolicy.ownerRead) {
      return denied(input.accessPolicy.accessPolicyHash, 'owner_read_disabled_by_policy');
    }

    return {
      decision: 'owner_read',
      accessPolicyHash: input.accessPolicy.accessPolicyHash,
      reason: 'wallet_owns_policy_matching_range',
    };
  }

  const policyMatchedLicenses = licenses.filter(
    (license) =>
      license.walletId === walletId &&
      license.assetPackId === assetPackId &&
      license.accessPolicyHash === input.accessPolicy.accessPolicyHash,
  );
  const validLicense = policyMatchedLicenses.find((license) => isValidLicenseAt(license, at));

  if (validLicense) {
    if (!input.accessPolicy.licensedRead) {
      return denied(input.accessPolicy.accessPolicyHash, 'licensed_read_disabled_by_policy');
    }

    return {
      decision: 'licensed_read',
      accessPolicyHash: input.accessPolicy.accessPolicyHash,
      reason: 'wallet_has_valid_policy_matching_license',
    };
  }

  const inactiveLicenseReason = policyMatchedLicenses
    .map((license) => inactiveLicenseReasonAt(license, at))
    .find((reason): reason is BtdAccessDecisionReason => Boolean(reason));
  if (inactiveLicenseReason) {
    return denied(input.accessPolicy.accessPolicyHash, inactiveLicenseReason);
  }

  const mismatchedPolicy = [...ownershipClaims, ...licenses].some(
    (entry) =>
      entry.walletId === walletId &&
      entry.assetPackId === assetPackId &&
      entry.accessPolicyHash !== input.accessPolicy.accessPolicyHash,
  );
  if (mismatchedPolicy) {
    return denied(input.accessPolicy.accessPolicyHash, 'policy_mismatch');
  }

  return denied(input.accessPolicy.accessPolicyHash, 'no_owner_or_valid_license');
}

function assertPolicy(policy: BtdAccessPolicy): void {
  assertNonEmptyString(policy.accessPolicyId, 'accessPolicyId');
  assertNonEmptyString(policy.accessPolicyHash, 'accessPolicyHash');
}

function assertOwnershipClaim(claim: BtdOwnershipClaim): BtdOwnershipClaim {
  assertNonEmptyString(claim.walletId, 'ownershipClaim.walletId');
  assertNonEmptyString(claim.assetPackId, 'ownershipClaim.assetPackId');
  assertNonEmptyString(claim.accessPolicyHash, 'ownershipClaim.accessPolicyHash');
  assertNonNegativeSafeInteger(claim.rangeStart, 'ownershipClaim.rangeStart');
  assertNonNegativeSafeInteger(claim.rangeEndExclusive, 'ownershipClaim.rangeEndExclusive');

  if (claim.rangeEndExclusive <= claim.rangeStart) {
    throw new Error('ownershipClaim range must be non-empty.');
  }

  return claim;
}

function assertReadLicense(license: BtdReadLicense): BtdReadLicense {
  assertNonEmptyString(license.licenseId, 'readLicense.licenseId');
  assertNonEmptyString(license.walletId, 'readLicense.walletId');
  assertNonEmptyString(license.assetPackId, 'readLicense.assetPackId');
  assertNonEmptyString(license.accessPolicyHash, 'readLicense.accessPolicyHash');
  assertReceiptDate(license.validFrom, 'readLicense.validFrom');

  if (license.expiresAt) {
    assertReceiptDate(license.expiresAt, 'readLicense.expiresAt');
  }

  if (license.revokedAt) {
    assertReceiptDate(license.revokedAt, 'readLicense.revokedAt');
  }

  return license;
}

function isValidLicenseAt(license: BtdReadLicense, at: Date): boolean {
  return !inactiveLicenseReasonAt(license, at);
}

function inactiveLicenseReasonAt(
  license: BtdReadLicense,
  at: Date,
): BtdAccessDecisionReason | null {
  if (license.revokedAt) {
    return 'license_revoked';
  }

  if (assertReceiptDate(license.validFrom, 'readLicense.validFrom') > at) {
    return 'license_not_yet_valid';
  }

  if (license.expiresAt && assertReceiptDate(license.expiresAt, 'readLicense.expiresAt') <= at) {
    return 'license_expired';
  }

  return null;
}

function assertReceiptDate(value: string, label: string): Date {
  const parsed = new Date(assertNonEmptyString(value, label));

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${label} must be a valid ISO timestamp.`);
  }

  return parsed;
}

function denied(
  accessPolicyHash: string,
  reason: BtdAccessDecisionReason,
): BtdAccessDecision {
  return {
    decision: 'denied',
    accessPolicyHash,
    reason,
  };
}

function readStringField(row: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  throw new Error(`${keys[0]} must be a non-empty string.`);
}

function readOptionalStringField(
  row: Record<string, unknown>,
  ...keys: string[]
): string | undefined {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

function readNumberField(row: Record<string, unknown>, ...keys: string[]): number {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'number' && Number.isSafeInteger(value)) {
      return value;
    }

    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value);
      if (Number.isSafeInteger(parsed)) {
        return parsed;
      }
    }
  }

  throw new Error(`${keys[0]} must be a safe integer.`);
}

function readBooleanField(
  row: Record<string, unknown>,
  fallback: boolean,
  ...keys: string[]
): boolean {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'boolean') {
      return value;
    }
  }

  return fallback;
}

function readConfidentialityField(
  row: Record<string, unknown>,
): BtdAccessPolicy['confidentiality'] {
  const value =
    readOptionalStringField(row, 'confidentiality') ?? 'public_proof_private_source';
  if (
    value === 'public_proof_private_source' ||
    value === 'public' ||
    value === 'private'
  ) {
    return value;
  }

  throw new Error('confidentiality must be a known BTD access confidentiality posture.');
}
