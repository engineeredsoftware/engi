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
export declare function initializeContext(context?: GlobalContext): Promise<GlobalContext>;
export declare function createContext(context: GlobalContext): GlobalContext;
export declare function getGlobalContext(): GlobalContext;
export declare function endContext(): Promise<void>;
export declare function setGlobalContext(context: GlobalContext): void;
export declare function prepareContextForPrompt(context?: GlobalContext): {
    repoOwner: string;
    repoName: string;
    branch: string;
    commit: string;
    task: string;
    otfInstructions: any[];
};
