-- Table to track processed GitHub interactions for duplicate prevention
CREATE TABLE IF NOT EXISTS "public"."github_interactions" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "installation_id" text NOT NULL,
    "repository_name" text NOT NULL,
    "repository_owner" text NOT NULL,
    "issue_number" integer,
    "pr_number" integer,
    "event_type" text NOT NULL, -- 'labeled', 'issue_comment', 'pull_request'
    "trigger_type" text NOT NULL, -- label name or comment pattern
    "github_event_id" text, -- GitHub's unique event ID when available
    "comment_id" text, -- GitHub comment ID for comment events
    "processed_at" timestamp with time zone DEFAULT now(),
    "user_id" uuid REFERENCES auth.users(id),
    "pipeline_run_id" uuid, -- Optional reference to the pipeline run
    "payload_hash" text, -- Hash of the payload for uniqueness checking
    
    -- Ensure we don't process the same interaction twice
    UNIQUE(installation_id, repository_name, repository_owner, event_type, github_event_id, comment_id)
);

-- Add indexes for efficient lookups
CREATE INDEX IF NOT EXISTS "idx_github_interactions_installation" ON "public"."github_interactions" ("installation_id");
CREATE INDEX IF NOT EXISTS "idx_github_interactions_repo" ON "public"."github_interactions" ("repository_owner", "repository_name");
CREATE INDEX IF NOT EXISTS "idx_github_interactions_issue" ON "public"."github_interactions" ("repository_owner", "repository_name", "issue_number");
CREATE INDEX IF NOT EXISTS "idx_github_interactions_processed_at" ON "public"."github_interactions" ("processed_at");
CREATE INDEX IF NOT EXISTS "idx_github_interactions_payload_hash" ON "public"."github_interactions" ("payload_hash");

-- Enable RLS
ALTER TABLE "public"."github_interactions" ENABLE ROW LEVEL SECURITY;

-- RLS policy - users can only see their own interactions
CREATE POLICY "Users can view own github interactions" ON "public"."github_interactions"
    FOR ALL USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT ALL ON "public"."github_interactions" TO "authenticated";
GRANT ALL ON "public"."github_interactions" TO "service_role";

-- Add comment
COMMENT ON TABLE "public"."github_interactions" IS 'Tracks processed GitHub webhook interactions to prevent duplicate pipeline triggers';