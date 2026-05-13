import { NextResponse } from 'next/server';

import {
  hydrateBitcodeProfile,
  mergeBitcodeProfileSettings,
} from '@bitcode/orm';
import { supabaseAdmin } from '@bitcode/supabase';
import { createClient } from '@bitcode/supabase/ssr/server';
import {
  bitcodeServerTelemetry,
  compactBitcodeServerId,
} from '@/lib/bitcode-server-telemetry';

export const runtime = 'nodejs';

type WalletAuthPayload = {
  address?: unknown;
  provider?: unknown;
  network?: unknown;
  message?: unknown;
  signature?: unknown;
  proofKind?: unknown;
  paymentAddress?: unknown;
  authAddress?: unknown;
  addressType?: unknown;
  issuedAt?: unknown;
  connectedAt?: unknown;
};

const BITCOIN_WALLET_PROVIDERS = new Set([
  'bitcoin-wallet',
  'unisat',
  'leather',
  'okx-bitcoin',
  'xverse',
  'manual-bitcoin',
]);

function readNonEmptyString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function isPlausibleBitcoinAddress(value: unknown) {
  const address = readNonEmptyString(value);
  if (!address) return false;

  return (
    /^(bc1|tb1|bcrt1)[ac-hj-np-z02-9]{8,90}$/i.test(address) ||
    /^[13mn2][A-HJ-NP-Za-km-z1-9]{25,60}$/.test(address)
  );
}

function normalizeProvider(value: unknown) {
  const provider = readNonEmptyString(value)?.toLowerCase() ?? 'bitcoin-wallet';
  return BITCOIN_WALLET_PROVIDERS.has(provider) ? provider : null;
}

function normalizeProofKind(value: unknown) {
  const proofKind = readNonEmptyString(value);
  if (proofKind === 'bitcoin_message_signature' || proofKind === 'provider_session') {
    return proofKind;
  }
  return null;
}

function readUsernameFromAddress(address: string) {
  const safePrefix = address.replace(/[^a-z0-9]/gi, '').slice(0, 12).toLowerCase();
  return `wallet_${safePrefix || 'bitcoin'}`;
}

function isBitcodeBitcoinWalletMessage(message: string, address: string) {
  return (
    message.includes('Bitcode Bitcoin wallet authentication') &&
    message.includes(`Address: ${address}`) &&
    message.includes('Purpose: Authenticate Bitcode commercial profile')
  );
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    bitcodeServerTelemetry('warn', 'wallet-authenticate', 'session-required', {
      userError: userError?.message ?? null,
    });
    return NextResponse.json(
      {
        error:
          'Bitcoin wallet connection requires an active Bitcode session before server persistence. The client may still stage the wallet locally for V28 QA when staging auth is unavailable.',
        code: 'wallet_session_required',
      },
      { status: 401 },
    );
  }

  let body: WalletAuthPayload;
  try {
    body = (await request.json()) as WalletAuthPayload;
  } catch {
    bitcodeServerTelemetry('warn', 'wallet-authenticate', 'invalid-json');
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const address = readNonEmptyString(body.address);
  const provider = normalizeProvider(body.provider);
  const network = readNonEmptyString(body.network);
  const message = readNonEmptyString(body.message);
  const signature = readNonEmptyString(body.signature);
  const proofKind = normalizeProofKind(body.proofKind);
  const paymentAddress = readNonEmptyString(body.paymentAddress);
  const authAddress = readNonEmptyString(body.authAddress);
  const addressType = readNonEmptyString(body.addressType);
  const issuedAt = readNonEmptyString(body.issuedAt);
  const connectedAt = readNonEmptyString(body.connectedAt) ?? issuedAt;

  if (!address || !isPlausibleBitcoinAddress(address)) {
    bitcodeServerTelemetry('warn', 'wallet-authenticate', 'invalid-address', {
      address: compactBitcodeServerId(address),
      provider,
      network,
    });
    return NextResponse.json({ error: 'A valid Bitcoin wallet address is required.' }, { status: 400 });
  }

  if (!provider) {
    bitcodeServerTelemetry('warn', 'wallet-authenticate', 'invalid-provider', {
      provider: readNonEmptyString(body.provider),
      address: compactBitcodeServerId(address),
    });
    return NextResponse.json(
      {
        error:
          'Bitcode wallet authentication accepts Bitcoin wallet providers only. The injected Ethereum provider is not a Bitcoin signer.',
      },
      { status: 400 },
    );
  }

  if (!proofKind) {
    bitcodeServerTelemetry('warn', 'wallet-authenticate', 'missing-proof-kind', {
      provider,
      address: compactBitcodeServerId(address),
    });
    return NextResponse.json({ error: 'Bitcoin wallet proof kind is required.' }, { status: 400 });
  }

  if (proofKind === 'bitcoin_message_signature') {
    if (!message || !signature) {
      bitcodeServerTelemetry('warn', 'wallet-authenticate', 'missing-signature', {
        provider,
        address: compactBitcodeServerId(address),
      });
      return NextResponse.json(
        { error: 'Bitcoin wallet message-signature proof requires both message and signature.' },
        { status: 400 },
      );
    }
    if (!isBitcodeBitcoinWalletMessage(message, address)) {
      bitcodeServerTelemetry('warn', 'wallet-authenticate', 'message-mismatch', {
        provider,
        address: compactBitcodeServerId(address),
      });
      return NextResponse.json(
        { error: 'Bitcoin wallet message does not match the Bitcode authentication challenge.' },
        { status: 400 },
      );
    }
  }

  const persistedAt = new Date().toISOString();
  const bindingStatus = proofKind === 'bitcoin_message_signature' ? 'pending' : 'pending';
  bitcodeServerTelemetry('info', 'wallet-authenticate', 'persist-start', {
    userId: compactBitcodeServerId(user.id),
    provider,
    address: compactBitcodeServerId(address),
    network,
    proofKind,
    paymentAddress: compactBitcodeServerId(paymentAddress),
    authAddress: compactBitcodeServerId(authAddress),
  });
  const { data: existingProfile, error: profileReadError } = await supabaseAdmin
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (profileReadError) {
    bitcodeServerTelemetry('error', 'wallet-authenticate', 'profile-read-failed', {
      userId: compactBitcodeServerId(user.id),
      message: profileReadError.message,
    });
    return NextResponse.json({ error: profileReadError.message }, { status: 500 });
  }

  const username =
    typeof existingProfile?.username === 'string' && existingProfile.username.trim()
      ? existingProfile.username.trim()
      : readUsernameFromAddress(address);

  const settings = mergeBitcodeProfileSettings(existingProfile?.settings, {
    walletBinding: {
      address,
      provider,
      status: bindingStatus,
      boundAt: persistedAt,
      network,
      proofKind,
      paymentAddress,
      authAddress,
      addressType,
    },
  });

  const { error: profileWriteError } = await supabaseAdmin.from('user_profiles').upsert(
    {
      id: user.id,
      username,
      display_name: existingProfile?.display_name ?? null,
      bio: existingProfile?.bio ?? null,
      avatar_url: existingProfile?.avatar_url ?? null,
      role: existingProfile?.role ?? 'user',
      onboarded_steps: existingProfile?.onboarded_steps ?? null,
      settings,
      updated_at: persistedAt,
      created_at: existingProfile?.created_at ?? persistedAt,
    },
    { onConflict: 'id' },
  );

  if (profileWriteError) {
    bitcodeServerTelemetry('error', 'wallet-authenticate', 'profile-write-failed', {
      userId: compactBitcodeServerId(user.id),
      message: profileWriteError.message,
    });
    return NextResponse.json({ error: profileWriteError.message }, { status: 500 });
  }

  const { error: connectionWriteError } = await supabaseAdmin.from('user_connections').upsert(
    {
      user_id: user.id,
      provider,
      is_active: true,
      connection_data: {
        provider_user_id: address,
        provider_username: address,
        address,
        wallet_address: address,
        network,
        verification_state: bindingStatus,
        status: bindingStatus,
        auth_source: 'bitcoin_wallet_provider',
        proof_kind: proofKind,
        payment_address: paymentAddress,
        auth_address: authAddress,
        address_type: addressType,
        message,
        signature,
        issued_at: issuedAt,
        connected_at: connectedAt ?? persistedAt,
        persisted_at: persistedAt,
      },
      updated_at: persistedAt,
    },
    { onConflict: 'user_id,provider' },
  );

  if (connectionWriteError) {
    bitcodeServerTelemetry('error', 'wallet-authenticate', 'connection-write-failed', {
      userId: compactBitcodeServerId(user.id),
      provider,
      address: compactBitcodeServerId(address),
      message: connectionWriteError.message,
    });
    return NextResponse.json(
      {
        error: connectionWriteError.message,
        code: 'wallet_connection_persist_failed',
        remediation:
          'Apply the user_connections provider-constraint migration before testing Bitcoin wallet authentication in staging.',
      },
      { status: 500 },
    );
  }

  bitcodeServerTelemetry('info', 'wallet-authenticate', 'persist-success', {
    userId: compactBitcodeServerId(user.id),
    provider,
    address: compactBitcodeServerId(address),
    network,
    verificationState: bindingStatus,
  });

  return NextResponse.json(
    {
      success: true,
      profile: hydrateBitcodeProfile({
        ...(existingProfile ?? {}),
        id: user.id,
        username,
        settings,
      }),
      walletConnectionStatus: {
        connected: true,
        provider,
        valid: true,
        address,
        verificationState: bindingStatus,
        metadata: {
          source: 'wallet_provider_connection',
          connectionAddress: address,
          matchesBindingAddress: true,
          connectedAt: connectedAt ?? persistedAt,
        },
      },
    },
    { status: 201 },
  );
}
