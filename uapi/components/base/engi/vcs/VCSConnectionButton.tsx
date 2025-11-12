"use client";

import React, { useState } from 'react';
import { Button } from '@/components/base/shadcn/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { GitBranch, Server } from 'lucide-react';
import { VCSProviderType } from '@engi/vcs-core';
import { toast } from '@/components/base/shadcn/sonner';

interface VCSConnectionButtonProps {
  provider: VCSProviderType;
  instanceUrl?: string;
  onConnect?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const providerConfig = {
  github: {
    icon: GitHubLogoIcon,
    label: 'GitHub',
    color: 'hover:bg-gray-900 hover:text-white'
  },
  gitlab: {
    icon: GitBranch,
    label: 'GitLab',
    color: 'hover:bg-orange-600 hover:text-white'
  },
  bitbucket: {
    icon: Server,
    label: 'Bitbucket',
    color: 'hover:bg-blue-600 hover:text-white'
  }
};

export function VCSConnectionButton({
  provider,
  instanceUrl,
  onConnect,
  className = '',
  variant = 'outline',
  size = 'default'
}: VCSConnectionButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const config = providerConfig[provider];
  const Icon = config.icon;
  
  const handleConnect = async () => {
    setIsConnecting(true);
    
    try {
      // Build OAuth URL
      let oauthUrl = `/api/vcs/${provider}/oauth`;
      if (instanceUrl) {
        oauthUrl += `?instance_url=${encodeURIComponent(instanceUrl)}`;
      }
      
      // Trigger OAuth flow
      window.location.href = oauthUrl;
      
      if (onConnect) {
        onConnect();
      }
    } catch (error) {
      console.error('Failed to initiate connection:', error);
      toast.error(`Failed to connect to ${config.label}`);
      setIsConnecting(false);
    }
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleConnect}
      disabled={isConnecting}
      className={`${config.color} ${className}`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {isConnecting ? 'Connecting...' : `Connect ${config.label}`}
    </Button>
  );
}
