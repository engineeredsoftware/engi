import Stripe from 'stripe';
import { NextRequest } from 'next/server';
import { createClient } from '@engi/supabase/ssr/server';
import { createJsonResponse, createErrorResponse, createAuthErrorResponse } from '@engi/responses';
import { traceRoute } from '@engi/observability';
import { log } from '@engi/logger';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2023-10-16' }) : null;

const STANDARD_PLANS: Record<string, { priceId: string | undefined; credits: number }> = {
  mini: { priceId: process.env.STRIPE_PRICE_ID_MINI, credits: 100 },
  starter: { priceId: process.env.STRIPE_PRICE_ID_STARTER, credits: 300 },
  pro: { priceId: process.env.STRIPE_PRICE_ID_PRO, credits: 1000 },
};

const ULTRA_RATE_USD = Number(process.env.STRIPE_ULTRA_USD_PER_CREDIT || '0.1');

const getOrigin = (req: NextRequest) => req.headers.get('origin') || new URL(req.url).origin;

export const POST = traceRoute('/create-checkout-session', async (request: NextRequest) => {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return createAuthErrorResponse();
  if (!stripe) return createErrorResponse(new Error('Stripe secret key missing'), 500);

  let body: any;
  try {
    body = await request.json();
  } catch {
    return createErrorResponse(new Error('Invalid JSON'), 400);
  }

  const planId = body?.planId;
  if (!planId) {
    return createErrorResponse(new Error('planId is required'), 400);
  }

  const normalized = String(planId).toLowerCase();
  const origin = getOrigin(request);
  const successUrl = `${origin}/checkout/callback?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}/checkout/callback?status=cancelled`;

  let session;
  if (normalized === 'ultra') {
    const customCredits = Number(body?.customCredits);
    if (!Number.isFinite(customCredits) || customCredits <= 0) {
      return createErrorResponse(new Error('customCredits must be a positive number for ultra plan'), 400);
    }
    const unitAmount = Math.round(customCredits * ULTRA_RATE_USD * 100);
    if (!unitAmount) {
      return createErrorResponse(new Error('Unable to price ultra plan'), 500);
    }
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email || undefined,
      metadata: {
        userId: user.id,
        planId: normalized,
        credits: String(customCredits)
      },
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: unitAmount,
          product_data: { name: `Engi Credits (${customCredits})` }
        },
        quantity: 1,
      }],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
  } else {
    const plan = STANDARD_PLANS[normalized];
    if (!plan) {
      return createErrorResponse(new Error(`Unknown planId: ${planId}`), 400);
    }
    if (!plan.priceId) {
      return createErrorResponse(new Error(`Stripe price ID missing for plan ${normalized}`), 500);
    }
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email || undefined,
      metadata: {
        userId: user.id,
        planId: normalized,
        credits: String(plan.credits)
      },
      line_items: [{ price: plan.priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
  }

  log('[create-checkout-session] created', 'info', { plan: normalized, userId: user.id, sessionId: session.id });
  return createJsonResponse({ sessionId: session.id, url: session.url });
});
