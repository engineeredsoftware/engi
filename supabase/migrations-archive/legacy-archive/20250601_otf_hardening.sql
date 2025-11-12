-- On-the-Fly instructions hardening migration (2025-06-01)
-- 1) Ensure run_kind has constrained values
ALTER TABLE run_otf_instructions
  ADD CONSTRAINT run_otf_instructions_run_kind_chk
  CHECK (run_kind IN ('deliverable', 'ai_document'));

-- 2) Composite index to speed look-ups by run + creation time
CREATE INDEX IF NOT EXISTS run_otf_instructions_runid_created_idx
  ON run_otf_instructions (run_id, created_at DESC);

-- 3) RLS helpers – enable row-level security and policy skeletons (fill in roles)
ALTER TABLE run_otf_instructions ENABLE ROW LEVEL SECURITY;

-- Allow owners to view their own instructions
CREATE POLICY "Allow owner select"
  ON run_otf_instructions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow owners to insert
CREATE POLICY "Allow owner insert"
  ON run_otf_instructions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
