/**
 * EXECUTION STORAGE DESTINATION - Where execution data lives
 * 
 * Controls where execution data is stored - in memory, persistent storage, or both.
 * This is about physical location, not caching or memoization.
 */

/**
 * Execution storage destination options
 */
export enum ExecutionStorageDestination {
  EPHEMERAL = 'ephemeral',    // In-memory only (default)
  PERSISTENT = 'persistent'   // External storage only
}

/**
 * Execution storage configuration
 */
export interface ExecutionStorageConfig {
  bucket?: string;
  path?: string;
  contentType?: string;
}

/**
 * Execution storage options for the store() method
 */
export interface ExecutionStorageOptions {
  destinations?: ExecutionStorageDestination[];  // Where to store (defaults to [EPHEMERAL])
  config?: ExecutionStorageConfig;  // Config for persistent storage
}

/**
 * Execution storage result with metadata
 */
export interface ExecutionStorageResult {
  stored: boolean;
  destinations: ExecutionStorageDestination[];
  locations: {
    ephemeral?: boolean;
    persistent?: boolean;
  };
  metadata?: {
    size?: number;
    url?: string;  // URL if stored persistently
    config?: ExecutionStorageConfig;
  };
}

/**
 * Default execution storage options
 */
export const DEFAULT_EXECUTION_STORAGE_OPTIONS: ExecutionStorageOptions = {
  destinations: [ExecutionStorageDestination.EPHEMERAL]
};