export interface CanonicalTechnologyProfile {
  // `technologyProfile` is the canonical Bitcode envelope for normalized stack evidence.
  stackHints: string[];
  languages: string[];
  technologies: string[];
  brands: string[];
}

export function buildEmptyTechnologyProfile(): CanonicalTechnologyProfile {
  return {
    stackHints: [],
    languages: [],
    technologies: [],
    brands: [],
  };
}

export function isCanonicalTechnologyProfile(value: unknown): value is CanonicalTechnologyProfile {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Record<string, unknown>;
  return ['stackHints', 'languages', 'technologies', 'brands'].every((field) =>
    Array.isArray(candidate[field]) && (candidate[field] as unknown[]).every((entry) => typeof entry === 'string')
  );
}
