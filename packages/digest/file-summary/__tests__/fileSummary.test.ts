import { describe, it, expect } from '@jest/globals';
import { getFileType, validateContent, buildFileInfo } from '../index';
import { estimateTokens } from '../../tokens';

describe('getFileType', () => {
  it('detects api-route before extension mapping', () => {
    expect(getFileType('app/api/handler.ts')).toBe('api-route');
    expect(getFileType('app/api/handler.js')).toBe('api-route');
  });

  it('identifies notebooks and ui-components and code', () => {
    expect(getFileType('notebook.ipynb')).toBe('notebook');
    expect(getFileType('component.tsx')).toBe('ui-component');
    expect(getFileType('file.js')).toBe('code');
  });

  it('categorizes other extensions correctly', () => {
    expect(getFileType('doc.md')).toBe('documentation');
    expect(getFileType('config.yaml')).toBe('config');
    expect(getFileType('unknown.ext')).toBe('unknown');
  });
});

describe('validateContent', () => {
  it('rejects empty, whitespace or binary content', () => {
    expect(validateContent('file.txt', '')).toBe(false);
    expect(validateContent('file.txt', '   ')).toBe(false);
    expect(validateContent('file.bin', 'abc\u0000def')).toBe(false);
  });

  it('rejects invalid JSON for .json files', () => {
    expect(validateContent('bad.json', '{invalid}')).toBe(false);
  });

  it('accepts valid content and valid JSON', () => {
    expect(validateContent('file.txt', 'hello')).toBe(true);
    expect(validateContent('data.json', '{"key": "value"}')).toBe(true);
  });
});

describe('buildFileInfo', () => {
  it('builds FileInfo with type and tokenCount', () => {
    const fi = buildFileInfo('path.js', 'a b c');
    expect(fi.relativePath).toBe('path.js');
    expect(fi.content).toBe('a b c');
    expect(fi.type).toBe('code');
    expect(fi.tokenCount).toBe(estimateTokens('a b c'));
  });
});
