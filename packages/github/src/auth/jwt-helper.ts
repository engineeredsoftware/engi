/**
 * JWT Helper for GitHub App Authentication
 * 
 * Simple JWT generation using Node.js crypto module
 * to avoid ESM import issues with jose library.
 */

import * as crypto from 'crypto';

function base64url(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export function generateGitHubAppJWT(appId: string, privateKey: string): string {
  // Current time in seconds
  const now = Math.floor(Date.now() / 1000);
  
  // JWT header
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };
  
  // JWT payload
  const payload = {
    iat: now - 60,  // 60 seconds in the past to account for clock drift
    exp: now + 600,  // 10 minutes in the future
    iss: appId
  };
  
  // Encode header and payload
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  
  // Create signature
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  
  // Parse the private key (handle both raw and escaped formats)
  const privateKeyContent = privateKey
    .replace(/\\n/g, '\n')
    .trim();
  
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signatureInput);
  sign.end();
  
  const signature = sign.sign(privateKeyContent);
  const encodedSignature = signature
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  
  // Combine all parts
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}