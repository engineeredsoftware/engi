/**
 * Registry - Hierarchical key-value store with priority-based resolution
 * 
 * Registry stores multiple values per path with different priorities, returning the
 * highest priority value. This enables configuration inheritance where specific
 * contexts override general defaults.
 * 
 * Example: A tool registry might have:
 * - 'pipeline:deliverable' -> all tools for deliverable pipeline (priority 0)
 * - 'pipeline:deliverable:phase:implementation' -> subset for implementation (priority 10)
 * - 'pipeline:deliverable:phase:implementation:agent:coder' -> further subset (priority 20)
 * 
 * Paths use colon (:) separator to create hierarchies for filtering and cascading.
 */

// Registry path separator constant
export const REGISTRY_PATH_SEPARATOR = ':';

export interface RegistryEntry<T> {
  value: T;
  priority: number;
  metadata?: Record<string, any>;
}

export interface Registry<T extends object> {
  set(path: string, value: T, priority?: number, metadata?: Record<string, any>): this;
  get(path: string): T | undefined;
  get(paths: string[], merger?: (base: T, override: T) => T): T | undefined;
  getAll(path: string): RegistryEntry<T>[];
  has(path: string): boolean;
  clear(path?: string): this;
  getPaths(): string[];
  merge(other: Registry<T>): this;
}

/**
 * RegistryPathBuilder - Constructs hierarchical registry paths
 * 
 * Builds colon-separated paths for use with Registry. Domain-agnostic -
 * consumers create domain-specific paths using add() method.
 */
export class RegistryPathBuilder {
  private segments: string[] = [];

  static from(...segments: string[]): RegistryPathBuilder {
    const builder = new RegistryPathBuilder();
    builder.segments = segments.filter(s => s);
    return builder;
  }

  add(segment: string): this {
    this.segments.push(segment);
    return this;
  }

  addAll(...segments: string[]): this {
    this.segments.push(...segments.filter(s => s));
    return this;
  }

  build(): string {
    return this.segments.join(REGISTRY_PATH_SEPARATOR);
  }

  buildHierarchy(): string[] {
    const hierarchy: string[] = [];
    for (let i = 0; i < this.segments.length; i++) {
      hierarchy.push(this.segments.slice(0, i + 1).join(REGISTRY_PATH_SEPARATOR));
    }
    return hierarchy;
  }

  clone(): RegistryPathBuilder {
    const cloned = new RegistryPathBuilder();
    cloned.segments = [...this.segments];
    return cloned;
  }
}

/**
 * RegistryImpl - The core registry implementation
 */
export class RegistryImpl<T extends object> implements Registry<T> {
  protected entries = new Map<string, RegistryEntry<T>[]>();

  set(path: string, value: T, priority: number = 0, metadata?: Record<string, any>): this {
    const existing = this.entries.get(path) || [];

    // Remove any existing entry with same priority
    const filtered = existing.filter(e => e.priority !== priority);

    // Add new entry
    filtered.push({ value, priority, metadata });

    // Sort by priority (higher first)
    filtered.sort((a, b) => b.priority - a.priority);

    this.entries.set(path, filtered);
    return this;
  }

  // Single-path get - returns highest priority value
  get(path: string): T | undefined;
  // Multi-path get with merger for cascading config
  get(paths: string[], merger?: (base: T, override: T) => T): T | undefined;
  // Implementation handles both overloads
  get(pathOrPaths: string | string[], merger?: (base: T, override: T) => T): T | undefined {
    // Single path case
    if (typeof pathOrPaths === 'string') {
      const entries = this.entries.get(pathOrPaths);
      if (!entries || entries.length === 0) {
        return undefined;
      }
      // Return highest priority (first in sorted array)
      return entries[0].value;
    }

    // Multi-path case (existing implementation)
    const paths = pathOrPaths;
    const defaultMerger = (base: T, override: T): T => ({ ...base, ...override });
    const merge = merger || defaultMerger;

    // Collect all entries from all paths
    const allEntries: RegistryEntry<T>[] = [];

    for (const path of paths) {
      const pathEntries = this.entries.get(path) || [];
      allEntries.push(...pathEntries);
    }

    if (allEntries.length === 0) {
      return undefined;
    }

    // Sort by priority (higher first)
    allEntries.sort((a, b) => b.priority - a.priority);

    // Merge from lowest to highest priority
    let result = allEntries[allEntries.length - 1].value;
    for (let i = allEntries.length - 2; i >= 0; i--) {
      result = merge(result, allEntries[i].value);
    }

    return result;
  }

  getAll(path: string): RegistryEntry<T>[] {
    return this.entries.get(path) || [];
  }

  has(path: string): boolean {
    return this.entries.has(path);
  }

  clear(path?: string): this {
    if (path) {
      this.entries.delete(path);
    } else {
      this.entries.clear();
    }
    return this;
  }

  getPaths(): string[] {
    return Array.from(this.entries.keys());
  }

  merge(other: Registry<T>): this {
    // Get all paths from the other registry
    const otherPaths = other.getPaths();
    
    // Merge each path's entries
    for (const path of otherPaths) {
      const otherEntries = other.getAll(path);
      
      // Add each entry from other registry
      for (const entry of otherEntries) {
        this.set(path, entry.value, entry.priority, entry.metadata);
      }
    }
    
    return this;
  }
}

// Factory function
function factoryRegistry<T extends object>(): RegistryImpl<T> {
  return new RegistryImpl<T>();
}

// Registry path utilities

/**
 * Split a registry path into segments
 */
export function splitRegistryPath(path: string): string[] {
  return path.split(REGISTRY_PATH_SEPARATOR).filter(s => s);
}

/**
 * Join segments into a registry path
 */
export function joinRegistryPath(...segments: string[]): string {
  return segments.filter(s => s).join(REGISTRY_PATH_SEPARATOR);
}

/**
 * Get parent registry path (e.g., 'a:b:c' -> 'a:b')
 */
export function getParentRegistryPath(path: string): string | null {
  const segments = splitRegistryPath(path);
  if (segments.length <= 1) return null;
  return segments.slice(0, -1).join(REGISTRY_PATH_SEPARATOR);
}

/**
 * Get all parent registry paths (e.g., 'a:b:c' -> ['a', 'a:b'])
 */
export function getParentRegistryPaths(path: string): string[] {
  const segments = splitRegistryPath(path);
  const parents: string[] = [];
  
  for (let i = 1; i < segments.length; i++) {
    parents.push(segments.slice(0, i).join(REGISTRY_PATH_SEPARATOR));
  }
  
  return parents;
}

/**
 * Check if one registry path is a parent of another
 */
export function isParentRegistryPath(parent: string, child: string): boolean {
  return child.startsWith(parent + REGISTRY_PATH_SEPARATOR) || child === parent;
}

// Export factory function
export { factoryRegistry };

// Type exports
export type { RegistryEntry, Registry };
