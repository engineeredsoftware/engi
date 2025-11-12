export interface SupabasePollStreamOptions<Row> {
  fetchRows: (cursor: number) => Promise<Row[] | null>;
  formatRow: (row: Row) => { id: number; payload: any };
  initialCursor: number;
  signal?: AbortSignal;
  pollIntervalMs?: number;

  heartbeatIntervalMs?: number;
}

export function createSupabaseSSEPollStream<Row>(
  opts: SupabasePollStreamOptions<Row>
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const {
        fetchRows,
        formatRow,
        signal,
        pollIntervalMs = 1000,
        heartbeatIntervalMs = 20_000,
      } = opts;
      let cursor = opts.initialCursor;

      const abortHandler = () => {
        try {
          controller.close();
        } catch {}
      };
      signal?.addEventListener('abort', abortHandler);

      let lastWrite = Date.now();

      async function flush(rows: Row[] | null | undefined) {
        if (!rows || rows.length === 0) return;
        for (const row of rows) {
          const { id, payload } = formatRow(row);
          controller.enqueue(
            encoder.encode(`id: ${id}\ndata: ${JSON.stringify(payload)}\n\n`)
          );
          cursor = id;
          lastWrite = Date.now();
        }
      }

      try {
        const initial = await fetchRows(cursor);
        await flush(initial || []);

        while (true) {
          if (signal?.aborted) break;
          await new Promise((r) => setTimeout(r, pollIntervalMs));
          const rows = await fetchRows(cursor);
          await flush(rows || []);

          if (Date.now() - lastWrite > heartbeatIntervalMs) {
            controller.enqueue(encoder.encode(`event: ping\ndata: {}\n\n`));
            lastWrite = Date.now();
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        signal?.removeEventListener('abort', abortHandler);
      }
    },
  });
}
