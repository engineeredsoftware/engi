import type { GlobalContext } from './context';

export function serializeContext(context: GlobalContext): Record<string, unknown> {
  const { dataStream, ...rest } = context;
  return {
    ...rest,
    dataStream: dataStream ? { hasWriter: Boolean(dataStream.writeData), hasCloser: Boolean(dataStream.close) } : undefined
  };
}
