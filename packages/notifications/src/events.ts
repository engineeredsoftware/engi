import { EventEmitter } from 'events';
import { BitcodeRunNotificationType, DomainEvent, RunLifecycle } from './types';

/*
 * Tiny in-memory event bus wrapper around Node.js EventEmitter.  In
 * production we may migrate this to Postgres `pg_notify`, Supabase Realtime
 * broadcast, or an external message queue – the public API intentionally
 * hides those details so the rest of the codebase only deals with the
 * generic `publishDomainEvent` / `subscribeDomainEvent` helpers.
 */

const bus = new EventEmitter();

export function publishDomainEvent(event: DomainEvent): void {
  bus.emit('domain-event', event);
}

// Convenience helpers --------------------------------------------------------

export function emitRunLifecycle(params: {
  status: RunLifecycle;
  runId: number;
  runType: BitcodeRunNotificationType;
  userId: string;
}): void {
  publishDomainEvent({
    kind: 'RUN',
    createdAt: new Date().toISOString(),
    ...params,
  });
}

export function emitBtdBalanceEvent(params: {
  type: 'LOW_BALANCE' | 'ZERO_BALANCE';
  userId: string;
  balance: number;
  threshold?: number;
}): void {
  publishDomainEvent({
    kind: 'BTD_BALANCE',
    createdAt: new Date().toISOString(),
    ...params,
  } as any);
}

export function subscribeDomainEvents(handler: (e: DomainEvent) => void): () => void {
  bus.on('domain-event', handler);
  // Return unsubscribe fn
  return () => bus.off('domain-event', handler);
}

// Forward type exports for convenience
export * from './types';
