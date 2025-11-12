export function isDryRunEnabled(): boolean {
  return false;
}

export function getDryRunConfig(): { mockResponses: boolean } {
  return { mockResponses: false };
}
