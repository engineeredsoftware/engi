type Entry<T> = { value: T; priority: number };

export function factoryRegistry<T extends Record<string, any>>() {
  const store = new Map<string, Entry<T>[]>();

  return {
    set(path: string, value: T, priority: number = 0) {
      const entries = store.get(path) ?? [];
      const filtered = entries.filter((entry) => entry.priority !== priority);
      filtered.push({ value, priority });
      filtered.sort((a, b) => b.priority - a.priority);
      store.set(path, filtered);
      return this;
    },
    get(pathOrPaths: string | string[]) {
      if (typeof pathOrPaths === 'string') {
        const entries = store.get(pathOrPaths);
        return entries?.[0]?.value;
      }

      const collected: Entry<T>[] = [];
      for (const path of pathOrPaths) {
        const entries = store.get(path);
        if (entries) collected.push(...entries);
      }
      if (collected.length === 0) {
        return undefined;
      }
      collected.sort((a, b) => a.priority - b.priority);
      return collected.reduce<T>((acc, entry) => Object.assign({}, acc, entry.value), {} as T);
    },
  };
}

export class RegistryPathBuilder {
  private segments: string[];

  private constructor(segments: string[]) {
    this.segments = segments;
  }

  static from(...segments: string[]) {
    return new RegistryPathBuilder(segments.filter(Boolean));
  }

  add(segment: string) {
    this.segments.push(segment);
    return this;
  }

  addAll(...segments: string[]) {
    this.segments.push(...segments.filter(Boolean));
    return this;
  }

  buildHierarchy(): string[] {
    const hierarchy: string[] = [];
    for (let i = 0; i < this.segments.length; i++) {
      hierarchy.push(this.segments.slice(0, i + 1).join(':'));
    }
    return hierarchy;
  }
}

export type Registry<T> = {
  set(path: string, value: T, priority?: number): Registry<T>;
  get(pathOrPaths: string | string[]): T | undefined;
};
