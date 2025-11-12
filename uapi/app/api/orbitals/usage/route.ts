import { createClient } from '@engi/supabase/ssr/server';
import { traceRoute } from '@engi/observability';
import { supabaseAdmin } from '@engi/supabase';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from '@engi/responses';
import { ENABLE_MOCKS, MOCK_USER_ORBITAL } from '@/config/featureFlags';
import userUsageMock from '@/mocks/user-usage.json';
import { log } from '@engi/logger';
import * as crypto from 'crypto';
import type { NextRequest } from 'next/server';

/**
 * GET /api/user/usage?from=&to=
 * Returns an array of credit usage events for the authenticated user.
 */
const GETHandler = async function GET(request: NextRequest) {
  // Return mock data if enabled
  if (ENABLE_MOCKS && MOCK_USER_ORBITAL) {
    return createJsonResponse(userUsageMock);
  }
  const requestId = crypto.randomUUID();
  const requestUrl = request.nextUrl?.href ?? '[unknown]';
  log('[route /user/usage GET] Request started', 'info', { requestId, url: requestUrl });
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    log('[route /user/usage GET] Authentication failed', 'warn', { requestId, error: authError });
    return createAuthErrorResponse();
  }
  log('[route /user/usage GET] Authentication successful', 'info', { requestId, userId: user.id });
  try {
    const from = request.nextUrl.searchParams.get('from');
    const to = request.nextUrl.searchParams.get('to');
    let query = supabaseAdmin
      .from('user_credit_usages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });
    if (from) query = query.gte('created_at', from);
    if (to) query = query.lte('created_at', to);
    const { data, error } = await query;
    if (error) {
      log('[route /user/usage GET] Error querying usage', 'error', { requestId, error });
      return createErrorResponse(error);
    }
    // Optional aggregation: e.g., daily summaries
    const aggregate = request.nextUrl.searchParams.get('aggregate');
    if (aggregate === 'daily' || aggregate === 'weekly' || aggregate === 'monthly') {
      // Group events by period (daily, weekly, monthly)
      const grouped: Record<string, {
        period: string;
        purchased: number;
        spent: number;
        net: number;
        balance: number;
      }> = {};
      const sorted = data.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      for (const ev of sorted) {
        const date = new Date(ev.created_at);
        let periodKey: string;
        if (aggregate === 'daily') {
          periodKey = date.toISOString().slice(0, 10);
        } else if (aggregate === 'weekly') {
          // ISO week: YYYY-Www
          const tmp = new Date(date.getTime());
          const day = (date.getUTCDay() + 6) % 7;
          tmp.setUTCDate(date.getUTCDate() - day);
          const weekStart = tmp.toISOString().slice(0, 10);
          periodKey = weekStart;
        } else {
          // monthly YYYY-MM
          periodKey = date.toISOString().slice(0, 7);
        }
        if (!grouped[periodKey]) {
          grouped[periodKey] = { period: periodKey, purchased: 0, spent: 0, net: 0, balance: 0 };
        }
        const entry = grouped[periodKey];
        // Use 'amount' column instead of 'change'
        const amount = Number(ev.amount) || 0;
        if (amount >= 0) entry.purchased += amount;
        else entry.spent += -amount;
        entry.net += amount;
        // Note: balance would need to be calculated separately
        entry.balance = entry.net;
      }
      const summary = Object.values(grouped).sort((a, b) => a.period.localeCompare(b.period));
      return createJsonResponse(summary);
    }
      // Group events by YYYY-MM-DD
      const grouped: Record<string, {
        date: string;
        purchased: number;
        spent: number;
        net: number;
        balance: number;
      }> = {};
      // Ensure data sorted by created_at
      const sorted = data.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      for (const ev of sorted) {
        const d = new Date(ev.created_at).toISOString().slice(0, 10);
        if (!grouped[d]) {
          grouped[d] = { date: d, purchased: 0, spent: 0, net: 0, balance: 0 };
        }
        const entry = grouped[d];
        // Use 'amount' column instead of 'change'
        const amount = Number(ev.amount) || 0;
        if (amount >= 0) {
          entry.purchased += amount;
        } else {
          entry.spent += -amount;
        }
        entry.net += amount;
        // Note: balance would need to be calculated separately
        entry.balance = entry.net;
      }
      // Return array of summaries sorted by date
      const summary = Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
      return createJsonResponse(summary);
    // Default: return raw usage events
    return createJsonResponse(data);
  } catch (err) {
    log('[route /user/usage GET] Unexpected error', 'error', { requestId, error: err });
    return createErrorResponse(err);
  }
}

export const GET = traceRoute('/user/usage', GETHandler);
