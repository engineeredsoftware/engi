import { readBitcodeWalletBindingFromProfile } from '@bitcode/orm';
import type { createClient } from '@bitcode/supabase/ssr/server';

type UnknownRecord = Record<string, unknown>;

export type BitcodeWalletConnectionVerificationState = 'manual' | 'pending' | 'verified' | null;

export type BitcodeWalletConnectionStatus = {
  connected: boolean;
  provider: string | null;
  valid: boolean;
  address: string | null;
  verificationState: BitcodeWalletConnectionVerificationState;
  metadata?: {
    source: 'profile_manual' | 'wallet_provider_connection' | 'mock';
    connectionAddress?: string | null;
    matchesBindingAddress?: boolean;
    connectedAt?: string | null;
    mock_mode?: boolean;
  } | null;
};

function asRecord(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  return value as UnknownRecord;
}

function normalizeString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function normalizeWalletVerificationState(value: unknown): BitcodeWalletConnectionVerificationState {
  const normalized = normalizeString(value);
  if (normalized === 'pending' || normalized === 'manual' || normalized === 'verified') {
    return normalized;
  }

  if (normalized === 'bound') {
    return 'manual';
  }

  return null;
}

function readConnectionAddress(connectionData: UnknownRecord | null): string | null {
  return (
    normalizeString(connectionData?.address) ||
    normalizeString(connectionData?.wallet_address) ||
    normalizeString(connectionData?.provider_user_id) ||
    null
  );
}

function readConnectionVerificationState(
  connectionData: UnknownRecord | null,
): BitcodeWalletConnectionVerificationState {
  return (
    normalizeWalletVerificationState(connectionData?.verification_state) ||
    normalizeWalletVerificationState(connectionData?.verificationStatus) ||
    normalizeWalletVerificationState(connectionData?.status) ||
    null
  );
}

export function buildMockBitcodeWalletConnectionStatus(
  provider = 'walletconnect',
  address = 'tb1qbitcodemockoperator0000000000000000000000',
): BitcodeWalletConnectionStatus {
  return {
    connected: true,
    provider,
    valid: true,
    address,
    verificationState: 'verified',
    metadata: {
      source: 'mock',
      connectionAddress: address,
      matchesBindingAddress: true,
      connectedAt: '2026-04-16T12:00:00.000Z',
      mock_mode: true,
    },
  };
}

export async function readBitcodeWalletConnectionStatus(input: {
  supabase: Awaited<ReturnType<typeof createClient>>;
  userId: string;
  profile: ({ settings?: unknown } & UnknownRecord) | null | undefined;
}): Promise<BitcodeWalletConnectionStatus | null> {
  const walletBinding = readBitcodeWalletBindingFromProfile(input.profile);
  if (!walletBinding?.address) {
    return null;
  }

  const provider = normalizeString(walletBinding.provider);
  const verificationState = normalizeWalletVerificationState(walletBinding.status);
  if (!provider || provider === 'manual') {
    return {
      connected: false,
      provider: provider ?? 'manual',
      valid: false,
      address: walletBinding.address,
      verificationState: verificationState ?? 'manual',
      metadata: {
        source: 'profile_manual',
        connectionAddress: walletBinding.address,
        matchesBindingAddress: true,
      },
    };
  }

  const { data, error } = await input.supabase
    .from('user_connections')
    .select('provider, connection_data, updated_at')
    .eq('user_id', input.userId)
    .eq('provider', provider)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  const connectionData = asRecord(data?.connection_data);
  const connectionAddress = readConnectionAddress(connectionData);
  const liveVerificationState = readConnectionVerificationState(connectionData);
  const matchesBindingAddress =
    !connectionAddress || !walletBinding.address ? true : connectionAddress === walletBinding.address;

  return {
    connected: Boolean(data),
    provider,
    valid: Boolean(data && liveVerificationState === 'verified' && matchesBindingAddress),
    address: walletBinding.address,
    verificationState: liveVerificationState ?? verificationState,
    metadata: {
      source: 'wallet_provider_connection',
      connectionAddress,
      matchesBindingAddress,
      connectedAt: normalizeString(data?.updated_at),
    },
  };
}
