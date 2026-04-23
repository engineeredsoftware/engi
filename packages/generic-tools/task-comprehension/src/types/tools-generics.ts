import type { PromptPart } from './prompt-part';

export class Tool<TToolFunction extends (...args: any[]) => any = (...args: any[]) => any> {
  use!: TToolFunction;
}

export class DocCodeToolPrompt {
  set(_path: string, _value: PromptPart, _priority?: number, _metadata?: Record<string, any>): this {
    return this;
  }

  setPurpose(_purpose: PromptPart): this {
    return this;
  }

  setCapabilities(_capabilities: PromptPart): this {
    return this;
  }

  setParameters(_parameters: PromptPart): this {
    return this;
  }

  setOutput(_output: PromptPart): this {
    return this;
  }
}
