import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { parseStreamChunk } from '@/streaming/stream-parser';

interface PipelineExecution {
  id: string;
  created_at: string;
  items: any[];
  context: any;
}

interface ExecutionEvent {
  id: string;
  event: any;
  created_at: string;
}

interface UsePipelineExecutionReturn {
  execution: PipelineExecution | null;
  events: ExecutionEvent[];
  latestWorkUpdate: any | null;
  iterationUpdates: any[];
  isLoading: boolean;
  error: string | null;
}

export function usePipelineExecution(runId: string | null): UsePipelineExecutionReturn {
  const [execution, setExecution] = useState<PipelineExecution | null>(null);
  const [events, setEvents] = useState<ExecutionEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latestWorkUpdate, setLatestWorkUpdate] = useState<any | null>(null);
  const streamAbortRef = useRef<AbortController | null>(null);

  const recordWorkUpdate = useCallback((event: any) => {
    if (!event || event.type !== 'work-update' || !event.update) return;
    setLatestWorkUpdate(event.update);
  }, []);

  useEffect(() => {
    if (!runId) {
      setExecution(null);
      setEvents([]);
      setLatestWorkUpdate(null);
      streamAbortRef.current?.abort();
      return;
    }

    const fetchExecution = async () => {
      setIsLoading(true);
      setError(null);
      setLatestWorkUpdate(null);

      try {
        const response = await fetch(`/api/executions/history/${runId}`);
        if (!response.ok) throw new Error(`Failed to fetch execution: ${response.status}`);

        const data = await response.json();
        setExecution(data.run);
        const normalizedEvents: ExecutionEvent[] = (data.events || []).map((event: any) => {
          const payload = event.event || event.event_data || {};
          if (payload?.type === 'work-update') {
            recordWorkUpdate(payload);
          }
          return {
            id: event.id,
            created_at: event.created_at,
            event: payload,
          };
        });
        setEvents(normalizedEvents);

        try {
          const last = (data.events || []).slice(-1)[0];
          const lastTs = encodeURIComponent(last?.created_at || '');
          const controller = new AbortController();
          streamAbortRef.current = controller;
          const res = await fetch(`/api/executions/stream?runId=${runId}&lastTs=${lastTs}`, { signal: controller.signal });
          if (!res.ok) return;
          const contentType = res.headers?.get?.('content-type') || '';
          if (!contentType.includes('text/event-stream')) return;
          const reader: ReadableStreamDefaultReader<Uint8Array> | undefined = (res as any)?.body?.getReader?.();
          if (!reader) return;
          const decoder = new TextDecoder();
          let buffer = '';
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const parts = buffer.split('\n\n');
            buffer = parts.pop() || '';
            for (const chunk of parts) {
              const parsed = parseStreamChunk(chunk + '\n');
              if (parsed.type === 'work-update' && parsed.update) {
                recordWorkUpdate(parsed);
                setEvents(prev => prev.concat([{ id: `${Date.now()}:work-update`, event: parsed, created_at: new Date().toISOString() }]));
                continue;
              }
              if (parsed.status) {
                const ev = { type: 'status', status: parsed.status };
                setEvents(prev => prev.concat([{ id: `${Date.now()}:status`, event: ev, created_at: new Date().toISOString() }]));
              }
              if (parsed.text && !parsed.status && !parsed.error && !parsed.completion) {
                const ev = { type: 'message', message: parsed.text } as any;
                setEvents(prev => prev.concat([{ id: `${Date.now()}:msg`, event: ev, created_at: new Date().toISOString() }]));
              }
              if (parsed.error) {
                const ev = { type: 'error', message: parsed.error } as any;
                setEvents(prev => prev.concat([{ id: `${Date.now()}:err`, event: ev, created_at: new Date().toISOString() }]));
              }
              if ((parsed as any).type) {
                const ev = (parsed as any).event || parsed;
                if (ev?.type === 'work-update') {
                  recordWorkUpdate(ev);
                  setEvents(prev => prev.concat([{ id: `${Date.now()}:work-update`, event: ev, created_at: new Date().toISOString() }]));
                  continue;
                }
                if (ev) {
                  setEvents(prev => prev.concat([{ id: `${Date.now()}:ev`, event: ev, created_at: new Date().toISOString() }]));
                }
              }
              const lines = chunk.split('\n').filter((l) => l.startsWith('data: ')).map((l) => l.substring(6));
              for (const line of lines) {
                try {
                  const payload = JSON.parse(line);
                  if (payload?.type === 'work-update') {
                    recordWorkUpdate(payload);
                  }
                  if (
                    payload &&
                    (payload.type === 'pipeline' ||
                      payload.type === 'phase' ||
                      payload.type === 'agent' ||
                      payload.type === 'completion' ||
                      payload.type === 'error')
                  ) {
                    setEvents(prev => prev.concat([{ id: `${Date.now()}:ev`, event: payload, created_at: new Date().toISOString() }]));
                  }
                } catch {}
              }
            }
          }
        } catch {
          // Persisted execution history remains the fallback when no live stream is available.
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch execution');
        setExecution(null);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExecution();
    return () => streamAbortRef.current?.abort();
  }, [recordWorkUpdate, runId]);

  const iterationUpdates = useMemo(() => {
    const map = new Map<number | string, any>();
    for (const evt of events) {
      const payload = evt.event;
      if (payload?.type === 'work-update' && payload.update && typeof payload.update.iteration !== 'undefined') {
        map.set(payload.update.iteration, payload.update);
      }
    }
    return Array.from(map.values());
  }, [events]);

  return { execution, events, latestWorkUpdate, iterationUpdates, isLoading, error };
}
