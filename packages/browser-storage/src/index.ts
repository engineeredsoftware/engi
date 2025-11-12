/**
 * Core browser storage utilities
 * 
 * Provides versioned, type-safe browser storage with:
 * - Automatic migration between versions
 * - Multi-tab synchronization
 * - Debounced persistence
 * - Schema validation
 */

export { VersionedStorage } from './versioned-storage';
export { StorageManager } from './storage-manager';
export { createPersistedState } from './persisted-state';

export type {
  StorageOptions,
  StorageSchema,
  MigrationFunction,
  StorageEvent
} from './types';