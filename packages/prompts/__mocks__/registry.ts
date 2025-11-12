export interface RegistryEntry<T> {
  value: T;
  priority: number;
}

export class RegistryImpl<T extends object> {
  private entries = new Map<string, RegistryEntry<T>[]>();

  set(path: string, value: T, priority: number = 0): this {
    const existing = this.entries.get(path) ?? [];
    const filtered = existing.filter((entry) => entry.priority !== priority);
    filtered.push({ value, priority });
    filtered.sort((a, b) => b.priority - a.priority);
    this.entries.set(path, filtered);
    return this;
  }

  get(path: string | string[]): T | undefined {
    if (typeof path === 'string') {
      return this.entries.get(path)?.[0]?.value;
    }

    const collected: RegistryEntry<T>[] = [];
    for (const p of path) {
      const entries = this.entries.get(p);
      if (entries) collected.push(...entries);
    }
    if (collected.length === 0) return undefined;
    collected.sort((a, b) => a.priority - b.priority);
    return collected[collected.length - 1].value;
  }

  getPaths(): string[] {
    return Array.from(this.entries.keys());
  }

  has(path: string): boolean {
    return this.entries.has(path);
  }

  merge(other: RegistryImpl<T>): this {
    other.getPaths().forEach((path) => {
      const entries = other.entries.get(path) ?? [];
      entries.forEach((entry) => this.set(path, entry.value, entry.priority));
    });
    return this;
  }

  clear(): void {
    this.entries.clear();
  }
}
