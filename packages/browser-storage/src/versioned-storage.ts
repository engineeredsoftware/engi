/**
 * Versioned storage with automatic migration support
 */

import { StorageOptions, StorageSchema, MigrationFunction } from './types';

export class VersionedStorage<T> {
  private readonly key: string;
  private readonly version: string;
  private readonly storage: Storage;
  private readonly migrations: Map<string, MigrationFunction>;

  constructor(options: StorageOptions) {
    this.key = options.key;
    this.version = options.version;
    this.storage = options.storage || (typeof window !== 'undefined' ? localStorage : null!);
    this.migrations = new Map();
  }

  /**
   * Register a migration function for a specific version
   */
  registerMigration(fromVersion: string, migration: MigrationFunction): void {
    this.migrations.set(fromVersion, migration);
  }

  /**
   * Load data from storage with automatic migration
   */
  load(): T | null {
    if (!this.storage) return null;

    try {
      const raw = this.storage.getItem(this.key);
      if (!raw) return null;

      const schema = JSON.parse(raw) as StorageSchema<T>;
      
      // Check if migration needed
      if (schema.version !== this.version) {
        const migrated = this.migrate(schema.data, schema.version);
        if (migrated) {
          // Save migrated data
          this.save(migrated);
          return migrated;
        }
      }

      return schema.data;
    } catch (error) {
      console.error(`[VersionedStorage] Failed to load ${this.key}:`, error);
      return null;
    }
  }

  /**
   * Save data to storage with version and timestamp
   */
  save(data: T): boolean {
    if (!this.storage) return false;

    try {
      const schema: StorageSchema<T> = {
        version: this.version,
        timestamp: Date.now(),
        data
      };

      this.storage.setItem(this.key, JSON.stringify(schema));
      return true;
    } catch (error) {
      console.error(`[VersionedStorage] Failed to save ${this.key}:`, error);
      return false;
    }
  }

  /**
   * Clear stored data
   */
  clear(): void {
    if (this.storage) {
      this.storage.removeItem(this.key);
    }
  }

  /**
   * Migrate data from old version to current version
   */
  private migrate(data: any, fromVersion: string): T | null {
    const migration = this.migrations.get(fromVersion);
    if (!migration) {
      console.warn(
        `[VersionedStorage] No migration from ${fromVersion} to ${this.version}`
      );
      return null;
    }

    try {
      return migration(data, fromVersion) as T;
    } catch (error) {
      console.error(
        `[VersionedStorage] Migration failed from ${fromVersion}:`,
        error
      );
      return null;
    }
  }
}