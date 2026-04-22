"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistryPathBuilder = void 0;
exports.factoryRegistry = factoryRegistry;
function factoryRegistry() {
    const store = new Map();
    return {
        set(path, value, priority = 0) {
            const entries = store.get(path) ?? [];
            const filtered = entries.filter((entry) => entry.priority !== priority);
            filtered.push({ value, priority });
            filtered.sort((a, b) => b.priority - a.priority);
            store.set(path, filtered);
            return this;
        },
        get(pathOrPaths) {
            if (typeof pathOrPaths === "string") {
                const entries = store.get(pathOrPaths);
                return entries?.[0]?.value;
            }
            const collected = [];
            for (const path of pathOrPaths) {
                const entries = store.get(path);
                if (entries)
                    collected.push(...entries);
            }
            if (collected.length === 0) {
                return undefined;
            }
            collected.sort((a, b) => a.priority - b.priority);
            return collected.reduce((acc, entry) => Object.assign({}, acc, entry.value), {});
        },
    };
}
class RegistryPathBuilder {
    constructor(segments) {
        this.segments = segments;
    }
    static from(...segments) {
        return new RegistryPathBuilder(segments.filter(Boolean));
    }
    add(segment) {
        this.segments.push(segment);
        return this;
    }
    addAll(...segments) {
        this.segments.push(...segments.filter(Boolean));
        return this;
    }
    buildHierarchy() {
        const hierarchy = [];
        for (let i = 0; i < this.segments.length; i++) {
            hierarchy.push(this.segments.slice(0, i + 1).join(":"));
        }
        return hierarchy;
    }
}
exports.RegistryPathBuilder = RegistryPathBuilder;
