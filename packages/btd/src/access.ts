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
