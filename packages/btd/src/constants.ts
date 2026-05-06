export const BTD_ASSET_SEMANTICS = 'non_fungible_asset_pack_share_read_right' as const;
export const BITCODE_FEE_ASSET = 'BTC' as const;
export const BTD_MAX_MINTABLE_SUPPLY = 21_000_000 as const;
export const BTD_QUANTIZATION_Q = 1_000n;

export const BITCODE_PRIMARY_LEDGER_CHAIN = 'bitcoin' as const;
export const BITCODE_PRIMARY_PUBLIC_BITCOIN_PROOF_NETWORK = 'signet' as const;

export const BITCOIN_NETWORKS = ['regtest', 'signet', 'testnet', 'mainnet'] as const;
export type BitcoinNetwork = (typeof BITCOIN_NETWORKS)[number];

export const LEDGER_CHAINS = ['bitcoin', 'ethereum', 'bitcode-internal-ledger'] as const;
export type LedgerChain = (typeof LEDGER_CHAINS)[number];

export const LEDGER_NETWORKS = [
  'regtest',
  'signet',
  'testnet',
  'mainnet',
  'sepolia',
  'holesky',
  'local',
] as const;
export type LedgerNetwork = (typeof LEDGER_NETWORKS)[number];

export type BtdTokenId = number;

export function assertNonEmptyString(value: unknown, label: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }

  return value;
}

export function assertSafeInteger(value: unknown, label: string): number {
  if (!Number.isSafeInteger(value)) {
    throw new Error(`${label} must be a safe integer.`);
  }

  return value as number;
}

export function assertNonNegativeSafeInteger(value: unknown, label: string): number {
  const integer = assertSafeInteger(value, label);
  if (integer < 0) {
    throw new Error(`${label} must be non-negative.`);
  }

  return integer;
}

export function assertPositiveSafeInteger(value: unknown, label: string): number {
  const integer = assertSafeInteger(value, label);
  if (integer <= 0) {
    throw new Error(`${label} must be positive.`);
  }

  return integer;
}

export function assertPositiveBigInt(value: bigint, label: string): bigint {
  if (value <= 0n) {
    throw new Error(`${label} must be positive.`);
  }

  return value;
}

export function toBigIntAmount(value: bigint | number | string, label: string): bigint {
  if (typeof value === 'bigint') {
    return value;
  }

  if (typeof value === 'number') {
    if (!Number.isSafeInteger(value)) {
      throw new Error(`${label} must be a safe integer when supplied as a number.`);
    }

    return BigInt(value);
  }

  if (!/^-?\d+$/.test(value)) {
    throw new Error(`${label} must be an integer string when supplied as a string.`);
  }

  return BigInt(value);
}

export function assertBitcoinNetwork(network: string): BitcoinNetwork {
  if (!BITCOIN_NETWORKS.includes(network as BitcoinNetwork)) {
    throw new Error(`Unsupported Bitcoin network: ${network}.`);
  }

  return network as BitcoinNetwork;
}

export function assertLedgerNetwork(network: string): LedgerNetwork {
  if (!LEDGER_NETWORKS.includes(network as LedgerNetwork)) {
    throw new Error(`Unsupported ledger network: ${network}.`);
  }

  return network as LedgerNetwork;
}
