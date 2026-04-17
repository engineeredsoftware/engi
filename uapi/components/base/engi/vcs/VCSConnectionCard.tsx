'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/base/shadcn/card';
import { Button } from '@/components/base/shadcn/button';
import { Badge } from '@/components/base/shadcn/badge';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { GitBranch, Server, CheckCircle2, XCircle, RefreshCw, Trash2 } from 'lucide-react';
import { VCSProviderType } from '@bitcode/vcs-core';
import { VCSConnectionButton } from './VCSConnectionButton';
import { toast } from '@/components/base/shadcn/sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/base/shadcn/alert-dialog';

interface VCSConnectionCardProps {
  provider: VCSProviderType;
  instanceUrl?: string;
  onConnectionChange?: (connected: boolean) => void;
}

interface ConnectionStatus {
  connected: boolean;
  valid?: boolean;
  username?: string;
  instanceUrl?: string;
  expiresAt?: string;
  metadata?: Record<string, any>;
}

const providerConfig = {
  github: {
    icon: GitHubLogoIcon,
    label: 'GitHub',
    description: 'Connect your GitHub account to access repositories and create pull requests.',
    color: 'bg-gray-900',
    features: ['Repository access', 'Pull requests', 'Issues', 'Webhooks']
  },
  gitlab: {
    icon: GitBranch,
    label: 'GitLab',
    description: 'Connect your GitLab account to manage projects and merge requests.',
    color: 'bg-orange-600',
    features: ['Project access', 'Merge requests', 'CI/CD pipelines', 'Self-hosted support']
  },
  bitbucket: {
    icon: Server,
    label: 'Bitbucket',
    description: 'Connect your Bitbucket account to work with repositories and pull requests.',
    color: 'bg-blue-600',
    features: ['Repository access', 'Pull requests', 'Pipelines', 'App passwords']
  }
};

export function VCSConnectionCard({
  provider,
  instanceUrl,
  onConnectionChange
}: VCSConnectionCardProps) {
  const [status, setStatus] = useState<ConnectionStatus>({ connected: false });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  
  const config = providerConfig[provider];
  const Icon = config.icon;

  const readJsonResponse = async (response: Response) => {
    const contentType = response.headers?.get?.('content-type') || '';
    if (contentType && !contentType.includes('application/json')) {
      return null;
    }

    return response.json().catch(() => null);
  };
  
  const checkConnection = async () => {
    try {
      let url = `/api/vcs/${provider}/connection`;
      if (instanceUrl) {
        url += `?instance_url=${encodeURIComponent(instanceUrl)}`;
      }
      
      const response = await fetch(url);
      const data = await readJsonResponse(response);

      if (!response.ok) {
        setStatus({ connected: false });
        onConnectionChange?.(false);
        return;
      }

      if (!data || typeof data.connected !== 'boolean') {
        setStatus({ connected: false });
        onConnectionChange?.(false);
        return;
      }
      
      setStatus(data);
      onConnectionChange?.(data.connected);
    } catch {
      setStatus({ connected: false });
      onConnectionChange?.(false);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
  
  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    
    try {
      let url = `/api/vcs/${provider}/connection`;
      if (instanceUrl) {
        url += `?instance_url=${encodeURIComponent(instanceUrl)}`;
      }
      
      const response = await fetch(url, {
        method: 'DELETE'
      });

      const data = await readJsonResponse(response);
      
      if (!response.ok) {
        throw new Error((data && typeof data.error === 'string' && data.error) || 'Failed to disconnect');
      }
      
      setStatus({ connected: false });
      toast.success(`Disconnected from ${config.label}`);
      onConnectionChange?.(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `Failed to disconnect from ${config.label}`);
    } finally {
      setIsDisconnecting(false);
    }
  };
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    checkConnection();
  };
  
  useEffect(() => {
    checkConnection();
  }, [provider, instanceUrl]);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {config.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {config.label}
            {instanceUrl && (
              <Badge variant="secondary" className="ml-2">
                Self-hosted
              </Badge>
            )}
          </CardTitle>
          {status.connected && (
            <div className="flex items-center gap-2">
              <Badge 
                variant={status.valid ? "success" : "destructive"}
                className="flex items-center gap-1"
              >
                {status.valid ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <XCircle className="h-3 w-3" />
                )}
                {status.valid ? 'Connected' : 'Invalid'}
              </Badge>
            </div>
          )}
        </div>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {status.connected ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Username:</span>
                <span className="font-medium">{status.username}</span>
              </div>
              {status.instanceUrl && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Instance:</span>
                  <span className="font-medium truncate max-w-[200px]">
                    {status.instanceUrl}
                  </span>
                </div>
              )}
              {status.expiresAt && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Token expires:</span>
                  <span className="font-medium">
                    {new Date(status.expiresAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isDisconnecting}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Disconnect
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Disconnect {config.label}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove your {config.label} connection. You'll need to reconnect
                      to access your repositories again.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDisconnect}>
                      Disconnect
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Features:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {config.features.map((feature) => (
                  <li key={feature} className="text-muted-foreground">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <VCSConnectionButton
              provider={provider}
              instanceUrl={instanceUrl}
              onConnect={() => checkConnection()}
              className="w-full"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
