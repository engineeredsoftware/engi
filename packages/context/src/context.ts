export type GlobalContext = {
  repoOwner?: string;
  repoName?: string;
  repoBranch?: string;
  repoCommit?: string;
  repoPath?: string;
  task?: string;
  userId?: string | number;
  connectionId?: number;
  attachments?: any[];
  otfInstructions?: any[];
  dataStream?: {
    writeData?: (...args: any[]) => Promise<void> | void;
    close?: (...args: any[]) => Promise<void> | void;
  };
};

let currentContext: GlobalContext = {};

export async function initializeContext(context: GlobalContext = {}): Promise<GlobalContext> {
  currentContext = { ...context };
  return currentContext;
}

export function createContext(context: GlobalContext): GlobalContext {
  currentContext = { ...context };
  return currentContext;
}

export function getGlobalContext(): GlobalContext {
  return currentContext;
}

export async function endContext(): Promise<void> {
  currentContext = {};
}

export function setGlobalContext(context: GlobalContext): void {
  currentContext = { ...context };
}

export function prepareContextForPrompt(context: GlobalContext = currentContext) {
  const mergedContext = {
    ...currentContext,
    ...context,
  };

  return {
    repoOwner: mergedContext.repoOwner,
    repoName: mergedContext.repoName,
    branch: mergedContext.repoBranch,
    commit: mergedContext.repoCommit,
    task: mergedContext.task,
    otfInstructions: mergedContext.otfInstructions
  };
}
