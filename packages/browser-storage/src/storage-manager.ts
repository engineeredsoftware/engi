/**
 * Storage manager with multi-tab synchronization
 */

import { StorageEvent } from './types';

export class StorageManager {
  private readonly listeners: Map<string, Set<(event: StorageEvent<any>) => void>>;
  private readonly storageListener: (event: StorageEvent) => void;

  constructor() {
    this.listeners = new Map();
    
    // Handle storage events for multi-tab sync
    this.storageListener = (event: StorageEvent) => {
      if (!event.key) return;
      
      const callbacks = this.listeners.get(event.key);
      if (callbacks) {
        const parsedEvent: StorageEvent<any> = {
          key: event.key,
          oldValue: event.oldValue ? JSON.parse(event.oldValue) : null,
          newValue: event.newValue ? JSON.parse(event.newValue) : null,
          timestamp: Date.now()
        };
        
        callbacks.forEach(callback => callback(parsedEvent));
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.storageListener);
    }
  }

  /**
   * Subscribe to changes for a specific storage key
   */
  subscribe<T>(
    key: string,
    callback: (event: StorageEvent<T>) => void
  ): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    
    this.listeners.get(key)!.add(callback);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(key);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.listeners.delete(key);
        }
      }
    };
  }

  /**
   * Emit a storage event manually (for same-tab updates)
   */
  emit<T>(key: string, oldValue: T | null, newValue: T | null): void {
    const callbacks = this.listeners.get(key);
    if (callbacks) {
      const event: StorageEvent<T> = {
        key,
        oldValue,
        newValue,
        timestamp: Date.now()
      };
      
      callbacks.forEach(callback => callback(event));
    }
  }

  /**
   * Clean up event listeners
   */
  destroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.storageListener);
    }
    this.listeners.clear();
  }
}