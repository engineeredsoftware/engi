import {
  BITCODE_BITCOIN_OAUTH_SCOPES,
  createBitcoinWalletAuthorizationCode,
} from '@/lib/bitcoin-wallet-oauth-provider';

export const runtime = 'nodejs';

type AuthorizationCodeRequest = {
  oauth?: {
    client_id?: unknown;
    redirect_uri?: unknown;
    scope?: unknown;
    code_challenge?: unknown;
    code_challenge_method?: unknown;
  };
  wallet?: unknown;
};

function readString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });
}

export async function POST(request: Request) {
  let body: AuthorizationCodeRequest;
  try {
    body = (await request.json()) as AuthorizationCodeRequest;
  } catch {
    return jsonResponse({ error: 'Invalid Bitcoin wallet OAuth request body.' }, { status: 400 });
  }

  try {
    const code = createBitcoinWalletAuthorizationCode({
      clientId: readString(body.oauth?.client_id) ?? '',
      redirectUri: readString(body.oauth?.redirect_uri) ?? '',
      scope: readString(body.oauth?.scope) ?? BITCODE_BITCOIN_OAUTH_SCOPES,
      codeChallenge: readString(body.oauth?.code_challenge),
      codeChallengeMethod: readString(body.oauth?.code_challenge_method),
      wallet: (body.wallet ?? {}) as any,
    });

    return jsonResponse({
      code,
      expires_in: 300,
    });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : 'Bitcoin wallet OAuth authorization failed.' },
      { status: 400 },
    );
  }
}
