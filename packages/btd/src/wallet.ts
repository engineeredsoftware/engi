import {
  BitcoinNetwork,
  assertBitcoinNetwork,
  assertNonEmptyString,
} from './constants';

export type WalletSessionState = 'prepared' | 'authorized' | 'expired' | 'revoked' | 'failed';
export type WalletCapability = 'psbt_sign' | 'message_sign' | 'asset_pack_anchor' | 'rights_transfer';
export type WalletAuthorizationProofKind = 'message_signature' | 'wallet_provider_session';

export interface WalletAddressAuthorizationProof {
  proofKind: WalletAuthorizationProofKind;
  message: string;
  signature?: string;
  providerSessionId?: string;
  verifiedAt: string;
}

export interface WalletSignerSession {
  walletSessionId: string;
  walletId: string;
  userId: string;
  address: string;
  network: BitcoinNetwork;
  nonce: string;
  capabilities: WalletCapability[];
  state: WalletSessionState;
  serverCustody: false;
  authorizationProof?: WalletAddressAuthorizationProof;
  authorizedAt?: string;
  expiresAt?: string;
  failureReason?: string;
}

export function createWalletSignerSession(input: {
  walletSessionId: string;
  walletId: string;
  userId: string;
  address: string;
  network: BitcoinNetwork;
  nonce: string;
  capabilities: WalletCapability[];
  authorizationProof?: WalletAddressAuthorizationProof;
  authorizedAt?: string;
  expiresAt?: string;
}): WalletSignerSession {
  if (!input.capabilities.length) {
    throw new Error('Wallet signer session requires at least one capability.');
  }

  const authorizationProof = input.authorizationProof
    ? normalizeAuthorizationProof(input.authorizationProof)
    : undefined;

  return {
    walletSessionId: assertNonEmptyString(input.walletSessionId, 'walletSessionId'),
    walletId: assertNonEmptyString(input.walletId, 'walletId'),
    userId: assertNonEmptyString(input.userId, 'userId'),
    address: assertNonEmptyString(input.address, 'address'),
    network: assertBitcoinNetwork(input.network),
    nonce: assertNonEmptyString(input.nonce, 'nonce'),
    capabilities: [...input.capabilities],
    state: authorizationProof ? 'authorized' : 'prepared',
    serverCustody: false,
    authorizationProof,
    authorizedAt: authorizationProof ? input.authorizedAt ?? authorizationProof.verifiedAt : undefined,
    expiresAt: input.expiresAt,
    failureReason: authorizationProof ? undefined : 'address_authorization_required',
  };
}

export function assertWalletCanSign(
  session: WalletSignerSession,
  capability: WalletCapability,
  network = session.network,
): WalletSignerSession {
  if (session.serverCustody !== false) {
    throw new Error('Bitcode wallet sessions must not custody user private keys.');
  }

  if (session.state !== 'authorized') {
    throw new Error(`Wallet session is not authorized: ${session.state}.`);
  }

  if (!session.authorizationProof) {
    throw new Error('Wallet session requires address authorization proof.');
  }

  if (session.network !== network) {
    throw new Error(`Wallet session network mismatch: ${session.network} != ${network}.`);
  }

  if (!session.capabilities.includes(capability)) {
    throw new Error(`Wallet session is missing capability: ${capability}.`);
  }

  return session;
}

function normalizeAuthorizationProof(
  proof: WalletAddressAuthorizationProof,
): WalletAddressAuthorizationProof {
  const proofKind = proof.proofKind;
  if (proofKind !== 'message_signature' && proofKind !== 'wallet_provider_session') {
    throw new Error(`Unsupported wallet authorization proof: ${proofKind}.`);
  }

  if (proofKind === 'message_signature') {
    assertNonEmptyString(proof.signature, 'authorizationProof.signature');
  }

  if (proofKind === 'wallet_provider_session') {
    assertNonEmptyString(proof.providerSessionId, 'authorizationProof.providerSessionId');
  }

  return {
    proofKind,
    message: assertNonEmptyString(proof.message, 'authorizationProof.message'),
    signature: proof.signature,
    providerSessionId: proof.providerSessionId,
    verifiedAt: assertNonEmptyString(proof.verifiedAt, 'authorizationProof.verifiedAt'),
  };
}
