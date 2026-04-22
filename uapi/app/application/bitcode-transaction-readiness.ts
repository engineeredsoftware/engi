export type BitcodeTransactionReadinessStatus =
  | 'sign-in-required'
  | 'repository-provider-pending'
  | 'wallet-binding-pending'
  | 'wallet-and-repository-pending'
  | 'repository-anchor-pending'
  | 'wallet-verification-pending'
  | 'ready';

export type BitcodeTransactionReadinessBlockerId =
  | 'sign-in'
  | 'repository-provider'
  | 'wallet-binding'
  | 'wallet-verification'
  | 'repository-anchor';

export interface BitcodeTransactionReadinessBlocker {
  id: BitcodeTransactionReadinessBlockerId;
  label: string;
}

export interface BitcodeTransactionReadinessInput {
  signedIn: boolean;
  hasRepositoryProvider: boolean;
  hasWalletBinding: boolean;
  hasVerifiedWalletBinding?: boolean;
  requiresRepositoryAnchor?: boolean;
  hasRepositoryAnchor?: boolean;
}

export interface BitcodeTransactionReadiness {
  status: BitcodeTransactionReadinessStatus;
  label: string;
  summary: string;
  nextAction: string;
  blockers: BitcodeTransactionReadinessBlocker[];
  canReview: true;
  canTransact: boolean;
  canSettle: boolean;
  signedIn: boolean;
  hasRepositoryProvider: boolean;
  hasWalletBinding: boolean;
  hasVerifiedWalletBinding: boolean;
  hasRepositoryAnchor: boolean;
  requiresRepositoryAnchor: boolean;
}

function blocker(id: BitcodeTransactionReadinessBlockerId, label: string): BitcodeTransactionReadinessBlocker {
  return { id, label };
}

export function deriveBitcodeTransactionReadiness(
  input: BitcodeTransactionReadinessInput,
): BitcodeTransactionReadiness {
  const requiresRepositoryAnchor = Boolean(input.requiresRepositoryAnchor);
  const hasRepositoryAnchor = requiresRepositoryAnchor ? Boolean(input.hasRepositoryAnchor) : true;
  const signedIn = Boolean(input.signedIn);
  const hasRepositoryProvider = Boolean(input.hasRepositoryProvider);
  const hasWalletBinding = Boolean(input.hasWalletBinding);
  const hasVerifiedWalletBinding = Boolean(input.hasVerifiedWalletBinding);

  let status: BitcodeTransactionReadinessStatus = 'ready';
  let label = 'ready';
  let summary =
    'Wallet identity, signing capability, and repository scope are ready. Bitcode can move from review into signed settlement and closure-bearing activity.';
  let nextAction = 'Transact, sign, or settle from the Bitcode Terminal.';
  let blockers: BitcodeTransactionReadinessBlocker[] = [];

  if (!signedIn) {
    status = 'sign-in-required';
    label = 'sign-in required';
    summary =
      'Bitcode is in review-only mode. Sign in first, then bind wallet identity in Profile and repository scope in Connects before you transact, settle, or sign Bitcode activity.';
    nextAction = 'Sign in, then open Profile and Connects.';
    blockers = [
      blocker('sign-in', 'Operator sign-in'),
      blocker('wallet-binding', 'Wallet identity in Profile'),
      blocker('repository-provider', 'Repository scope in Connects'),
    ];
  } else if (!hasRepositoryProvider && !hasWalletBinding) {
    status = 'wallet-and-repository-pending';
    label = 'wallet + repository pending';
    summary =
      'Bitcode is in review-only mode. Bind wallet identity in Profile and attach GitHub or equivalent repository scope in Connects before you transact, settle, or sign Bitcode activity.';
    nextAction = 'Open Profile for wallet binding, then Connects for repository scope.';
    blockers = [
      blocker('wallet-binding', 'Wallet identity in Profile'),
      blocker('repository-provider', 'GitHub or equivalent repository scope in Connects'),
    ];
  } else if (!hasRepositoryProvider) {
    status = 'repository-provider-pending';
    label = 'repository pending';
    summary =
      'Bitcode is in review-only mode. Attach GitHub or equivalent repository scope in Connects before you transact, settle, or sign Bitcode activity.';
    nextAction = 'Open Connects and attach a repository provider.';
    blockers = [blocker('repository-provider', 'GitHub or equivalent repository scope in Connects')];
  } else if (!hasWalletBinding) {
    status = 'wallet-binding-pending';
    label = 'wallet pending';
    summary =
      'Bitcode is in review-only mode. Bind wallet identity in Profile before you transact, settle, or sign Bitcode activity.';
    nextAction = 'Open Profile and bind wallet identity.';
    blockers = [blocker('wallet-binding', 'Wallet identity in Profile')];
  } else if (!hasRepositoryAnchor) {
    status = 'repository-anchor-pending';
    label = 'repository anchor pending';
    summary =
      'Bitcode is in review-only mode. Select a repository anchor in the Bitcode Terminal before you transact, settle, or sign Bitcode activity.';
    nextAction = 'Choose a repository anchor inside the Bitcode Terminal.';
    blockers = [blocker('repository-anchor', 'Selected repository anchor in the Bitcode Terminal')];
  } else if (!hasVerifiedWalletBinding) {
    status = 'wallet-verification-pending';
    label = 'wallet verification pending';
    summary =
      'Bitcode can draft transaction-bearing activity from the wallet identity saved in Profile, but signed settlement remains staged until a verified wallet provider is connected.';
    nextAction = 'Keep drafting in the Bitcode Terminal or return to Profile when verified wallet-provider signing becomes available.';
    blockers = [blocker('wallet-verification', 'Verified wallet-provider signing access')];
  }

  return {
    status,
    label,
    summary,
    nextAction,
    blockers,
    canReview: true,
    canTransact: status === 'ready' || status === 'wallet-verification-pending',
    canSettle: status === 'ready',
    signedIn,
    hasRepositoryProvider,
    hasWalletBinding,
    hasVerifiedWalletBinding,
    hasRepositoryAnchor,
    requiresRepositoryAnchor,
  };
}
