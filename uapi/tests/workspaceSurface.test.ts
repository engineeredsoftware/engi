import {
  getWorkspaceSurface,
  shouldHideWorkspaceFooter,
  usesWorkspaceChrome,
} from '@/components/base/engi/layout/workspace-surface';

describe('workspaceSurface helpers', () => {
  it('classifies operator workspace routes consistently', () => {
    expect(getWorkspaceSurface('/application')).toBe('application');
    expect(getWorkspaceSurface('/application/detail')).toBe('application');
    expect(getWorkspaceSurface('/orbitals/connects')).toBe('orbitals');
    expect(getWorkspaceSurface('/conversations/thread')).toBe('conversations');
    expect(getWorkspaceSurface('/')).toBeNull();
  });

  it('marks workspace chrome and footer suppression together', () => {
    expect(usesWorkspaceChrome('/application')).toBe(true);
    expect(usesWorkspaceChrome('/orbitals')).toBe(true);
    expect(usesWorkspaceChrome('/conversations')).toBe(true);
    expect(usesWorkspaceChrome('/pricing')).toBe(false);

    expect(shouldHideWorkspaceFooter('/application')).toBe(true);
    expect(shouldHideWorkspaceFooter('/orbitals')).toBe(true);
    expect(shouldHideWorkspaceFooter('/conversations')).toBe(true);
    expect(shouldHideWorkspaceFooter('/pricing')).toBe(false);
  });
});
