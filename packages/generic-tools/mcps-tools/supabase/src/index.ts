// AI tool wrappers around Supabase utilities for AI agents to interact with
// Supabase databases, perform queries, manage data, and search MCP templates.

import { Tool } from '@bitcode/tools-generics';

import {
  supabaseMcpTool as _supabaseMcp,
  supabaseQueryTool as _supabaseQuery,
  supabaseInsertTool as _supabaseInsert,
  supabaseUpdateTool as _supabaseUpdate,
  supabaseDeleteTool as _supabaseDelete,
} from '@bitcode/supabase';

// ---------------------------------------------------------------------------
// MCP Template Search
// ---------------------------------------------------------------------------

/**
 * Search for MCP (Model Context Protocol) templates using semantic similarity
 */
class SupabaseMcpTool extends Tool<typeof _supabaseMcp> {
  use = _supabaseMcp;
}

export const supabaseMcpTool = new SupabaseMcpTool();

// ---------------------------------------------------------------------------
// Database Query Operations
// ---------------------------------------------------------------------------

/**
 * Execute SQL queries against the Supabase database
 */
class SupabaseQueryTool extends Tool<typeof _supabaseQuery> {
  use = _supabaseQuery;
}

export const supabaseQueryTool = new SupabaseQueryTool();

// ---------------------------------------------------------------------------
// Data Manipulation Operations
// ---------------------------------------------------------------------------

/**
 * Insert new records into a Supabase table
 */
class SupabaseInsertTool extends Tool<typeof _supabaseInsert> {
  use = _supabaseInsert;
}

export const supabaseInsertTool = new SupabaseInsertTool();

/**
 * Update existing records in a Supabase table
 */
class SupabaseUpdateTool extends Tool<typeof _supabaseUpdate> {
  use = _supabaseUpdate;
}

export const supabaseUpdateTool = new SupabaseUpdateTool();

/**
 * Delete records from a Supabase table based on filter conditions
 */
class SupabaseDeleteTool extends Tool<typeof _supabaseDelete> {
  use = _supabaseDelete;
}

export const supabaseDeleteTool = new SupabaseDeleteTool();

// ---------------------------------------------------------------------------
// Re-export Tool function types for strong typing at call-sites
// ---------------------------------------------------------------------------

export type SupabaseMcpToolFn = typeof supabaseMcpTool;
export type SupabaseQueryToolFn = typeof supabaseQueryTool;
export type SupabaseInsertToolFn = typeof supabaseInsertTool;
export type SupabaseUpdateToolFn = typeof supabaseUpdateTool;
export type SupabaseDeleteToolFn = typeof supabaseDeleteTool;

// Re-export additional types and utilities for convenience
export type {
  AssetPackEvidenceRow,
  PipelineExecution,
  PhaseExecution,
  ExecutionEvent,
  GeneratedAsset,
  TokenCost,
} from '@bitcode/supabase';

// Re-export client instances and creation functions
export {
  supabase,
  supabaseAdmin,
  createBrowserClient,
  SupabaseStream,
  flushAndExit,
} from '@bitcode/supabase';
