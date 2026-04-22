export type BitcodeApplicationShellSnapshot = Record<string, any>;

export type BitcodeApplicationShellControlSet = Record<
  string,
  ((...args: any[]) => unknown | Promise<unknown>) | undefined
>;

export function mountBitcodeApplicationShell(): Promise<(() => void) | undefined>;

export function readBitcodeApplicationShellSnapshot(): Promise<BitcodeApplicationShellSnapshot | null>;

export function readBitcodeApplicationShellControls(): Promise<BitcodeApplicationShellControlSet | null>;
