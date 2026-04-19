export type BitcodeActivityKind =
  | 'transaction'
  | 'notification'
  | 'public-system'
  | 'personal-system';

export type BitcodeActivityScope = 'network' | 'personal';

export type BitcodeActivityChannel = 'execution-stream' | 'notification-center' | 'system-surface';

export interface BitcodeActivityRecord {
  id: string;
  kind: BitcodeActivityKind;
  scope: BitcodeActivityScope;
  channel: BitcodeActivityChannel;
  label: string;
  title: string;
  summary: string;
  timestamp: string | null;
  state: string | null;
  read: boolean | null;
  payload: Record<string, any>;
}

export interface BitcodeExecutionEventLike {
  id?: string;
  created_at?: string;
  event?: any;
}

export interface BitcodeNotificationLike {
  id: string;
  type?: string | null;
  title?: string | null;
  message?: string | null;
  data?: any;
  read?: boolean | null;
  created_at?: string | null;
}

function asObject(value: unknown) {
  return value && typeof value === 'object' ? (value as Record<string, any>) : {};
}

function normalizeType(value: string | null | undefined) {
  return String(value || '').trim().toLowerCase();
}

function formatExecutionSummary(payload: Record<string, any>) {
  if (payload?.status?.message) {
    return String(payload.status.message);
  }

  if (payload?.message) {
    return String(payload.message);
  }

  if (payload?.type === 'pipeline') {
    return `Pipeline ${String(payload.status || 'update')}`;
  }

  if (payload?.type === 'phase') {
    return `${String(payload.phase || 'Phase')} ${String(payload.status || 'update')}`;
  }

  if (payload?.type === 'agent') {
    return `${String(payload.agent || 'Agent')} ${String(payload.status || 'update')}`;
  }

  if (payload?.type === 'work-update' && payload?.update) {
    const update = asObject(payload.update);
    const iteration =
      typeof update.iteration === 'number' ? `Iteration ${update.iteration}` : 'Iteration update';
    const confidence =
      typeof update.confidence === 'number'
        ? ` confidence ${Math.round(update.confidence * 100)}%`
        : '';
    return `${iteration}${confidence}`;
  }

  if (payload?.type === 'completion') {
    return 'Transaction activity completed';
  }

  if (payload?.type === 'error') {
    return String(payload.error || payload.message || 'Execution error');
  }

  return '';
}

function formatExecutionTitle(payload: Record<string, any>) {
  switch (payload?.type) {
    case 'completion':
      return 'Completion';
    case 'error':
      return 'Execution error';
    case 'generation':
      return 'Generation';
    case 'agent':
      return 'Agent update';
    case 'phase':
      return 'Phase update';
    case 'pipeline':
      return 'Pipeline update';
    case 'work-update':
      return 'Work update';
    case 'status':
      return 'Status update';
    default:
      return 'Transaction activity';
  }
}

export function inferNotificationActivityTitle(
  type: string | null | undefined,
  explicitTitle?: string | null,
) {
  const title = String(explicitTitle || '').trim();
  if (title) return title;

  const normalizedType = normalizeType(type);

  if (normalizedType.includes('proof') || normalizedType.includes('verification')) {
    return 'Proof update';
  }

  if (
    normalizedType.includes('repo') ||
    normalizedType.includes('github') ||
    normalizedType.includes('repository')
  ) {
    return 'Repository event';
  }

  if (normalizedType.includes('review')) {
    return 'Review prompt';
  }

  if (normalizedType.includes('closure') || normalizedType.includes('settlement')) {
    return 'Closure update';
  }

  if (normalizedType.includes('error') || normalizedType.includes('fail')) {
    return 'Attention required';
  }

  return 'Notification activity';
}

export function getBitcodeActivityKindLabel(kind: BitcodeActivityKind) {
  switch (kind) {
    case 'transaction':
      return 'Transactions';
    case 'notification':
      return 'Notifications';
    case 'public-system':
      return 'Public activity';
    case 'personal-system':
      return 'Personal activity';
    default:
      return 'Activity';
  }
}

export function getBitcodeActivityScopeLabel(scope: BitcodeActivityScope) {
  return scope === 'personal' ? 'Personal' : 'Network';
}

export function summarizeBitcodeActivityKinds(records: BitcodeActivityRecord[]) {
  return Array.from(new Set(records.map((record) => record.kind)));
}

export function buildBitcodeActivityRecordFromExecutionEvent(
  entry: BitcodeExecutionEventLike,
): BitcodeActivityRecord | null {
  const payload = asObject(entry.event);
  if (!Object.keys(payload).length) {
    return null;
  }

  const summary = formatExecutionSummary(payload);
  if (!summary) {
    return null;
  }

  return {
    id: String(entry.id || `${payload.type || 'event'}:${entry.created_at || ''}`),
    kind: 'transaction',
    scope: 'network',
    channel: 'execution-stream',
    label: getBitcodeActivityKindLabel('transaction'),
    title: formatExecutionTitle(payload),
    summary,
    timestamp: entry.created_at || null,
    state:
      String(
        payload?.status?.executionState?.phase ||
          payload?.status?.phase ||
          payload?.status ||
          payload?.state ||
          '',
      ).trim() || null,
    read: null,
    payload,
  };
}

export function buildBitcodeActivityRecordFromNotification(
  row: BitcodeNotificationLike,
): BitcodeActivityRecord {
  return {
    id: String(row.id),
    kind: 'notification',
    scope: 'personal',
    channel: 'notification-center',
    label: getBitcodeActivityKindLabel('notification'),
    title: inferNotificationActivityTitle(row.type, row.title),
    summary: String(row.message || '').trim() || 'Notification activity update',
    timestamp: row.created_at || null,
    state: row.read ? 'read' : 'unread',
    read: row.read ?? false,
    payload: asObject(row.data),
  };
}
