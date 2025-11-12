import { factoryRegistry } from './index';

describe('Registry', () => {
  it('should merge configurations by priority', () => {
    const registry = factoryRegistry<{ model?: string; temperature?: number }>();
    
    registry.set('global', { temperature: 0.7 }, 0);
    registry.set('pipeline', { model: 'gpt-4' }, 10);
    registry.set('sequence', { temperature: 0.9 }, 20);
    
    const config = registry.get(['global', 'pipeline', 'sequence']);
    
    expect(config).toEqual({
      model: 'gpt-4',
      temperature: 0.9  // Higher priority wins
    });
  });

  it('should support custom mergers', () => {
    const registry = factoryRegistry<{ tags: string[] }>();
    
    registry.set('base', { tags: ['a', 'b'] }, 0);
    registry.set('extended', { tags: ['c', 'd'] }, 10);
    
    const deepMerge = (base: any, override: any) => ({
      tags: [...(base.tags || []), ...(override.tags || [])]
    });
    
    const config = registry.get(['base', 'extended'], deepMerge);
    
    expect(config?.tags).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should support single-path get', () => {
    const registry = factoryRegistry<{ value: string }>();
    
    registry.set('test', { value: 'low' }, 0);
    registry.set('test', { value: 'high' }, 100);
    
    const result = registry.get('test');
    
    expect(result?.value).toBe('high'); // Highest priority wins
  });

  it('should return all paths with getPaths', () => {
    const registry = factoryRegistry<{ value: string }>();
    
    registry.set('path:one', { value: 'a' });
    registry.set('path:two', { value: 'b' });
    registry.set('other', { value: 'c' });
    
    const paths = registry.getPaths();
    
    expect(paths).toContain('path:one');
    expect(paths).toContain('path:two');
    expect(paths).toContain('other');
    expect(paths.length).toBe(3);
  });

  it('should merge registries', () => {
    const registry1 = factoryRegistry<{ value: string }>();
    const registry2 = factoryRegistry<{ value: string }>();
    
    registry1.set('path1', { value: 'a' }, 10);
    registry2.set('path2', { value: 'b' }, 20);
    registry2.set('path1', { value: 'override' }, 50);
    
    registry1.merge(registry2);
    
    expect(registry1.get('path1')?.value).toBe('override'); // Higher priority from registry2
    expect(registry1.get('path2')?.value).toBe('b');
  });

  it('should support method chaining', () => {
    const registry = factoryRegistry<{ value: string }>();
    
    const result = registry
      .set('a', { value: '1' })
      .set('b', { value: '2' })
      .set('c', { value: '3' })
      .clear('b');
    
    expect(result).toBe(registry); // Chaining returns same instance
    expect(registry.has('a')).toBe(true);
    expect(registry.has('b')).toBe(false);
    expect(registry.has('c')).toBe(true);
  });
});

