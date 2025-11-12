declare module '@engi/vcs' {
  export type VCSAuth = {
    accessToken: string;
    tokenType: string;
    provider: 'github';
  };

  export function getVCSConfig(provider: 'github'): { apiBaseUrl: string };
}
