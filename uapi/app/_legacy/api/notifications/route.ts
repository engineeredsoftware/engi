import { NextResponse } from 'next/server';
import { traceRoute } from '@engi/observability';
import { supabaseAdmin as supabase } from '@engi/supabase';

// ---------------------------------------------------------------------------
// GET /api/notifications?userId=...&unread=1&limit=50
// POST /api/notifications/{id}/read  (handled below via dynamic route)
// ---------------------------------------------------------------------------

const GETHandler = async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'userId query param required' }, { status: 400 });
  }
  const unreadOnly = searchParams.get('unread') === '1' || searchParams.get('unread') === 'true';
  const limit = Number(searchParams.get('limit') || '50');

  let query = supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (unreadOnly) query = query.eq('is_read', false);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const normalized = (data ?? []).map((row) => ({
    ...row,
    read: row.is_read,
  }));
  return NextResponse.json({ notifications: normalized });
}

// ---------------------------------------------------------------------------
// POST /api/notifications/read  (bulk)   body: { ids: string[] }
// ---------------------------------------------------------------------------

const POSTHandler = async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { ids, userId } = body;
  if (!Array.isArray(ids) || !ids.length || !userId) {
    return NextResponse.json({ error: 'ids[] and userId required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .in('id', ids)
    .eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export const GET = traceRoute('/notifications', GETHandler);
export const POST = traceRoute('/notifications', POSTHandler);
