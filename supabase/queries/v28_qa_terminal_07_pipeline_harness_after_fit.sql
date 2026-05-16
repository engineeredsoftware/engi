-- Saved query name: v28_qa_terminal_07_pipeline_harness_after_fit
-- Purpose: run after the first Vercel Sandbox pipeline harness execution. It
-- checks whether real pipeline runtime rows, event telemetry, phase/agent
-- traces, generation/tool traces, and exported evidence are present before
-- Read/Fit can graduate from blocked-readiness posture to commercial result
-- review.

CREATE OR REPLACE FUNCTION pg_temp.v28_qa_terminal_pipeline_harness_after_fit()
RETURNS TABLE(section text, observed_count bigint, rows jsonb)
LANGUAGE plpgsql
AS $$
DECLARE
  pipeline_run_count bigint;
  run_job_count bigint;
  execution_event_count bigint;
  stream_log_count bigint;
  phase_execution_count bigint;
  deliverable_run_count bigint;
  deliverable_phase_count bigint;
  deliverable_agent_step_count bigint;
  deliverable_generation_count bigint;
  deliverable_tool_count bigint;
  missing_tables text[] := ARRAY[]::text[];
  gate_state text;
BEGIN
  IF to_regclass('public.pipeline_runs') IS NULL THEN
    missing_tables := missing_tables || 'public.pipeline_runs';
  ELSE
    EXECUTE 'SELECT count(*) FROM public.pipeline_runs WHERE created_at > now() - interval ''48 hours'''
      INTO pipeline_run_count;
  END IF;

  IF to_regclass('public.run_jobs') IS NULL THEN
    missing_tables := missing_tables || 'public.run_jobs';
  ELSE
    EXECUTE 'SELECT count(*) FROM public.run_jobs WHERE created_at > now() - interval ''48 hours'''
      INTO run_job_count;
  END IF;

  IF to_regclass('public.execution_events') IS NULL THEN
    missing_tables := missing_tables || 'public.execution_events';
  ELSE
    EXECUTE 'SELECT count(*) FROM public.execution_events WHERE created_at > now() - interval ''48 hours'''
      INTO execution_event_count;
  END IF;

  IF to_regclass('public.stream_logs') IS NULL THEN
    missing_tables := missing_tables || 'public.stream_logs';
  ELSE
    EXECUTE 'SELECT count(*) FROM public.stream_logs WHERE created_at > now() - interval ''48 hours'''
      INTO stream_log_count;
  END IF;

  IF to_regclass('public.phase_executions') IS NULL THEN
    missing_tables := missing_tables || 'public.phase_executions';
  ELSE
    EXECUTE 'SELECT count(*) FROM public.phase_executions WHERE created_at > now() - interval ''48 hours'''
      INTO phase_execution_count;
  END IF;

  IF to_regclass('public.deliverable_pipeline_runs') IS NULL THEN
    missing_tables := missing_tables || 'public.deliverable_pipeline_runs';
  ELSE
    EXECUTE 'SELECT count(*) FROM public.deliverable_pipeline_runs WHERE created_at > now() - interval ''48 hours'''
      INTO deliverable_run_count;
  END IF;

  IF to_regclass('public.deliverable_pipeline_phase_delegations') IS NULL THEN
    missing_tables := missing_tables || 'public.deliverable_pipeline_phase_delegations';
  ELSE
    EXECUTE 'SELECT count(*) FROM public.deliverable_pipeline_phase_delegations WHERE created_at > now() - interval ''48 hours'''
      INTO deliverable_phase_count;
  END IF;

  IF to_regclass('public.deliverable_pipeline_agent_steps') IS NULL THEN
    missing_tables := missing_tables || 'public.deliverable_pipeline_agent_steps';
  ELSE
    EXECUTE 'SELECT count(*) FROM public.deliverable_pipeline_agent_steps WHERE created_at > now() - interval ''48 hours'''
      INTO deliverable_agent_step_count;
  END IF;

  IF to_regclass('public.deliverable_pipeline_generations') IS NULL THEN
    missing_tables := missing_tables || 'public.deliverable_pipeline_generations';
  ELSE
    EXECUTE 'SELECT count(*) FROM public.deliverable_pipeline_generations WHERE created_at > now() - interval ''48 hours'''
      INTO deliverable_generation_count;
  END IF;

  IF to_regclass('public.deliverable_pipeline_tool_executions') IS NULL THEN
    missing_tables := missing_tables || 'public.deliverable_pipeline_tool_executions';
  ELSE
    EXECUTE 'SELECT count(*) FROM public.deliverable_pipeline_tool_executions WHERE created_at > now() - interval ''48 hours'''
      INTO deliverable_tool_count;
  END IF;

  gate_state := CASE
    WHEN pipeline_run_count IS NULL THEN 'blocker:pipeline_runs_missing'
    WHEN pipeline_run_count = 0 AND coalesce(deliverable_run_count, 0) = 0 THEN 'blocker:pipeline_harness_run_missing'
    WHEN coalesce(execution_event_count, 0) = 0 AND coalesce(stream_log_count, 0) = 0 THEN 'blocker:pipeline_event_telemetry_missing'
    WHEN coalesce(phase_execution_count, 0) = 0 AND coalesce(deliverable_phase_count, 0) = 0 THEN 'blocker:pipeline_phase_trace_missing'
    WHEN coalesce(deliverable_agent_step_count, 0) = 0 THEN 'warning:pipeline_agent_step_trace_missing'
    WHEN coalesce(deliverable_generation_count, 0) = 0 AND coalesce(deliverable_tool_count, 0) = 0 THEN 'warning:generation_tool_trace_missing'
    ELSE 'pipeline_harness_ready_for_result_review'
  END;

  RETURN QUERY
    SELECT
      'pipeline_harness_gate_summary'::text,
      1::bigint,
      jsonb_build_array(
        jsonb_build_object(
          'gate_state', gate_state,
          'pipeline_run_count', pipeline_run_count,
          'run_job_count', run_job_count,
          'execution_event_count', execution_event_count,
          'stream_log_count', stream_log_count,
          'phase_execution_count', phase_execution_count,
          'deliverable_run_count', deliverable_run_count,
          'deliverable_phase_count', deliverable_phase_count,
          'deliverable_agent_step_count', deliverable_agent_step_count,
          'deliverable_generation_count', deliverable_generation_count,
          'deliverable_tool_count', deliverable_tool_count,
          'missing_tables', to_jsonb(missing_tables),
          'commercial_expectation', 'Read/Fit result review requires real pipeline rows, host artifacts, event logs, and no settlement/finality claims without query 03 readback.'
        )
      );

  IF to_regclass('public.pipeline_runs') IS NOT NULL THEN
    RETURN QUERY EXECUTE $query$
      WITH recent AS (
        SELECT
          id::text,
          user_id::text,
          pipeline_type,
          pipeline_name,
          status,
          created_at,
          started_at,
          completed_at,
          duration_ms,
          execution_id::text,
          correlation_id::text,
          jsonb_build_object(
            'metadata_keys', (
              SELECT coalesce(jsonb_agg(key ORDER BY key), '[]'::jsonb)
              FROM jsonb_object_keys(coalesce(metadata, '{}'::jsonb)) AS keys(key)
            ),
            'input_keys', (
              SELECT coalesce(jsonb_agg(key ORDER BY key), '[]'::jsonb)
              FROM jsonb_object_keys(coalesce(input, '{}'::jsonb)) AS keys(key)
            ),
            'output_keys', (
              SELECT coalesce(jsonb_agg(key ORDER BY key), '[]'::jsonb)
              FROM jsonb_object_keys(coalesce(output, '{}'::jsonb)) AS keys(key)
            ),
            'artifact_keys', (
              SELECT coalesce(jsonb_agg(key ORDER BY key), '[]'::jsonb)
              FROM jsonb_object_keys(coalesce(artifacts, '{}'::jsonb)) AS keys(key)
            ),
            'result_state', coalesce(output ->> 'resultState', validation ->> 'resultState'),
            'sandbox_id', coalesce(metadata ->> 'sandboxId', artifacts ->> 'sandboxId')
          ) AS harness_summary,
          error_data
        FROM public.pipeline_runs
        WHERE created_at > now() - interval '48 hours'
        ORDER BY created_at DESC
        LIMIT 20
      )
      SELECT
        'recent_pipeline_runs'::text,
        count(*)::bigint,
        coalesce(jsonb_agg(to_jsonb(recent) ORDER BY created_at DESC), '[]'::jsonb)
      FROM recent;
    $query$;
  END IF;

  IF to_regclass('public.run_jobs') IS NOT NULL THEN
    RETURN QUERY EXECUTE $query$
      WITH recent AS (
        SELECT
          id::text,
          job_type,
          status,
          claimed_by,
          claimed_at,
          retry_count,
          max_retries,
          created_at,
          updated_at,
          jsonb_build_object(
            'payload_keys', (
              SELECT coalesce(jsonb_agg(key ORDER BY key), '[]'::jsonb)
              FROM jsonb_object_keys(coalesce(payload, '{}'::jsonb)) AS keys(key)
            ),
            'result_keys', (
              SELECT coalesce(jsonb_agg(key ORDER BY key), '[]'::jsonb)
              FROM jsonb_object_keys(coalesce(result, '{}'::jsonb)) AS keys(key)
            )
          ) AS job_summary,
          error_message
        FROM public.run_jobs
        WHERE created_at > now() - interval '48 hours'
        ORDER BY created_at DESC
        LIMIT 20
      )
      SELECT
        'recent_run_jobs'::text,
        count(*)::bigint,
        coalesce(jsonb_agg(to_jsonb(recent) ORDER BY created_at DESC), '[]'::jsonb)
      FROM recent;
    $query$;
  END IF;

  IF to_regclass('public.execution_events') IS NOT NULL THEN
    RETURN QUERY EXECUTE $query$
      WITH recent AS (
        SELECT
          id::text,
          run_id::text,
          event_type,
          phase,
          agent_name,
          event_data,
          created_at
        FROM public.execution_events
        WHERE created_at > now() - interval '48 hours'
        ORDER BY created_at DESC
        LIMIT 40
      )
      SELECT
        'recent_execution_events'::text,
        count(*)::bigint,
        coalesce(jsonb_agg(to_jsonb(recent) ORDER BY created_at DESC), '[]'::jsonb)
      FROM recent;
    $query$;
  END IF;

  IF to_regclass('public.stream_logs') IS NOT NULL THEN
    RETURN QUERY EXECUTE $query$
      WITH recent AS (
        SELECT
          id::text,
          stream_id,
          user_id::text,
          log_type,
          jsonb_build_object(
            'event', log_data ->> 'event',
            'message', log_data ->> 'message',
            'status', log_data ->> 'status',
            'keys', (
              SELECT coalesce(jsonb_agg(key ORDER BY key), '[]'::jsonb)
              FROM jsonb_object_keys(coalesce(log_data, '{}'::jsonb)) AS keys(key)
            )
          ) AS log_summary,
          created_at
        FROM public.stream_logs
        WHERE created_at > now() - interval '48 hours'
        ORDER BY created_at DESC
        LIMIT 40
      )
      SELECT
        'recent_stream_logs'::text,
        count(*)::bigint,
        coalesce(jsonb_agg(to_jsonb(recent) ORDER BY created_at DESC), '[]'::jsonb)
      FROM recent;
    $query$;
  END IF;

  IF to_regclass('public.phase_executions') IS NOT NULL THEN
    RETURN QUERY EXECUTE $query$
      WITH recent AS (
        SELECT
          id::text,
          run_id::text,
          phase_name,
          status,
          started_at,
          completed_at,
          created_at,
          error
        FROM public.phase_executions
        WHERE created_at > now() - interval '48 hours'
        ORDER BY created_at DESC
        LIMIT 40
      )
      SELECT
        'recent_phase_executions'::text,
        count(*)::bigint,
        coalesce(jsonb_agg(to_jsonb(recent) ORDER BY created_at DESC), '[]'::jsonb)
      FROM recent;
    $query$;
  END IF;

  IF to_regclass('public.deliverable_pipeline_runs') IS NOT NULL THEN
    RETURN QUERY EXECUTE $query$
      WITH recent AS (
        SELECT
          id::text,
          pipeline_run_id::text,
          user_id::text,
          pipeline_type,
          status,
          created_at,
          started_at,
          completed_at,
          duration_ms,
          total_tokens,
          total_cost,
          jsonb_build_object(
            'context_keys', (
              SELECT coalesce(jsonb_agg(key ORDER BY key), '[]'::jsonb)
              FROM jsonb_object_keys(coalesce(context, '{}'::jsonb)) AS keys(key)
            ),
            'input_keys', (
              SELECT coalesce(jsonb_agg(key ORDER BY key), '[]'::jsonb)
              FROM jsonb_object_keys(coalesce(input_data, '{}'::jsonb)) AS keys(key)
            ),
            'output_keys', (
              SELECT coalesce(jsonb_agg(key ORDER BY key), '[]'::jsonb)
              FROM jsonb_object_keys(coalesce(output_data, '{}'::jsonb)) AS keys(key)
            ),
            'summary', coalesce(output_data ->> 'summary', output_data ->> 'resultState')
          ) AS run_summary,
          error_data
        FROM public.deliverable_pipeline_runs
        WHERE created_at > now() - interval '48 hours'
        ORDER BY created_at DESC
        LIMIT 20
      )
      SELECT
        'recent_deliverable_pipeline_runs'::text,
        count(*)::bigint,
        coalesce(jsonb_agg(to_jsonb(recent) ORDER BY created_at DESC), '[]'::jsonb)
      FROM recent;
    $query$;
  END IF;

  IF to_regclass('public.deliverable_pipeline_phase_delegations') IS NOT NULL THEN
    RETURN QUERY EXECUTE $query$
      WITH recent AS (
        SELECT
          id::text,
          run_id::text,
          phase_name,
          status,
          started_at,
          completed_at,
          created_at,
          error_data
        FROM public.deliverable_pipeline_phase_delegations
        WHERE created_at > now() - interval '48 hours'
        ORDER BY created_at DESC
        LIMIT 40
      )
      SELECT
        'recent_deliverable_phase_delegations'::text,
        count(*)::bigint,
        coalesce(jsonb_agg(to_jsonb(recent) ORDER BY created_at DESC), '[]'::jsonb)
      FROM recent;
    $query$;
  END IF;

  IF to_regclass('public.deliverable_pipeline_agent_steps') IS NOT NULL THEN
    RETURN QUERY EXECUTE $query$
      WITH recent AS (
        SELECT
          id::text,
          phase_delegation_id::text,
          agent_name,
          step_type,
          status,
          started_at,
          completed_at,
          created_at,
          error_data
        FROM public.deliverable_pipeline_agent_steps
        WHERE created_at > now() - interval '48 hours'
        ORDER BY created_at DESC
        LIMIT 60
      )
      SELECT
        'recent_deliverable_agent_steps'::text,
        count(*)::bigint,
        coalesce(jsonb_agg(to_jsonb(recent) ORDER BY created_at DESC), '[]'::jsonb)
      FROM recent;
    $query$;
  END IF;

  IF to_regclass('public.deliverable_pipeline_generations') IS NOT NULL THEN
    RETURN QUERY EXECUTE $query$
      WITH recent AS (
        SELECT
          id::text,
          run_id::text,
          phase_delegation_id::text,
          agent_step_id::text,
          model_provider,
          model_name,
          input_tokens,
          output_tokens,
          total_tokens,
          cost,
          latency_ms,
          created_at
        FROM public.deliverable_pipeline_generations
        WHERE created_at > now() - interval '48 hours'
        ORDER BY created_at DESC
        LIMIT 60
      )
      SELECT
        'recent_deliverable_generations'::text,
        count(*)::bigint,
        coalesce(jsonb_agg(to_jsonb(recent) ORDER BY created_at DESC), '[]'::jsonb)
      FROM recent;
    $query$;
  END IF;

  IF to_regclass('public.deliverable_pipeline_tool_executions') IS NOT NULL THEN
    RETURN QUERY EXECUTE $query$
      WITH recent AS (
        SELECT
          id::text,
          agent_step_id::text,
          substep_id::text,
          tool_name,
          execution_time_ms,
          created_at,
          tool_error
        FROM public.deliverable_pipeline_tool_executions
        WHERE created_at > now() - interval '48 hours'
        ORDER BY created_at DESC
        LIMIT 60
      )
      SELECT
        'recent_deliverable_tool_executions'::text,
        count(*)::bigint,
        coalesce(jsonb_agg(to_jsonb(recent) ORDER BY created_at DESC), '[]'::jsonb)
      FROM recent;
    $query$;
  END IF;
END;
$$;

SELECT * FROM pg_temp.v28_qa_terminal_pipeline_harness_after_fit();
