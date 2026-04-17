declare module '@bitcode/prompts' {
  export type Prompt = Record<string, any>;
}

declare module '@bitcode/registry' {
  export type RegistryEntry<T> = { value: T; priority: number };

  export interface Registry<T extends Record<string, any>> {
    set(path: string, value: T, priority?: number): this;
    get(path: string | string[]): T | undefined;
  }

  export function factoryRegistry<T extends Record<string, any>>(): Registry<T>;

  export class RegistryPathBuilder {
    static from(...segments: string[]): RegistryPathBuilder;
    add(segment: string): this;
    addAll(...segments: string[]): this;
    buildHierarchy(): string[];
  }
}
