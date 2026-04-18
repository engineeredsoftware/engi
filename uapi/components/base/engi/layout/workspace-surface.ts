export type WorkspaceSurface = 'application' | 'orbitals' | 'conversations' | null;

export function getWorkspaceSurface(pathname: string | null | undefined): WorkspaceSurface {
  if (!pathname) return null;
  if (pathname.startsWith('/application')) return 'application';
  if (pathname.startsWith('/orbitals')) return 'orbitals';
  if (pathname.startsWith('/conversations')) return 'conversations';
  return null;
}

export function usesWorkspaceChrome(pathname: string | null | undefined): boolean {
  return getWorkspaceSurface(pathname) !== null;
}

export function shouldHideWorkspaceFooter(pathname: string | null | undefined): boolean {
  return usesWorkspaceChrome(pathname);
}
