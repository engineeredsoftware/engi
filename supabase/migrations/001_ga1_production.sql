

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "public";






CREATE OR REPLACE FUNCTION "public"."add_credits"("p_user_id" "uuid", "p_amount" numeric) RETURNS numeric
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_prev numeric;
  v_new numeric;
BEGIN
  IF p_amount <= 0 THEN
    RAISE EXCEPTION 'Invalid amount %', p_amount USING ERRCODE = '22003';
  END IF;

  SELECT balance INTO v_prev FROM public.user_credits WHERE user_id = p_user_id FOR UPDATE;

  IF v_prev IS NULL THEN
    INSERT INTO public.user_credits(user_id, balance, total_purchased, total_used)
      VALUES (p_user_id, p_amount, p_amount, 0)
      ON CONFLICT (user_id) DO UPDATE SET balance = public.user_credits.balance + EXCLUDED.balance,
                                          total_purchased = public.user_credits.total_purchased + EXCLUDED.balance,
                                          updated_at = NOW()
      RETURNING public.user_credits.balance INTO v_new;
  ELSE
    UPDATE public.user_credits
      SET balance = balance + p_amount,
          total_purchased = total_purchased + p_amount,
          updated_at = NOW()
      WHERE user_id = p_user_id
      RETURNING balance INTO v_new;
  END IF;

  INSERT INTO public.user_credit_usages(user_id, amount, operation_type, metadata)
    VALUES (p_user_id, p_amount, 'credit', jsonb_build_object('reason', 'top_up'));

  RETURN v_new;
END;
$$;


ALTER FUNCTION "public"."add_credits"("p_user_id" "uuid", "p_amount" numeric) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."claim_run_job"("p_job_type" "text", "p_worker_id" "text") RETURNS "uuid"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_job_id uuid;
BEGIN
  UPDATE run_jobs
  SET 
    status = 'claimed',
    claimed_by = p_worker_id,
    claimed_at = NOW()
  WHERE id = (
    SELECT id 
    FROM run_jobs 
    WHERE job_type = p_job_type 
      AND status = 'pending'
    ORDER BY created_at
    LIMIT 1
    FOR UPDATE SKIP LOCKED
  )
  RETURNING id INTO v_job_id;
  
  RETURN v_job_id;
END;
$$;


ALTER FUNCTION "public"."claim_run_job"("p_job_type" "text", "p_worker_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."deduct_credits"("p_user_id" "uuid", "p_amount" numeric) RETURNS numeric
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_prev numeric;
  v_new numeric;
BEGIN
  IF p_amount <= 0 THEN
    RAISE EXCEPTION 'Invalid amount %', p_amount USING ERRCODE = '22003';
  END IF;

  SELECT balance INTO v_prev FROM public.user_credits WHERE user_id = p_user_id FOR UPDATE;

  IF v_prev IS NULL THEN
    v_prev := 0;
    INSERT INTO public.user_credits(user_id, balance, total_purchased, total_used)
      VALUES (p_user_id, 0, 0, 0)
      ON CONFLICT (user_id) DO NOTHING;
  END IF;

  IF v_prev < p_amount THEN
    RAISE EXCEPTION 'Insufficient credits: have %, need %', v_prev, p_amount USING ERRCODE = 'PAYS0';
  END IF;

  UPDATE public.user_credits
    SET balance = balance - p_amount,
        total_used = total_used + p_amount,
        updated_at = NOW()
    WHERE user_id = p_user_id
    RETURNING balance INTO v_new;

  INSERT INTO public.user_credit_usages(user_id, amount, operation_type, metadata)
    VALUES (p_user_id, p_amount, 'debit', jsonb_build_object('reason', 'pipeline_run'));

  RETURN v_new;
END;
$$;


ALTER FUNCTION "public"."deduct_credits"("p_user_id" "uuid", "p_amount" numeric) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  -- Create user profile
  INSERT INTO public.user_profiles (id, created_at, updated_at)
  VALUES (NEW.id, NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  
  -- Initialize user credits with 0 balance
  INSERT INTO public.user_credits (user_id, balance, created_at, updated_at)
  VALUES (NEW.id, 0.00, NOW(), NOW()) -- Start with 0 credits
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."match_deliverable_vectors"("query_embedding" "public"."vector", "match_threshold" double precision DEFAULT 0.7, "match_count" integer DEFAULT 10) RETURNS TABLE("deliverable_id" "uuid", "content" "text", "similarity" double precision)
    LANGUAGE "sql" STABLE
    AS $$
  SELECT 
    deliverable_id,
    content,
    1 - (embedding <=> query_embedding) as similarity
  FROM deliverable_vectors
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;


ALTER FUNCTION "public"."match_deliverable_vectors"("query_embedding" "public"."vector", "match_threshold" double precision, "match_count" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_conversation_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  UPDATE conversations 
  SET updated_at = NOW() 
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_conversation_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."attachments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "category" "text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "url" "text",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "vcs_provider" "text",
    "vcs_type" "text",
    "vcs_repository" "jsonb",
    "vcs_issue" "jsonb",
    "vcs_pull_request" "jsonb",
    "file_type" "text",
    "file_name" "text",
    "file_size" integer,
    "file_url" "text",
    "mime_type" "text",
    "domain" "text",
    "path" "text",
    "page_metadata" "jsonb",
    "integration_provider" "text",
    "integration_type" "text",
    "connection_id" "uuid",
    "integration_data" "jsonb",
    "pipeline_run_id" "uuid",
    "pipeline_type" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "attachments_category_check" CHECK (("category" = ANY (ARRAY['vcs'::"text", 'file'::"text", 'url'::"text", 'integration'::"text", 'pipeline_run'::"text"])))
);


ALTER TABLE "public"."attachments" OWNER TO "postgres";


COMMENT ON TABLE "public"."attachments" IS 'Universal attachment storage - VCS (issues/PRs), files, URLs, integrations (Notion/Figma), pipeline runs';



COMMENT ON COLUMN "public"."attachments"."category" IS 'Main attachment category: vcs, file, url, integration, or pipeline_run';



COMMENT ON COLUMN "public"."attachments"."pipeline_run_id" IS 'Reference to pipeline run when assistant message triggers a pipeline';



CREATE TABLE IF NOT EXISTS "public"."conversations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "title" "text" DEFAULT 'New Conversation'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."conversations" OWNER TO "postgres";


COMMENT ON TABLE "public"."conversations" IS 'Lightweight conversation wrappers for organizing messages and attachments';



CREATE TABLE IF NOT EXISTS "public"."deliverable_items" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "deliverable_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "item_type" "text",
    "config" "jsonb" DEFAULT '{}'::"jsonb",
    "order_index" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."deliverable_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."deliverable_pipeline_agent_steps" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "phase_delegation_id" "uuid" NOT NULL,
    "agent_name" "text" NOT NULL,
    "step_type" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text",
    "input_data" "jsonb" DEFAULT '{}'::"jsonb",
    "output_data" "jsonb" DEFAULT '{}'::"jsonb",
    "error_data" "jsonb",
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "deliverable_pipeline_agent_steps_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'running'::"text", 'completed'::"text", 'failed'::"text", 'skipped'::"text"]))),
    CONSTRAINT "deliverable_pipeline_agent_steps_step_type_check" CHECK (("step_type" = ANY (ARRAY['plan'::"text", 'try'::"text", 'refine'::"text", 'retry'::"text"])))
);


ALTER TABLE "public"."deliverable_pipeline_agent_steps" OWNER TO "postgres";


COMMENT ON TABLE "public"."deliverable_pipeline_agent_steps" IS 'Agent PTRR steps (AgentExecution)';



CREATE TABLE IF NOT EXISTS "public"."deliverable_pipeline_events" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "run_id" "uuid" NOT NULL,
    "event_type" "text" NOT NULL,
    "event_data" "jsonb" DEFAULT '{}'::"jsonb",
    "phase" "text",
    "agent_name" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."deliverable_pipeline_events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."deliverable_pipeline_generated_assets" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "run_id" "uuid",
    "user_id" "uuid" NOT NULL,
    "asset_type" "text" NOT NULL,
    "asset_name" "text" NOT NULL,
    "asset_url" "text",
    "asset_data" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."deliverable_pipeline_generated_assets" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."deliverable_pipeline_generations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "run_id" "uuid",
    "phase_delegation_id" "uuid",
    "agent_step_id" "uuid",
    "substep_id" "uuid",
    "model_provider" "text" NOT NULL,
    "model_name" "text" NOT NULL,
    "messages" "jsonb" NOT NULL,
    "response" "jsonb",
    "input_tokens" integer,
    "output_tokens" integer,
    "total_tokens" integer,
    "cost" numeric(10,6),
    "latency_ms" integer,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."deliverable_pipeline_generations" OWNER TO "postgres";


COMMENT ON TABLE "public"."deliverable_pipeline_generations" IS 'Generation (LLM/AI model) tracking for cost and performance monitoring';



CREATE TABLE IF NOT EXISTS "public"."deliverable_pipeline_otf_instructions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "run_id" "uuid" NOT NULL,
    "instruction_type" "text" NOT NULL,
    "instruction_data" "jsonb" NOT NULL,
    "is_processed" boolean DEFAULT false,
    "processed_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."deliverable_pipeline_otf_instructions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."deliverable_pipeline_phase_delegations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "run_id" "uuid" NOT NULL,
    "phase_name" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text",
    "input_data" "jsonb" DEFAULT '{}'::"jsonb",
    "output_data" "jsonb" DEFAULT '{}'::"jsonb",
    "error_data" "jsonb",
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "deliverable_run_phases_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'running'::"text", 'completed'::"text", 'failed'::"text", 'skipped'::"text"])))
);


ALTER TABLE "public"."deliverable_pipeline_phase_delegations" OWNER TO "postgres";


COMMENT ON TABLE "public"."deliverable_pipeline_phase_delegations" IS 'Phase delegations to agents (PhaseDelegation)';



CREATE TABLE IF NOT EXISTS "public"."deliverable_pipeline_runs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "deliverable_id" "uuid",
    "status" "text" DEFAULT 'pending'::"text",
    "pipeline_type" "text" DEFAULT 'deliverable'::"text",
    "config" "jsonb" DEFAULT '{}'::"jsonb",
    "input_data" "jsonb" DEFAULT '{}'::"jsonb",
    "output_data" "jsonb" DEFAULT '{}'::"jsonb",
    "error_data" "jsonb",
    "total_tokens" integer DEFAULT 0,
    "total_cost" numeric(10,4) DEFAULT 0.00,
    "duration_ms" integer,
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "items" "jsonb" DEFAULT '[]'::"jsonb",
    "context" "jsonb" DEFAULT '{}'::"jsonb",
    "pipeline_run_id" "uuid",
    CONSTRAINT "deliverable_runs_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'running'::"text", 'completed'::"text", 'failed'::"text", 'cancelled'::"text"])))
);


ALTER TABLE "public"."deliverable_pipeline_runs" OWNER TO "postgres";


COMMENT ON TABLE "public"."deliverable_pipeline_runs" IS 'Deliverable-specific extension of pipeline_runs';



COMMENT ON COLUMN "public"."deliverable_pipeline_runs"."pipeline_run_id" IS 'References the base pipeline_runs record';



CREATE TABLE IF NOT EXISTS "public"."deliverable_pipeline_substeps" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "agent_step_id" "uuid" NOT NULL,
    "substep_type" "text" NOT NULL,
    "substep_index" integer NOT NULL,
    "status" "text" DEFAULT 'pending'::"text",
    "input_data" "jsonb" DEFAULT '{}'::"jsonb",
    "output_data" "jsonb" DEFAULT '{}'::"jsonb",
    "error_data" "jsonb",
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "deliverable_pipeline_substeps_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'running'::"text", 'completed'::"text", 'failed'::"text", 'skipped'::"text"])))
);


ALTER TABLE "public"."deliverable_pipeline_substeps" OWNER TO "postgres";


COMMENT ON TABLE "public"."deliverable_pipeline_substeps" IS 'The 7 substeps within each PTRR step (SubStepExecution)';



CREATE TABLE IF NOT EXISTS "public"."deliverable_pipeline_tool_executions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "substep_id" "uuid",
    "agent_step_id" "uuid",
    "tool_name" "text" NOT NULL,
    "tool_input" "jsonb" DEFAULT '{}'::"jsonb",
    "tool_output" "jsonb" DEFAULT '{}'::"jsonb",
    "tool_error" "jsonb",
    "execution_time_ms" integer,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."deliverable_pipeline_tool_executions" OWNER TO "postgres";


COMMENT ON TABLE "public"."deliverable_pipeline_tool_executions" IS 'Tool usage tracking (ToolExecution)';



CREATE TABLE IF NOT EXISTS "public"."deliverable_templates" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "name" character varying(255) NOT NULL,
    "deliverable_type" character varying(50) NOT NULL,
    "template_text" "text" NOT NULL,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "deliverable_templates_deliverable_type_check" CHECK ((("deliverable_type")::"text" = ANY ((ARRAY['pullRequests'::character varying, 'pullRequestReviews'::character varying, 'issues'::character varying, 'comments'::character varying])::"text"[])))
);


ALTER TABLE "public"."deliverable_templates" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."deliverable_vectors" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "deliverable_id" "uuid" NOT NULL,
    "content" "text" NOT NULL,
    "embedding" "public"."vector"(1536),
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."deliverable_vectors" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."deliverables" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "status" "text" DEFAULT 'draft'::"text",
    "config" "jsonb" DEFAULT '{}'::"jsonb",
    "template_id" "text",
    "effectiveness_score" numeric(3,2),
    "execution_count" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "deliverables_status_check" CHECK (("status" = ANY (ARRAY['draft'::"text", 'active'::"text", 'completed'::"text", 'archived'::"text"])))
);


ALTER TABLE "public"."deliverables" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."error_logs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid",
    "error_type" "text" NOT NULL,
    "error_message" "text" NOT NULL,
    "error_stack" "text",
    "context" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."error_logs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."events" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid",
    "event_type" "text" NOT NULL,
    "event_category" "text",
    "event_data" "jsonb" DEFAULT '{}'::"jsonb",
    "ip_address" "inet",
    "user_agent" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."message_attachments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "message_id" "uuid" NOT NULL,
    "attachment_id" "uuid" NOT NULL,
    "attachment_category" "text" NOT NULL,
    "attachment_type" "text",
    "context" "text",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "message_attachments_attachment_category_check" CHECK (("attachment_category" = ANY (ARRAY['vcs'::"text", 'file'::"text", 'url'::"text", 'integration'::"text", 'pipeline_run'::"text"])))
);


ALTER TABLE "public"."message_attachments" OWNER TO "postgres";


COMMENT ON TABLE "public"."message_attachments" IS 'Links messages to their attachments - user messages have sources, assistant messages have pipeline runs';



COMMENT ON COLUMN "public"."message_attachments"."context" IS 'How this attachment relates to the specific message';



CREATE TABLE IF NOT EXISTS "public"."messages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "conversation_id" "uuid" NOT NULL,
    "role" "text" NOT NULL,
    "content" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "messages_role_check" CHECK (("role" = ANY (ARRAY['user'::"text", 'assistant'::"text"])))
);


ALTER TABLE "public"."messages" OWNER TO "postgres";


COMMENT ON TABLE "public"."messages" IS 'Messages within conversations, can reference deliverables/ai_documents that generated them';



COMMENT ON COLUMN "public"."messages"."role" IS 'Either "user" for user messages or "assistant" for AI responses';



CREATE TABLE IF NOT EXISTS "public"."notifications" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "type" "text" NOT NULL,
    "title" "text" NOT NULL,
    "message" "text",
    "data" "jsonb" DEFAULT '{}'::"jsonb",
    "is_read" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."notifications" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pipeline_runs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "pipeline_type" "text" NOT NULL,
    "pipeline_config" "jsonb" DEFAULT '{}'::"jsonb",
    "status" "text" DEFAULT 'pending'::"text",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "execution_id" "uuid",
    "pipeline_name" "text",
    "pipeline_version" "text",
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "duration_ms" integer,
    "error_data" "jsonb",
    "metrics" "jsonb",
    "artifacts" "jsonb",
    "validation" "jsonb",
    "execution_state" "jsonb",
    "input" "jsonb",
    "output" "jsonb",
    "correlation_id" "uuid"
);


ALTER TABLE "public"."pipeline_runs" OWNER TO "postgres";


COMMENT ON TABLE "public"."pipeline_runs" IS 'Base table for all pipeline executions with common fields';



CREATE TABLE IF NOT EXISTS "public"."run_jobs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "job_type" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text",
    "claimed_by" "text",
    "claimed_at" timestamp with time zone,
    "payload" "jsonb" DEFAULT '{}'::"jsonb",
    "result" "jsonb",
    "error_message" "text",
    "retry_count" integer DEFAULT 0,
    "max_retries" integer DEFAULT 3,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "run_jobs_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'claimed'::"text", 'running'::"text", 'completed'::"text", 'failed'::"text"])))
);


ALTER TABLE "public"."run_jobs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stream_logs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "stream_id" "text" NOT NULL,
    "user_id" "uuid",
    "log_type" "text" NOT NULL,
    "log_data" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."stream_logs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."token_costs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "run_id" "uuid",
    "model_provider" "text" NOT NULL,
    "model_name" "text" NOT NULL,
    "input_tokens" integer DEFAULT 0,
    "output_tokens" integer DEFAULT 0,
    "total_tokens" integer DEFAULT 0,
    "cost" numeric(10,6) DEFAULT 0.00,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."token_costs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ai_document_runs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "items" "jsonb",
    "context" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."ai_document_runs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ai_documents" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "run_id" "uuid",
    "title" "text",
    "output" "text",
    "repository" "text",
    "ai_document_type" character varying(50),
    "metrics" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "ai_documents_ai_document_type_check" CHECK ((("ai_document_type")::"text" = ANY ((ARRAY['knowledgeExtension'::character varying, 'deliverableFeedback'::character varying, 'mcpIntegration'::character varying])::"text"[])))
);


ALTER TABLE "public"."ai_documents" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_connections" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "provider" "text" NOT NULL,
    "connection_data" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "user_connections_provider_check" CHECK (("provider" = 'github'::"text"))
);


ALTER TABLE "public"."user_connections" OWNER TO "postgres";


COMMENT ON TABLE "public"."user_connections" IS 'Unified VCS connections table supporting GitHub, GitLab, BitBucket. The connection_data JSONB field contains provider-specific authentication data.';



CREATE TABLE IF NOT EXISTS "public"."user_credit_usages" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "amount" numeric(10,4) NOT NULL,
    "operation_type" "text" NOT NULL,
    "operation_id" "uuid",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_credit_usages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_credits" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "balance" numeric(10,2) DEFAULT 0.00,
    "total_purchased" numeric(10,2) DEFAULT 0.00,
    "total_used" numeric(10,2) DEFAULT 0.00,
    "stripe_customer_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_credits" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_github_connections" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "github_user_id" bigint,
    "github_username" "text",
    "access_token" "text",
    "installation_id" bigint,
    "installation_data" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_github_connections" OWNER TO "postgres";


COMMENT ON TABLE "public"."user_github_connections" IS 'DEPRECATED: This table is kept for backward compatibility but not actively used. All VCS connections are now stored in user_connections table with provider field. TODO: Remove in post-GA-1 migration.';



CREATE TABLE IF NOT EXISTS "public"."user_model_preferences" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "model_provider" "text" NOT NULL,
    "model_name" "text" NOT NULL,
    "is_default" boolean DEFAULT false,
    "settings" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_model_preferences" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_profiles" (
    "id" "uuid" NOT NULL,
    "username" "text",
    "display_name" "text",
    "bio" "text",
    "avatar_url" "text",
    "role" "text" DEFAULT 'user'::"text",
    "onboarding_completed" boolean DEFAULT false,
    "onboarding_step" "text",
    "onboarding_data" "jsonb" DEFAULT '{}'::"jsonb",
    "settings" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "onboarded_steps" "text" DEFAULT '["models"]'::"text",
    CONSTRAINT "user_profiles_role_check" CHECK (("role" = ANY (ARRAY['user'::"text", 'admin'::"text", 'developer'::"text"])))
);


ALTER TABLE "public"."user_profiles" OWNER TO "postgres";


COMMENT ON COLUMN "public"."user_profiles"."onboarded_steps" IS 'JSON array of completed onboarding steps. Default includes "models" as it is optional. Valid steps: profile, connects, models, credits';



CREATE TABLE IF NOT EXISTS "public"."user_template_preferences" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "default_deliverable_template_id" "uuid",
    "auto_save_templates" boolean DEFAULT false,
    "deliverable_templates" "jsonb" DEFAULT '{}'::"jsonb",
    "ai_document_templates" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_template_preferences" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_vcs_connections" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "userid" "uuid" NOT NULL,
    "provider" character varying(50) NOT NULL,
    "accesstoken" "text" NOT NULL,
    "refreshtoken" "text",
    "expiresat" timestamp with time zone,
    "instanceurl" "text",
    "metadata" "jsonb",
    "createdat" timestamp with time zone DEFAULT "now"(),
    "updatedat" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "user_vcs_connections_provider_check" CHECK ((("provider")::"text" = ANY ((ARRAY['github'::character varying, 'gitlab'::character varying, 'bitbucket'::character varying])::"text"[])))
);


ALTER TABLE "public"."user_vcs_connections" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."vcs_repositories" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "provider" "text" DEFAULT 'github'::"text" NOT NULL,
    "provider_repo_id" "text" NOT NULL,
    "repo_name" "text" NOT NULL,
    "repo_full_name" "text" NOT NULL,
    "repo_owner" "text" NOT NULL,
    "repo_description" "text",
    "repo_language" "text",
    "repo_default_branch" "text" DEFAULT 'main'::"text",
    "repo_private" boolean DEFAULT false,
    "repo_url" "text",
    "repo_data" "jsonb" DEFAULT '{}'::"jsonb",
    "repo_created_at" timestamp with time zone,
    "repo_updated_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."vcs_repositories" OWNER TO "postgres";


ALTER TABLE ONLY "public"."attachments"
    ADD CONSTRAINT "attachments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."conversations"
    ADD CONSTRAINT "conversations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_items"
    ADD CONSTRAINT "deliverable_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_pipeline_agent_steps"
    ADD CONSTRAINT "deliverable_pipeline_agent_steps_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_pipeline_generations"
    ADD CONSTRAINT "deliverable_pipeline_generations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_pipeline_substeps"
    ADD CONSTRAINT "deliverable_pipeline_substeps_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_pipeline_tool_executions"
    ADD CONSTRAINT "deliverable_pipeline_tool_executions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_pipeline_events"
    ADD CONSTRAINT "deliverable_run_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_pipeline_phase_delegations"
    ADD CONSTRAINT "deliverable_run_phases_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_pipeline_runs"
    ADD CONSTRAINT "deliverable_runs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_templates"
    ADD CONSTRAINT "deliverable_templates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_templates"
    ADD CONSTRAINT "deliverable_templates_user_id_name_deliverable_type_key" UNIQUE ("user_id", "name", "deliverable_type");



ALTER TABLE ONLY "public"."deliverable_vectors"
    ADD CONSTRAINT "deliverable_vectors_deliverable_id_key" UNIQUE ("deliverable_id");



ALTER TABLE ONLY "public"."deliverable_vectors"
    ADD CONSTRAINT "deliverable_vectors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverables"
    ADD CONSTRAINT "deliverables_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."error_logs"
    ADD CONSTRAINT "error_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_pipeline_generated_assets"
    ADD CONSTRAINT "generated_assets_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."message_attachments"
    ADD CONSTRAINT "message_attachments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pipeline_runs"
    ADD CONSTRAINT "pipeline_runs_execution_id_key" UNIQUE ("execution_id");



ALTER TABLE ONLY "public"."pipeline_runs"
    ADD CONSTRAINT "pipeline_runs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."run_jobs"
    ADD CONSTRAINT "run_jobs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_pipeline_otf_instructions"
    ADD CONSTRAINT "run_otf_instructions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."stream_logs"
    ADD CONSTRAINT "stream_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."token_costs"
    ADD CONSTRAINT "token_costs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ai_document_runs"
    ADD CONSTRAINT "ai_document_runs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ai_documents"
    ADD CONSTRAINT "ai_documents_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_connections"
    ADD CONSTRAINT "user_connections_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_connections"
    ADD CONSTRAINT "user_connections_user_id_provider_key" UNIQUE ("user_id", "provider");



ALTER TABLE ONLY "public"."user_credit_usages"
    ADD CONSTRAINT "user_credit_usages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_credits"
    ADD CONSTRAINT "user_credits_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_credits"
    ADD CONSTRAINT "user_credits_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."user_github_connections"
    ADD CONSTRAINT "user_github_connections_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_github_connections"
    ADD CONSTRAINT "user_github_connections_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."user_model_preferences"
    ADD CONSTRAINT "user_model_preferences_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_model_preferences"
    ADD CONSTRAINT "user_model_preferences_user_id_model_provider_model_name_key" UNIQUE ("user_id", "model_provider", "model_name");



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_username_key" UNIQUE ("username");



ALTER TABLE ONLY "public"."user_template_preferences"
    ADD CONSTRAINT "user_template_preferences_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_template_preferences"
    ADD CONSTRAINT "user_template_preferences_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."user_vcs_connections"
    ADD CONSTRAINT "user_vcs_connections_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_vcs_connections"
    ADD CONSTRAINT "user_vcs_connections_userid_provider_key" UNIQUE ("userid", "provider");



ALTER TABLE ONLY "public"."vcs_repositories"
    ADD CONSTRAINT "vcs_repositories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."vcs_repositories"
    ADD CONSTRAINT "vcs_repositories_user_id_provider_provider_repo_id_key" UNIQUE ("user_id", "provider", "provider_repo_id");



CREATE INDEX "idx_attachments_category" ON "public"."attachments" USING "btree" ("category");



CREATE INDEX "idx_attachments_pipeline_run_id" ON "public"."attachments" USING "btree" ("pipeline_run_id") WHERE ("pipeline_run_id" IS NOT NULL);



CREATE INDEX "idx_attachments_user_id" ON "public"."attachments" USING "btree" ("user_id");



CREATE INDEX "idx_conversations_created_at" ON "public"."conversations" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_conversations_user_id" ON "public"."conversations" USING "btree" ("user_id");



CREATE INDEX "idx_deliverable_items_deliverable_id" ON "public"."deliverable_items" USING "btree" ("deliverable_id");



CREATE INDEX "idx_deliverable_pipeline_agent_steps_phase_id" ON "public"."deliverable_pipeline_agent_steps" USING "btree" ("phase_delegation_id");



CREATE INDEX "idx_deliverable_pipeline_events_run_id" ON "public"."deliverable_pipeline_events" USING "btree" ("run_id");



CREATE INDEX "idx_deliverable_pipeline_generated_assets_run_id" ON "public"."deliverable_pipeline_generated_assets" USING "btree" ("run_id");



CREATE INDEX "idx_deliverable_pipeline_generations_run_id" ON "public"."deliverable_pipeline_generations" USING "btree" ("run_id");



CREATE INDEX "idx_deliverable_pipeline_otf_instructions_run_id" ON "public"."deliverable_pipeline_otf_instructions" USING "btree" ("run_id");



CREATE INDEX "idx_deliverable_pipeline_phase_delegations_run_id" ON "public"."deliverable_pipeline_phase_delegations" USING "btree" ("run_id");



CREATE INDEX "idx_deliverable_pipeline_runs_created_at" ON "public"."deliverable_pipeline_runs" USING "btree" ("created_at");



CREATE INDEX "idx_deliverable_pipeline_runs_pipeline_run_id" ON "public"."deliverable_pipeline_runs" USING "btree" ("pipeline_run_id");



CREATE INDEX "idx_deliverable_pipeline_runs_status" ON "public"."deliverable_pipeline_runs" USING "btree" ("status");



CREATE INDEX "idx_deliverable_pipeline_runs_user_id" ON "public"."deliverable_pipeline_runs" USING "btree" ("user_id");



CREATE INDEX "idx_deliverable_pipeline_substeps_step_id" ON "public"."deliverable_pipeline_substeps" USING "btree" ("agent_step_id");



CREATE INDEX "idx_deliverable_pipeline_tool_executions_substep_id" ON "public"."deliverable_pipeline_tool_executions" USING "btree" ("substep_id");



CREATE INDEX "idx_deliverable_templates_type" ON "public"."deliverable_templates" USING "btree" ("deliverable_type");



CREATE INDEX "idx_deliverable_templates_user_id" ON "public"."deliverable_templates" USING "btree" ("user_id");



CREATE INDEX "idx_deliverable_vectors_embedding" ON "public"."deliverable_vectors" USING "ivfflat" ("embedding" "public"."vector_cosine_ops");



CREATE INDEX "idx_deliverables_status" ON "public"."deliverables" USING "btree" ("status");



CREATE INDEX "idx_deliverables_user_id" ON "public"."deliverables" USING "btree" ("user_id");



CREATE INDEX "idx_error_logs_created_at" ON "public"."error_logs" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_events_created_at" ON "public"."events" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_events_user_id" ON "public"."events" USING "btree" ("user_id");



CREATE INDEX "idx_message_attachments_attachment_id" ON "public"."message_attachments" USING "btree" ("attachment_id");



CREATE INDEX "idx_message_attachments_message_id" ON "public"."message_attachments" USING "btree" ("message_id");



CREATE INDEX "idx_messages_conversation_id" ON "public"."messages" USING "btree" ("conversation_id");



CREATE INDEX "idx_messages_created_at" ON "public"."messages" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_notifications_user_id_read" ON "public"."notifications" USING "btree" ("user_id", "is_read");



CREATE INDEX "idx_pipeline_runs_correlation_id" ON "public"."pipeline_runs" USING "btree" ("correlation_id");



CREATE INDEX "idx_pipeline_runs_execution_id" ON "public"."pipeline_runs" USING "btree" ("execution_id");



CREATE INDEX "idx_run_jobs_job_type" ON "public"."run_jobs" USING "btree" ("job_type");



CREATE INDEX "idx_run_jobs_status" ON "public"."run_jobs" USING "btree" ("status");



CREATE INDEX "idx_token_costs_run_id" ON "public"."token_costs" USING "btree" ("run_id");



CREATE INDEX "idx_token_costs_user_id" ON "public"."token_costs" USING "btree" ("user_id");



CREATE INDEX "idx_ai_document_runs_user_id" ON "public"."ai_document_runs" USING "btree" ("user_id");



CREATE INDEX "idx_ai_documents_run_id" ON "public"."ai_documents" USING "btree" ("run_id");



CREATE INDEX "idx_ai_documents_user_id" ON "public"."ai_documents" USING "btree" ("user_id");



CREATE INDEX "idx_user_connections_user_provider" ON "public"."user_connections" USING "btree" ("user_id", "provider");



CREATE INDEX "idx_user_credit_usages_created_at" ON "public"."user_credit_usages" USING "btree" ("created_at");



CREATE INDEX "idx_user_credit_usages_user_id" ON "public"."user_credit_usages" USING "btree" ("user_id");



CREATE INDEX "idx_user_credits_user_id" ON "public"."user_credits" USING "btree" ("user_id");



CREATE INDEX "idx_user_profiles_username" ON "public"."user_profiles" USING "btree" ("username");



CREATE INDEX "idx_user_vcs_connections_user_id" ON "public"."user_vcs_connections" USING "btree" ("userid");



CREATE INDEX "idx_vcs_repositories_repo_full_name" ON "public"."vcs_repositories" USING "btree" ("repo_full_name");



CREATE INDEX "idx_vcs_repositories_user_provider" ON "public"."vcs_repositories" USING "btree" ("user_id", "provider");



CREATE OR REPLACE TRIGGER "update_conversation_on_new_message" AFTER INSERT ON "public"."messages" FOR EACH ROW EXECUTE FUNCTION "public"."update_conversation_updated_at"();



CREATE OR REPLACE TRIGGER "update_deliverable_runs_updated_at" BEFORE UPDATE ON "public"."deliverable_pipeline_runs" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at"();



CREATE OR REPLACE TRIGGER "update_deliverable_templates_updated_at" BEFORE UPDATE ON "public"."deliverable_templates" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_deliverables_updated_at" BEFORE UPDATE ON "public"."deliverables" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at"();



CREATE OR REPLACE TRIGGER "update_ai_document_runs_updated_at" BEFORE UPDATE ON "public"."ai_document_runs" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_ai_documents_updated_at" BEFORE UPDATE ON "public"."ai_documents" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_user_connections_updated_at" BEFORE UPDATE ON "public"."user_connections" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at"();



CREATE OR REPLACE TRIGGER "update_user_profiles_updated_at" BEFORE UPDATE ON "public"."user_profiles" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at"();



CREATE OR REPLACE TRIGGER "update_user_template_preferences_updated_at" BEFORE UPDATE ON "public"."user_template_preferences" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_user_vcs_connections_updated_at" BEFORE UPDATE ON "public"."user_vcs_connections" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."attachments"
    ADD CONSTRAINT "attachments_connection_id_fkey" FOREIGN KEY ("connection_id") REFERENCES "public"."user_connections"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."attachments"
    ADD CONSTRAINT "attachments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."conversations"
    ADD CONSTRAINT "conversations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_items"
    ADD CONSTRAINT "deliverable_items_deliverable_id_fkey" FOREIGN KEY ("deliverable_id") REFERENCES "public"."deliverables"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_agent_steps"
    ADD CONSTRAINT "deliverable_pipeline_agent_steps_phase_delegation_id_fkey" FOREIGN KEY ("phase_delegation_id") REFERENCES "public"."deliverable_pipeline_phase_delegations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_events"
    ADD CONSTRAINT "deliverable_pipeline_events_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "public"."deliverable_pipeline_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_generated_assets"
    ADD CONSTRAINT "deliverable_pipeline_generated_assets_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "public"."deliverable_pipeline_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_generations"
    ADD CONSTRAINT "deliverable_pipeline_generations_agent_step_id_fkey" FOREIGN KEY ("agent_step_id") REFERENCES "public"."deliverable_pipeline_agent_steps"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_generations"
    ADD CONSTRAINT "deliverable_pipeline_generations_phase_delegation_id_fkey" FOREIGN KEY ("phase_delegation_id") REFERENCES "public"."deliverable_pipeline_phase_delegations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_generations"
    ADD CONSTRAINT "deliverable_pipeline_generations_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "public"."deliverable_pipeline_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_generations"
    ADD CONSTRAINT "deliverable_pipeline_generations_substep_id_fkey" FOREIGN KEY ("substep_id") REFERENCES "public"."deliverable_pipeline_substeps"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_otf_instructions"
    ADD CONSTRAINT "deliverable_pipeline_otf_instructions_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "public"."deliverable_pipeline_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_phase_delegations"
    ADD CONSTRAINT "deliverable_pipeline_phase_delegations_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "public"."deliverable_pipeline_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_runs"
    ADD CONSTRAINT "deliverable_pipeline_runs_pipeline_run_id_fkey" FOREIGN KEY ("pipeline_run_id") REFERENCES "public"."pipeline_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_substeps"
    ADD CONSTRAINT "deliverable_pipeline_substeps_agent_step_id_fkey" FOREIGN KEY ("agent_step_id") REFERENCES "public"."deliverable_pipeline_agent_steps"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_tool_executions"
    ADD CONSTRAINT "deliverable_pipeline_tool_executions_agent_step_id_fkey" FOREIGN KEY ("agent_step_id") REFERENCES "public"."deliverable_pipeline_agent_steps"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_tool_executions"
    ADD CONSTRAINT "deliverable_pipeline_tool_executions_substep_id_fkey" FOREIGN KEY ("substep_id") REFERENCES "public"."deliverable_pipeline_substeps"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_runs"
    ADD CONSTRAINT "deliverable_runs_deliverable_id_fkey" FOREIGN KEY ("deliverable_id") REFERENCES "public"."deliverables"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."deliverable_pipeline_runs"
    ADD CONSTRAINT "deliverable_runs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_templates"
    ADD CONSTRAINT "deliverable_templates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_vectors"
    ADD CONSTRAINT "deliverable_vectors_deliverable_id_fkey" FOREIGN KEY ("deliverable_id") REFERENCES "public"."deliverables"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverables"
    ADD CONSTRAINT "deliverables_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."error_logs"
    ADD CONSTRAINT "error_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_pipeline_generated_assets"
    ADD CONSTRAINT "generated_assets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."message_attachments"
    ADD CONSTRAINT "message_attachments_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pipeline_runs"
    ADD CONSTRAINT "pipeline_runs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."stream_logs"
    ADD CONSTRAINT "stream_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."token_costs"
    ADD CONSTRAINT "token_costs_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "public"."deliverable_pipeline_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."token_costs"
    ADD CONSTRAINT "token_costs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."ai_document_runs"
    ADD CONSTRAINT "ai_document_runs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."ai_documents"
    ADD CONSTRAINT "ai_documents_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "public"."ai_document_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."ai_documents"
    ADD CONSTRAINT "ai_documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_connections"
    ADD CONSTRAINT "user_connections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_credit_usages"
    ADD CONSTRAINT "user_credit_usages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_credits"
    ADD CONSTRAINT "user_credits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_github_connections"
    ADD CONSTRAINT "user_github_connections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_model_preferences"
    ADD CONSTRAINT "user_model_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_template_preferences"
    ADD CONSTRAINT "user_template_preferences_default_deliverable_template_id_fkey" FOREIGN KEY ("default_deliverable_template_id") REFERENCES "public"."deliverable_templates"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."user_template_preferences"
    ADD CONSTRAINT "user_template_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_vcs_connections"
    ADD CONSTRAINT "user_vcs_connections_userid_fkey" FOREIGN KEY ("userid") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."vcs_repositories"
    ADD CONSTRAINT "vcs_repositories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Service role has full access" ON "public"."deliverable_pipeline_otf_instructions" USING (("auth"."role"() = 'service_role'::"text"));



CREATE POLICY "Service role has full access" ON "public"."pipeline_runs" USING (("auth"."role"() = 'service_role'::"text"));



CREATE POLICY "Service role has full access" ON "public"."run_jobs" USING (("auth"."role"() = 'service_role'::"text"));



CREATE POLICY "Service role has full access" ON "public"."stream_logs" USING (("auth"."role"() = 'service_role'::"text"));



CREATE POLICY "Users can create message attachments in own conversations" ON "public"."message_attachments" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM ("public"."messages"
     JOIN "public"."conversations" ON (("conversations"."id" = "messages"."conversation_id")))
  WHERE (("messages"."id" = "message_attachments"."message_id") AND ("conversations"."user_id" = "auth"."uid"())))));



CREATE POLICY "Users can create messages in own conversations" ON "public"."messages" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."conversations"
  WHERE (("conversations"."id" = "messages"."conversation_id") AND ("conversations"."user_id" = "auth"."uid"())))));



CREATE POLICY "Users can create own attachments" ON "public"."attachments" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can create own conversations" ON "public"."conversations" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can create their own VCS connections" ON "public"."user_vcs_connections" FOR INSERT WITH CHECK (("auth"."uid"() = "userid"));



CREATE POLICY "Users can create their own deliverable templates" ON "public"."deliverable_templates" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can create their own template preferences" ON "public"."user_template_preferences" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can create their own ai_document runs" ON "public"."ai_document_runs" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can create their own ai_documents" ON "public"."ai_documents" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete message attachments in own conversations" ON "public"."message_attachments" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM ("public"."messages"
     JOIN "public"."conversations" ON (("conversations"."id" = "messages"."conversation_id")))
  WHERE (("messages"."id" = "message_attachments"."message_id") AND ("conversations"."user_id" = "auth"."uid"())))));



CREATE POLICY "Users can delete own attachments" ON "public"."attachments" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete own conversations" ON "public"."conversations" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete their own VCS connections" ON "public"."user_vcs_connections" FOR DELETE USING (("auth"."uid"() = "userid"));



CREATE POLICY "Users can delete their own deliverable templates" ON "public"."deliverable_templates" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can manage own GitHub connection" ON "public"."user_github_connections" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can manage own connections" ON "public"."user_connections" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can manage own deliverable items" ON "public"."deliverable_items" USING ((EXISTS ( SELECT 1
   FROM "public"."deliverables"
  WHERE (("deliverables"."id" = "deliverable_items"."deliverable_id") AND ("deliverables"."user_id" = "auth"."uid"())))));



CREATE POLICY "Users can manage own deliverables" ON "public"."deliverables" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can manage own model preferences" ON "public"."user_model_preferences" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can manage own notifications" ON "public"."notifications" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can manage own repositories" ON "public"."vcs_repositories" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can manage own runs" ON "public"."deliverable_pipeline_runs" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own attachments" ON "public"."attachments" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own conversations" ON "public"."conversations" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own VCS connections" ON "public"."user_vcs_connections" FOR UPDATE USING (("auth"."uid"() = "userid"));



CREATE POLICY "Users can update their own deliverable templates" ON "public"."deliverable_templates" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own template preferences" ON "public"."user_template_preferences" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own ai_document runs" ON "public"."ai_document_runs" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own ai_documents" ON "public"."ai_documents" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view message attachments in own conversations" ON "public"."message_attachments" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM ("public"."messages"
     JOIN "public"."conversations" ON (("conversations"."id" = "messages"."conversation_id")))
  WHERE (("messages"."id" = "message_attachments"."message_id") AND ("conversations"."user_id" = "auth"."uid"())))));



CREATE POLICY "Users can view messages in own conversations" ON "public"."messages" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."conversations"
  WHERE (("conversations"."id" = "messages"."conversation_id") AND ("conversations"."user_id" = "auth"."uid"())))));



CREATE POLICY "Users can view own assets" ON "public"."deliverable_pipeline_generated_assets" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own attachments" ON "public"."attachments" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own conversations" ON "public"."conversations" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own credit usage" ON "public"."user_credit_usages" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own credits" ON "public"."user_credits" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own events" ON "public"."events" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own profile" ON "public"."user_profiles" USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view own run events" ON "public"."deliverable_pipeline_events" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."deliverable_pipeline_runs"
  WHERE (("deliverable_pipeline_runs"."id" = "deliverable_pipeline_events"."run_id") AND ("deliverable_pipeline_runs"."user_id" = "auth"."uid"())))));



CREATE POLICY "Users can view own run phases" ON "public"."deliverable_pipeline_phase_delegations" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."deliverable_pipeline_runs"
  WHERE (("deliverable_pipeline_runs"."id" = "deliverable_pipeline_phase_delegations"."run_id") AND ("deliverable_pipeline_runs"."user_id" = "auth"."uid"())))));



CREATE POLICY "Users can view own token costs" ON "public"."token_costs" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own VCS connections" ON "public"."user_vcs_connections" FOR SELECT USING (("auth"."uid"() = "userid"));



CREATE POLICY "Users can view their own deliverable templates" ON "public"."deliverable_templates" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own template preferences" ON "public"."user_template_preferences" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own ai_document runs" ON "public"."ai_document_runs" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own ai_documents" ON "public"."ai_documents" FOR SELECT USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."attachments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."conversations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."deliverable_items" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."deliverable_pipeline_events" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."deliverable_pipeline_generated_assets" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."deliverable_pipeline_phase_delegations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."deliverable_pipeline_runs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."deliverable_templates" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."deliverable_vectors" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."deliverables" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."error_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."events" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."message_attachments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."messages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."notifications" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."token_costs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."ai_document_runs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."ai_documents" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_connections" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_credit_usages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_credits" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_github_connections" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_model_preferences" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_template_preferences" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_vcs_connections" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."vcs_repositories" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_in"("cstring", "oid", integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_in"("cstring", "oid", integer) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_in"("cstring", "oid", integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_in"("cstring", "oid", integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_out"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_out"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_out"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_out"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_recv"("internal", "oid", integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_recv"("internal", "oid", integer) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_recv"("internal", "oid", integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_recv"("internal", "oid", integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_send"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_send"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_send"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_send"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_typmod_in"("cstring"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_typmod_in"("cstring"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_typmod_in"("cstring"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_typmod_in"("cstring"[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_in"("cstring", "oid", integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_in"("cstring", "oid", integer) TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_in"("cstring", "oid", integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_in"("cstring", "oid", integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_out"("public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_out"("public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_out"("public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_out"("public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_recv"("internal", "oid", integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_recv"("internal", "oid", integer) TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_recv"("internal", "oid", integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_recv"("internal", "oid", integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_send"("public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_send"("public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_send"("public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_send"("public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_typmod_in"("cstring"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_typmod_in"("cstring"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_typmod_in"("cstring"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_typmod_in"("cstring"[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_in"("cstring", "oid", integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_in"("cstring", "oid", integer) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_in"("cstring", "oid", integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_in"("cstring", "oid", integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_out"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_out"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_out"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_out"("public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_recv"("internal", "oid", integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_recv"("internal", "oid", integer) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_recv"("internal", "oid", integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_recv"("internal", "oid", integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_send"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_send"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_send"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_send"("public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_typmod_in"("cstring"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_typmod_in"("cstring"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_typmod_in"("cstring"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_typmod_in"("cstring"[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_halfvec"(real[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(real[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(real[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(real[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(real[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(real[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(real[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(real[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_vector"(real[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_vector"(real[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_vector"(real[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_vector"(real[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_halfvec"(double precision[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(double precision[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(double precision[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(double precision[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(double precision[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(double precision[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(double precision[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(double precision[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_vector"(double precision[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_vector"(double precision[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_vector"(double precision[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_vector"(double precision[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_halfvec"(integer[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(integer[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(integer[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(integer[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(integer[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(integer[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(integer[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(integer[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_vector"(integer[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_vector"(integer[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_vector"(integer[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_vector"(integer[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_halfvec"(numeric[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(numeric[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(numeric[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_halfvec"(numeric[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(numeric[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(numeric[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(numeric[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_sparsevec"(numeric[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."array_to_vector"(numeric[], integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."array_to_vector"(numeric[], integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."array_to_vector"(numeric[], integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."array_to_vector"(numeric[], integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_to_float4"("public"."halfvec", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_to_float4"("public"."halfvec", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_to_float4"("public"."halfvec", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_to_float4"("public"."halfvec", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec"("public"."halfvec", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec"("public"."halfvec", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec"("public"."halfvec", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec"("public"."halfvec", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_to_sparsevec"("public"."halfvec", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_to_sparsevec"("public"."halfvec", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_to_sparsevec"("public"."halfvec", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_to_sparsevec"("public"."halfvec", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_to_vector"("public"."halfvec", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_to_vector"("public"."halfvec", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_to_vector"("public"."halfvec", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_to_vector"("public"."halfvec", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_to_halfvec"("public"."sparsevec", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_to_halfvec"("public"."sparsevec", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_to_halfvec"("public"."sparsevec", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_to_halfvec"("public"."sparsevec", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec"("public"."sparsevec", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec"("public"."sparsevec", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec"("public"."sparsevec", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec"("public"."sparsevec", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_to_vector"("public"."sparsevec", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_to_vector"("public"."sparsevec", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_to_vector"("public"."sparsevec", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_to_vector"("public"."sparsevec", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_to_float4"("public"."vector", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_to_float4"("public"."vector", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_to_float4"("public"."vector", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_to_float4"("public"."vector", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_to_halfvec"("public"."vector", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_to_halfvec"("public"."vector", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_to_halfvec"("public"."vector", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_to_halfvec"("public"."vector", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_to_sparsevec"("public"."vector", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_to_sparsevec"("public"."vector", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_to_sparsevec"("public"."vector", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_to_sparsevec"("public"."vector", integer, boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector"("public"."vector", integer, boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector"("public"."vector", integer, boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."vector"("public"."vector", integer, boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector"("public"."vector", integer, boolean) TO "service_role";































































































































































GRANT ALL ON FUNCTION "public"."add_credits"("p_user_id" "uuid", "p_amount" numeric) TO "anon";
GRANT ALL ON FUNCTION "public"."add_credits"("p_user_id" "uuid", "p_amount" numeric) TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_credits"("p_user_id" "uuid", "p_amount" numeric) TO "service_role";



GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."claim_run_job"("p_job_type" "text", "p_worker_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."claim_run_job"("p_job_type" "text", "p_worker_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."claim_run_job"("p_job_type" "text", "p_worker_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."cosine_distance"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."deduct_credits"("p_user_id" "uuid", "p_amount" numeric) TO "anon";
GRANT ALL ON FUNCTION "public"."deduct_credits"("p_user_id" "uuid", "p_amount" numeric) TO "authenticated";
GRANT ALL ON FUNCTION "public"."deduct_credits"("p_user_id" "uuid", "p_amount" numeric) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_accum"(double precision[], "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_accum"(double precision[], "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_accum"(double precision[], "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_accum"(double precision[], "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_add"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_add"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_add"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_add"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_avg"(double precision[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_avg"(double precision[]) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_avg"(double precision[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_avg"(double precision[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_cmp"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_cmp"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_cmp"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_cmp"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_combine"(double precision[], double precision[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_combine"(double precision[], double precision[]) TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_combine"(double precision[], double precision[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_combine"(double precision[], double precision[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_concat"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_concat"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_concat"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_concat"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_eq"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_eq"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_eq"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_eq"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_ge"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_ge"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_ge"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_ge"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_gt"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_gt"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_gt"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_gt"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_l2_squared_distance"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_l2_squared_distance"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_l2_squared_distance"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_l2_squared_distance"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_le"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_le"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_le"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_le"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_lt"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_lt"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_lt"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_lt"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_mul"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_mul"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_mul"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_mul"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_ne"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_ne"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_ne"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_ne"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_negative_inner_product"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_negative_inner_product"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_negative_inner_product"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_negative_inner_product"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_spherical_distance"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_spherical_distance"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_spherical_distance"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_spherical_distance"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."halfvec_sub"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."halfvec_sub"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."halfvec_sub"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."halfvec_sub"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."hamming_distance"(bit, bit) TO "postgres";
GRANT ALL ON FUNCTION "public"."hamming_distance"(bit, bit) TO "anon";
GRANT ALL ON FUNCTION "public"."hamming_distance"(bit, bit) TO "authenticated";
GRANT ALL ON FUNCTION "public"."hamming_distance"(bit, bit) TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."hnsw_bit_support"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."hnsw_bit_support"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."hnsw_bit_support"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."hnsw_bit_support"("internal") TO "service_role";



GRANT ALL ON FUNCTION "public"."hnsw_halfvec_support"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."hnsw_halfvec_support"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."hnsw_halfvec_support"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."hnsw_halfvec_support"("internal") TO "service_role";



GRANT ALL ON FUNCTION "public"."hnsw_sparsevec_support"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."hnsw_sparsevec_support"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."hnsw_sparsevec_support"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."hnsw_sparsevec_support"("internal") TO "service_role";



GRANT ALL ON FUNCTION "public"."hnswhandler"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."hnswhandler"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."hnswhandler"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."hnswhandler"("internal") TO "service_role";



GRANT ALL ON FUNCTION "public"."inner_product"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."inner_product"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."inner_product"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."inner_product"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."ivfflat_bit_support"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."ivfflat_bit_support"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."ivfflat_bit_support"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."ivfflat_bit_support"("internal") TO "service_role";



GRANT ALL ON FUNCTION "public"."ivfflat_halfvec_support"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."ivfflat_halfvec_support"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."ivfflat_halfvec_support"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."ivfflat_halfvec_support"("internal") TO "service_role";



GRANT ALL ON FUNCTION "public"."ivfflathandler"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."ivfflathandler"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."ivfflathandler"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."ivfflathandler"("internal") TO "service_role";



GRANT ALL ON FUNCTION "public"."jaccard_distance"(bit, bit) TO "postgres";
GRANT ALL ON FUNCTION "public"."jaccard_distance"(bit, bit) TO "anon";
GRANT ALL ON FUNCTION "public"."jaccard_distance"(bit, bit) TO "authenticated";
GRANT ALL ON FUNCTION "public"."jaccard_distance"(bit, bit) TO "service_role";



GRANT ALL ON FUNCTION "public"."l1_distance"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l1_distance"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l1_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l1_distance"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_distance"("public"."halfvec", "public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."halfvec", "public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."halfvec", "public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."halfvec", "public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_distance"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_distance"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_norm"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_norm"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_norm"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_norm"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_norm"("public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_norm"("public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_norm"("public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_norm"("public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."l2_normalize"("public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."match_deliverable_vectors"("query_embedding" "public"."vector", "match_threshold" double precision, "match_count" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."match_deliverable_vectors"("query_embedding" "public"."vector", "match_threshold" double precision, "match_count" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."match_deliverable_vectors"("query_embedding" "public"."vector", "match_threshold" double precision, "match_count" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_cmp"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_cmp"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_cmp"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_cmp"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_eq"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_eq"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_eq"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_eq"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_ge"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_ge"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_ge"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_ge"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_gt"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_gt"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_gt"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_gt"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_l2_squared_distance"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_l2_squared_distance"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_l2_squared_distance"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_l2_squared_distance"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_le"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_le"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_le"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_le"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_lt"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_lt"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_lt"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_lt"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_ne"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_ne"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_ne"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_ne"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sparsevec_negative_inner_product"("public"."sparsevec", "public"."sparsevec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sparsevec_negative_inner_product"("public"."sparsevec", "public"."sparsevec") TO "anon";
GRANT ALL ON FUNCTION "public"."sparsevec_negative_inner_product"("public"."sparsevec", "public"."sparsevec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sparsevec_negative_inner_product"("public"."sparsevec", "public"."sparsevec") TO "service_role";



GRANT ALL ON FUNCTION "public"."subvector"("public"."halfvec", integer, integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."subvector"("public"."halfvec", integer, integer) TO "anon";
GRANT ALL ON FUNCTION "public"."subvector"("public"."halfvec", integer, integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."subvector"("public"."halfvec", integer, integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."subvector"("public"."vector", integer, integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."subvector"("public"."vector", integer, integer) TO "anon";
GRANT ALL ON FUNCTION "public"."subvector"("public"."vector", integer, integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."subvector"("public"."vector", integer, integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."update_conversation_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_conversation_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_conversation_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_accum"(double precision[], "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_accum"(double precision[], "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_accum"(double precision[], "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_accum"(double precision[], "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_add"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_add"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_add"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_add"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_avg"(double precision[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_avg"(double precision[]) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_avg"(double precision[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_avg"(double precision[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_cmp"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_cmp"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_cmp"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_cmp"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_combine"(double precision[], double precision[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_combine"(double precision[], double precision[]) TO "anon";
GRANT ALL ON FUNCTION "public"."vector_combine"(double precision[], double precision[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_combine"(double precision[], double precision[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_concat"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_concat"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_concat"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_concat"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_dims"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_dims"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_dims"("public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_eq"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_eq"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_eq"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_eq"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_ge"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_ge"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_ge"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_ge"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_gt"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_gt"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_gt"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_gt"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_l2_squared_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_l2_squared_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_l2_squared_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_l2_squared_distance"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_le"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_le"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_le"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_le"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_lt"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_lt"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_lt"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_lt"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_mul"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_mul"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_mul"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_mul"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_ne"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_ne"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_ne"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_ne"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_negative_inner_product"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_negative_inner_product"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_negative_inner_product"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_negative_inner_product"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_norm"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_norm"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_norm"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_norm"("public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_spherical_distance"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_spherical_distance"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_spherical_distance"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_spherical_distance"("public"."vector", "public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."vector_sub"("public"."vector", "public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."vector_sub"("public"."vector", "public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."vector_sub"("public"."vector", "public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."vector_sub"("public"."vector", "public"."vector") TO "service_role";












GRANT ALL ON FUNCTION "public"."avg"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."avg"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."avg"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."avg"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."avg"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."avg"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."avg"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."avg"("public"."vector") TO "service_role";



GRANT ALL ON FUNCTION "public"."sum"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."sum"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."sum"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sum"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."sum"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."sum"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."sum"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."sum"("public"."vector") TO "service_role";









GRANT ALL ON TABLE "public"."attachments" TO "anon";
GRANT ALL ON TABLE "public"."attachments" TO "authenticated";
GRANT ALL ON TABLE "public"."attachments" TO "service_role";



GRANT ALL ON TABLE "public"."conversations" TO "anon";
GRANT ALL ON TABLE "public"."conversations" TO "authenticated";
GRANT ALL ON TABLE "public"."conversations" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_items" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_items" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_items" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_pipeline_agent_steps" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_pipeline_agent_steps" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_pipeline_agent_steps" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_pipeline_events" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_pipeline_events" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_pipeline_events" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_pipeline_generated_assets" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_pipeline_generated_assets" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_pipeline_generated_assets" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_pipeline_generations" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_pipeline_generations" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_pipeline_generations" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_pipeline_otf_instructions" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_pipeline_otf_instructions" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_pipeline_otf_instructions" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_pipeline_phase_delegations" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_pipeline_phase_delegations" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_pipeline_phase_delegations" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_pipeline_runs" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_pipeline_runs" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_pipeline_runs" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_pipeline_substeps" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_pipeline_substeps" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_pipeline_substeps" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_pipeline_tool_executions" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_pipeline_tool_executions" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_pipeline_tool_executions" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_templates" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_templates" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_templates" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_vectors" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_vectors" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_vectors" TO "service_role";



GRANT ALL ON TABLE "public"."deliverables" TO "anon";
GRANT ALL ON TABLE "public"."deliverables" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverables" TO "service_role";



GRANT ALL ON TABLE "public"."error_logs" TO "anon";
GRANT ALL ON TABLE "public"."error_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."error_logs" TO "service_role";



GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";



GRANT ALL ON TABLE "public"."message_attachments" TO "anon";
GRANT ALL ON TABLE "public"."message_attachments" TO "authenticated";
GRANT ALL ON TABLE "public"."message_attachments" TO "service_role";



GRANT ALL ON TABLE "public"."messages" TO "anon";
GRANT ALL ON TABLE "public"."messages" TO "authenticated";
GRANT ALL ON TABLE "public"."messages" TO "service_role";



GRANT ALL ON TABLE "public"."notifications" TO "anon";
GRANT ALL ON TABLE "public"."notifications" TO "authenticated";
GRANT ALL ON TABLE "public"."notifications" TO "service_role";



GRANT ALL ON TABLE "public"."pipeline_runs" TO "anon";
GRANT ALL ON TABLE "public"."pipeline_runs" TO "authenticated";
GRANT ALL ON TABLE "public"."pipeline_runs" TO "service_role";



GRANT ALL ON TABLE "public"."run_jobs" TO "anon";
GRANT ALL ON TABLE "public"."run_jobs" TO "authenticated";
GRANT ALL ON TABLE "public"."run_jobs" TO "service_role";



GRANT ALL ON TABLE "public"."stream_logs" TO "anon";
GRANT ALL ON TABLE "public"."stream_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."stream_logs" TO "service_role";



GRANT ALL ON TABLE "public"."token_costs" TO "anon";
GRANT ALL ON TABLE "public"."token_costs" TO "authenticated";
GRANT ALL ON TABLE "public"."token_costs" TO "service_role";



GRANT ALL ON TABLE "public"."ai_document_runs" TO "anon";
GRANT ALL ON TABLE "public"."ai_document_runs" TO "authenticated";
GRANT ALL ON TABLE "public"."ai_document_runs" TO "service_role";



GRANT ALL ON TABLE "public"."ai_documents" TO "anon";
GRANT ALL ON TABLE "public"."ai_documents" TO "authenticated";
GRANT ALL ON TABLE "public"."ai_documents" TO "service_role";



GRANT ALL ON TABLE "public"."user_connections" TO "anon";
GRANT ALL ON TABLE "public"."user_connections" TO "authenticated";
GRANT ALL ON TABLE "public"."user_connections" TO "service_role";



GRANT ALL ON TABLE "public"."user_credit_usages" TO "anon";
GRANT ALL ON TABLE "public"."user_credit_usages" TO "authenticated";
GRANT ALL ON TABLE "public"."user_credit_usages" TO "service_role";



GRANT ALL ON TABLE "public"."user_credits" TO "anon";
GRANT ALL ON TABLE "public"."user_credits" TO "authenticated";
GRANT ALL ON TABLE "public"."user_credits" TO "service_role";



GRANT ALL ON TABLE "public"."user_github_connections" TO "anon";
GRANT ALL ON TABLE "public"."user_github_connections" TO "authenticated";
GRANT ALL ON TABLE "public"."user_github_connections" TO "service_role";



GRANT ALL ON TABLE "public"."user_model_preferences" TO "anon";
GRANT ALL ON TABLE "public"."user_model_preferences" TO "authenticated";
GRANT ALL ON TABLE "public"."user_model_preferences" TO "service_role";



GRANT ALL ON TABLE "public"."user_profiles" TO "anon";
GRANT ALL ON TABLE "public"."user_profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."user_profiles" TO "service_role";



GRANT ALL ON TABLE "public"."user_template_preferences" TO "anon";
GRANT ALL ON TABLE "public"."user_template_preferences" TO "authenticated";
GRANT ALL ON TABLE "public"."user_template_preferences" TO "service_role";



GRANT ALL ON TABLE "public"."user_vcs_connections" TO "anon";
GRANT ALL ON TABLE "public"."user_vcs_connections" TO "authenticated";
GRANT ALL ON TABLE "public"."user_vcs_connections" TO "service_role";



GRANT ALL ON TABLE "public"."vcs_repositories" TO "anon";
GRANT ALL ON TABLE "public"."vcs_repositories" TO "authenticated";
GRANT ALL ON TABLE "public"."vcs_repositories" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;

--
-- Dumped schema changes for auth and storage
--

CREATE OR REPLACE TRIGGER "on_auth_user_created" AFTER INSERT ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_user"();



