export type BitcodeTransactionReadinessStatus =
  | 'sign-in-required'
  | 'repository-provider-pending'
  | 'wallet-binding-pending'
  | 'wallet-and-repository-pending'
  | 'repository-anchor-pending'
  | 'ready';

export type BitcodeTransactionReadinessBlockerId =
  | 'sign-in'
  | 'repository-provider'
  | 'wallet-binding'
  | 'repository-anchor';

export interface BitcodeTransactionReadinessBlocker {
  id: BitcodeTransactionReadinessBlockerId;
  label: string;
}

export interface BitcodeTransactionReadinessInput {
  signedIn: boolean;
  hasRepositoryProvider: boolean;
  hasWalletBinding: boolean;
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

  let status: BitcodeTransactionReadinessStatus = 'ready';
  let label = 'ready';
  let summary =
    'Wallet identity and repository scope are ready. Bitcode can move from review into transaction-bearing settlement and signed activity.';
  let nextAction = 'Transact or settle from the Bitcode Terminal.';
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
  }

  return {
    status,
    label,
    summary,
    nextAction,
    blockers,
    canReview: true,
    canTransact: status === 'ready',
    canSettle: status === 'ready',
    signedIn,
    hasRepositoryProvider,
    hasWalletBinding,
    hasRepositoryAnchor,
    requiresRepositoryAnchor,
  };
}
