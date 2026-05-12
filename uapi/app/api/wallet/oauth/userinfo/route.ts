import {
  buildBitcoinWalletUserInfo,
  verifyBitcoinWalletAccessToken,
} from '@/lib/bitcoin-wallet-oauth-provider';

export const runtime = 'nodejs';

function readBearerToken(request: Request) {
  const authorization = request.headers.get('authorization') ?? '';
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
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

async function handleUserInfo(request: Request) {
  const token = readBearerToken(request);
  if (!token) {
    return jsonResponse({ error: 'missing_token' }, { status: 401 });
  }

  try {
    const payload = verifyBitcoinWalletAccessToken(token);
    return jsonResponse(buildBitcoinWalletUserInfo(payload));
  } catch (error) {
    return jsonResponse(
      {
        error: 'invalid_token',
        error_description: error instanceof Error ? error.message : 'Bitcoin wallet token is invalid.',
      },
      { status: 401 },
    );
  }
}

export const GET = handleUserInfo;
export const POST = handleUserInfo;
