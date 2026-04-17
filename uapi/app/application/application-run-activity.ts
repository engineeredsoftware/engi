type ExecutionEvent = {
  id?: string;
  created_at?: string;
  event?: any;
};

export interface ApplicationRunActivitySnapshot {
  output: string;
  outputDetails: Record<string, any>;
  executionState: Record<string, any>;
  isStreamingComplete: boolean;
  generationCount: number;
  error: string | null;
  latestWorkUpdate: any | null;
  iterationUpdates: any[];
}

export type MockRunActivitySnapshot = {
  output: string;
  outputDetails: Record<string, any>;
  executionState?: Record<string, any>;
  latestWorkUpdate?: any | null;
  iterationUpdates?: any[];
  isStreamingComplete?: boolean;
  generationCount?: number;
  error?: string | null;
};

function normalizeEventMessage(payload: any) {
  if (!payload || typeof payload !== 'object') return null;

  if (payload?.status?.message) {
    return { text: String(payload.status.message), key: `status:${String(payload.status.message)}` };
  }

  if (payload?.message) {
    return { text: String(payload.message), key: `message:${String(payload.message)}` };
  }

  if (payload?.type === 'pipeline') {
    return { text: `[pipeline:${payload.status}]`, key: `pipeline:${payload.status}:${payload.timestamp || ''}` };
  }

  if (payload?.type === 'phase') {
    return { text: `[phase:${payload.status}] ${payload.phase}`, key: `phase:${payload.phase}:${payload.status}:${payload.timestamp || ''}` };
  }

  if (payload?.type === 'agent') {
    return { text: `[agent:${payload.status}] ${payload.agent}`, key: `agent:${payload.agent}:${payload.status}:${payload.timestamp || ''}` };
  }

  if (payload?.type === 'error') {
    return { text: `[error] ${payload.error || payload.message || 'Unknown error'}`, key: `error:${payload.error || payload.message || ''}:${payload.timestamp || ''}` };
  }

  if (payload?.type === 'completion') {
    return { text: '[completion]', key: `completion:${payload.timestamp || ''}` };
  }

  return null;
}

export function buildApplicationRunActivityFromEvents(
  events: ExecutionEvent[],
  latestWorkUpdate: any | null,
  iterationUpdates: any[],
  streamError: string | null,
): ApplicationRunActivitySnapshot {
  const outputDetails: Record<string, any> = {};
  const outputLines: string[] = [];
  const normalizedIterationUpdates = new Map<number | string, any>();
  const statusEvents = events.filter((entry) => entry.event?.type === 'status');
  const completionEvent = events.find((entry) => entry.event?.type === 'completion');
  const errorEvent = events.find((entry) => entry.event?.type === 'error');

  for (const update of iterationUpdates || []) {
    if (update && typeof update.iteration !== 'undefined') {
      normalizedIterationUpdates.set(update.iteration, update);
    }
  }

  for (const entry of events) {
    const payload = entry.event || {};
    if (payload?.type === 'work-update' && payload.update) {
      if (typeof payload.update.iteration !== 'undefined') {
        normalizedIterationUpdates.set(payload.update.iteration, payload.update);
      }
      continue;
    }

    const normalized = normalizeEventMessage(payload);
    if (!normalized) continue;
    outputLines.push(normalized.text);
    outputDetails[normalized.text] = payload;
  }

  const latestStatusEvent = statusEvents[statusEvents.length - 1];

  return {
    output: outputLines.join('\n'),
    outputDetails,
    executionState: latestStatusEvent?.event?.status?.executionState || {},
    isStreamingComplete: Boolean(completionEvent),
    generationCount: events.filter((entry) => entry.event?.type === 'generation').length,
    error: streamError || errorEvent?.event?.message || errorEvent?.event?.error || null,
    latestWorkUpdate,
    iterationUpdates: Array.from(normalizedIterationUpdates.values()),
  };
}

export function buildApplicationRunActivityFromMock(
  snapshot: MockRunActivitySnapshot | null | undefined,
): ApplicationRunActivitySnapshot | null {
  if (!snapshot) return null;

  return {
    output: snapshot.output || '',
    outputDetails: snapshot.outputDetails || {},
    executionState: snapshot.executionState || {},
    isStreamingComplete: snapshot.isStreamingComplete ?? true,
    generationCount: snapshot.generationCount ?? 0,
    error: snapshot.error ?? null,
    latestWorkUpdate: snapshot.latestWorkUpdate ?? null,
    iterationUpdates: snapshot.iterationUpdates || [],
  };
}
