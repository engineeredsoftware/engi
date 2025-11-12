-- Migration: Mark user_github_connections table as deprecated
-- Date: 2025-08-20
-- Description: Add comment to indicate user_github_connections is deprecated
--              All VCS connections now use user_connections table with provider field

-- Add deprecation comment to the table
COMMENT ON TABLE user_github_connections IS 
  'DEPRECATED: This table is kept for backward compatibility but not actively used. All VCS connections are now stored in user_connections table with provider field. TODO: Remove in post-GA-1 migration.';

-- Add comment to indicate the unified approach
COMMENT ON TABLE user_connections IS 
  'Unified VCS connections table supporting GitHub, GitLab, BitBucket. The connection_data JSONB field contains provider-specific authentication data.';