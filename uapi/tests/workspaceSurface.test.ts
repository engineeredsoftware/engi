import {
  getWorkspaceSurface,
  shouldHideWorkspaceFooter,
  usesWorkspaceChrome,
} from '@/components/base/bitcode/layout/workspace-surface';

describe('workspaceSurface helpers', () => {
  it('classifies operator workspace routes consistently', () => {
    expect(getWorkspaceSurface('/terminal')).toBe('terminal');
    expect(getWorkspaceSurface('/terminal/detail')).toBe('terminal');
    expect(getWorkspaceSurface('/auxillaries/connects')).toBe('auxillaries');
    expect(getWorkspaceSurface('/conversations/thread')).toBe('conversations');
    expect(getWorkspaceSurface('/')).toBeNull();
  });

  it('marks workspace chrome and footer suppression together', () => {
    expect(usesWorkspaceChrome('/terminal')).toBe(true);
    expect(usesWorkspaceChrome('/auxillaries')).toBe(true);
    expect(usesWorkspaceChrome('/conversations')).toBe(true);
    expect(usesWorkspaceChrome('/pricing')).toBe(false);

    expect(shouldHideWorkspaceFooter('/terminal')).toBe(true);
    expect(shouldHideWorkspaceFooter('/auxillaries')).toBe(true);
    expect(shouldHideWorkspaceFooter('/conversations')).toBe(true);
    expect(shouldHideWorkspaceFooter('/pricing')).toBe(false);
  });
});
