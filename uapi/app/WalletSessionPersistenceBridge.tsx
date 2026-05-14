"use client";

import { useEffect, useRef } from 'react';

import { createClient } from '@bitcode/supabase/ssr/client';

import { mutateUserData } from '@/hooks/useUserData';
import {
  BITCODE_LOCAL_WALLET_EVENT,
  readLocalBitcodeWalletIdentity,
  writeLocalBitcodeWalletIdentity,
  type BitcodeWalletBindingStatus,
  type LocalBitcodeWalletIdentity,
} from '@/lib/bitcode-wallet-local';
import { bitcodeQaTelemetry, compactBitcodeAddress } from '@/lib/bitcode-qa-telemetry';

function canPersistWalletIdentity(identity: LocalBitcodeWalletIdentity | null): identity is LocalBitcodeWalletIdentity {
  return Boolean(
    identity &&
      identity.persistence !== 'server' &&
      identity.proofKind === 'bitcoin_message_signature' &&
      identity.message &&
      identity.signature,
  );
}

function readPersistedStatus(payload: unknown, fallback: BitcodeWalletBindingStatus): BitcodeWalletBindingStatus {
  const status = (payload as any)?.walletConnectionStatus?.verificationState;
  return status === 'verified' || status === 'manual' || status === 'pending' ? status : fallback;
}

function readPersistedAt(payload: unknown, fallback: string) {
  const connectedAt = (payload as any)?.walletConnectionStatus?.metadata?.connectedAt;
  return typeof connectedAt === 'string' && connectedAt.trim() ? connectedAt.trim() : fallback;
}

export default function WalletSessionPersistenceBridge() {
  const inFlightKeyRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const persistLocalWalletIdentity = async (reason: string) => {
      const identity = readLocalBitcodeWalletIdentity();
      if (!canPersistWalletIdentity(identity)) return;

      const persistenceKey = `${identity.provider}:${identity.address}:${identity.signature}`;
      if (inFlightKeyRef.current === persistenceKey) return;
      inFlightKeyRef.current = persistenceKey;

      try {
        const supabase = createClient();
        const existing = await supabase.auth.getUser();
        if (cancelled || !existing.data.user) {
          inFlightKeyRef.current = null;
          return;
        }

        bitcodeQaTelemetry('info', 'wallet-session', 'persist-start', {
          reason,
          provider: identity.provider,
          address: compactBitcodeAddress(identity.address),
        });

        const response = await fetch('/api/wallet/authenticate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address: identity.address,
            provider: identity.provider,
            network: identity.network,
            message: identity.message,
            signature: identity.signature,
            proofKind: identity.proofKind,
            paymentAddress: identity.paymentAddress,
            authAddress: identity.authAddress,
            addressType: identity.addressType,
            connectedAt: identity.connectedAt,
            issuedAt: identity.connectedAt,
          }),
        });
        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          inFlightKeyRef.current = null;
          bitcodeQaTelemetry('warn', 'wallet-session', 'persist-failed', {
            status: response.status,
            error: typeof payload?.error === 'string' ? payload.error : null,
          });
          return;
        }

        if (cancelled) return;

        writeLocalBitcodeWalletIdentity({
          ...identity,
          status: readPersistedStatus(payload, identity.status),
          connectedAt: readPersistedAt(payload, identity.connectedAt),
          persistence: 'server',
        });
        await mutateUserData();
        bitcodeQaTelemetry('info', 'wallet-session', 'persist-success', {
          provider: identity.provider,
          address: compactBitcodeAddress(identity.address),
        });
      } catch (error) {
        inFlightKeyRef.current = null;
        bitcodeQaTelemetry('warn', 'wallet-session', 'persist-error', {
          message: error instanceof Error ? error.message : String(error),
        });
      }
    };

    void persistLocalWalletIdentity('mount');

    const handleWalletChange = () => {
      void persistLocalWalletIdentity('local-wallet-change');
    };
    const handleFocus = () => {
      void persistLocalWalletIdentity('window-focus');
    };

    window.addEventListener(BITCODE_LOCAL_WALLET_EVENT, handleWalletChange);
    window.addEventListener('focus', handleFocus);
    return () => {
      cancelled = true;
      window.removeEventListener(BITCODE_LOCAL_WALLET_EVENT, handleWalletChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return null;
}
