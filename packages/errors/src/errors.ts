/*
 * @bitcode/errors
 * ---------------------------------------------------------------------------
 * Canonical error primitives & helpers used across Engi codebases.  Provides a
 * single place to evolve error semantics (status codes, Sentry tagging, user
 * messages, etc.) without having to refactor dozens of call sites.
 */

import { captureException } from '@bitcode/sentry';

export interface EngiErrorOptions {
  /**
   * Stable machine-readable code (e.g. "NOT_FOUND") used to power feature
   * flags, retries, etc.  Always UPPER_SNAKE_CASE.
   */
  code: string;

  /** Optional HTTP status code for API responses */
  status?: number;

  /** End-user friendly message (defaults to message) */
  userMessage?: string;

  /** Arbitrary diagnostic context (included as Sentry extra) */
  meta?: Record<string, unknown>;
}

export class EngiError extends Error {
  public readonly code: string;
  public readonly status?: number;
  public readonly userMessage?: string;
  public readonly meta?: Record<string, unknown>;

  constructor(message: string, opts: EngiErrorOptions) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'EngiError';
    this.code = opts.code;
    this.status = opts.status;
    this.userMessage = opts.userMessage ?? message;
    this.meta = opts.meta;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      userMessage: this.userMessage,
      status: this.status,
    };
  }
}

// ---------------------------------------------------------------------------
// Helper: unwrap unknown errors into EngiError consistently
// ---------------------------------------------------------------------------

export function asEngiError(err: unknown): EngiError {
  if (err instanceof EngiError) return err;

  const e = err as any;
  const message = (typeof e?.message === 'string' ? e.message : 'Unexpected error') as string;
  const code = (typeof e?.code === 'string' ? e.code : 'UNKNOWN_ERROR') as string;
  const status = typeof e?.status === 'number' ? e.status : undefined;

  return new EngiError(message, {
    code,
    status,
    meta: typeof e === 'object' && e ? { original: e } : undefined,
  });
}

/**
 * Capture an error with Sentry, returning the normalized EngiError so callers
 * can propagate further.
 */
export function reportError(err: unknown): EngiError {
  const normalized = asEngiError(err);
  // To avoid double-reporting, attach a symbol marker after first capture.
  const FLAG = Symbol.for('__engi_reported__');
  if (!(normalized as any)[FLAG]) {
    (normalized as any)[FLAG] = true;
    captureException(normalized, { extra: normalized.meta });
  }
  return normalized;
}

// ---------------------------------------------------------------------------
// Assertions (runtime equivalents of TS `asserts`)
// ---------------------------------------------------------------------------

export function invariant(condition: unknown, message = 'Invariant violated'): asserts condition {
  if (!condition) {
    throw new EngiError(message, { code: 'INVARIANT_VIOLATION', status: 500 });
  }
}

export function unreachable(value: never): never {
  throw new EngiError(`Unreachable reached with value: ${value as any}`, {
    code: 'UNREACHABLE',
    status: 500,
    meta: { value },
  });
}

// ---------------------------------------------------------------------------
// Framework helpers: Express/Next.js/similar response writer
// ---------------------------------------------------------------------------

export function toHttpResponse(err: unknown): { status: number; body: any } {
  const e = asEngiError(err);
  return {
    status: e.status ?? 500,
    body: {
      error: e.code,
      message: e.userMessage ?? 'Unexpected error',
    },
  };
}

export default {
  EngiError,
  asEngiError,
  reportError,
  invariant,
  unreachable,
  toHttpResponse,
};
