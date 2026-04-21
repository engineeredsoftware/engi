import Stripe from 'stripe';
import { NextRequest } from 'next/server';
import { createClient } from '@bitcode/supabase/ssr/server';
import { createJsonResponse } from '@bitcode/responses';
import { traceRoute } from '@bitcode/observability';
import { log } from '@bitcode/logger';

const getStandardPlans = (): Record<string, { priceId: string | undefined; btdAmount: number }> => ({
  mini: { priceId: process.env.STRIPE_PRICE_ID_MINI, btdAmount: 100 },
  starter: { priceId: process.env.STRIPE_PRICE_ID_STARTER, btdAmount: 300 },
  pro: { priceId: process.env.STRIPE_PRICE_ID_PRO, btdAmount: 1000 },
});

const getUltraRateUsd = () => Number(
  process.env.STRIPE_ULTRA_USD_PER_BTD ||
  process.env.STRIPE_ULTRA_USD_PER_CREDIT ||
  '0.1',
);

const getOrigin = (req: NextRequest) => req.headers.get('origin') || new URL(req.url).origin;
const getStripeClient = () => {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const StripeCtor: any = (Stripe as any)?.default ?? Stripe;
  return stripeSecret ? new StripeCtor(stripeSecret, { apiVersion: '2023-10-16' }) : null;
};

const createCheckoutSession = async (stripeClient: any, params: any) => {
  if (typeof stripeClient?.checkout?.sessions?.create === 'function') {
    return stripeClient.checkout.sessions.create(params);
  }

  if (typeof stripeClient?.sessions?.create === 'function') {
    return stripeClient.sessions.create(params);
  }

  if (typeof stripeClient?.default?.checkout?.sessions?.create === 'function') {
    return stripeClient.default.checkout.sessions.create(params);
  }

  throw new Error('Stripe checkout sessions unavailable');
};

export const POST = traceRoute('/create-checkout-session', async (request: NextRequest) => {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return createJsonResponse({ error: 'Unauthorized' }, 401);

  const stripe = getStripeClient();
  if (!stripe) return createJsonResponse({ error: 'Stripe secret key missing' }, 500);

  let body: any;
  try {
    body = await request.json();
  } catch {
    return createJsonResponse({ error: 'Invalid JSON' }, 400);
  }

  const planId = body?.planId;
  if (!planId) {
    return createJsonResponse({ error: 'planId is required' }, 400);
  }

  const normalized = String(planId).toLowerCase();
  const origin = getOrigin(request);
  const successUrl = `${origin}/checkout/callback?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}/checkout/callback?status=cancelled`;

  let session;
  if (normalized === 'ultra') {
    const ultraRateUsd = getUltraRateUsd();
    const customBtd = Number(body?.customBtd ?? body?.customCredits);
    if (!Number.isFinite(customBtd) || customBtd <= 0) {
      return createJsonResponse({ error: 'customBtd must be a positive number for ultra plan' }, 400);
    }
    const unitAmount = Math.round(customBtd * ultraRateUsd * 100);
    if (!unitAmount) {
      return createJsonResponse({ error: 'Unable to price ultra plan' }, 500);
    }
    session = await createCheckoutSession(stripe, {
      mode: 'payment',
      customer_email: user.email || undefined,
      metadata: {
        userId: user.id,
        planId: normalized,
        btdAmount: String(customBtd),
      },
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: unitAmount,
          product_data: { name: `Bitcode $BTD (${customBtd})` },
        },
        quantity: 1,
      }],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
  } else {
    const plan = getStandardPlans()[normalized];
    if (!plan) {
      return createJsonResponse({ error: `Unknown planId: ${planId}` }, 400);
    }
    if (!plan.priceId) {
      return createJsonResponse({ error: `Stripe price ID missing for plan ${normalized}` }, 500);
    }
    session = await createCheckoutSession(stripe, {
      mode: 'payment',
      customer_email: user.email || undefined,
      metadata: {
        userId: user.id,
        planId: normalized,
        btdAmount: String(plan.btdAmount),
      },
      line_items: [{ price: plan.priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
  }

  log('[create-checkout-session] created', 'info', { plan: normalized, userId: user.id, sessionId: session.id });
  return createJsonResponse({ sessionId: session.id, url: session.url });
});
