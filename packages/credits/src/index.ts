/**
 * Credit management utilities – migrated from `uapi/lib/credits.ts`.
 */

import { supabaseAdmin } from '@bitcode/supabase';
import { getUsdPricingForApiModel } from '@bitcode/models/src/pricing';
import { log } from '@bitcode/logger';

// ---------------------------------------------------------------------------
// Tunable operational constants
// ---------------------------------------------------------------------------

/**
 * How many credits should remain in the escrow before we pre-emptively pull in
 * another TOP_UP_INCREMENT block.  Can be tuned at runtime via env vars so ops
 * can react to traffic patterns without redeploying.
 */
export const SAFETY_MARGIN_CREDITS: number = Number.parseInt(
  process.env.CREDIT_SAFETY_MARGIN ?? '10',
  10,
);

/**
 * The deterministic chunk we debit when the buffer runs low.  Defaults to the
 * same value we reserve at start (100) but can be overridden via env.
 */
export const TOP_UP_INCREMENT: number = Number.parseInt(
  process.env.CREDIT_TOP_UP ?? '100',
  10,
);

/**
 * Deducts a specified number of credits from a user's balance.
 * Throws if amount <= 0, if insufficient balance, or on DB errors.
 */
// ---------------------------------------------------------------------------
// Error helpers
// ---------------------------------------------------------------------------

/**
 * Thrown when a user does not have enough credits to cover the requested
 * operation.  Callers can catch this specific error to return a 402 /
 * payment-required style response without relying on brittle string matches.
 */
export class InsufficientCreditsError extends Error {
  public readonly code = 'INSUFFICIENT_CREDITS';

  constructor(message: string) {
    super(message);
    this.name = 'InsufficientCreditsError';
  }
}

// ---------------------------------------------------------------------------
// Core balance mutations
// ---------------------------------------------------------------------------

/**
 * Enforces hard limits on credit operations to prevent negative balances.
 * Returns whether the operation is allowed and the user's current available balance.
 *
 * @param userId - The user's ID
 * @param requestedAmount - Amount of credits requested
 * @returns Object with allowed status and available balance
 */
export async function enforceHardLimit(
  userId: string,
  requestedAmount: number
): Promise<{ allowed: boolean; available: number; shortfall?: number }> {
  // Get current balance
  const balance = await getBalance(userId);

  if (balance < requestedAmount) {
    const shortfall = requestedAmount - balance;
    log('[credits] Hard limit enforcement: insufficient balance', 'warn', {
      userId,
      requested: requestedAmount,
      available: balance,
      shortfall
    });
    return { allowed: false, available: balance, shortfall };
  }

  return { allowed: true, available: balance };
}

/**
 * Alerts when user balance falls below a threshold.
 * Useful for proactive credit management and user notifications.
 *
 * @param userId - The user's ID
 * @param threshold - Credit threshold for alerting (defaults to 100)
 */
export async function alertLowBalance(
  userId: string,
  threshold: number = 100
): Promise<void> {
  const balance = await getBalance(userId);

  if (balance <= threshold) {
    log('[credits] Low balance alert triggered', 'warn', {
      userId,
      balance,
      threshold
    });

    // TODO: Integrate with notification service when available
    // For now, just log the alert
  }
}

export async function deductCredits(userId: string, amount: number): Promise<number> {
  if (amount <= 0) {
    throw new Error(`Invalid deduction amount: ${amount}. Must be positive.`);
  }

  // Prefer the atomic SQL function (added in migration 034).  It deducts the
  // balance and inserts the ledger row in a single transaction which removes
  // any chance of divergence between the two tables.
  const { data: rpcResult, error: rpcError } = await supabaseAdmin.rpc(
    'deduct_credits',
    { p_user_id: userId, p_amount: amount },
  );

  // Handle insufficient balance propagated from SQL function (SQLSTATE PAYS0).
  if (rpcError && rpcError.code === 'PAYS0') {
    throw new InsufficientCreditsError(rpcError.message);
  }

  // Undefined function fallback detection (Postgres or PostgREST layer)
  const isUndefinedFn = !!rpcError && (
    rpcError.code === '42883' /* undefined_function */ ||
    rpcError.code === 'PGRST204' /* PostgREST schema cache missing func */ ||
    /Could not find the function/i.test(String(rpcError.message || rpcError.details || ''))
  );

  if (!rpcError) {
    return rpcResult as number;
  }

  // If not an undefined-function scenario, bubble the error.
  if (!isUndefinedFn) {
    throw new Error(`Error deducting credits for user ${userId}: ${rpcError.message || rpcError.details}`);
  }

  // Fallback path: log once per call at debug for observability
  try {
    log('[credits] Falling back to GA-1 balance deduction (RPC missing)', 'debug', {
      userId,
      amount,
      rpcCode: rpcError.code,
      rpcMessage: rpcError.message,
    });
  } catch {}

  // ------------------------------------------------------------------
  // Fallback for environments that have not yet run the new migration.
  // ------------------------------------------------------------------

  // Fetch existing credit balance
  const { data: existing, error: fetchErr } = await supabaseAdmin
    .from('user_credits')
    .select('balance')
    .eq('user_id', userId)
    .single();

  if (fetchErr && fetchErr.code !== 'PGRST116') {
    throw new Error(`Error fetching credits for user ${userId}: ${fetchErr.message}`);
  }

  const previous = existing?.balance ?? 0;
  if (previous < amount) {
    throw new InsufficientCreditsError(
      `Insufficient credits for user ${userId}: have ${previous}, need ${amount}`,
    );
  }

  const newBalance = previous - amount;

  // Upsert new balance
  const { data: upserted, error: upsertErr } = await supabaseAdmin
    .from('user_credits')
    .upsert(
      { user_id: userId, balance: newBalance, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' },
    )
    .select('balance')
    .single();

  if (upsertErr) {
    throw new Error(`Error updating credits for user ${userId}: ${upsertErr.message}`);
  }

  // Record usage event – best-effort (non-critical)
  try {
    await supabaseAdmin.from('user_credit_usages').insert({
      user_id: userId,
      amount: -amount,
      operation_type: 'DEDUCT',
      metadata: { reason: 'Credit deduction', balance: upserted.balance },
      created_at: new Date().toISOString(),
    });
  } catch (usageErr) {
    // eslint-disable-next-line no-console
    console.error(`Failed to record credit usage for user ${userId}:`, usageErr);
  }

  return newBalance;
}

// ---------------------------------------------------------------------------
// Addition helper (rare – refunds, promos, admin adjustments)
// ---------------------------------------------------------------------------

/**
 * Adds (credits) funds to the user’s balance.  Mirrors `deductCredits` logic
 * but for positive balance changes.
 */
export async function addCredits(userId: string, amount: number): Promise<number> {
  if (amount <= 0) {
    throw new Error(`Invalid addCredits amount: ${amount}. Must be positive.`);
  }

  const { data: rpcRes, error: rpcErr } = await supabaseAdmin.rpc('add_credits', {
    p_user_id: userId,
    p_amount: amount,
  });

  if (!rpcErr) return rpcRes as number;

  const addUndefinedFn = (
    rpcErr.code === '42883' ||
    rpcErr.code === 'PGRST204' ||
    /Could not find the function/i.test(String(rpcErr.message || rpcErr.details || ''))
  );

  // If not an undefined-function scenario, bubble the error.
  if (!addUndefinedFn) {
    throw new Error(`Error adding credits for user ${userId}: ${rpcErr.message || rpcErr.details}`);
  }

  // Fallback path: log once per call at debug for observability
  try {
    log('[credits] Falling back to GA-1 balance addition (RPC missing)', 'debug', {
      userId,
      amount,
      rpcCode: rpcErr.code,
      rpcMessage: rpcErr.message,
    });
  } catch {}

  const { data: existing, error: fetchErr } = await supabaseAdmin
    .from('user_credits')
    .select('balance')
    .eq('user_id', userId)
    .single();

  if (fetchErr && fetchErr.code !== 'PGRST116') {
    throw new Error(`Error fetching credits for user ${userId}: ${fetchErr.message}`);
  }

  const previous = existing?.balance ?? 0;
  const newBalance = previous + amount;

  const { data: upserted, error: upsertErr } = await supabaseAdmin
    .from('user_credits')
    .upsert(
      { user_id: userId, balance: newBalance, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' },
    )
    .select('balance')
    .single();

  if (upsertErr) {
    throw new Error(`Error updating credits for user ${userId}: ${upsertErr.message}`);
  }

  try {
    await supabaseAdmin.from('user_credit_usages').insert({
      user_id: userId,
      amount: amount,
      operation_type: 'ADD',
      metadata: { reason: 'Credit addition', balance: upserted.balance },
      created_at: new Date().toISOString(),
    });
  } catch (usageErr) {
    // eslint-disable-next-line no-console
    console.error(`Failed to record credit addition for user ${userId}:`, usageErr);
  }

  return newBalance;
}

// ---------------------------------------------------------------------------
// LLM token helpers
// ---------------------------------------------------------------------------

export interface GenerationTokens {
  inputTokens: number;
  outputTokens: number;
}

/** Rough estimate tokens from text (≈4 chars per token). */
export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

/**
 * Deduct credits based on generation token usage.
 * Uses ~$0.15 per 1M input tokens and $1.15 per 1M output tokens,
 * with $0.10 per credit conversion (10 credits per USD).
 */
export async function deductGenerationCredits(userId: string, tokens: GenerationTokens): Promise<number> {
  return deductLLMCreditsByModel(userId, {
    model: 'gpt-3.5-turbo',
    ...tokens,
  });
}

// ---------------------------------------------------------------------------
// Model-specific pricing helpers
// ---------------------------------------------------------------------------

/**
 * USD pricing (per **one million** tokens) for input & output tokens by model.
 *
 * The values mirror OpenAI’s public pricing sheet as of 2024-03-15.
 * Add / update rows when Engi supports new models or vendors.
 */
// Deprecated static fallback. Prefer centralized catalog in @bitcode/models.
export const MODEL_PRICING_USD_PER_MILLION: Record<string, { input: number; output: number }> = {
  'gpt-3.5-turbo': { input: 0.50, output: 1.50 },
  'gpt-3.5-turbo-16k': { input: 0.50, output: 1.50 },
  'gpt-4o-mini': { input: 5.00, output: 15.00 },
  'gpt-4-turbo': { input: 10.00, output: 30.00 },
  'claude-3-opus': { input: 15.00, output: 75.00 },
  'claude-3-sonnet': { input: 3.00, output: 15.00 },
  'claude-3-haiku': { input: 0.25, output: 1.25 },
};

/** Credits ⇆ USD conversion helpers */
const USD_PER_CREDIT = 0.10; // 10¢ per credit (1 credit per $0.10)
const CREDITS_PER_USD = 1 / USD_PER_CREDIT; // 10 credits per USD

/**
 * Computes the number of credits necessary to cover a given generation.
 * – Looks up model-specific USD pricing.
 * – Multiplies by `CREDITS_PER_USD` (10).
 * – Always rounds **up** to the nearest whole credit so we never under-charge.
 */
export function calculateLLMCredits(
  model: string,
  tokens: GenerationTokens,
): { usd: number; credits: number } {
  // Prefer centralized catalog
  const pricing = getUsdPricingForApiModel(model) || MODEL_PRICING_USD_PER_MILLION[model];
  if (!pricing) {
    throw new Error(`Unsupported / unknown model for credit calculation: ${model}`);
  }

  const usd =
    ((tokens.inputTokens * pricing.input + tokens.outputTokens * pricing.output) /
      1_000_000);

  const credits = Math.max(1, Math.ceil(usd * CREDITS_PER_USD));

  return { usd, credits };
}

/**
 * Deduct credits from a user for a single generation, using model-specific
 * pricing.  If the model isn’t recognised, the function throws so that callers
 * can decide whether to block the request or fall back to a safe default.
 */
export async function deductLLMCreditsByModel(
  userId: string,
  params: { model: string } & GenerationTokens,
): Promise<number> {
  const { credits } = calculateLLMCredits(params.model, params);
  return deductCredits(userId, credits);
}

// ---------------------------------------------------------------------------
// Credit escrow / reservation helpers
// ---------------------------------------------------------------------------

import { v4 as uuidv4 } from 'uuid';

// The reservation record mirrors what will eventually live in a dedicated
// `credit_reservations` table.  We create it optimistically – the DB
// migration can follow later without requiring code changes.
interface CreditReservation {
  id: string;
  user_id: string;
  reserved: number;
  used: number;
  status: 'OPEN' | 'CLOSED';
  created_at: string;
  closed_at?: string | null;
}

// In-memory fallback when the `credit_reservations` table is unavailable (e.g.
// in local tests or CI where the DB migrations haven’t been applied yet).
const inMemoryReservations = new Map<string, CreditReservation>();

/**
 * Estimates the reservation amount for a brand-new pipeline execution / user action.
 * For now we default to 100 credits – tweak once we have real usage stats.
 */
export const DEFAULT_RESERVATION_CREDITS = 100;

/**
 * Minimum credits each pipeline must escrow before starting.  Values chosen
 * from historical median usage (rounded up to nearest 10 credits).
 */
export const PIPELINE_ESCROW_REQUIREMENTS: Record<string, number> = {
  'deliverable': 50,
};

/** Helper – returns reservation or DEFAULT if unknown */
export function reservationForPipeline(pipelineType: string): number {
  return PIPELINE_ESCROW_REQUIREMENTS[pipelineType] ?? DEFAULT_RESERVATION_CREDITS;
}

/**
 * Reserve (escrow) a block of credits.  If the user’s available balance is
 * lower than the requested amount this function throws.  Internally it simply
 * calls `deductCredits` to *move* funds out of the available pool so they
 * can’t be spent twice, then records the reservation for later settlement.
 */
export async function reserveCredits(
  userId: string,
  amount: number = DEFAULT_RESERVATION_CREDITS,
): Promise<CreditReservation> {
  // Enforce hard limits before attempting reservation
  const { allowed, available, shortfall } = await enforceHardLimit(userId, amount);

  if (!allowed) {
    throw new InsufficientCreditsError(
      `Cannot reserve ${amount} credits. User has ${available} credits available (shortfall: ${shortfall})`
    );
  }

  const reservationId = uuidv4();

  // Deduct first so that the balance always reflects the held funds.
  await deductCredits(userId, amount);

  const reservation: CreditReservation = {
    id: reservationId,
    user_id: userId,
    reserved: amount,
    used: 0,
    status: 'OPEN',
    created_at: new Date().toISOString(),
  };

  // Persist – best effort
  try {
    await supabaseAdmin.from('credit_reservations').insert(reservation);
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('[credits] Failed to insert credit_reservations row', err?.message || err);
  }

  // Always keep in-memory copy for local fallback.
  inMemoryReservations.set(reservationId, reservation);

  return reservation;
}

/**
 * During a long-running job callers can *incrementally* record usage so that
 * we can keep the credits ledger accurate in near-real-time and pull in extra
 * funds if the job exceeds its initial estimate.
 */
export async function recordReservationUsage(
  reservationId: string,
  additionalUsed: number,
): Promise<void> {
  if (additionalUsed <= 0) return;

  // First try the atomic Postgres function (added in SQL migration 035).  It
  // performs an UPDATE … RETURNING so that concurrent workers cannot race.
  try {
    const { data: rpcRow, error: rpcErr } = await supabaseAdmin.rpc(
      'consume_reservation',
      {
        p_reservation_id: reservationId,
        p_additional_used: additionalUsed,
        p_safety_margin: SAFETY_MARGIN_CREDITS,
        p_top_up: TOP_UP_INCREMENT,
      },
    );

    if (!rpcErr) {
      inMemoryReservations.set(reservationId, rpcRow as CreditReservation);
      return; // success path finished
    }

    // 42883 = undefined_function → migrations not present yet.  Anything else
    // throw upward so we do not silently drop usage.
    if (rpcErr.code !== '42883') throw rpcErr;
  } catch (rpcFatal) {
    if ((rpcFatal as any)?.code && (rpcFatal as any)?.code !== '42883') {
      throw rpcFatal;
    }
    // Else fall through to legacy logic below
  }

  let row: CreditReservation | null = null;
  try {
    const { data, error } = await supabaseAdmin
      .from('credit_reservations')
      .select('*')
      .eq('id', reservationId)
      .single();

    if (error && error.code !== '42P01') {
      // 42P01 => undefined_table – means the migrations haven’t run.
      throw error;
    }

    row = (data as CreditReservation) ?? null;
  } catch (dbErr: any) {
    // eslint-disable-next-line no-console
    console.warn('[credits] Falling back to in-memory reservations for', reservationId);
  }

  if (!row) {
    row = inMemoryReservations.get(reservationId) ?? null;
  }

  if (!row) {
    throw new Error(`Reservation not found: ${reservationId}`);
  }

  if (row.status === 'CLOSED') {
    throw new Error(`Cannot add usage to closed reservation ${reservationId}`);
  }

  const newUsed = (row.used as number) + additionalUsed;

  // --------------------------------------------------------------------
  // Auto top-up logic – emergency pull when buffer low or negative
  // --------------------------------------------------------------------

  const remaining = row.reserved - newUsed;

  if (remaining < 0) {
    // Already overspent → pull exact overage plus one full increment so the
    // caller immediately has headroom again.
    const amountToPull = Math.abs(remaining) + TOP_UP_INCREMENT;
    await deductCredits(row.user_id as string, amountToPull);
    row.reserved += amountToPull;
  } else if (remaining <= SAFETY_MARGIN_CREDITS) {
    // Buffer running low → proactively top up.
    await deductCredits(row.user_id as string, TOP_UP_INCREMENT);
    row.reserved += TOP_UP_INCREMENT;
  }

  // Persist change (DB and in-mem) – best effort.
  try {
    await supabaseAdmin
      .from('credit_reservations')
      .update({ used: newUsed, reserved: row.reserved })
      .eq('id', reservationId);
  } catch (_) {
    // ignore – transient DB outage will be reconciled later via in-mem copy.
  }

  row.used = newUsed;
  inMemoryReservations.set(reservationId, row);
}

// ---------------------------------------------------------------------------
// Higher-level helper for pipeline code
// ---------------------------------------------------------------------------

/**
 * Runs an asynchronous job wrapped in a credit reservation.  Handles happy
 * path, mid-run credit depletion and final settlement automatically.
 *
 * Typical usage:
 *
 *   return withCreditReservation(user.id, async (escrow) => {
 *     await recordReservationUsage(escrow.id, 20);
 *     … heavy LLM calls …
 *     await recordReservationUsage(escrow.id, 50);
 *     return deliverable;
 *   });
 */
export async function withCreditReservation<T>(
  userId: string,
  run: (reservation: CreditReservation) => Promise<T>,
  {
    pipelineType,
    initialCredits,
  }: { pipelineType?: string; initialCredits?: number } = {},
): Promise<T> {
  const reserveAmount =
    initialCredits ?? (pipelineType ? reservationForPipeline(pipelineType) : DEFAULT_RESERVATION_CREDITS);

  // Reserve – will throw InsufficientCreditsError if balance too low.
  const reservation = await reserveCredits(userId, reserveAmount);

  try {
    const result = await run(reservation);
    await closeReservation(reservation.id); // refund unused delta
    return result;
  } catch (err: any) {
    // Distinguish business-logic “not enough balance” from other failures.
    if (
      err?.code === 'INSUFFICIENT_CREDITS' ||
      err instanceof InsufficientCreditsError ||
      err?.code === 'SHORT_CIRCUIT' ||
      /SHORT_CIRCUIT/.test(err?.message || '')
    ) {
      // Short-circuit or insufficient balance: refund entire reservation.
      await closeReservation(reservation.id, { refundAll: true });
    } else {
      // Runtime error inside pipeline → refund unused, but keep spent usage.
      try {
        await closeReservation(reservation.id);
      } catch (_) {/* ignore */}
    }
    throw err; // re-throw so caller can decide how to surface
  }
}

/**
 * Finalises a reservation and returns any *unused* credits back to the user.
 *
 * Pass `refundAll = true` to short-circuit a run and refund the entire amount
 * (regardless of recorded usage).  This will *always* prevent negative charge
 * scenarios by never refunding more than initially reserved.
 */
export async function closeReservation(
  reservationId: string,
  { refundAll = false }: { refundAll?: boolean } = {},
): Promise<void> {
  let row: CreditReservation | null = null;
  try {
    const { data, error } = await supabaseAdmin
      .from('credit_reservations')
      .select('*')
      .eq('id', reservationId)
      .single();

    if (error && error.code !== '42P01') {
      throw error;
    }

    row = (data as CreditReservation) ?? null;
  } catch (_) {
    // ignore – will handle below
  }

  if (!row) row = inMemoryReservations.get(reservationId) ?? null;

  if (!row) {
    throw new Error(`Reservation not found: ${reservationId}`);
  }

  if (row.status === 'CLOSED') return; // already settled

  const unused = refundAll ? row.reserved : Math.max(0, row.reserved - row.used);

  if (unused > 0) {
    // Negative amount → credits go back to user.
    try {
      await addCredits(row.user_id as string, unused);
    } catch (refundErr: any) {
      // eslint-disable-next-line no-console
      console.error('[credits] Failed to refund unused credits:', refundErr);
    }
  }

  try {
    await supabaseAdmin
      .from('credit_reservations')
      .update({ status: 'CLOSED', closed_at: new Date().toISOString() })
      .eq('id', reservationId);
  } catch (_) {/* ignore */}

  row.status = 'CLOSED';
  row.closed_at = new Date().toISOString();
  inMemoryReservations.set(reservationId, row);
}

// ---------------------------------------------------------------------------
// Short-circuit refund processing
// ---------------------------------------------------------------------------

import { ShortCircuitSignal } from '@bitcode/execution-generics';

/**
 * Process refund based on short-circuit signal
 * This is the centralized refund handler for all pipelines
 */
export async function processShortCircuitRefund(
  signal: ShortCircuitSignal,
  reservationId: string
): Promise<void> {
  if (!reservationId) {
    throw new Error('Missing reservation ID for short-circuit refund');
  }
  
  // Get reservation details
  let reservation: CreditReservation | null = null;
  try {
    const { data, error } = await supabaseAdmin
      .from('credit_reservations')
      .select('*')
      .eq('id', reservationId)
      .single();
    
    if (!error) {
      reservation = data as CreditReservation;
    }
  } catch (_) {
    // Try in-memory fallback
    reservation = inMemoryReservations.get(reservationId) ?? null;
  }
  
  if (!reservation) {
    throw new Error(`Reservation not found for refund: ${reservationId}`);
  }
  
  // Determine refund amount based on signal
  const refundAll = signal.refundType === 'full';
  
  // Close reservation with appropriate refund
  await closeReservation(reservationId, { refundAll });
  
  // Log the refund event
  try {
    await supabaseAdmin
      .from('user_credit_usages')
      .insert({
        user_id: reservation.user_id,
        change: refundAll ? reservation.reserved : Math.max(0, reservation.reserved - reservation.used),
        balance: 0, // Will be updated by closeReservation
        description: `Pipeline short-circuit refund: ${signal.reason}`,
        metadata: {
          reservation_id: reservationId,
          refund_type: signal.refundType,
          phase: signal.metadata?.phase,
          agent: signal.metadata?.agent
        },
        created_at: new Date().toISOString()
      });
  } catch (err) {
    console.error('[credits] Failed to log refund event:', err);
  }
}

// ---------------------------------------------------------------------------
// Public re-exports
// ---------------------------------------------------------------------------

export * from './plans';

// Note: Other exported symbols (InsufficientCreditsError, withCreditReservation,
// constants, helpers…) are exported at their declaration sites above to avoid
// duplicate export clashes.
