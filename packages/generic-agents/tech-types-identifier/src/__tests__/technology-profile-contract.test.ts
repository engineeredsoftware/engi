import {
  buildEmptyTechnologyProfile,
  isCanonicalTechnologyProfile,
} from '../technology-profile-contract';

describe('@bitcode/generic-agents-tech-types-identifier technologyProfile contract', () => {
  it('builds the canonical empty technologyProfile envelope', () => {
    expect(buildEmptyTechnologyProfile()).toEqual({
      stackHints: [],
      languages: [],
      technologies: [],
      brands: [],
    });
  });

  it('parses a canonical technologyProfile without downstream schema drift', () => {
    const parsed = {
      stackHints: ['typescript', 'github-actions'],
      languages: ['TypeScript', 'YAML'],
      technologies: ['GitHubActions'],
      brands: ['GitHub'],
    };

    expect(isCanonicalTechnologyProfile(parsed)).toBe(true);
    expect(parsed.stackHints).toContain('typescript');
    expect(parsed.technologies).toContain('GitHubActions');
    expect(parsed.brands).toContain('GitHub');
  });
});
