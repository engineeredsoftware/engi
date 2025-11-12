import { NextResponse } from 'next/server';
import { traceRoute } from '@engi/observability';
import { log } from '@engi/logger';
import * as crypto from 'crypto';
import { authenticateRequest } from '@engi/auth';
import { supabaseAdmin } from '@engi/supabase';
import { createJsonResponse, createErrorResponse } from '@engi/responses';

/**
 * GET   /api/user/api-keys
 * List all non-sensitive metadata for the current user’s API keys.
 */
const GETHandler = async function GET(request: Request) {
  const auth = await authenticateRequest(request);
  if (auth instanceof Response) return auth;
  const userId = auth.userId;
  try {
    const { data, error } = await supabaseAdmin
      .from('user_api_keys')
      .select('id, name, expire_at, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) return createErrorResponse(error);
    // Rename fields for the client
    const keys = data.map(k => ({
      id: k.id,
      name: k.name,
      expireAt: k.expire_at,
      createdAt: k.created_at
    }));
    return createJsonResponse(keys);
  } catch (err) {
    // Log any unhandled errors
    log('[route /api/user/api-keys GET] Unhandled error', 'error', { userId, error: err });
    return createErrorResponse(err);
  }
}

/**
 * POST  /api/user/api-keys
 * Body: { name: string, expireAt?: string }
 * Generate a new API key, store it, and return the raw key once.
 */
const POSTHandler = async function POST(request: Request) {
  const auth = await authenticateRequest(request);
  if (auth instanceof Response) return auth;
  const userId = auth.userId;
  let body: { name?: string; expireAt?: string };
  try { body = await request.json(); } catch (_e) { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
  const { name, expireAt } = body;
  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }
  // Generate a random 32-byte hex key
  const rawKey = crypto.randomBytes(32).toString('hex');
  try {
    const { data, error } = await supabaseAdmin
      .from('user_api_keys')
      .insert({ user_id: userId, name, key: rawKey, expire_at: expireAt || null })
      .select('id, key')
      .single();
    if (error || !data) return createErrorResponse(error);
    // Return id + raw key (only shown once)
    return NextResponse.json({ id: data.id, apiKey: data.key }, { status: 201 });
  } catch (err) {
    log('[route /api/user/api-keys POST] Unhandled error', 'error', { userId, error: err });
    return createErrorResponse(err);
  }
}

/**
 * DELETE  /api/user/api-keys?id=<id>
 * Revoke (delete) an API key by ID.
 */
const DELETEHandler = async function DELETE(request: Request) {
  const auth = await authenticateRequest(request);
  if (auth instanceof Response) return auth;
  const userId = auth.userId;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }
  try {
    const { error } = await supabaseAdmin
      .from('user_api_keys')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    if (error) return createErrorResponse(error);
    // Return 204 No Content
    return NextResponse.json(null, { status: 204 });
  } catch (err) {
    log('[route /api/user/api-keys DELETE] Unhandled error', 'error', { userId, error: err });
    return createErrorResponse(err);
  }
}

export const GET = traceRoute('/user/api-keys', GETHandler);
export const POST = traceRoute('/user/api-keys', POSTHandler);
export const DELETE = traceRoute('/user/api-keys', DELETEHandler);