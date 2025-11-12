export type ToolFunction = (...args: any[]) => any;

export class Tool<T extends ToolFunction = ToolFunction> {
  async use(..._args: Parameters<T>): Promise<ReturnType<T>> {
    return undefined as any;
  }
  async execute(...args: Parameters<T>): Promise<ReturnType<T>> {
    return this.use(...args);
  }
}

