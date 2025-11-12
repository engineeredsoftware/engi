-- 002_create_stream_logs.sql -------------------------------------------------
-- Creates a durable table that stores every streamed message (ai-call,
-- tool-use, thinking, error, completion …) emitted by the Engi pipeline
-- engine.  Admin dashboards rely on this table for both real-time and
-- historical inspection of pipeline runs.

create table if not exists public.stream_logs (
    id          bigserial primary key,
    run_id      uuid          not null,
    type        text          not null,
    progress    text,
    message     text,
    detail      text,
    result      jsonb,
    metadata    jsonb,
    ts          timestamptz   not null default now()
);

create index if not exists stream_logs_run_id_idx on public.stream_logs(run_id);
create index if not exists stream_logs_ts_idx      on public.stream_logs(ts);

comment on table  public.stream_logs is 'Every message sent over the pipeline run data stream – persisted for admin debugging.';

comment on column public.stream_logs.run_id   is 'Run identifier (deliverable_runs.id, ai_document_runs.id, etc.) – no FK due to multiple pipeline tables.';
comment on column public.stream_logs.metadata is 'Arbitrary JSON that always contains executionPath and, for ai-call, full prompt/response.';
