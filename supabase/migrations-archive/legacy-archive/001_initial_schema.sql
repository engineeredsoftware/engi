

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
-- Silence benign privilege warnings that can be emitted when granting
-- privileges on extension-provided objects that already have the
-- correct privileges (e.g. halfvec_* functions from the `vector`
-- extension). We still want real errors to abort the migration, so we
-- set the level to `error`.
SET client_min_messages = error;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "public";






CREATE TYPE "public"."issue_event_type" AS ENUM (
    'created',
    'updated',
    'deleted'
);


ALTER TYPE "public"."issue_event_type" OWNER TO "postgres";


CREATE TYPE "public"."issue_severity" AS ENUM (
    'low',
    'medium',
    'high',
    'critical'
);


ALTER TYPE "public"."issue_severity" OWNER TO "postgres";


CREATE TYPE "public"."issue_status" AS ENUM (
    'open',
    'in_progress',
    'closed'
);


ALTER TYPE "public"."issue_status" OWNER TO "postgres";


CREATE TYPE "public"."user_role" AS ENUM (
    'viewer',
    'support',
    'ops',
    'admin'
);


ALTER TYPE "public"."user_role" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."_feedback_event_trg"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  perform public._log_event_from_generic('feedback', new.id, 'feedback', to_jsonb(new));
  return new;
end; $$;


ALTER FUNCTION "public"."_feedback_event_trg"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."_generate_unique_username"("p_base" "text") RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
declare
  candidate text := lower(p_base);
  suffix    int  := 0;
  collision boolean;
begin
  -- Empty or whitespace only fall back to a uuid prefix
  if candidate is null or btrim(candidate) = '' then
    candidate := left(gen_random_uuid()::text, 8);
  end if;

  loop
    select exists(
      select 1
        from public.user_profiles up
       where lower(up.username) = lower(candidate)
    ) into collision;

    if not collision then
      return candidate;
    end if;

    suffix := suffix + 1;
    candidate := lower(p_base) || '_' || suffix;
  end loop;
end;
$$;


ALTER FUNCTION "public"."_generate_unique_username"("p_base" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."_insert_event"("_user_id" "uuid", "_type" "text", "_ref_table" "text" DEFAULT NULL::"text", "_ref_id" "uuid" DEFAULT NULL::"uuid", "_data" "jsonb" DEFAULT '{}'::"jsonb") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_catalog'
    AS $$
begin
  insert into public.events(user_id, type, ref_table, ref_id, data)
  values (_user_id, _type, _ref_table, _ref_id, _data);
end;
$$;


ALTER FUNCTION "public"."_insert_event"("_user_id" "uuid", "_type" "text", "_ref_table" "text", "_ref_id" "uuid", "_data" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."_log_event_from_generic"("table_name" "text", "ref_id" "uuid", "evt_type" "text", "payload" "jsonb") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.events(type, ref_table, ref_id, trace_id, user_id, data)
  values(evt_type, table_name, ref_id, null, null, payload);
end;
$$;


ALTER FUNCTION "public"."_log_event_from_generic"("table_name" "text", "ref_id" "uuid", "evt_type" "text", "payload" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."_log_phase_event"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.events(trace_id, user_id, type, ref_table, ref_id, data)
  values(
    new.run_id,                   -- trace_id
    null,                         -- user_id unknown here, but join later
    'run_phase_' || tg_op,        -- run_phase_INSERT / UPDATE
    tg_table_name,
    new.id,
    to_jsonb(new)
  );
  return new;
end; $$;


ALTER FUNCTION "public"."_log_phase_event"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."_plan_events_event_trg"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  perform public._log_event_from_generic('plan_events', new.id, 'plan_change', to_jsonb(new));
  return new;
end; $$;


ALTER FUNCTION "public"."_plan_events_event_trg"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."_token_costs_event_trg"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  perform public._log_event_from_generic('token_costs', new.id, 'token_cost', to_jsonb(new));
  return new;
end; $$;


ALTER FUNCTION "public"."_token_costs_event_trg"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."admin_credit_summary"() RETURNS TABLE("total_purchased" integer, "total_spent" integer, "total_balance" integer, "total_transactions" integer)
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
  SELECT
    coalesce(
      (SELECT sum(case when "change" > 0 then "change" else 0 end)
       FROM public.user_credit_usages),
      0
    )::int,
    coalesce(
      (SELECT sum(case when "change" < 0 then -"change" else 0 end)
       FROM public.user_credit_usages),
      0
    )::int,
    coalesce(
      (SELECT sum(credits) FROM public.user_credits),
      0
    )::int,
    (SELECT count(*) FROM public.user_credit_usages)::int;
$$;


ALTER FUNCTION "public"."admin_credit_summary"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."deduct_credits"("p_user_id" "uuid", "p_amount" integer) RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  prev_balance integer;
  new_balance integer;
begin
  if p_amount <= 0 then
    raise exception 'Amount to deduct must be positive';
  end if;

  -- Fetch the previous balance (0 if none)
  select credits into prev_balance
    from public.user_credits
    where user_id = p_user_id
    for update; -- lock row

  if prev_balance is null then
    prev_balance := 0;
  end if;

  if prev_balance < p_amount then
    raise exception 'Insufficient credits: have %, need %', prev_balance, p_amount;
  end if;

  new_balance := prev_balance - p_amount;

  -- Upsert new balance
  insert into public.user_credits (user_id, credits)
    values (p_user_id, new_balance)
    on conflict (user_id)
    do update set credits = excluded.credits, updated_at = now();

  -- Insert usage ledger row
  insert into public.user_credit_usages (user_id, change, balance, description)
    values (p_user_id, -p_amount, new_balance, 'Credit deduction');

  return new_balance;
end;
$$;


ALTER FUNCTION "public"."deduct_credits"("p_user_id" "uuid", "p_amount" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."exec_sql"("stmt" "text") RETURNS TABLE("result" "jsonb")
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $_$
declare
  clean_stmt text;
begin
  -- Ensure only SELECT queries (allow leading whitespace)
  if stmt !~* '^[[:space:]]*select' then
    raise exception 'exec_sql only supports SELECT statements';
  end if;
  -- Strip any trailing semicolons/whitespace to embed in subquery
  clean_stmt := regexp_replace(stmt, ';[[:space:]]*$', '', 'g');
  -- Execute the query and wrap each row as JSONB
  return query execute
    'select to_jsonb(t) as result from (' || clean_stmt || ') t';
end;
$_$;


ALTER FUNCTION "public"."exec_sql"("stmt" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  base_username  text;
  final_username text;
begin
  -- Derive username base from email prefix when available.
  if new.email is not null then
    base_username := split_part(new.email, '@', 1);
  else
    base_username := left(new.id::text, 8); -- fallback to UUID prefix
  end if;

  final_username := public._generate_unique_username(base_username);

  insert into public.user_profiles (user_id, username, display_name)
    values (new.id, final_username, null);

  insert into public.user_credits (user_id, credits)
    values (new.id, 0)
    on conflict (user_id) do nothing;

  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."log_issue_event"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  if (tg_op = 'INSERT') then
    insert into public.issue_events(issue_id, event_type, new_data)
    values (new.id, 'created', row_to_json(new));
    return new;
  elsif (tg_op = 'UPDATE') then
    insert into public.issue_events(issue_id, event_type, old_data, new_data)
    values (new.id, 'updated', row_to_json(old), row_to_json(new));
    return new;
  elsif (tg_op = 'DELETE') then
    insert into public.issue_events(issue_id, event_type, old_data)
    values (old.id, 'deleted', row_to_json(old));
    return old;
  end if;
  return new;
end;
$$;


ALTER FUNCTION "public"."log_issue_event"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."match_deliverable_vectors"("query_embedding" "public"."vector", "match_count" integer DEFAULT 10) RETURNS TABLE("deliverable_id" "uuid", "user_id" "uuid", "output" "text", "similarity" double precision)
    LANGUAGE "sql" STABLE
    AS $$
  select
    deliverable_id,
    user_id,
    output,
    embedding <-> query_embedding as similarity
  from public.deliverable_vectors
  order by embedding <-> query_embedding
  limit match_count;
$$;


ALTER FUNCTION "public"."match_deliverable_vectors"("query_embedding" "public"."vector", "match_count" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."match_ai_document_templates"("query_embedding" "public"."vector", "match_count" integer DEFAULT 10) RETURNS TABLE("template_id" "text", "title" "text", "description" "text", "content" "text", "similarity" double precision)
    LANGUAGE "sql" STABLE
    AS $$
  select
    template_id,
    title,
    description,
    content,
    embedding <-> query_embedding as similarity
  from public.ai_document_template_vectors
  order by embedding <-> query_embedding
  limit match_count;
$$;


ALTER FUNCTION "public"."match_ai_document_templates"("query_embedding" "public"."vector", "match_count" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."prevent_profile_priv_escalation"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  -- Disallow changes to role
  if new.role is distinct from old.role then
    raise exception 'You are not allowed to change your role';
  end if;

  -- Disallow granting admin
  if new.is_admin is distinct from old.is_admin then
    raise exception 'You are not allowed to change admin flag';
  end if;

  -- Disallow self-verification
  if new.is_verified is distinct from old.is_verified then
    raise exception 'You are not allowed to change verification status';
  end if;

  return new;
end;
$$;


ALTER FUNCTION "public"."prevent_profile_priv_escalation"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."trigger_deliverable_run_start"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  perform public._insert_event(new.user_id, 'deliverable_start', 'deliverable_runs', new.id);
  return new;
end;
$$;


ALTER FUNCTION "public"."trigger_deliverable_run_start"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."trigger_login_event"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
declare
  recently_logged_in int;
begin
  -- Count recent login events for this user within 5-minute window
  select count(*) into recently_logged_in
  from public.events
  where user_id = new.user_id
    and type = 'login'
    and created_at > now() - interval '5 minutes';

  if recently_logged_in = 0 then
    perform public._insert_event(new.user_id, 'login', 'user_sessions', new.id);
  end if;

  return new;
end;
$$;


ALTER FUNCTION "public"."trigger_login_event"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."trigger_plan_change_event"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  if (new.role is distinct from old.role) then
    perform public._insert_event(new.user_id, 'plan_change', 'user_profiles', new.user_id, jsonb_build_object('old_role', old.role, 'new_role', new.role));
  end if;
  return new;
end;
$$;


ALTER FUNCTION "public"."trigger_plan_change_event"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."trigger_signup_event"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  perform public._insert_event(new.id, 'signup');
  return new;
end;
$$;


ALTER FUNCTION "public"."trigger_signup_event"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."trigger_ai_document_run_start"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  perform public._insert_event(new.user_id, 'ai_document_start', 'ai_document_runs', new.id);
  return new;
end;
$$;


ALTER FUNCTION "public"."trigger_ai_document_run_start"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."alert_state" (
    "key" "text" NOT NULL,
    "last_sent" timestamp with time zone
);


ALTER TABLE "public"."alert_state" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."deliverable_run_events" (
    "id" bigint NOT NULL,
    "run_id" "uuid" NOT NULL,
    "event" "jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."deliverable_run_events" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."deliverable_run_events_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."deliverable_run_events_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."deliverable_run_events_id_seq" OWNED BY "public"."deliverable_run_events"."id";



CREATE TABLE IF NOT EXISTS "public"."deliverable_run_phases" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "run_id" "uuid" NOT NULL,
    "phase" "text" NOT NULL,
    "status" "text" DEFAULT 'running'::"text" NOT NULL,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "finished_at" timestamp with time zone,
    "logs" "jsonb" DEFAULT '[]'::"jsonb",
    "metrics" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."deliverable_run_phases" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."deliverable_runs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "items" "jsonb",
    "context" "jsonb"
);


ALTER TABLE "public"."deliverable_runs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."deliverable_vectors" (
    "deliverable_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "output" "text" NOT NULL,
    "embedding" "public"."vector"(1536) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."deliverable_vectors" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."deliverables" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "output" "text",
    "repository" "text",
    "deliverable_type" "text",
    "deliverable_id" "text",
    "deliverable_status" "text",
    "attached_urls" "jsonb",
    "selected_files" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "run_id" "uuid",
    "started_at" timestamp with time zone,
    "finished_at" timestamp with time zone,
    "duration_ms" integer
);


ALTER TABLE "public"."deliverables" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."error_logs" (
    "id" bigint NOT NULL,
    "level" "text" NOT NULL,
    "message" "text" NOT NULL,
    "metadata" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."error_logs" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."error_logs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."error_logs_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."error_logs_id_seq" OWNED BY "public"."error_logs"."id";



CREATE TABLE IF NOT EXISTS "public"."events" (
    "id" bigint NOT NULL,
    "user_id" "uuid",
    "trace_id" "uuid",
    "type" "text" NOT NULL,
    "ref_table" "text",
    "ref_id" "uuid",
    "data" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."events" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."events_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."events_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."events_id_seq" OWNED BY "public"."events"."id";



CREATE TABLE IF NOT EXISTS "public"."feedback" (
    "id" bigint NOT NULL,
    "deliverable_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "rating" integer NOT NULL,
    "comment" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "feedback_rating_check" CHECK (("rating" = ANY (ARRAY['-1'::integer, 1])))
);


ALTER TABLE "public"."feedback" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."feedback_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."feedback_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."feedback_id_seq" OWNED BY "public"."feedback"."id";



CREATE TABLE IF NOT EXISTS "public"."generated_assets" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "run_id" "uuid" NOT NULL,
    "kind" "text" NOT NULL,
    "uri" "text" NOT NULL,
    "meta" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."generated_assets" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."issue_events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "issue_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "event_type" "public"."issue_event_type" NOT NULL,
    "old_data" "jsonb",
    "new_data" "jsonb",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL
);


ALTER TABLE "public"."issue_events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."issues" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" DEFAULT ''::"text" NOT NULL,
    "severity" "public"."issue_severity" DEFAULT 'low'::"public"."issue_severity" NOT NULL,
    "status" "public"."issue_status" DEFAULT 'open'::"public"."issue_status" NOT NULL,
    "assigned_to" "uuid",
    "reported_by" "uuid",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL
);


ALTER TABLE "public"."issues" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."marketplace_listings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "type" "text" NOT NULL,
    "asset" "text" NOT NULL,
    "side" "text" NOT NULL,
    "price" numeric NOT NULL,
    "quantity" integer NOT NULL,
    "owner" "uuid" NOT NULL,
    "technologies" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "status" "text" DEFAULT 'open'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "marketplace_listings_asset_check" CHECK (("asset" = ANY (ARRAY['knowledge_extension'::"text", 'pr'::"text"]))),
    CONSTRAINT "marketplace_listings_side_check" CHECK (("side" = ANY (ARRAY['buy'::"text", 'sell'::"text"]))),
    CONSTRAINT "marketplace_listings_type_check" CHECK (("type" = ANY (ARRAY['ai_document'::"text", 'deliverable'::"text"])))
);


ALTER TABLE "public"."marketplace_listings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."marketplace_orders" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "listing_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "executed_price" numeric NOT NULL,
    "quantity" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."marketplace_orders" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_credit_usages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "change" integer NOT NULL,
    "balance" integer NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_credit_usages" OWNER TO "postgres";


CREATE MATERIALIZED VIEW "public"."mv_credit_usage_30d" AS
 SELECT "date_trunc"('day'::"text", "user_credit_usages"."created_at") AS "day",
    ("sum"(
        CASE
            WHEN ("user_credit_usages"."change" < 0) THEN (- "user_credit_usages"."change")
            ELSE 0
        END))::integer AS "spent"
   FROM "public"."user_credit_usages"
  WHERE ("user_credit_usages"."created_at" >= ("now"() - '30 days'::interval))
  GROUP BY ("date_trunc"('day'::"text", "user_credit_usages"."created_at"))
  ORDER BY ("date_trunc"('day'::"text", "user_credit_usages"."created_at"))
  WITH NO DATA;


ALTER TABLE "public"."mv_credit_usage_30d" OWNER TO "postgres";


CREATE MATERIALIZED VIEW "public"."mv_deliverable_success_30d" AS
 SELECT "date_trunc"('day'::"text", "deliverables"."created_at") AS "day",
    ("count"(*) FILTER (WHERE ("deliverables"."deliverable_status" = 'success'::"text")))::integer AS "success",
    ("count"(*))::integer AS "total"
   FROM "public"."deliverables"
  WHERE ("deliverables"."created_at" >= ("now"() - '30 days'::interval))
  GROUP BY ("date_trunc"('day'::"text", "deliverables"."created_at"))
  ORDER BY ("date_trunc"('day'::"text", "deliverables"."created_at"))
  WITH NO DATA;


ALTER TABLE "public"."mv_deliverable_success_30d" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ai_documents" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "output" "text",
    "repository" "text",
    "ai_document_type" "text",
    "metrics" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "run_id" "uuid",
    "ai_document_status" "text",
    "started_at" timestamp with time zone,
    "finished_at" timestamp with time zone,
    "duration_ms" integer
);


ALTER TABLE "public"."ai_documents" OWNER TO "postgres";


CREATE MATERIALIZED VIEW "public"."mv_feature_usage_30d" AS
 SELECT "t"."feature",
    "sum"("t"."count") AS "count"
   FROM ( SELECT "deliverables"."deliverable_type" AS "feature",
            ("count"(*))::integer AS "count"
           FROM "public"."deliverables"
          WHERE ("deliverables"."created_at" >= ("now"() - '30 days'::interval))
          GROUP BY "deliverables"."deliverable_type"
        UNION ALL
         SELECT "ai_documents"."ai_document_type" AS "feature",
            ("count"(*))::integer AS "count"
           FROM "public"."ai_documents"
          WHERE ("ai_documents"."created_at" >= ("now"() - '30 days'::interval))
          GROUP BY "ai_documents"."ai_document_type") "t"
  GROUP BY "t"."feature"
  ORDER BY ("sum"("t"."count")) DESC
  WITH NO DATA;


ALTER TABLE "public"."mv_feature_usage_30d" OWNER TO "postgres";


CREATE MATERIALIZED VIEW "public"."mv_run_perf" AS
 SELECT "runs"."day",
    ("percentile_cont"((0.50)::double precision) WITHIN GROUP (ORDER BY (("runs"."duration_ms")::double precision)))::numeric(12,2) AS "p50_ms",
    ("percentile_cont"((0.95)::double precision) WITHIN GROUP (ORDER BY (("runs"."duration_ms")::double precision)))::numeric(12,2) AS "p95_ms"
   FROM ( SELECT "date_trunc"('day'::"text", "min"("deliverable_run_phases"."started_at")) AS "day",
            (EXTRACT(epoch FROM ("max"("deliverable_run_phases"."finished_at") - "min"("deliverable_run_phases"."started_at"))) * (1000)::numeric) AS "duration_ms"
           FROM "public"."deliverable_run_phases"
          WHERE ("deliverable_run_phases"."finished_at" IS NOT NULL)
          GROUP BY "deliverable_run_phases"."run_id") "runs"
  GROUP BY "runs"."day"
  ORDER BY "runs"."day"
  WITH NO DATA;


ALTER TABLE "public"."mv_run_perf" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_sessions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "last_seen" timestamp with time zone DEFAULT "now"() NOT NULL,
    "ip" "inet",
    "user_agent" "text",
    "country" "text",
    "city" "text",
    "first_seen" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_sessions" OWNER TO "postgres";


CREATE MATERIALIZED VIEW "public"."mv_user_cohorts" AS
 SELECT "t"."cohort_day",
    "count"(*) AS "total_signups",
    "sum"(("t"."d1_seen")::integer) AS "d1_retention",
    "sum"(("t"."d7_seen")::integer) AS "d7_retention",
    "sum"(("t"."d30_seen")::integer) AS "d30_retention"
   FROM ( SELECT "u"."id" AS "user_id",
            "date_trunc"('day'::"text", "u"."created_at") AS "cohort_day",
            (EXISTS ( SELECT 1
                   FROM "public"."user_sessions" "s"
                  WHERE (("s"."user_id" = "u"."id") AND ("s"."last_seen" >= ("u"."created_at" + '1 day'::interval))))) AS "d1_seen",
            (EXISTS ( SELECT 1
                   FROM "public"."user_sessions" "s"
                  WHERE (("s"."user_id" = "u"."id") AND ("s"."last_seen" >= ("u"."created_at" + '7 days'::interval))))) AS "d7_seen",
            (EXISTS ( SELECT 1
                   FROM "public"."user_sessions" "s"
                  WHERE (("s"."user_id" = "u"."id") AND ("s"."last_seen" >= ("u"."created_at" + '30 days'::interval))))) AS "d30_seen"
           FROM "auth"."users" "u"
          WHERE ("u"."created_at" >= ("now"() - '180 days'::interval))) "t"
  GROUP BY "t"."cohort_day"
  ORDER BY "t"."cohort_day"
  WITH NO DATA;


ALTER TABLE "public"."mv_user_cohorts" OWNER TO "postgres";




CREATE TABLE IF NOT EXISTS "public"."plan_events" (
    "id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "type" "text" NOT NULL,
    "meta" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."plan_events" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."plan_events_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."plan_events_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."plan_events_id_seq" OWNED BY "public"."plan_events"."id";



CREATE TABLE IF NOT EXISTS "public"."processed_stripe_sessions" (
    "session_id" "text" NOT NULL,
    "event_id" "text",
    "processed_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."processed_stripe_sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."token_costs" (
    "id" bigint NOT NULL,
    "run_id" "uuid" NOT NULL,
    "model" "text" NOT NULL,
    "prompt_tokens" integer NOT NULL,
    "completion_tokens" integer NOT NULL,
    "usd_cost" numeric(12,6) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."token_costs" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."token_costs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."token_costs_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."token_costs_id_seq" OWNED BY "public"."token_costs"."id";



CREATE TABLE IF NOT EXISTS "public"."ai_document_run_events" (
    "id" bigint NOT NULL,
    "run_id" "uuid" NOT NULL,
    "event" "jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."ai_document_run_events" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."ai_document_run_events_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."ai_document_run_events_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."ai_document_run_events_id_seq" OWNED BY "public"."ai_document_run_events"."id";



CREATE TABLE IF NOT EXISTS "public"."ai_document_run_phases" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "run_id" "uuid" NOT NULL,
    "phase" "text" NOT NULL,
    "status" "text" DEFAULT 'running'::"text" NOT NULL,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "finished_at" timestamp with time zone,
    "logs" "jsonb" DEFAULT '[]'::"jsonb",
    "metrics" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."ai_document_run_phases" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ai_document_runs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "items" "jsonb",
    "context" "jsonb"
);


ALTER TABLE "public"."ai_document_runs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ai_document_template_vectors" (
    "template_id" "text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "content" "text" NOT NULL,
    "embedding" "public"."vector"(1536) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."ai_document_template_vectors" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_api_keys" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "key" "text" NOT NULL,
    "name" "text" NOT NULL,
    "expire_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid"
);


ALTER TABLE "public"."user_api_keys" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_connections" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "provider" "text" NOT NULL,
    "connection_data" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_connections" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_credits" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "credits" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_credits" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_model_preferences" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "preferences" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_model_preferences" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_profiles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "username" "text" NOT NULL,
    "display_name" "text",
    "bio" "text",
    "company_name" "text",
    "avatar_url" "text",
    "team_members" "jsonb",
    "is_verified" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "installation_id" integer,
    "customer_id" "text",
    "payment_method_id" "text",
    "is_customer" boolean DEFAULT false,
    "is_admin" boolean DEFAULT false,
    "role" "public"."user_role" DEFAULT 'viewer'::"public"."user_role"
);


ALTER TABLE "public"."user_profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_template_preferences" (
    "user_id" "uuid" NOT NULL,
    "deliverable_templates" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "ai_document_templates" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_template_preferences" OWNER TO "postgres";


ALTER TABLE ONLY "public"."deliverable_run_events" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."deliverable_run_events_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."error_logs" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."error_logs_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."events" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."events_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."feedback" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."feedback_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."plan_events" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."plan_events_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."token_costs" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."token_costs_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."ai_document_run_events" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."ai_document_run_events_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."alert_state"
    ADD CONSTRAINT "alert_state_pkey" PRIMARY KEY ("key");



ALTER TABLE ONLY "public"."deliverable_run_events"
    ADD CONSTRAINT "deliverable_run_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_run_phases"
    ADD CONSTRAINT "deliverable_run_phases_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_runs"
    ADD CONSTRAINT "deliverable_runs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deliverable_vectors"
    ADD CONSTRAINT "deliverable_vectors_pkey" PRIMARY KEY ("deliverable_id");



ALTER TABLE ONLY "public"."deliverables"
    ADD CONSTRAINT "deliverables_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."error_logs"
    ADD CONSTRAINT "error_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."feedback"
    ADD CONSTRAINT "feedback_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."generated_assets"
    ADD CONSTRAINT "generated_assets_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."issue_events"
    ADD CONSTRAINT "issue_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."issues"
    ADD CONSTRAINT "issues_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."marketplace_listings"
    ADD CONSTRAINT "marketplace_listings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."marketplace_orders"
    ADD CONSTRAINT "marketplace_orders_pkey" PRIMARY KEY ("id");






ALTER TABLE ONLY "public"."plan_events"
    ADD CONSTRAINT "plan_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."processed_stripe_sessions"
    ADD CONSTRAINT "processed_stripe_sessions_pkey" PRIMARY KEY ("session_id");



ALTER TABLE ONLY "public"."token_costs"
    ADD CONSTRAINT "token_costs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ai_document_run_events"
    ADD CONSTRAINT "ai_document_run_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ai_document_run_phases"
    ADD CONSTRAINT "ai_document_run_phases_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ai_document_runs"
    ADD CONSTRAINT "ai_document_runs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ai_document_template_vectors"
    ADD CONSTRAINT "ai_document_template_vectors_pkey" PRIMARY KEY ("template_id");



ALTER TABLE ONLY "public"."ai_documents"
    ADD CONSTRAINT "ai_documents_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_api_keys"
    ADD CONSTRAINT "user_api_keys_key_key" UNIQUE ("key");



ALTER TABLE ONLY "public"."user_api_keys"
    ADD CONSTRAINT "user_api_keys_pkey" PRIMARY KEY ("id");



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



ALTER TABLE ONLY "public"."user_model_preferences"
    ADD CONSTRAINT "user_model_preferences_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_model_preferences"
    ADD CONSTRAINT "user_model_preferences_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_username_key" UNIQUE ("username");



ALTER TABLE ONLY "public"."user_sessions"
    ADD CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_sessions"
    ADD CONSTRAINT "user_sessions_user_id_unique" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."user_template_preferences"
    ADD CONSTRAINT "user_template_preferences_pkey" PRIMARY KEY ("user_id");



CREATE INDEX "deliverable_run_phases_run_id_idx" ON "public"."deliverable_run_phases" USING "btree" ("run_id");



CREATE INDEX "deliverables_started_at_idx" ON "public"."deliverables" USING "btree" ("started_at");



CREATE INDEX "events_created_at_idx" ON "public"."events" USING "btree" ("created_at" DESC);



CREATE INDEX "events_type_idx" ON "public"."events" USING "btree" ("type");



CREATE INDEX "events_user_id_created_at_idx" ON "public"."events" USING "btree" ("user_id", "created_at" DESC);



CREATE INDEX "feedback_deliverable_id_idx" ON "public"."feedback" USING "btree" ("deliverable_id");



CREATE INDEX "generated_assets_run_id_idx" ON "public"."generated_assets" USING "btree" ("run_id");



CREATE INDEX "idx_deliverable_run_events_run_id" ON "public"."deliverable_run_events" USING "btree" ("run_id");



CREATE INDEX "idx_deliverable_runs_user_created_at" ON "public"."deliverable_runs" USING "btree" ("user_id", "created_at" DESC);



CREATE INDEX "idx_deliverable_runs_user_id" ON "public"."deliverable_runs" USING "btree" ("user_id");



CREATE INDEX "idx_deliverables_created_at" ON "public"."deliverables" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_deliverables_user_created_at" ON "public"."deliverables" USING "btree" ("user_id", "created_at" DESC);



CREATE INDEX "idx_deliverables_user_id" ON "public"."deliverables" USING "btree" ("user_id");



CREATE INDEX "idx_error_logs_created_at" ON "public"."error_logs" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_issues_assigned_to" ON "public"."issues" USING "btree" ("assigned_to");



CREATE INDEX "idx_issues_created_at" ON "public"."issues" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_issues_severity" ON "public"."issues" USING "btree" ("severity");



CREATE INDEX "idx_issues_status" ON "public"."issues" USING "btree" ("status");



CREATE INDEX "idx_marketplace_listings_type_side" ON "public"."marketplace_listings" USING "btree" ("type", "side");



CREATE INDEX "idx_marketplace_orders_listing_id" ON "public"."marketplace_orders" USING "btree" ("listing_id");



CREATE INDEX "idx_marketplace_orders_user_id" ON "public"."marketplace_orders" USING "btree" ("user_id");



CREATE INDEX "idx_ai_document_run_events_run_id" ON "public"."ai_document_run_events" USING "btree" ("run_id");



CREATE INDEX "idx_ai_document_runs_user_created_at" ON "public"."ai_document_runs" USING "btree" ("user_id", "created_at" DESC);



CREATE INDEX "idx_ai_document_runs_user_id" ON "public"."ai_document_runs" USING "btree" ("user_id");



CREATE INDEX "idx_ai_documents_created_at" ON "public"."ai_documents" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_ai_documents_user_created_at" ON "public"."ai_documents" USING "btree" ("user_id", "created_at" DESC);



CREATE INDEX "idx_ai_documents_user_id" ON "public"."ai_documents" USING "btree" ("user_id");



CREATE INDEX "idx_user_connections_user_id" ON "public"."user_connections" USING "btree" ("user_id");



CREATE INDEX "idx_user_credit_usages_created_at" ON "public"."user_credit_usages" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_user_credit_usages_user_created_at" ON "public"."user_credit_usages" USING "btree" ("user_id", "created_at" DESC);



CREATE INDEX "idx_user_credits_user_id" ON "public"."user_credits" USING "btree" ("user_id");



CREATE INDEX "idx_user_model_preferences_user_id" ON "public"."user_model_preferences" USING "btree" ("user_id");



CREATE INDEX "idx_user_profiles_created_at" ON "public"."user_profiles" USING "btree" ("created_at" DESC);



CREATE UNIQUE INDEX "idx_user_profiles_username_lower" ON "public"."user_profiles" USING "btree" ("lower"("username"));



CREATE INDEX "idx_user_sessions_last_seen" ON "public"."user_sessions" USING "btree" ("last_seen" DESC);



CREATE INDEX "idx_user_template_preferences_user_id" ON "public"."user_template_preferences" USING "btree" ("user_id");



CREATE INDEX "mv_credit_usage_day_idx" ON "public"."mv_credit_usage_30d" USING "btree" ("day");



CREATE INDEX "mv_deliverable_success_day_idx" ON "public"."mv_deliverable_success_30d" USING "btree" ("day");



CREATE INDEX "mv_feature_usage_feature_idx" ON "public"."mv_feature_usage_30d" USING "btree" ("feature");



CREATE INDEX "mv_run_perf_day_idx" ON "public"."mv_run_perf" USING "btree" ("day");



CREATE INDEX "mv_user_cohorts_day_idx" ON "public"."mv_user_cohorts" USING "btree" ("cohort_day");



CREATE INDEX "plan_events_user_id_idx" ON "public"."plan_events" USING "btree" ("user_id");



CREATE INDEX "token_costs_run_id_idx" ON "public"."token_costs" USING "btree" ("run_id");



CREATE INDEX "ai_document_run_phases_run_id_idx" ON "public"."ai_document_run_phases" USING "btree" ("run_id");



CREATE INDEX "ai_documents_started_at_idx" ON "public"."ai_documents" USING "btree" ("started_at");



CREATE OR REPLACE TRIGGER "deliverable_run_phases_event_trigger" AFTER INSERT OR UPDATE ON "public"."deliverable_run_phases" FOR EACH ROW EXECUTE FUNCTION "public"."_log_phase_event"();



CREATE OR REPLACE TRIGGER "feedback_event_trigger" AFTER INSERT ON "public"."feedback" FOR EACH ROW EXECUTE FUNCTION "public"."_feedback_event_trg"();



CREATE OR REPLACE TRIGGER "plan_events_event_trigger" AFTER INSERT ON "public"."plan_events" FOR EACH ROW EXECUTE FUNCTION "public"."_plan_events_event_trg"();



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."issues" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."user_connections" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."user_credits" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."user_model_preferences" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."user_profiles" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."user_template_preferences" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "token_costs_event_trigger" AFTER INSERT ON "public"."token_costs" FOR EACH ROW EXECUTE FUNCTION "public"."_token_costs_event_trg"();



CREATE OR REPLACE TRIGGER "trg_deliverable_run_start" AFTER INSERT ON "public"."deliverable_runs" FOR EACH ROW EXECUTE FUNCTION "public"."trigger_deliverable_run_start"();



CREATE OR REPLACE TRIGGER "trg_login_event" AFTER INSERT ON "public"."user_sessions" FOR EACH ROW EXECUTE FUNCTION "public"."trigger_login_event"();



CREATE OR REPLACE TRIGGER "trg_plan_change_event" AFTER UPDATE ON "public"."user_profiles" FOR EACH ROW EXECUTE FUNCTION "public"."trigger_plan_change_event"();



CREATE OR REPLACE TRIGGER "trg_prevent_priv_escalation" BEFORE UPDATE ON "public"."user_profiles" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_profile_priv_escalation"();



CREATE OR REPLACE TRIGGER "trg_ai_document_run_start" AFTER INSERT ON "public"."ai_document_runs" FOR EACH ROW EXECUTE FUNCTION "public"."trigger_ai_document_run_start"();



CREATE OR REPLACE TRIGGER "trigger_log_issue_event" AFTER INSERT OR DELETE OR UPDATE ON "public"."issues" FOR EACH ROW EXECUTE FUNCTION "public"."log_issue_event"();



CREATE OR REPLACE TRIGGER "ai_document_run_phases_event_trigger" AFTER INSERT OR UPDATE ON "public"."ai_document_run_phases" FOR EACH ROW EXECUTE FUNCTION "public"."_log_phase_event"();



ALTER TABLE ONLY "public"."deliverable_run_events"
    ADD CONSTRAINT "deliverable_run_events_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "public"."deliverable_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_run_phases"
    ADD CONSTRAINT "deliverable_run_phases_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "public"."deliverable_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."deliverable_runs"
    ADD CONSTRAINT "deliverable_runs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."deliverable_vectors"
    ADD CONSTRAINT "deliverable_vectors_deliverable_id_fkey" FOREIGN KEY ("deliverable_id") REFERENCES "public"."deliverables"("id");



ALTER TABLE ONLY "public"."deliverables"
    ADD CONSTRAINT "deliverables_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "public"."deliverable_runs"("id");



ALTER TABLE ONLY "public"."deliverables"
    ADD CONSTRAINT "deliverables_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."feedback"
    ADD CONSTRAINT "feedback_deliverable_id_fkey" FOREIGN KEY ("deliverable_id") REFERENCES "public"."deliverables"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."feedback"
    ADD CONSTRAINT "feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."generated_assets"
    ADD CONSTRAINT "generated_assets_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "public"."deliverable_runs"("id");



ALTER TABLE ONLY "public"."issue_events"
    ADD CONSTRAINT "issue_events_issue_id_fkey" FOREIGN KEY ("issue_id") REFERENCES "public"."issues"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."issues"
    ADD CONSTRAINT "issues_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "public"."user_profiles"("user_id");



ALTER TABLE ONLY "public"."issues"
    ADD CONSTRAINT "issues_reported_by_fkey" FOREIGN KEY ("reported_by") REFERENCES "public"."user_profiles"("user_id");



ALTER TABLE ONLY "public"."marketplace_listings"
    ADD CONSTRAINT "marketplace_listings_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."marketplace_orders"
    ADD CONSTRAINT "marketplace_orders_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "public"."marketplace_listings"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."marketplace_orders"
    ADD CONSTRAINT "marketplace_orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;






ALTER TABLE ONLY "public"."plan_events"
    ADD CONSTRAINT "plan_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."ai_document_run_events"
    ADD CONSTRAINT "ai_document_run_events_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "public"."ai_document_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."ai_document_run_phases"
    ADD CONSTRAINT "ai_document_run_phases_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "public"."ai_document_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."ai_document_runs"
    ADD CONSTRAINT "ai_document_runs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."ai_documents"
    ADD CONSTRAINT "ai_documents_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "public"."ai_document_runs"("id");



ALTER TABLE ONLY "public"."ai_documents"
    ADD CONSTRAINT "ai_documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."user_api_keys"
    ADD CONSTRAINT "user_api_keys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_connections"
    ADD CONSTRAINT "user_connections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."user_credit_usages"
    ADD CONSTRAINT "user_credit_usages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."user_credits"
    ADD CONSTRAINT "user_credits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."user_model_preferences"
    ADD CONSTRAINT "user_model_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."user_sessions"
    ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."user_template_preferences"
    ADD CONSTRAINT "user_template_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("user_id");












CREATE POLICY "admins_can_manage" ON "public"."deliverables" USING ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND "up"."is_admin"))));



CREATE POLICY "admins_can_manage" ON "public"."error_logs" USING ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND "up"."is_admin"))));



CREATE POLICY "admins_can_manage" ON "public"."ai_documents" USING ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND "up"."is_admin"))));



CREATE POLICY "admins_can_manage" ON "public"."user_credit_usages" USING ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND "up"."is_admin"))));



CREATE POLICY "admins_can_manage" ON "public"."user_sessions" USING ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND "up"."is_admin"))));



CREATE POLICY "delete_sessions_admin" ON "public"."user_sessions" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND ("up"."role" = ANY (ARRAY['admin'::"public"."user_role", 'ops'::"public"."user_role"]))))));



ALTER TABLE "public"."deliverable_run_events" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "deliverable_run_events_own_select" ON "public"."deliverable_run_events" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."deliverable_runs" "dr"
  WHERE (("dr"."id" = "deliverable_run_events"."run_id") AND ("dr"."user_id" = "auth"."uid"())))));



ALTER TABLE "public"."deliverable_runs" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "deliverable_runs_own_policy" ON "public"."deliverable_runs" USING (("user_id" = "auth"."uid"())) WITH CHECK (("user_id" = "auth"."uid"()));



ALTER TABLE "public"."deliverables" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."error_logs" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "insert_credit_usages" ON "public"."user_credit_usages" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND ("up"."role" = ANY (ARRAY['ops'::"public"."user_role", 'admin'::"public"."user_role"]))))));



CREATE POLICY "insert_error_logs" ON "public"."error_logs" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND ("up"."role" = ANY (ARRAY['support'::"public"."user_role", 'ops'::"public"."user_role", 'admin'::"public"."user_role"]))))));



CREATE POLICY "manage_deliverables" ON "public"."deliverables" USING ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND ("up"."role" = ANY (ARRAY['ops'::"public"."user_role", 'admin'::"public"."user_role"]))))));



CREATE POLICY "manage_sessions_for_user_insert" ON "public"."user_sessions" FOR INSERT WITH CHECK (("auth"."uid"() IS NOT NULL));



CREATE POLICY "manage_sessions_for_user_update" ON "public"."user_sessions" FOR UPDATE USING (("auth"."uid"() IS NOT NULL)) WITH CHECK (("auth"."uid"() IS NOT NULL));



CREATE POLICY "manage_ai_documents" ON "public"."ai_documents" USING ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND ("up"."role" = ANY (ARRAY['ops'::"public"."user_role", 'admin'::"public"."user_role"]))))));





CREATE POLICY "select_by_roles" ON "public"."deliverables" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND ("up"."role" = ANY (ARRAY['viewer'::"public"."user_role", 'support'::"public"."user_role", 'ops'::"public"."user_role", 'admin'::"public"."user_role"]))))));



CREATE POLICY "select_by_roles" ON "public"."error_logs" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND ("up"."role" = ANY (ARRAY['viewer'::"public"."user_role", 'support'::"public"."user_role", 'ops'::"public"."user_role", 'admin'::"public"."user_role"]))))));



CREATE POLICY "select_by_roles" ON "public"."ai_documents" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND ("up"."role" = ANY (ARRAY['viewer'::"public"."user_role", 'support'::"public"."user_role", 'ops'::"public"."user_role", 'admin'::"public"."user_role"]))))));



CREATE POLICY "select_by_roles" ON "public"."user_credit_usages" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND ("up"."role" = ANY (ARRAY['viewer'::"public"."user_role", 'support'::"public"."user_role", 'ops'::"public"."user_role", 'admin'::"public"."user_role"]))))));



CREATE POLICY "select_by_roles" ON "public"."user_sessions" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_profiles" "up"
  WHERE (("up"."user_id" = "auth"."uid"()) AND ("up"."role" = ANY (ARRAY['viewer'::"public"."user_role", 'support'::"public"."user_role", 'ops'::"public"."user_role", 'admin'::"public"."user_role"]))))));



ALTER TABLE "public"."ai_document_run_events" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "ai_document_run_events_own_select" ON "public"."ai_document_run_events" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."ai_document_runs" "ur"
  WHERE (("ur"."id" = "ai_document_run_events"."run_id") AND ("ur"."user_id" = "auth"."uid"())))));



ALTER TABLE "public"."ai_document_runs" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "ai_document_runs_own_policy" ON "public"."ai_document_runs" USING (("user_id" = "auth"."uid"())) WITH CHECK (("user_id" = "auth"."uid"()));



ALTER TABLE "public"."ai_documents" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_api_keys" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "user_api_keys_own_policy" ON "public"."user_api_keys" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."user_connections" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "user_connections_own_policy" ON "public"."user_connections" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."user_credit_usages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_credits" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "user_credits_own_policy" ON "public"."user_credits" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."user_model_preferences" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "user_model_preferences_own_policy" ON "public"."user_model_preferences" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."user_profiles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "user_profiles_admins_manage" ON "public"."user_profiles" USING ((COALESCE("current_setting"('request.jwt.claim.role'::"text", true), ''::"text") = 'admin'::"text")) WITH CHECK ((COALESCE("current_setting"('request.jwt.claim.role'::"text", true), ''::"text") = 'admin'::"text"));



CREATE POLICY "user_profiles_self_insert" ON "public"."user_profiles" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "user_profiles_self_select" ON "public"."user_profiles" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "user_profiles_self_update" ON "public"."user_profiles" FOR UPDATE USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."user_sessions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_template_preferences" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "user_template_preferences_own_policy" ON "public"."user_template_preferences" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));





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














































































































































































GRANT ALL ON FUNCTION "public"."_feedback_event_trg"() TO "anon";
GRANT ALL ON FUNCTION "public"."_feedback_event_trg"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."_feedback_event_trg"() TO "service_role";



GRANT ALL ON FUNCTION "public"."_generate_unique_username"("p_base" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."_generate_unique_username"("p_base" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."_generate_unique_username"("p_base" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."_insert_event"("_user_id" "uuid", "_type" "text", "_ref_table" "text", "_ref_id" "uuid", "_data" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."_insert_event"("_user_id" "uuid", "_type" "text", "_ref_table" "text", "_ref_id" "uuid", "_data" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."_insert_event"("_user_id" "uuid", "_type" "text", "_ref_table" "text", "_ref_id" "uuid", "_data" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."_log_event_from_generic"("table_name" "text", "ref_id" "uuid", "evt_type" "text", "payload" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."_log_event_from_generic"("table_name" "text", "ref_id" "uuid", "evt_type" "text", "payload" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."_log_event_from_generic"("table_name" "text", "ref_id" "uuid", "evt_type" "text", "payload" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."_log_phase_event"() TO "anon";
GRANT ALL ON FUNCTION "public"."_log_phase_event"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."_log_phase_event"() TO "service_role";



GRANT ALL ON FUNCTION "public"."_plan_events_event_trg"() TO "anon";
GRANT ALL ON FUNCTION "public"."_plan_events_event_trg"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."_plan_events_event_trg"() TO "service_role";



GRANT ALL ON FUNCTION "public"."_token_costs_event_trg"() TO "anon";
GRANT ALL ON FUNCTION "public"."_token_costs_event_trg"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."_token_costs_event_trg"() TO "service_role";



GRANT ALL ON FUNCTION "public"."admin_credit_summary"() TO "anon";
GRANT ALL ON FUNCTION "public"."admin_credit_summary"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."admin_credit_summary"() TO "service_role";



GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."halfvec") TO "postgres";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."halfvec") TO "anon";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."halfvec") TO "authenticated";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."halfvec") TO "service_role";



GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."vector") TO "postgres";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."vector") TO "anon";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."vector") TO "authenticated";
GRANT ALL ON FUNCTION "public"."binary_quantize"("public"."vector") TO "service_role";



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



GRANT ALL ON FUNCTION "public"."deduct_credits"("p_user_id" "uuid", "p_amount" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."deduct_credits"("p_user_id" "uuid", "p_amount" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."deduct_credits"("p_user_id" "uuid", "p_amount" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."exec_sql"("stmt" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."exec_sql"("stmt" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."exec_sql"("stmt" "text") TO "service_role";



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



GRANT ALL ON FUNCTION "public"."log_issue_event"() TO "anon";
GRANT ALL ON FUNCTION "public"."log_issue_event"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."log_issue_event"() TO "service_role";



GRANT ALL ON FUNCTION "public"."match_deliverable_vectors"("query_embedding" "public"."vector", "match_count" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."match_deliverable_vectors"("query_embedding" "public"."vector", "match_count" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."match_deliverable_vectors"("query_embedding" "public"."vector", "match_count" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."match_ai_document_templates"("query_embedding" "public"."vector", "match_count" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."match_ai_document_templates"("query_embedding" "public"."vector", "match_count" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."match_ai_document_templates"("query_embedding" "public"."vector", "match_count" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."prevent_profile_priv_escalation"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_profile_priv_escalation"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_profile_priv_escalation"() TO "service_role";



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



GRANT ALL ON FUNCTION "public"."trigger_deliverable_run_start"() TO "anon";
GRANT ALL ON FUNCTION "public"."trigger_deliverable_run_start"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."trigger_deliverable_run_start"() TO "service_role";



GRANT ALL ON FUNCTION "public"."trigger_login_event"() TO "anon";
GRANT ALL ON FUNCTION "public"."trigger_login_event"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."trigger_login_event"() TO "service_role";



GRANT ALL ON FUNCTION "public"."trigger_plan_change_event"() TO "anon";
GRANT ALL ON FUNCTION "public"."trigger_plan_change_event"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."trigger_plan_change_event"() TO "service_role";



GRANT ALL ON FUNCTION "public"."trigger_signup_event"() TO "anon";
GRANT ALL ON FUNCTION "public"."trigger_signup_event"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."trigger_signup_event"() TO "service_role";



GRANT ALL ON FUNCTION "public"."trigger_ai_document_run_start"() TO "anon";
GRANT ALL ON FUNCTION "public"."trigger_ai_document_run_start"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."trigger_ai_document_run_start"() TO "service_role";



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















GRANT ALL ON TABLE "public"."alert_state" TO "anon";
GRANT ALL ON TABLE "public"."alert_state" TO "authenticated";
GRANT ALL ON TABLE "public"."alert_state" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_run_events" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_run_events" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_run_events" TO "service_role";



GRANT ALL ON SEQUENCE "public"."deliverable_run_events_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."deliverable_run_events_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."deliverable_run_events_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_run_phases" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_run_phases" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_run_phases" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_runs" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_runs" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_runs" TO "service_role";



GRANT ALL ON TABLE "public"."deliverable_vectors" TO "anon";
GRANT ALL ON TABLE "public"."deliverable_vectors" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverable_vectors" TO "service_role";



GRANT ALL ON TABLE "public"."deliverables" TO "anon";
GRANT ALL ON TABLE "public"."deliverables" TO "authenticated";
GRANT ALL ON TABLE "public"."deliverables" TO "service_role";



GRANT ALL ON TABLE "public"."error_logs" TO "anon";
GRANT ALL ON TABLE "public"."error_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."error_logs" TO "service_role";



GRANT ALL ON SEQUENCE "public"."error_logs_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."error_logs_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."error_logs_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";



GRANT ALL ON SEQUENCE "public"."events_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."events_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."events_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."feedback" TO "anon";
GRANT ALL ON TABLE "public"."feedback" TO "authenticated";
GRANT ALL ON TABLE "public"."feedback" TO "service_role";



GRANT ALL ON SEQUENCE "public"."feedback_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."feedback_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."feedback_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."generated_assets" TO "anon";
GRANT ALL ON TABLE "public"."generated_assets" TO "authenticated";
GRANT ALL ON TABLE "public"."generated_assets" TO "service_role";



GRANT ALL ON TABLE "public"."issue_events" TO "anon";
GRANT ALL ON TABLE "public"."issue_events" TO "authenticated";
GRANT ALL ON TABLE "public"."issue_events" TO "service_role";



GRANT ALL ON TABLE "public"."issues" TO "anon";
GRANT ALL ON TABLE "public"."issues" TO "authenticated";
GRANT ALL ON TABLE "public"."issues" TO "service_role";



GRANT ALL ON TABLE "public"."marketplace_listings" TO "anon";
GRANT ALL ON TABLE "public"."marketplace_listings" TO "authenticated";
GRANT ALL ON TABLE "public"."marketplace_listings" TO "service_role";



GRANT ALL ON TABLE "public"."marketplace_orders" TO "anon";
GRANT ALL ON TABLE "public"."marketplace_orders" TO "authenticated";
GRANT ALL ON TABLE "public"."marketplace_orders" TO "service_role";



GRANT ALL ON TABLE "public"."user_credit_usages" TO "anon";
GRANT ALL ON TABLE "public"."user_credit_usages" TO "authenticated";
GRANT ALL ON TABLE "public"."user_credit_usages" TO "service_role";



GRANT ALL ON TABLE "public"."mv_credit_usage_30d" TO "anon";
GRANT ALL ON TABLE "public"."mv_credit_usage_30d" TO "authenticated";
GRANT ALL ON TABLE "public"."mv_credit_usage_30d" TO "service_role";



GRANT ALL ON TABLE "public"."mv_deliverable_success_30d" TO "anon";
GRANT ALL ON TABLE "public"."mv_deliverable_success_30d" TO "authenticated";
GRANT ALL ON TABLE "public"."mv_deliverable_success_30d" TO "service_role";



GRANT ALL ON TABLE "public"."ai_documents" TO "anon";
GRANT ALL ON TABLE "public"."ai_documents" TO "authenticated";
GRANT ALL ON TABLE "public"."ai_documents" TO "service_role";



GRANT ALL ON TABLE "public"."mv_feature_usage_30d" TO "anon";
GRANT ALL ON TABLE "public"."mv_feature_usage_30d" TO "authenticated";
GRANT ALL ON TABLE "public"."mv_feature_usage_30d" TO "service_role";



GRANT ALL ON TABLE "public"."mv_run_perf" TO "anon";
GRANT ALL ON TABLE "public"."mv_run_perf" TO "authenticated";
GRANT ALL ON TABLE "public"."mv_run_perf" TO "service_role";



GRANT ALL ON TABLE "public"."user_sessions" TO "anon";
GRANT ALL ON TABLE "public"."user_sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."user_sessions" TO "service_role";



GRANT ALL ON TABLE "public"."mv_user_cohorts" TO "anon";
GRANT ALL ON TABLE "public"."mv_user_cohorts" TO "authenticated";
GRANT ALL ON TABLE "public"."mv_user_cohorts" TO "service_role";






GRANT ALL ON TABLE "public"."plan_events" TO "anon";
GRANT ALL ON TABLE "public"."plan_events" TO "authenticated";
GRANT ALL ON TABLE "public"."plan_events" TO "service_role";



GRANT ALL ON SEQUENCE "public"."plan_events_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."plan_events_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."plan_events_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."processed_stripe_sessions" TO "anon";
GRANT ALL ON TABLE "public"."processed_stripe_sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."processed_stripe_sessions" TO "service_role";



GRANT ALL ON TABLE "public"."token_costs" TO "anon";
GRANT ALL ON TABLE "public"."token_costs" TO "authenticated";
GRANT ALL ON TABLE "public"."token_costs" TO "service_role";



GRANT ALL ON SEQUENCE "public"."token_costs_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."token_costs_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."token_costs_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."ai_document_run_events" TO "anon";
GRANT ALL ON TABLE "public"."ai_document_run_events" TO "authenticated";
GRANT ALL ON TABLE "public"."ai_document_run_events" TO "service_role";



GRANT ALL ON SEQUENCE "public"."ai_document_run_events_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."ai_document_run_events_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."ai_document_run_events_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."ai_document_run_phases" TO "anon";
GRANT ALL ON TABLE "public"."ai_document_run_phases" TO "authenticated";
GRANT ALL ON TABLE "public"."ai_document_run_phases" TO "service_role";



GRANT ALL ON TABLE "public"."ai_document_runs" TO "anon";
GRANT ALL ON TABLE "public"."ai_document_runs" TO "authenticated";
GRANT ALL ON TABLE "public"."ai_document_runs" TO "service_role";



GRANT ALL ON TABLE "public"."ai_document_template_vectors" TO "anon";
GRANT ALL ON TABLE "public"."ai_document_template_vectors" TO "authenticated";
GRANT ALL ON TABLE "public"."ai_document_template_vectors" TO "service_role";



GRANT ALL ON TABLE "public"."user_api_keys" TO "anon";
GRANT ALL ON TABLE "public"."user_api_keys" TO "authenticated";
GRANT ALL ON TABLE "public"."user_api_keys" TO "service_role";



GRANT ALL ON TABLE "public"."user_connections" TO "anon";
GRANT ALL ON TABLE "public"."user_connections" TO "authenticated";
GRANT ALL ON TABLE "public"."user_connections" TO "service_role";



GRANT ALL ON TABLE "public"."user_credits" TO "anon";
GRANT ALL ON TABLE "public"."user_credits" TO "authenticated";
GRANT ALL ON TABLE "public"."user_credits" TO "service_role";



GRANT ALL ON TABLE "public"."user_model_preferences" TO "anon";
GRANT ALL ON TABLE "public"."user_model_preferences" TO "authenticated";
GRANT ALL ON TABLE "public"."user_model_preferences" TO "service_role";



GRANT ALL ON TABLE "public"."user_profiles" TO "anon";
GRANT ALL ON TABLE "public"."user_profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."user_profiles" TO "service_role";



GRANT ALL ON TABLE "public"."user_template_preferences" TO "anon";
GRANT ALL ON TABLE "public"."user_template_preferences" TO "authenticated";
GRANT ALL ON TABLE "public"."user_template_preferences" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
