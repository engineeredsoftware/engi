/**
 * VCS Core integration for Bitbucket MCP tools
 * This file provides tools that use the unified VCS abstraction
 */

import { createVCSTools } from '@engi/vcs';
import { createClient as createSupabaseServerClient } from '@engi/supabase/ssr/server';

// Export VCS-based tools for Bitbucket
export const bitbucketVCSTools = createVCSTools('bitbucket', () => createSupabaseServerClient());

// Re-export individual tools for convenience
export const bitbucketListRepositories = bitbucketVCSTools.find(t => t.name === 'bitbucket_list_repositories');
export const bitbucketGetRepository = bitbucketVCSTools.find(t => t.name === 'bitbucket_get_repository');
export const bitbucketListBranches = bitbucketVCSTools.find(t => t.name === 'bitbucket_list_branches');
export const bitbucketCreatePullRequest = bitbucketVCSTools.find(t => t.name === 'bitbucket_create_pull_request');
export const bitbucketListPullRequests = bitbucketVCSTools.find(t => t.name === 'bitbucket_list_pull_requests');
export const bitbucketGetFileContent = bitbucketVCSTools.find(t => t.name === 'bitbucket_get_file_content');
export const bitbucketCreateWebhook = bitbucketVCSTools.find(t => t.name === 'bitbucket_create_webhook');
