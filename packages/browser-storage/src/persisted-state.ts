/**
 * React hook factory for persisted state
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import { VersionedStorage } from './versioned-storage';
import { StorageManager } from './storage-manager';
import { StorageOptions, MigrationFunction } from './types';

interface PersistedStateOptions<T> extends StorageOptions {
  defaultValue: T;
  migrations?: Array<{
    from: string;
    migration: MigrationFunction<any, T>;
  }>;
}

/**
 * Create a persisted state hook with automatic synchronization
 */
export function createPersistedState<T>(
  options: PersistedStateOptions<T>
): () => [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const storage = new VersionedStorage<T>(options);
  const manager = new StorageManager();
  
  // Register migrations
  if (options.migrations) {
    options.migrations.forEach(({ from, migration }) => {
      storage.registerMigration(from, migration);
    });
  }

  return function usePersistedState() {
    // Initialize state from storage or default
    const [state, setState] = useState<T>(() => {
      const loaded = storage.load();
      return loaded !== null ? loaded : options.defaultValue;
    });

    // Track if we've initialized
    const initialized = useRef(false);
    const currentValue = useRef(state);
    currentValue.current = state;

    // Create debounced save function
    const debouncedSave = useRef(
      debounce((value: T) => {
        storage.save(value);
        manager.emit(options.key, currentValue.current, value);
      }, options.debounceMs || 1000)
    ).current;

    // Handle storage events from other tabs
    useEffect(() => {
      const unsubscribe = manager.subscribe<T>(options.key, (event) => {
        if (event.newValue !== null && event.timestamp > Date.now() - 100) {
          // Only update if the change is recent (within 100ms)
          // This prevents loops in multi-tab scenarios
          setState(event.newValue);
        }
      });

      return unsubscribe;
    }, []);

    // Auto-save on state changes
    useEffect(() => {
      if (!initialized.current) {
        initialized.current = true;
        return;
      }
      debouncedSave(state);
    }, [state, debouncedSave]);

    // Save immediately on unmount
    useEffect(() => {
      return () => {
        debouncedSave.cancel();
        storage.save(currentValue.current);
      };
    }, [debouncedSave]);

    // Update function that accepts both direct values and updater functions
    const updateState = useCallback((value: T | ((prev: T) => T)) => {
      setState(value);
    }, []);

    // Clear function to reset to default
    const clearState = useCallback(() => {
      storage.clear();
      setState(options.defaultValue);
      manager.emit(options.key, currentValue.current, options.defaultValue);
    }, []);

    return [state, updateState, clearState];
  };
}