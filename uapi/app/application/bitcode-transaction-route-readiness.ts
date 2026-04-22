import { deriveBitcodeTransactionReadiness } from './bitcode-transaction-readiness';
import {
  hydrateBitcodeProfile,
  readBitcodeWalletCapabilityFromProfile,
} from '@bitcode/orm';
import { createClient } from '@bitcode/supabase/ssr/server';

type StatusError = Error & { statusCode?: number | undefined };

function createStatusError(message: string, statusCode: number): StatusError {
  const error = new Error(message) as StatusError;
  error.statusCode = statusCode;
  return error;
}

function normalizeRepositoryAnchor(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function readBitcodeRepositoryAnchorFromBody(body: Record<string, unknown>): string | null {
  return (
    normalizeRepositoryAnchor(body.repositoryAnchor) ||
    normalizeRepositoryAnchor(body.repositoryFullName) ||
    normalizeRepositoryAnchor(body.sourceRepo)
  );
}

export async function requireBitcodeSignedTransactionReadiness(
  body: Record<string, unknown>,
  options: { requiresRepositoryAnchor?: boolean } = {},
) {
  const requiresRepositoryAnchor = options.requiresRepositoryAnchor ?? true;
  const repositoryAnchor = readBitcodeRepositoryAnchorFromBody(body);
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    const readiness = deriveBitcodeTransactionReadiness({
      signedIn: false,
      hasRepositoryProvider: false,
      hasWalletBinding: false,
      hasVerifiedWalletBinding: false,
      requiresRepositoryAnchor,
      hasRepositoryAnchor: Boolean(repositoryAnchor),
    });
    throw createStatusError(readiness.summary, 401);
  }

  const [profileResult, githubConnectionResult] = await Promise.all([
    supabase.from('user_profiles').select('*').eq('id', user.id).maybeSingle(),
    supabase
      .from('user_connections')
      .select('connection_data')
      .eq('user_id', user.id)
      .eq('provider', 'github')
      .maybeSingle(),
  ]);

  if (profileResult.error) {
    throw createStatusError(profileResult.error.message, 500);
  }

  if (githubConnectionResult.error) {
    throw createStatusError(githubConnectionResult.error.message, 500);
  }

  const profile = hydrateBitcodeProfile(profileResult.data ?? null);
  const walletCapability = readBitcodeWalletCapabilityFromProfile(profile);
  const readiness = deriveBitcodeTransactionReadiness({
    signedIn: true,
    hasRepositoryProvider: Boolean(githubConnectionResult.data?.connection_data),
    hasWalletBinding: walletCapability.hasIdentity,
    hasVerifiedWalletBinding: walletCapability.isVerifiedSigner,
    requiresRepositoryAnchor,
    hasRepositoryAnchor: Boolean(repositoryAnchor),
  });

  if (!readiness.canSettle) {
    throw createStatusError(readiness.summary, 409);
  }

  return {
    userId: user.id,
    readiness,
    repositoryAnchor,
  };
}
