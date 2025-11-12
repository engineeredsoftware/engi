/**
 * Type definitions for browser storage utilities
 */

export interface StorageOptions {
  key: string;
  version: string;
  debounceMs?: number;
  syncAcrossTabs?: boolean;
  storage?: Storage;
}

export interface StorageSchema<T> {
  version: string;
  timestamp: number;
  data: T;
}

export type MigrationFunction<TOld = any, TNew = any> = (
  oldData: TOld,
  oldVersion: string
) => TNew;

export interface StorageEvent<T> {
  key: string;
  oldValue: T | null;
  newValue: T | null;
  timestamp: number;
}