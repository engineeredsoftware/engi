import { BtdTokenId, assertNonEmptyString } from './constants';

export type BtdAccessDecisionKind = 'owner_read' | 'licensed_read' | 'denied';

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
  reason: string;
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
  const at = new Date(input.at ?? new Date().toISOString());
  assertPolicy(input.accessPolicy);

  const ownerClaim = (input.ownershipClaims ?? []).find(
    (claim) =>
      claim.walletId === walletId &&
      claim.assetPackId === assetPackId &&
      claim.accessPolicyHash === input.accessPolicy.accessPolicyHash,
  );

  if (ownerClaim && input.accessPolicy.ownerRead) {
    return {
      decision: 'owner_read',
      accessPolicyHash: input.accessPolicy.accessPolicyHash,
      reason: 'wallet_owns_policy_matching_range',
    };
  }

  const validLicense = (input.licenses ?? []).find(
    (license) =>
      license.walletId === walletId &&
      license.assetPackId === assetPackId &&
      license.accessPolicyHash === input.accessPolicy.accessPolicyHash &&
      !license.revokedAt &&
      new Date(license.validFrom) <= at &&
      (!license.expiresAt || new Date(license.expiresAt) > at),
  );

  if (validLicense && input.accessPolicy.licensedRead) {
    return {
      decision: 'licensed_read',
      accessPolicyHash: input.accessPolicy.accessPolicyHash,
      reason: 'wallet_has_valid_policy_matching_license',
    };
  }

  return {
    decision: 'denied',
    accessPolicyHash: input.accessPolicy.accessPolicyHash,
    reason: 'no_owner_or_valid_license',
  };
}

function assertPolicy(policy: BtdAccessPolicy): void {
  assertNonEmptyString(policy.accessPolicyId, 'accessPolicyId');
  assertNonEmptyString(policy.accessPolicyHash, 'accessPolicyHash');
}
