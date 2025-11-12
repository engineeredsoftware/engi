/**
 * @jest-environment node
 */

import { parseStreamChunk } from '@/streaming/stream-parser';

describe('parseStreamChunk completion.fileChanges mapping', () => {
  it('prefers top-level fileChanges and maps to completion.deliverables.fileChanges', () => {
    const chunk =
      'data: ' +
      JSON.stringify({
        type: 'completion',
        duration: 1234,
        result: {
          actions: {
            files: { created: ['a'], modified: ['b'], deleted: ['c'] },
          },
        },
        fileChanges: { created: ['x'], modified: ['y'], deleted: ['z'] },
      }) +
      '\n\n';

    const parsed = parseStreamChunk(chunk);
    expect(parsed.completion).not.toBeNull();
    expect(parsed.completion!.deliverables.fileChanges).toEqual({
      created: ['x'],
      modified: ['y'],
      deleted: ['z'],
    });
  });
});

