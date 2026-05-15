import { supabaseAdmin as supabase } from '@bitcode/supabase';
import {
  BitcodeRunNotificationType,
  DomainEvent,
  NotificationChannel,
  NotificationPayload,
  NotificationRecord,
  NotificationType,
} from './types';
import { sendEmail } from './index';

/*
 * Process a single DomainEvent and fan-out one or more Notification records.
 *
 * The logic is intentionally side-effect free except for calling `sendEmail`
 * (which is already a stub in local/CI runs) so that unit tests can run the
 * transformation without a DB connection.
 */

export async function handleDomainEvent(event: DomainEvent): Promise<void> {
  switch (event.kind) {
    case 'RUN':
      await fanoutRunEvent(event);
      break;
    case 'BTD_BALANCE':
      await fanoutBtdBalanceEvent(event);
      break;
    default:
      // eslint-disable-next-line no-console
      console.warn('[notifications] Unknown event kind', event);
  }
}

// -------------------------------------------------------------------------
// Transformation helpers
// -------------------------------------------------------------------------

async function fanoutRunEvent(event: Extract<DomainEvent, { kind: 'RUN' }>): Promise<void> {
  const { status, runId, runType, userId } = event;

  const typeMap: Record<string, NotificationType> = {
    STARTED: 'RUN_START',
    SUCCESS: 'RUN_SUCCESS',
    ERROR: 'RUN_ERROR',
  };
  const notifType = typeMap[status];

  const runCopy = getRunNotificationCopy(runType, runId);
  const url = runCopy.url;
  const humanType = runCopy.label;
  const humanStatus = status === 'SUCCESS' ? 'completed' : status.toLowerCase();
  const message = `${humanType} #${runId} ${humanStatus}`;

  const payload: NotificationPayload = {
    message,
    url,
    runId,
    runType,
    status,
    executionKind: runCopy.executionKind,
  };

  await persistAndDispatch({ userId, notifType, payload });
}

function getRunNotificationCopy(runType: BitcodeRunNotificationType, runId: number): {
  label: string;
  url: string;
  executionKind: string;
} {
  const executionUrl = `/executions/${runId}`;

  if (runType === 'asset-pack') {
    return {
      label: 'AssetPack execution',
      url: executionUrl,
      executionKind: 'asset-pack',
    };
  }

  return {
    label: 'Read measurement execution',
    url: executionUrl,
    executionKind: 'read-measurement',
  };
}

async function fanoutBtdBalanceEvent(event: Extract<DomainEvent, { kind: 'BTD_BALANCE' }>): Promise<void> {
  const { type, userId, balance, threshold } = event;

  const humanType = type === 'LOW_BALANCE' ? 'running low on $BTD' : 'out of $BTD';
  const message = `Your account is ${humanType} (${balance} remaining)`;
  const payload: NotificationPayload = { message, balance, threshold };

  const notifType: NotificationType = type === 'LOW_BALANCE' ? 'LOW_BTD_BALANCE' : 'ZERO_BTD_BALANCE';

  await persistAndDispatch({ userId, notifType, payload });
}

// -------------------------------------------------------------------------
// Persistence + channel fan-out helpers
// -------------------------------------------------------------------------

interface PersistParams {
  userId: string;
  notifType: NotificationType;
  payload: NotificationPayload;
}

type AuthAdminGetUserResponse = {
  data: {
    user?: {
      email?: string | null;
    } | null;
  } | null;
  error: Error | null;
};

async function persistAndDispatch(params: PersistParams): Promise<void> {
  const { userId, notifType, payload } = params;

  // 1. Decide channels (hard-coded for now – in_app + email)
  const channels: NotificationChannel[] = ['in_app', 'email'];

  // 2. Persist rows
  const rows = channels.map((channel) => ({
    user_id: userId,
    type: notifType,
    channel,
    payload,
  }));

  const { error } = await supabase.from('notifications').insert(rows);
  if (error) {
    // eslint-disable-next-line no-console
    console.error('[notifications] Failed to insert rows', error);
  }

  // 3. Side-effects per channel
  await Promise.all(
    channels.map(async (channel) => {
      if (channel === 'email') {
        await maybeSendEmail(userId, notifType, payload);
      }
      // 'in_app' is realtime broadcast, handled by Supabase publication.
    })
  );
}

// Minimal stub – in production we’d look up user email & choose template
async function maybeSendEmail(userId: string, type: NotificationType, payload: NotificationPayload): Promise<void> {
  // Resolve email once and cache in memory to reduce extra DB hits
  const email = await fetchUserEmail(userId);
  if (!email) {
    // eslint-disable-next-line no-console
    console.warn('[notifications] user email not found for', userId);
    return;
  }

  const subject = payload.message;
  await sendEmail({ to: email, subject, template: 'generic_notification', vars: { message: payload.message, url: payload.url ?? '' } });
}

// Simple in-memory cache (<1000 entries, not LRU) – good enough for single process
const emailCache: Record<string, string | undefined> = {};

async function fetchUserEmail(userId: string): Promise<string | undefined> {
  if (userId in emailCache) return emailCache[userId];
  try {
    const authAdmin = (supabase.auth as typeof supabase.auth & {
      admin?: {
        getUserById(id: string): Promise<AuthAdminGetUserResponse>;
      };
    }).admin;
    if (!authAdmin) {
      console.warn('[notifications] auth admin client unavailable');
      emailCache[userId] = undefined;
      return undefined;
    }

    const { data, error } = await authAdmin.getUserById(userId);
    if (error) throw error;
    const email = data?.user?.email;
    emailCache[userId] = email ?? undefined;
    return email ?? undefined;
  } catch (err) {
    console.error('[notifications] fetch email error', err);
    emailCache[userId] = undefined;
    return undefined;
  }
}
