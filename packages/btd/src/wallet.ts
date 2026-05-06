import {
  BitcoinNetwork,
  assertBitcoinNetwork,
  assertNonEmptyString,
} from './constants';

export type WalletSessionState = 'prepared' | 'authorized' | 'expired' | 'revoked' | 'failed';
export type WalletCapability = 'psbt_sign' | 'message_sign' | 'asset_pack_anchor' | 'rights_transfer';

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
  authorizedAt?: string;
  expiresAt?: string;
}): WalletSignerSession {
  if (!input.capabilities.length) {
    throw new Error('Wallet signer session requires at least one capability.');
  }

  return {
    walletSessionId: assertNonEmptyString(input.walletSessionId, 'walletSessionId'),
    walletId: assertNonEmptyString(input.walletId, 'walletId'),
    userId: assertNonEmptyString(input.userId, 'userId'),
    address: assertNonEmptyString(input.address, 'address'),
    network: assertBitcoinNetwork(input.network),
    nonce: assertNonEmptyString(input.nonce, 'nonce'),
    capabilities: [...input.capabilities],
    state: 'authorized',
    serverCustody: false,
    authorizedAt: input.authorizedAt ?? new Date().toISOString(),
    expiresAt: input.expiresAt,
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

  if (session.network !== network) {
    throw new Error(`Wallet session network mismatch: ${session.network} != ${network}.`);
  }

  if (!session.capabilities.includes(capability)) {
    throw new Error(`Wallet session is missing capability: ${capability}.`);
  }

  return session;
}
