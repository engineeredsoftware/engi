export function prepareConciseContext(input: any) {
  return {
    preparedContexts: [],
    preparedContextStats: {
      chunked: [],
      chunkCount: 0,
      contextSize: 0
    }
  };
}
