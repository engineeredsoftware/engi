import crypto from 'crypto';

interface VerifyGitHubSignatureOptions {
  secret?: string | null;
  payload: string;
  signatureHeader?: string | null;
}

export function verifyGitHubSignature(options: VerifyGitHubSignatureOptions): boolean {
  const { secret, payload, signatureHeader } = options;
  if (!secret || !signatureHeader) {
    return false;
  }

  const hmac = crypto.createHmac('sha256', secret);
  const digest = `sha256=${hmac.update(payload).digest('hex')}`;

  const signatureBuffer = Buffer.from(signatureHeader);
  const digestBuffer = Buffer.from(digest);
  if (signatureBuffer.length !== digestBuffer.length) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(signatureBuffer, digestBuffer);
  } catch {
    return false;
  }
}
