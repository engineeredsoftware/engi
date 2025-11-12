'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/base/shadcn/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/base/shadcn/card';
import { Input } from '@/components/base/shadcn/input';
import { Label } from '@/components/base/shadcn/label';
import { Button } from '@/components/base/shadcn/button';
import { VCSConnectionCard } from './VCSConnectionCard';
import { PersonalAccessTokenForm } from './PersonalAccessTokenForm';
import { VCSProviderType } from '@engi/vcs-core';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { GitBranch, Server, Info } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/base/shadcn/alert';

interface VCSIntegrationPanelProps {
  showGitHub?: boolean;
  showGitLab?: boolean;
  showBitbucket?: boolean;
  onConnectionChange?: (provider: VCSProviderType, connected: boolean) => void;
}

const providerInfo = {
  github: {
    icon: GitHubLogoIcon,
    label: 'GitHub',
    patUrl: 'https://github.com/settings/tokens',
    patScopes: ['repo', 'user', 'admin:repo_hook'],
    patDocs: 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  },
  gitlab: {
    icon: GitBranch,
    label: 'GitLab',
    patUrl: 'https://gitlab.com/-/profile/personal_access_tokens',
    patScopes: ['api', 'read_user', 'read_repository', 'write_repository'],
    patDocs: 'https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html'
  },
  bitbucket: {
    icon: Server,
    label: 'Bitbucket',
    patUrl: 'https://bitbucket.org/account/settings/app-passwords/',
    patScopes: ['account', 'repository', 'repository:write', 'pullrequest', 'pullrequest:write', 'webhook'],
    patDocs: 'https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/'
  }
};

export function VCSIntegrationPanel({
  showGitHub = true,
  showGitLab = true,
  showBitbucket = true,
  onConnectionChange
}: VCSIntegrationPanelProps) {
  const [gitlabInstanceUrl, setGitlabInstanceUrl] = useState('');
  const [showGitlabSelfHosted, setShowGitlabSelfHosted] = useState(false);
  
  const providers = [
    ...(showGitHub ? ['github' as const] : []),
    ...(showGitLab ? ['gitlab' as const] : []),
    ...(showBitbucket ? ['bitbucket' as const] : [])
  ];
  
  const handleConnectionChange = (provider: VCSProviderType, connected: boolean) => {
    if (onConnectionChange) {
      onConnectionChange(provider, connected);
    }
  };
  
  if (providers.length === 0) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>No VCS providers enabled</AlertTitle>
        <AlertDescription>
          Please enable at least one VCS provider to continue.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Version Control System Integrations</h3>
        <p className="text-sm text-muted-foreground">
          Connect your repositories to enable automated workflows and collaboration features.
        </p>
      </div>
      
      <Tabs defaultValue="oauth" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="oauth">OAuth Connection</TabsTrigger>
          <TabsTrigger value="pat">Personal Access Token</TabsTrigger>
        </TabsList>
        
        <TabsContent value="oauth" className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Recommended</AlertTitle>
            <AlertDescription>
              OAuth provides a secure way to connect without sharing your password.
              Your access can be revoked at any time from your VCS provider settings.
            </AlertDescription>
          </Alert>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {showGitHub && (
              <VCSConnectionCard
                provider="github"
                onConnectionChange={(connected) => handleConnectionChange('github', connected)}
              />
            )}
            
            {showGitLab && (
              <div className="space-y-4">
                <VCSConnectionCard
                  provider="gitlab"
                  onConnectionChange={(connected) => handleConnectionChange('gitlab', connected)}
                />
                
                {!showGitlabSelfHosted && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowGitlabSelfHosted(true)}
                    className="w-full"
                  >
                    Connect Self-Hosted GitLab
                  </Button>
                )}
                
                {showGitlabSelfHosted && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Self-Hosted GitLab</CardTitle>
                      <CardDescription>
                        Connect to your organization's GitLab instance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="gitlab-instance">Instance URL</Label>
                        <Input
                          id="gitlab-instance"
                          type="url"
                          placeholder="https://gitlab.company.com"
                          value={gitlabInstanceUrl}
                          onChange={(e) => setGitlabInstanceUrl(e.target.value)}
                        />
                      </div>
                      
                      {gitlabInstanceUrl && (
                        <VCSConnectionCard
                          provider="gitlab"
                          instanceUrl={gitlabInstanceUrl}
                          onConnectionChange={(connected) => handleConnectionChange('gitlab', connected)}
                        />
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
            
            {showBitbucket && (
              <VCSConnectionCard
                provider="bitbucket"
                onConnectionChange={(connected) => handleConnectionChange('bitbucket', connected)}
              />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="pat" className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Alternative Method</AlertTitle>
            <AlertDescription>
              Use personal access tokens if OAuth is not available in your organization.
              This method requires manual token management and renewal.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            {providers.map((provider) => (
              <PersonalAccessTokenForm
                key={provider}
                provider={provider}
                providerInfo={providerInfo[provider]}
                onSuccess={() => handleConnectionChange(provider, true)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
