# Registry - TODO

## Architecture Excellence

### ✅ Completed
- Pure hierarchical key-value store with zero domain knowledge
- Priority-based resolution system working perfectly
- Path utilities with clear `RegistryPath` prefix
- Method chaining for fluent API
- Generic constraint `T extends object` for type safety
- Protected `entries` Map enabling extension

### 🔍 Missing Features

#### entries() Iterator
- **Issue**: ExecutionToolRegistry tries to call `entries()` method that doesn't exist
- **Solution**: Add iterator support to Registry interface
```typescript
interface Registry<T> {
  entries(): IterableIterator<[string, T]>;
  // or
  [Symbol.iterator](): Iterator<[string, T]>;
}
```
- **Priority**: High - blocking ExecutionToolRegistry functionality

#### Pattern-Based Queries
- **Enhancement**: Add glob/pattern support for path queries
```typescript
getByPattern(pattern: string): Map<string, T>;
// registry.getByPattern('pipeline:*:agent:*')
```
- **Use Case**: Tool discovery, prompt collection
- **Priority**: Medium - would improve developer experience

## Performance Optimizations

### 🚀 Potential Improvements

#### Path Caching
- **Current**: O(n log n) sort on every set()
- **Optimization**: Consider maintaining sorted order incrementally
- **Trade-off**: Slightly more complex code for better set() performance

#### Cascading Cache
- **Current**: Recomputes cascade on every multi-path get()
- **Optimization**: Cache cascade results with invalidation on set()
- **Trade-off**: Memory vs repeated computation

## API Completeness

### 📋 Potential Additions

#### Bulk Operations
```typescript
setAll(entries: Array<[string, T, number?, any?]>): this;
getMany(paths: string[]): Map<string, T>;
```
- **Use Case**: Efficient initialization, bulk configuration
- **Priority**: Low - current API handles use cases

#### Path Queries
```typescript
getChildren(parentPath: string): string[];
getDescendants(parentPath: string): string[];
hasChildren(path: string): boolean;
```
- **Use Case**: Registry introspection, debugging
- **Priority**: Low - nice to have

## Developer Experience

### 📚 Documentation
- ✅ README comprehensive with real examples
- ✅ TLDR captures essence perfectly
- ✅ Inline documentation clear
- Consider adding visual diagrams of priority resolution

### 🧪 Testing
- Verify edge cases:
  - Empty path handling
  - Null/undefined in metadata
  - Very deep path hierarchies
  - Large numbers of entries per path
- Add performance benchmarks

## Type Safety Enhancements

### 🔒 Stronger Typing

#### Path Type Safety
```typescript
// Consider branded types for paths
type RegistryPath = string & { __brand: 'RegistryPath' };
```
- **Benefit**: Prevent accidental string usage
- **Trade-off**: More verbose API

#### Metadata Typing
```typescript
interface Registry<T, M = any> {
  set(path: string, value: T, priority?: number, metadata?: M): this;
}
```
- **Benefit**: Type-safe metadata
- **Trade-off**: More complex generics

## Integration Considerations

### 🔗 Cross-Package Usage

#### Extension Pattern Documentation
- Document the `entries` Map protection pattern better
- Show more examples of extending Registry
- Clarify when to extend vs compose

#### Registry Composition
- Pattern for combining multiple registries
- Precedence rules for registry merging
- Best practices for registry hierarchies

## Future Evolution

### 🔮 Potential Features

#### Persistence Layer
- Optional persistence adapter interface
- Save/load registry state
- Use Case: Configuration management

#### Change Notifications
```typescript
interface Registry<T> {
  watch(path: string, callback: (entry: T) => void): () => void;
}
```
- Use Case: Reactive updates, debugging
- Challenge: Keep it simple and optional

#### Registry Diff/Merge
```typescript
diff(other: Registry<T>): RegistryDiff<T>;
merge(other: Registry<T>, strategy: MergeStrategy): this;
```
- Use Case: Configuration synchronization
- Challenge: Define merge conflict resolution

## Priority Items

### 🎯 V26 Critical

1. **Add entries() method** - Required by ExecutionToolRegistry
2. **Test coverage** - Ensure all edge cases handled
3. **No other blockers** - Architecture is sound

### 🏁 Conclusion

Registry is one of Bitcode's most elegant primitives. The architecture is clean, the API is complete for current needs, and the extension pattern works well. Only the missing `entries()` method needs immediate attention for V26. All other items are enhancements that can wait for post-V26 evolution.
