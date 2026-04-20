/**
 * Simple LRU Cache implementation for auth context caching
 */

export class LRUCache<K, V> {
  private maxSize: number;
  private cache: Map<K, V>;
  private accessOrder: K[];

  constructor(maxSize: number = 1000) {
    this.maxSize = maxSize;
    this.cache = new Map();
    this.accessOrder = [];
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Move to end (most recently used)
      this.updateAccessOrder(key);
    }
    return value;
  }

  set(key: K, value: V): void {
    // If key exists, update it
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      this.updateAccessOrder(key);
      return;
    }

    // If at capacity, remove least recently used
    if (this.cache.size >= this.maxSize) {
      const lru = this.accessOrder.shift();
      if (lru !== undefined) {
        this.cache.delete(lru);
      }
    }

    // Add new entry
    this.cache.set(key, value);
    this.accessOrder.push(key);
  }

  private updateAccessOrder(key: K): void {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
    this.accessOrder.push(key);
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
  }

  size(): number {
    return this.cache.size;
  }
}

/**
 * Time-based expiring cache entry
 */
export interface ExpiringCacheEntry<T> {
  value: T;
  expires: number;
}

/**
 * LRU Cache with TTL support
 */
export class TTLCache<K, V> extends LRUCache<K, ExpiringCacheEntry<V>> {
  private ttl: number;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(maxSize: number = 1000, ttlMs: number = 5 * 60 * 1000) {
    super(maxSize);
    this.ttl = ttlMs;
    
    // Run cleanup every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60 * 1000);
    this.cleanupInterval.unref?.();
  }

  get(key: K): V | undefined {
    const entry = super.get(key);
    if (!entry) return undefined;
    
    if (Date.now() > entry.expires) {
      super.set(key, undefined as any);
      return undefined;
    }
    
    return entry.value;
  }

  set(key: K, value: V, customTTL?: number): void {
    const expires = Date.now() + (customTTL || this.ttl);
    super.set(key, { value, expires });
  }

  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: K[] = [];
    
    // Note: This is not the most efficient but works for our use case
    // In production, consider using a priority queue for expiration times
    for (const [key, entry] of (this as any).cache) {
      if (now > entry.expires) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => {
      (this as any).cache.delete(key);
      const index = (this as any).accessOrder.indexOf(key);
      if (index > -1) {
        (this as any).accessOrder.splice(index, 1);
      }
    });
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.clear();
  }
}
