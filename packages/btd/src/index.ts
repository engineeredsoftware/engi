/**
 * `$BTD` balance management utilities.
 *
 * The database layer still uses compatibility carriers such as `user_credits`,
 * `user_credit_usages`, and `credit_reservations` until the persistence schema
 * is re-cut, but the package/API contract is canonical Bitcode `$BTD`.
 */

import { randomUUID } from 'node:crypto';

import { supabaseAdmin } from '@bitcode/supabase';
import { getUsdPricingForApiModel } from '@bitcode/models/src/pricing';
import { log } from '@bitcode/logger';

// ---------------------------------------------------------------------------
// Tunable operational constants
// ---------------------------------------------------------------------------

/**
 * How much `$BTD` should remain in the escrow before we pre-emptively pull in
 * another TOP_UP_INCREMENT block.  Can be tuned at runtime via env vars so ops
 * can react to traffic patterns without redeploying.
 */
export const BTD_SAFETY_MARGIN: number = Number.parseInt(
  process.env.BTD_SAFETY_MARGIN ?? process.env.CREDIT_SAFETY_MARGIN ?? '10',
  10,
);

/**
 * The deterministic chunk we debit when the buffer runs low.  Defaults to the
 * same value we reserve at start (100) but can be overridden via env.
 */
export const BTD_TOP_UP_INCREMENT: number = Number.parseInt(
  process.env.BTD_TOP_UP ?? process.env.CREDIT_TOP_UP ?? '100',
  10,
);

/**
 * Deducts a specified amount of `$BTD` from a user's balance.
 * Throws if amount <= 0, if insufficient balance, or on DB errors.
 */
// ---------------------------------------------------------------------------
// Error helpers
// ---------------------------------------------------------------------------

/**
 * Thrown when a user does not have enough `$BTD` to cover the requested
 * operation.  Callers can catch this specific error to return a 402 /
 * payment-required style response without relying on brittle string matches.
 */
export class InsufficientBtdBalanceError extends Error {
  public readonly code = 'INSUFFICIENT_BTD_BALANCE';

  constructor(message: string) {
    super(message);
    this.name = 'InsufficientBtdBalanceError';
  }
}

// ---------------------------------------------------------------------------
// Core balance mutations
// ---------------------------------------------------------------------------

export async function getBtdBalance(userId: string): Promise<number> {
  const { data, error } = await supabaseAdmin
    .from('user_credits')
    .select('balance')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return 0;
    }

    throw new Error(`Error fetching BTD balance for user ${userId}: ${error.message}`);
  }

  return data?.balance ?? 0;
}

export const getBalance = getBtdBalance;

/**
 * Enforces hard limits on `$BTD` operations to prevent negative balances.
 * Returns whether the operation is allowed and the user's current available balance.
 *
 * @param userId - The user's ID
 * @param requestedAmount - Amount of `$BTD` requested
 * @returns Object with allowed status and available balance
 */
export async function enforceBtdHardLimit(
  userId: string,
  requestedAmount: number
): Promise<{ allowed: boolean; available: number; shortfall?: number }> {
  // Get current balance
  const balance = await getBtdBalance(userId);

  if (balance < requestedAmount) {
    const shortfall = requestedAmount - balance;
    log('[btd] Hard limit enforcement: insufficient balance', 'warn', {
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
 * Useful for proactive `$BTD` management and user notifications.
 *
 * @param userId - The user's ID
 * @param threshold - `$BTD` threshold for alerting (defaults to 100)
 */
export async function alertLowBtdBalance(
  userId: string,
  threshold: number = 100
): Promise<void> {
  const balance = await getBtdBalance(userId);

  if (balance <= threshold) {
    log('[btd] Low balance alert triggered', 'warn', {
      userId,
      balance,
      threshold
    });

    // TODO: Integrate with notification service when available
    // For now, just log the alert
  }
}

export async function deductBtdBalance(userId: string, amount: number): Promise<number> {
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
    throw new InsufficientBtdBalanceError(rpcError.message);
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
    throw new Error(`Error deducting BTD for user ${userId}: ${rpcError.message || rpcError.details}`);
  }

  // Fallback path: log once per call at debug for observability
  try {
    log('[btd] Falling back to V26 balance deduction (RPC missing)', 'debug', {
      userId,
      amount,
      rpcCode: rpcError.code,
      rpcMessage: rpcError.message,
    });
  } catch {}

  // ------------------------------------------------------------------
  // Fallback for environments that have not yet run the new migration.
  // ------------------------------------------------------------------

  // Fetch existing balance from the compatibility carrier.
  const { data: existing, error: fetchErr } = await supabaseAdmin
    .from('user_credits')
    .select('balance')
    .eq('user_id', userId)
    .single();

  if (fetchErr && fetchErr.code !== 'PGRST116') {
    throw new Error(`Error fetching BTD balance for user ${userId}: ${fetchErr.message}`);
  }

  const previous = existing?.balance ?? 0;
  if (previous < amount) {
    throw new InsufficientBtdBalanceError(
      `Insufficient BTD for user ${userId}: have ${previous}, need ${amount}`,
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
    throw new Error(`Error updating BTD balance for user ${userId}: ${upsertErr.message}`);
  }

  // Record usage event – best-effort (non-critical)
  try {
    await supabaseAdmin.from('user_credit_usages').insert({
      user_id: userId,
      amount: -amount,
      operation_type: 'DEDUCT',
      metadata: { reason: 'BTD deduction', balance: upserted.balance },
      created_at: new Date().toISOString(),
    });
  } catch (usageErr) {
    // eslint-disable-next-line no-console
    console.error(`Failed to record BTD usage for user ${userId}:`, usageErr);
  }

  return newBalance;
}

// ---------------------------------------------------------------------------
// Addition helper (rare – refunds, promos, admin adjustments)
// ---------------------------------------------------------------------------

/**
 * Adds `$BTD` to the user’s balance. Mirrors `deductBtdBalance` logic
 * but for positive balance changes.
 */
export async function addBtdBalance(userId: string, amount: number): Promise<number> {
  if (amount <= 0) {
    throw new Error(`Invalid addBtdBalance amount: ${amount}. Must be positive.`);
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
    throw new Error(`Error adding BTD for user ${userId}: ${rpcErr.message || rpcErr.details}`);
  }

  // Fallback path: log once per call at debug for observability
  try {
    log('[btd] Falling back to V26 balance addition (RPC missing)', 'debug', {
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
    throw new Error(`Error fetching BTD balance for user ${userId}: ${fetchErr.message}`);
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
    throw new Error(`Error updating BTD balance for user ${userId}: ${upsertErr.message}`);
  }

  try {
    await supabaseAdmin.from('user_credit_usages').insert({
      user_id: userId,
      amount: amount,
      operation_type: 'ADD',
      metadata: { reason: 'BTD addition', balance: upserted.balance },
      created_at: new Date().toISOString(),
    });
  } catch (usageErr) {
    // eslint-disable-next-line no-console
    console.error(`Failed to record BTD addition for user ${userId}:`, usageErr);
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
 * Deduct `$BTD` based on generation token usage.
 * Uses ~$0.15 per 1M input tokens and $1.15 per 1M output tokens,
 * with $0.10 per-BTD conversion (10 BTD per USD).
 */
export async function deductGenerationBtd(userId: string, tokens: GenerationTokens): Promise<number> {
  return deductLlmBtdByModel(userId, {
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
 * Add / update rows when Bitcode supports new models or vendors.
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

/** `$BTD` ⇆ USD conversion helpers */
const USD_PER_BTD = 0.10;
const BTD_PER_USD = 1 / USD_PER_BTD;

/**
 * Computes the amount of `$BTD` necessary to cover a given generation.
 * – Looks up model-specific USD pricing.
 * – Multiplies by `BTD_PER_USD` (10).
 * – Always rounds **up** to the nearest whole unit so we never under-charge.
 */
export function calculateLlmBtdDebit(
  model: string,
  tokens: GenerationTokens,
): { usd: number; btdAmount: number } {
  // Prefer centralized catalog
  const pricing = getUsdPricingForApiModel(model) || MODEL_PRICING_USD_PER_MILLION[model];
  if (!pricing) {
    throw new Error(`Unsupported / unknown model for BTD calculation: ${model}`);
  }

  const usd =
    ((tokens.inputTokens * pricing.input + tokens.outputTokens * pricing.output) /
      1_000_000);

  const btdAmount = Math.max(1, Math.ceil(usd * BTD_PER_USD));

  return { usd, btdAmount };
}

/**
 * Deduct `$BTD` from a user for a single generation, using model-specific
 * pricing.  If the model isn’t recognised, the function throws so that callers
 * can decide whether to block the request or fall back to a safe default.
 */
export async function deductLlmBtdByModel(
  userId: string,
  params: { model: string } & GenerationTokens,
): Promise<number> {
  const { btdAmount } = calculateLlmBtdDebit(params.model, params);
  return deductBtdBalance(userId, btdAmount);
}

// ---------------------------------------------------------------------------
// BTD escrow / reservation helpers
// ---------------------------------------------------------------------------

// The reservation record mirrors what will eventually live in a dedicated
// compatibility `credit_reservations` table. We create it optimistically - the DB
// migration can follow later without requiring code changes.
interface BtdReservation {
  id: string;
  user_id: string;
  reserved: number;
  used: number;
  status: 'OPEN' | 'CLOSED';
  created_at: string;
  closed_at?: string | null;
}

// In-memory fallback when the `credit_reservations` table is unavailable
// in local tests or CI where the DB migrations have not been applied yet.
const inMemoryReservations = new Map<string, BtdReservation>();

/**
 * Estimates the reservation amount for a brand-new pipeline execution / user action.
 * For now we default to 100 `$BTD` – tweak once we have real usage stats.
 */
export const DEFAULT_BTD_RESERVATION = 100;

/**
 * Minimum `$BTD` each pipeline must escrow before starting. Values are chosen
 * from historical median usage.
 */
export const PIPELINE_BTD_ESCROW_REQUIREMENTS: Record<string, number> = {
  'deliverable': 50,
};

/** Helper – returns reservation or DEFAULT if unknown */
export function btdReservationForPipeline(pipelineType: string): number {
  return PIPELINE_BTD_ESCROW_REQUIREMENTS[pipelineType] ?? DEFAULT_BTD_RESERVATION;
}

/**
 * Reserve (escrow) a block of `$BTD`. If the user’s available balance is
 * lower than the requested amount this function throws.  Internally it simply
 * calls `deductBtdBalance` to *move* funds out of the available pool so they
 * can’t be spent twice, then records the reservation for later settlement.
 */
export async function reserveBtdBalance(
  userId: string,
  amount: number = DEFAULT_BTD_RESERVATION,
): Promise<BtdReservation> {
  // Enforce hard limits before attempting reservation
  const { allowed, available, shortfall } = await enforceBtdHardLimit(userId, amount);

  if (!allowed) {
    throw new InsufficientBtdBalanceError(
      `Cannot reserve ${amount} BTD. User has ${available} BTD available (shortfall: ${shortfall})`
    );
  }

  const reservationId = randomUUID();

  // Deduct first so that the balance always reflects the held funds.
  await deductBtdBalance(userId, amount);

  const reservation: BtdReservation = {
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
    console.error('[btd] Failed to insert credit_reservations row', err?.message || err);
  }

  // Always keep in-memory copy for local fallback.
  inMemoryReservations.set(reservationId, reservation);

  return reservation;
}

/**
 * During a long-running job callers can *incrementally* record usage so that
 * we can keep the BTD ledger accurate in near-real-time and pull in extra
 * funds if the job exceeds its initial estimate.
 */
export async function recordBtdReservationUsage(
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
        p_safety_margin: BTD_SAFETY_MARGIN,
        p_top_up: BTD_TOP_UP_INCREMENT,
      },
    );

    if (!rpcErr) {
      inMemoryReservations.set(reservationId, rpcRow as BtdReservation);
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

  let row: BtdReservation | null = null;
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

    row = (data as BtdReservation) ?? null;
  } catch (dbErr: any) {
    // eslint-disable-next-line no-console
    console.warn('[btd] Falling back to in-memory reservations for', reservationId);
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
    const amountToPull = Math.abs(remaining) + BTD_TOP_UP_INCREMENT;
    await deductBtdBalance(row.user_id as string, amountToPull);
    row.reserved += amountToPull;
  } else if (remaining <= BTD_SAFETY_MARGIN) {
    // Buffer running low → proactively top up.
    await deductBtdBalance(row.user_id as string, BTD_TOP_UP_INCREMENT);
    row.reserved += BTD_TOP_UP_INCREMENT;
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
 * Runs an asynchronous job wrapped in a `$BTD` reservation. Handles happy
 * path, mid-run balance depletion and final settlement automatically.
 *
 * Typical usage:
 *
 *   return withBtdReservation(user.id, async (escrow) => {
 *     await recordBtdReservationUsage(escrow.id, 20);
 *     … heavy LLM calls …
 *     await recordBtdReservationUsage(escrow.id, 50);
 *     return deliverable;
 *   });
 */
export async function withBtdReservation<T>(
  userId: string,
  run: (reservation: BtdReservation) => Promise<T>,
  {
    pipelineType,
    initialBtd,
  }: { pipelineType?: string; initialBtd?: number } = {},
): Promise<T> {
  const reserveAmount =
    initialBtd ?? (pipelineType ? btdReservationForPipeline(pipelineType) : DEFAULT_BTD_RESERVATION);

  // Reserve – will throw InsufficientBtdBalanceError if balance too low.
  const reservation = await reserveBtdBalance(userId, reserveAmount);

  try {
    const result = await run(reservation);
    await closeBtdReservation(reservation.id); // refund unused delta
    return result;
  } catch (err: any) {
    // Distinguish business-logic “not enough balance” from other failures.
    if (
      err?.code === 'INSUFFICIENT_BTD_BALANCE' ||
      err instanceof InsufficientBtdBalanceError ||
      err?.code === 'SHORT_CIRCUIT' ||
      /SHORT_CIRCUIT/.test(err?.message || '')
    ) {
      // Short-circuit or insufficient balance: refund entire reservation.
      await closeBtdReservation(reservation.id, { refundAll: true });
    } else {
      // Runtime error inside pipeline → refund unused, but keep spent usage.
      try {
        await closeBtdReservation(reservation.id);
      } catch (_) {/* ignore */}
    }
    throw err; // re-throw so caller can decide how to surface
  }
}

/**
 * Finalises a reservation and returns any unused `$BTD` back to the user.
 *
 * Pass `refundAll = true` to short-circuit a run and refund the entire amount
 * (regardless of recorded usage). This will always prevent negative charge
 * scenarios by never refunding more than initially reserved.
 */
export async function closeBtdReservation(
  reservationId: string,
  { refundAll = false }: { refundAll?: boolean } = {},
): Promise<void> {
  let row: BtdReservation | null = null;
  try {
    const { data, error } = await supabaseAdmin
      .from('credit_reservations')
      .select('*')
      .eq('id', reservationId)
      .single();

    if (error && error.code !== '42P01') {
      throw error;
    }

    row = (data as BtdReservation) ?? null;
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
    // Unused reservation amount returns to the available balance.
    try {
      await addBtdBalance(row.user_id as string, unused);
    } catch (refundErr: any) {
      // eslint-disable-next-line no-console
      console.error('[btd] Failed to refund unused BTD:', refundErr);
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
export async function processShortCircuitBtdRefund(
  signal: ShortCircuitSignal,
  reservationId: string
): Promise<void> {
  if (!reservationId) {
    throw new Error('Missing reservation ID for short-circuit refund');
  }
  
  // Get reservation details
  let reservation: BtdReservation | null = null;
  try {
    const { data, error } = await supabaseAdmin
      .from('credit_reservations')
      .select('*')
      .eq('id', reservationId)
      .single();
    
    if (!error) {
      reservation = data as BtdReservation;
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
  await closeBtdReservation(reservationId, { refundAll });
  
  // Log the refund event
  try {
    await supabaseAdmin
      .from('user_credit_usages')
      .insert({
        user_id: reservation.user_id,
        change: refundAll ? reservation.reserved : Math.max(0, reservation.reserved - reservation.used),
        balance: 0, // Updated by closeBtdReservation
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
      console.error('[btd] Failed to log refund event:', err);
  }
}

// ---------------------------------------------------------------------------
// Public re-exports
// ---------------------------------------------------------------------------

export * from './plans';

// Note: Other exported symbols (InsufficientBtdBalanceError, withBtdReservation,
// constants, helpers…) are exported at their declaration sites above to avoid
// duplicate export clashes.
