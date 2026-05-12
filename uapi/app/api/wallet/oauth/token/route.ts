import {
  createBitcoinWalletAccessToken,
  readOAuthClientCredentials,
  validateOAuthClientCredentials,
  verifyBitcoinWalletAuthorizationCode,
  verifyPkce,
} from '@/lib/bitcoin-wallet-oauth-provider';

export const runtime = 'nodejs';

function readString(value: FormDataEntryValue | null) {
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

async function readBody(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const json = await request.json();
    return new URLSearchParams(
      Object.entries(json && typeof json === 'object' ? json : {}).map(([key, value]) => [
        key,
        typeof value === 'string' ? value : value == null ? '' : String(value),
      ]),
    );
  }

  return new URLSearchParams(await request.text());
}

export async function POST(request: Request) {
  let body: URLSearchParams;
  try {
    body = await readBody(request);
  } catch {
    return jsonResponse({ error: 'invalid_request', error_description: 'Invalid OAuth token body.' }, { status: 400 });
  }

  const credentials = readOAuthClientCredentials(request, body);
  if (!validateOAuthClientCredentials(credentials)) {
    return jsonResponse({ error: 'invalid_client' }, { status: 401 });
  }

  if (body.get('grant_type') !== 'authorization_code') {
    return jsonResponse({ error: 'unsupported_grant_type' }, { status: 400 });
  }

  const code = body.get('code');
  if (!code) {
    return jsonResponse({ error: 'invalid_request', error_description: 'Missing authorization code.' }, { status: 400 });
  }

  try {
    const codePayload = verifyBitcoinWalletAuthorizationCode(code);
    const redirectUri = readString(body.get('redirect_uri'));
    if (redirectUri && redirectUri !== codePayload.redirect_uri) {
      return jsonResponse({ error: 'invalid_grant', error_description: 'Redirect URI mismatch.' }, { status: 400 });
    }

    if (!verifyPkce({
      codeChallenge: codePayload.code_challenge,
      codeChallengeMethod: codePayload.code_challenge_method,
      codeVerifier: body.get('code_verifier'),
    })) {
      return jsonResponse({ error: 'invalid_grant', error_description: 'PKCE verification failed.' }, { status: 400 });
    }

    const token = createBitcoinWalletAccessToken({
      codePayload,
      scope: body.get('scope'),
    });

    return jsonResponse({
      access_token: token.accessToken,
      token_type: 'Bearer',
      expires_in: token.expiresIn,
      scope: codePayload.scope,
    });
  } catch (error) {
    return jsonResponse(
      {
        error: 'invalid_grant',
        error_description: error instanceof Error ? error.message : 'Authorization code is invalid.',
      },
      { status: 400 },
    );
  }
}
